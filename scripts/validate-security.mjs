import { readdir, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getM06Path, m06ContentItems } from '../src/data/m06-content.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distRoot = join(projectRoot, 'dist');
const failures = [];

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

const vercelConfig = JSON.parse(await readFile(join(projectRoot, 'vercel.json'), 'utf8'));
const globalHeaderRule = vercelConfig.headers?.find(({ source }) => source === '/(.*)');
if (!globalHeaderRule) failures.push('vercel.json is missing the global /(.*) header rule');

const headerMap = new Map(
  (globalHeaderRule?.headers ?? []).map(({ key, value }) => [key.toLowerCase(), value]),
);
const requiredHeaders = new Map([
  ['x-content-type-options', /^nosniff$/],
  ['x-frame-options', /^DENY$/],
  ['referrer-policy', /^strict-origin-when-cross-origin$/],
  ['permissions-policy', /camera=\(\).*microphone=\(\).*geolocation=\(\).*payment=\(\)/],
  ['cross-origin-opener-policy', /^same-origin$/],
  ['cross-origin-resource-policy', /^same-site$/],
]);

for (const [name, expected] of requiredHeaders) {
  const value = headerMap.get(name);
  if (!value || !expected.test(value)) failures.push(`Missing or invalid ${name} header`);
}

const csp = headerMap.get('content-security-policy') ?? '';
const requiredCspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "form-action 'self'",
  "script-src 'self'",
  "script-src-attr 'none'",
  "style-src 'self'",
  "font-src 'self'",
  "img-src 'self' data:",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
];
for (const directive of requiredCspDirectives) {
  if (!csp.includes(directive)) failures.push(`CSP is missing: ${directive}`);
}
if (/'unsafe-(?:inline|eval)'|\*|\bdata:\b(?=.*script-src)/i.test(csp)) {
  failures.push('CSP contains an unsafe script/style relaxation or wildcard');
}
if (!csp.includes("'wasm-unsafe-eval'")) failures.push('CSP must narrowly allow Pagefind WebAssembly compilation');

const analyticsComponent = await readFile(join(projectRoot, 'src/components/observability/WebAnalytics.astro'), 'utf8');
const envExample = await readFile(join(projectRoot, '.env.example'), 'utf8');
if (!analyticsComponent.includes("PUBLIC_ENABLE_VERCEL_ANALYTICS === 'true'")) {
  failures.push('Vercel Web Analytics is not gated by an explicit true flag');
}
if (!analyticsComponent.includes("@vercel/analytics/astro")) {
  failures.push('Vercel Web Analytics does not use the official Astro component');
}
if (!/^PUBLIC_ENABLE_VERCEL_ANALYTICS=false$/m.test(envExample)) {
  failures.push('.env.example must keep Web Analytics disabled by default');
}

const sourceRoots = ['src', 'public'];
const sourceFiles = (await Promise.all(sourceRoots.map((root) => walk(join(projectRoot, root))))).flat();
const scannableExtensions = new Set(['.astro', '.css', '.html', '.js', '.json', '.md', '.mdx', '.mjs', '.ts']);
const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\bgh[pousr]_[A-Za-z0-9]{30,}\b/,
  /\bgithub_pat_[A-Za-z0-9_]{40,}\b/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bAIza[0-9A-Za-z_-]{30,}\b/,
  /\bsk-[A-Za-z0-9_-]{20,}\b/,
];

for (const file of sourceFiles.filter((candidate) => scannableExtensions.has(extname(candidate)))) {
  const source = await readFile(file, 'utf8');
  const rel = relative(projectRoot, file);
  for (const pattern of secretPatterns) {
    if (pattern.test(source)) failures.push(`${rel}: possible committed secret or credential`);
  }
  if (/http:\/\/(?!localhost|127\.0\.0\.1)/i.test(source)) failures.push(`${rel}: insecure external HTTP resource`);
  if (/google-site-verification|search-console-verification/i.test(source)) failures.push(`${rel}: Search Console verification token is not authorized`);
  if (/<iframe\b/i.test(source)) failures.push(`${rel}: iframe requires an explicit M07 security review`);
}

const distFiles = await walk(distRoot);
const htmlFiles = distFiles.filter((file) => file.endsWith('.html'));
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const rel = relative(distRoot, file);

  for (const tag of html.matchAll(/<a\b[^>]*\btarget="_blank"[^>]*>/gi)) {
    const relValue = tag[0].match(/\brel="([^"]+)"/i)?.[1] ?? '';
    if (!relValue.includes('noopener') || !relValue.includes('noreferrer')) {
      failures.push(`${rel}: target=_blank link is missing noopener noreferrer`);
    }
  }

  for (const match of html.matchAll(/<script\b([^>]*)>/gi)) {
    const attributes = match[1];
    if (/type="application\/ld\+json"/i.test(attributes)) continue;
    const scriptSource = attributes.match(/\bsrc="([^"]+)"/i)?.[1];
    if (scriptSource) {
      const scriptUrl = new URL(scriptSource, 'https://hydrorigor.com/');
      if (scriptUrl.origin !== 'https://hydrorigor.com') {
        failures.push(`${rel}: unexpected third-party executable script origin`);
      }
      continue;
    }

    const fullTagStart = match.index;
    const contentStart = fullTagStart + match[0].length;
    const closingTag = html.indexOf('</script>', contentStart);
    const content = closingTag === -1 ? '' : html.slice(contentStart, closingTag);
    const hash = `'sha256-${createHash('sha256').update(content).digest('base64')}'`;
    if (!csp.includes(hash)) failures.push(`${rel}: executable inline script is missing its exact CSP hash ${hash}`);
  }

  if (/_vercel\/insights|vercel-analytics/i.test(html)) {
    failures.push(`${rel}: default build unexpectedly activates Vercel Web Analytics`);
  }
}

let editorialScriptCount = 0;
for (const item of m06ContentItems) {
  const route = getM06Path(item);
  const htmlPath = join(distRoot, route.replace(/^\//, ''), 'index.html');
  const html = await readFile(htmlPath, 'utf8');
  const executableScripts = [...html.matchAll(/<script\b([^>]*)>/gi)]
    .filter((match) => !/type="application\/ld\+json"/i.test(match[1]));
  editorialScriptCount += executableScripts.length;
  if (executableScripts.length > 0) failures.push(`${route}: ordinary M06 editorial page ships client JavaScript`);
}

const searchHtml = await readFile(join(distRoot, 'search/index.html'), 'utf8');
if (!/<script\b[^>]*src="\/scripts\/search\.js"/i.test(searchHtml)) {
  failures.push('/search/: CSP-compatible same-origin search module is missing');
}

if (failures.length > 0) {
  process.stderr.write(`${failures.join('\n')}\n`);
  process.exit(1);
}

process.stdout.write(
  `Security integrity passed: ${requiredHeaders.size + 1} header policies, strict CSP, `
  + `${htmlFiles.length} built HTML files, analytics disabled by default, and ${editorialScriptCount} `
  + `client scripts across ${m06ContentItems.length} ordinary editorial pages.\n`,
);
