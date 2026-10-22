import { readFile, writeFile, readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
const sensitive = /^(x-vercel-protection-bypass|authorization|proxy-authorization|cookie|set-cookie|x-vercel-challenge-token)$/i;
const headerLine = /(x-vercel-protection-bypass|authorization|proxy-authorization|cookie|set-cookie|x-vercel-challenge-token)\s*[:=]\s*([^\r\n]+)/gi;
export function evidenceSanitizer(secret) {
  if (!secret?.trim()) throw new Error('Automation credential missing');
  const known = new Set([secret]);
  function remember(value) {
    if (typeof value === 'string' && value && value !== '[REDACTED]') known.add(value);
  }
  function text(value) {
    return value.replace(headerLine, (_, name, value) => { remember(value); return `${name}: [REDACTED]`; })
      .split(secret).join('[REDACTED]');
  }
  function walk(value) {
    if (typeof value === 'string') return text(value);
    if (!value || typeof value !== 'object') return value;
    if (Array.isArray(value)) return value.map(walk);
    const out = {};
    const named = sensitive.test(value.name || '');
    for (const [key, item] of Object.entries(value)) {
      if (sensitive.test(key) || (named && key.toLowerCase() === 'value') || key.toLowerCase() === 'extraheaders') {
        if (item && typeof item === 'object') walk(item);
        else remember(item);
        out[key] = '[REDACTED]';
      } else out[key] = walk(item);
    }
    return out;
  }
  function sanitize(raw) {
    let result;
    try { result = JSON.stringify(walk(JSON.parse(raw)), null, 2); }
    catch { result = text(raw); }
    for (const value of known) result = result.split(value).join('[REDACTED]');
    return result;
  }
  async function files(dir) {
    const result = [];
    for (const entry of await readdir(dir, {withFileTypes:true})) {
      if (entry.isSymbolicLink()) throw new Error('Unsafe evidence entry');
      const path = join(dir,entry.name);
      if (entry.isDirectory()) result.push(...await files(path));
      else if (entry.isFile()) result.push(path);
    }
    return result;
  }
  async function publish(rawDir, evidenceDir) {
    // Discover all sensitive header values before writing any sanitized copy.
    const entries = await files(rawDir);
    for (const path of entries) sanitize(await readFile(path,'utf8'));
    for (const path of entries) {
      const name = path.slice(rawDir.length + 1);
      if (name.includes('/') || name.includes('\\') || name === 'headers.json') continue;
      await writeFile(join(evidenceDir,name),sanitize(await readFile(path,'utf8')));
    }
  }
  async function seal(dir) {
    const marker = join(dir,'SAFE_TO_UPLOAD');
    await rm(marker,{force:true});
    const entries = await files(dir);
    for (const path of entries) {
      if ((await readFile(path,'utf8')).includes(secret)) throw new Error('Evidence safety validation failed');
    }
    // Final sanitization also covers records and error strings written by the controller.
    for (const path of entries) await writeFile(path,sanitize(await readFile(path,'utf8')));
    for (const path of entries) {
      const raw = await readFile(path,'utf8');
      if ([...known].some(value=>raw.includes(value)) || sanitize(raw)!==raw) throw new Error('Evidence safety validation failed');
    }
    await writeFile(marker,'Sanitized evidence validated\n');
  }
  return {sanitize,publish,seal};
}
