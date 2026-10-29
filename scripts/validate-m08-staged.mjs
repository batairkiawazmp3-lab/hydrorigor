// Staged-only adapter; does not deploy, promote, change aliases or control pause.
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, mkdtemp, rm, copyFile } from 'node:fs/promises';
import { execFileSync, spawn } from 'node:child_process';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { evidenceSanitizer } from './m08-evidence-safety.mjs';

const origin = 'https://hydrorigor-es39nn6pj-batairkiawazmp3-9310s-projects.vercel.app';
const sha = '50966ce935cb2b7dbdc1ea3b4630b9feb1e9f50d';
const output = resolve(process.env.DIAGNOSTIC_OUTPUT);
const safety = evidenceSanitizer(process.env.VERCEL_AUTOMATION_BYPASS_SECRET);
const scratch = await mkdtemp(join(tmpdir(), 'm08-stage-validation-'));
await mkdir(output, { recursive: true });
await rm(join(output, 'SAFE_TO_UPLOAD'), { force: true });
const results = { deployment: 'dpl_Frkh5svBZaSvpaqsWpxHSdwBtpy2', sha, origin, stages: [] };
function replaceOnce(text, from, to) {
  assert.equal(text.split(from).length, 2, 'Adapter source anchor mismatch');
  return text.replace(from, to);
}
async function run(name, args) {
  const child = spawn(process.execPath, args, { stdio: ['ignore', 'pipe', 'pipe'] });
  let log = '';
  child.stdout.on('data', data => { log += data; });
  child.stderr.on('data', data => { log += data; });
  const timer = setTimeout(() => child.kill('SIGKILL'), 35 * 60 * 1000);
  const code = await new Promise((res, rej) => { child.on('exit', res); child.on('error', rej); });
  clearTimeout(timer);
  await writeFile(join(scratch, `${name}.log`), log);
  await safety.publish(scratch, output);
  results.stages.push({ name, code });
  console.log(`${name}: ${code === 0 ? 'PASS' : 'FAIL'}`);
  assert.equal(code, 0, `${name} failed; stop validation`);
}
try {
  assert.equal(execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), sha);
  assert.equal(process.version, 'v24.21.0');
  const chromePath = '/opt/m08-diagnostic-cft/chrome';
  const chrome = execFileSync(chromePath, ['--version'], { encoding: 'utf8' }).trim();
  results.chrome = chrome;
  results.chromePath = chromePath;
  results.runner = { node: process.version, image: process.env.ImageOS, imageVersion: process.env.ImageVersion };
  assert.equal(chrome, 'Google Chrome for Testing 156.0.8078.47', 'Unvalidated staged Chrome version');
  // Keep the original canonical origin and all route/content/security assertions.
  let smoke = (await readFile('scripts/test-production.mjs', 'utf8')).replace(/\r\n/g, '\n');
  smoke = replaceOnce(smoke, "let origin = local ? undefined : productionTarget(process.env.PRODUCTION_BASE_URL);", `let origin = ${JSON.stringify(origin)};`);
  smoke = replaceOnce(smoke, 'browser.newContext({ baseURL: origin })', "browser.newContext({ baseURL: origin, extraHTTPHeaders: { 'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET, 'x-vercel-set-bypass-cookie': 'true' } })");
  smoke = replaceOnce(smoke, 'const request = context.request;', `await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());\n  const request = context.request;`);
  // An apex redirect probe would exercise the OLD deployment; exclude that unrelated check.
  smoke = replaceOnce(smoke, 'if (!local) {\n    for (const url', 'if (false) {\n    for (const url');
  smoke = replaceOnce(smoke, 'failures.push(`${label}: ${error.message}`);', 'throw new Error(`${label}: ${error.message}`);');
  smoke = replaceOnce(smoke, "await expect(page.locator('h1')).toHaveCount(1);", `await expect(page.locator('h1')).toHaveCount(1);\n      for (const raw of await page.locator('script[type="application/ld+json"]').allTextContents()) {\n        const structured = JSON.parse(raw);\n        assert.ok(structured && typeof structured === 'object');\n        assert.doesNotMatch(raw, /hydrorigor-es39nn6pj|localhost|127\\.0\\.0\\.1/);\n      }`);
  await writeFile('scripts/.m08-staged-smoke.mjs', smoke);
  await run('smoke', ['scripts/.m08-staged-smoke.mjs']);
  const config = `import {defineConfig,devices} from '@playwright/test';\nexport default defineConfig({testDir:'./tests/e2e',testMatch:'accessibility.spec.mjs',fullyParallel:false,workers:1,retries:0,timeout:30000,expect:{timeout:8000},reporter:'line',use:{...devices['Desktop Chrome'],baseURL:${JSON.stringify(origin)},extraHTTPHeaders:{'x-vercel-protection-bypass':process.env.VERCEL_AUTOMATION_BYPASS_SECRET,'x-vercel-set-bypass-cookie':'true'},trace:'off',screenshot:'off',video:'off'}});`;
  await writeFile('.m08-staged-playwright.mjs', config);
  await run('accessibility', ['node_modules/@playwright/test/cli.js', 'test', '--config=.m08-staged-playwright.mjs']);
  let collector = await readFile(new URL('./collect-m08-production-lighthouse.mjs', import.meta.url), 'utf8');
  collector = replaceOnce(collector, "const origin = 'https://hydrorigor.com';", `const origin = ${JSON.stringify(origin)};`);
  collector = replaceOnce(collector, "const chromePath = execFileSync('which', ['google-chrome'], { encoding: 'utf8' }).trim();", `const chromePath = ${JSON.stringify(chromePath)};`);
  collector = replaceOnce(collector, "const approvedChromeVersions = Object.freeze(['Google Chrome 155.0.8059.39', 'Google Chrome 155.0.8059.84']);", "const approvedChromeVersions = Object.freeze(['Google Chrome for Testing 156.0.8078.47']);");
  await writeFile('scripts/.m08-staged-lighthouse.mjs', collector);
  await copyFile(new URL('./m08-evidence-safety.mjs', import.meta.url), 'scripts/m08-evidence-safety.mjs');
  await run('lighthouse', ['scripts/.m08-staged-lighthouse.mjs']);
} catch (error) {
  results.failure = safety.sanitize(error.message);
  process.exitCode = 1;
} finally {
  await writeFile(join(output, 'staged-validation.json'), safety.sanitize(JSON.stringify(results, null, 2)));
  await rm(scratch, { recursive: true, force: true });
  try { await safety.seal(output); } catch { await rm(join(output, 'SAFE_TO_UPLOAD'), { force: true }); process.exitCode = 1; }
  console.log(JSON.stringify(results));
}
