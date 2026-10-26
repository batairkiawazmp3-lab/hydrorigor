// Owner-controlled M08 production window: 36 fresh Linux reports, no retries.
import { spawn, execFileSync } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { rm, mkdir, mkdtemp, readFile, writeFile, copyFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { createServer } from 'node:net';
import { freemem, totalmem, cpus, release } from 'node:os';
import { setTimeout as delay } from 'node:timers/promises';

import { evidenceSanitizer } from './m08-evidence-safety.mjs';

const secret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
const output = resolve(process.env.DIAGNOSTIC_OUTPUT || 'diagnostic-output');
await mkdir(output, { recursive: true });
await rm(join(output, 'SAFE_TO_UPLOAD'), {force:true});
const safety = evidenceSanitizer(secret);
let safetyFailed = false;
const childEnv = { ...process.env };
delete childEnv.VERCEL_AUTOMATION_BYPASS_SECRET;
async function collect() {
const sourceSha = '50966ce935cb2b7dbdc1ea3b4630b9feb1e9f50d';
const root = process.cwd();
const require = createRequire(join(root, 'package.json'));
const config = require('./lighthouserc.cjs');
const lhPackage = require('lighthouse/package.json');
if (process.platform !== 'linux') throw new Error('Linux-only diagnostic');
if (execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim() !== sourceSha) throw new Error('Release SHA mismatch');
if (lhPackage.version !== '12.6.1') throw new Error('Lighthouse version mismatch');
if (process.env.PUBLIC_ENABLE_VERCEL_ANALYTICS !== 'false') throw new Error('Analytics must be false');
const lhRequire = createRequire(require.resolve('lighthouse'));
const { Launcher } = await import(pathToFileURL(lhRequire.resolve('chrome-launcher')));
const chromePath = execFileSync('which', ['google-chrome'], { encoding: 'utf8' }).trim();
const flags = [...Launcher.defaultFlags(), '--headless=new', '--disable-gpu', '--no-first-run'];
const cpuSnapshot = () => cpus().reduce((a, c) => ({ idle: a.idle + c.times.idle, total: a.total + Object.values(c.times).reduce((s, n) => s + n, 0) }), { idle: 0, total: 0 });
const exited = (p) => new Promise((res, rej) => { p.once('exit', (code, signal) => res({ code, signal })); p.once('error', rej); });
async function stop(p) {
  if (!p || p.exitCode !== null || p.signalCode !== null) return;
  const done = exited(p);
  p.kill('SIGTERM');
  await Promise.race([done, delay(3000)]);
  if (p.exitCode === null && p.signalCode === null) { p.kill('SIGKILL'); await done; }
}
async function port() {
  return new Promise((res, rej) => { const s = createServer(); s.once('error', rej); s.listen(0, '127.0.0.1', () => { const n = s.address().port; s.close(() => res(n)); }); });
}
async function ready(url) {
  for (let i = 0; i < 50; i++) {
    try { const r = await fetch(url, { signal: AbortSignal.timeout(1000) }); if (r.ok) return; } catch { /* bounded startup polling */ }
    await delay(200);
  }
  throw new Error(`Readiness failed: ${url}`);
}
const origin = 'https://hydrorigor.com';
if (process.env.M08_PRODUCTION_COLLECTION !== sourceSha) throw new Error('Explicit production collection guard missing');
const environment = {
  sourceSha, diagnosticSha: process.env.GITHUB_SHA, runId: process.env.GITHUB_RUN_ID,
  image: process.env.ImageOS, imageVersion: process.env.ImageVersion,
  os: await readFile('/etc/os-release', 'utf8'), kernel: release(), node: process.version,
  lighthouse: lhPackage.version, lhci: require('@lhci/cli/package.json').version,
  chromePath, chromeVersion: execFileSync(chromePath, ['--version'], { encoding: 'utf8' }).trim(),
  cpu: cpus().map(c => c.model), totalMemory: totalmem(), flags,
  settings: config.ci.collect.settings, assertions: config.ci.assert,
};
await writeFile(join(output, 'environment.json'), JSON.stringify(environment, null, 2));
const approvedChromeVersions = Object.freeze(['Google Chrome 155.0.8059.39', 'Google Chrome 155.0.8059.84']);
if (!approvedChromeVersions.includes(environment.chromeVersion)) throw new Error('Chrome differs from validated Linux pairing');
await copyFile(join(root, 'lighthouserc.cjs'), join(output, 'lighthouserc.cjs'));
// Owner must unpause before triggering. One preflight request; never wait for unpause.
const preflight = { checkedAt: new Date().toISOString(), url: origin + '/', bypassConfigured: true };
try {
  const response = await fetch(origin + '/', { headers: {'x-vercel-protection-bypass':secret,'x-vercel-set-bypass-cookie':'true'}, redirect: 'manual', signal: AbortSignal.timeout(15000) });
  preflight.status = response.status;
  await response.body?.cancel();
} catch (error) { preflight.error = error.message; }
await writeFile(join(output, 'preflight.json'), JSON.stringify(preflight, null, 2));
if (preflight.status !== 200) throw new Error('Production preflight is not HTTP 200; zero captures started');
const records = [];
const lhrs = [];
const routes = config.ci.collect.url.map(url => new URL(url).pathname);
if (routes.length !== 12 || new Set(routes).size !== 12 || config.ci.collect.numberOfRuns !== 3) throw new Error('Authoritative matrix mismatch');
await writeFile(join(output, 'manifest.json'), JSON.stringify({sourceSha, origin, expectedCaptures:36, historicalReportsIncluded:false, routes:routes.map(route=>({route,captures:[1,2,3]})), retryPolicy:'none; stop at first invalid capture'},null,2));
try {
  for (const [index, route] of routes.entries()) for (let round = 1; round <= 3; round++) {
    const folder = join(output, `round-${round}-route-${index}`);
    await mkdir(folder);
    // Raw outputs, credentials and browser profiles never enter uploaded evidence.
    const scratch = await mkdtemp('/tmp/hydrorigor-m08-raw-');
    const headersPath = join(scratch, 'headers.json');
    await writeFile(headersPath, JSON.stringify({'x-vercel-protection-bypass':secret,'x-vercel-set-bypass-cookie':'true'}), {mode:0o600});
    const profile = await mkdtemp('/tmp/hydrorigor-m08-chrome-');
    const debugPort = await port();
    const beforeCpu = cpuSnapshot();
    const record = { round, routeIndex: index, route, url: origin + route, start: new Date().toISOString(), profile, debugPort, memoryBefore: freemem() };
    const chrome = spawn(chromePath, [...flags, `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`, 'about:blank'], {env:childEnv});
    record.chromePid = chrome.pid;
    const chromeLog = createWriteStream(join(scratch, 'chrome.log'));
    chrome.stdout.pipe(chromeLog); chrome.stderr.pipe(chromeLog);
    let collector;
    let log;
    try {
      await ready(`http://127.0.0.1:${debugPort}/json/version`);
      record.chromeReady = new Date().toISOString();
      // Only real CLI settings, never serialize nullable LHR output metadata.
      const cliFlags = { ...config.ci.collect.settings, port: debugPort, output: ['json'], outputPath: join(scratch, 'lhr.json'), saveAssets: true, chromeFlags: '--headless=new' };
      await writeFile(join(folder, 'flags.json'), JSON.stringify(cliFlags, null, 2));
      collector = spawn(process.execPath, [require.resolve('lighthouse/cli/index.js'), record.url, '--cli-flags-path', join(folder, 'flags.json'), '--extra-headers=' + headersPath], { cwd: root, env:childEnv });
      log = createWriteStream(join(scratch, 'lighthouse.log'));
      collector.stdout.pipe(log); collector.stderr.pipe(log);
      const timer = setTimeout(() => { record.watchdog = true; collector.kill('SIGKILL'); }, 180000);
      try { record.collectorExit = await exited(collector); } finally { clearTimeout(timer); }
      record.chromeAliveAtCollectorExit = chrome.exitCode === null && chrome.signalCode === null;
      const lhr = JSON.parse(await readFile(join(scratch, 'lhr.json'), 'utf8'));
      const trace = JSON.parse(await readFile(join(scratch, 'lhr-0.trace.json'), 'utf8'));
      const metrics = lhr.audits.metrics?.details?.items?.[0] || {};
      record.runtimeError = lhr.runtimeError || null;
      record.performance = lhr.categories.performance?.score;
      record.accessibility = lhr.categories.accessibility?.score;
      record.seo = lhr.categories.seo?.score;
      record.lcp = lhr.audits['largest-contentful-paint'].numericValue;
      record.cls = lhr.audits['cumulative-layout-shift'].numericValue;
      record.tbt = lhr.audits['total-blocking-time'].numericValue;
      record.observedFCP = metrics.observedFirstContentfulPaint;
      record.observedLCP = metrics.observedLargestContentfulPaint;
      record.observedLoad = metrics.observedLoad;
      record.navigationStartCount = trace.traceEvents.filter(e => e.name === 'navigationStart').length;
      record.valid = !record.runtimeError && record.collectorExit.code === 0 && lhr.requestedUrl === record.url && lhr.finalUrl === record.url && record.navigationStartCount > 0 && Number.isFinite(metrics.observedNavigationStartTs) && ['performance', 'accessibility', 'seo', 'lcp', 'cls', 'tbt'].every(k => Number.isFinite(record[k]));
      if (record.valid) lhrs.push(lhr);
    } catch (e) { record.valid = false; record.error = e.message; }
    finally {
      await stop(collector); await stop(chrome);
      await Promise.all([chromeLog, log].filter(Boolean).map(stream => new Promise(resolve => stream.end(resolve))));
      try { await safety.publish(scratch, folder); } catch { safetyFailed = true; throw new Error('Evidence sanitization failed'); } finally { await rm(scratch, {recursive:true,force:true}); await rm(profile, {recursive:true,force:true}); }
      record.memoryAfter = freemem();
      const afterCpu = cpuSnapshot();
      record.hostCpuBusyPercent = 100 * (1 - (afterCpu.idle - beforeCpu.idle) / (afterCpu.total - beforeCpu.total));
      record.end = new Date().toISOString();
      records.push(record);
      await writeFile(join(folder, 'attempt.json'), safety.sanitize(JSON.stringify(record, null, 2)));
      await writeFile(join(output, 'attempts.json'), safety.sanitize(JSON.stringify(records, null, 2)));
      console.log(safety.sanitize(JSON.stringify(record)));
    }
    if (!record.valid) throw new Error('Invalid collector capture; authoritative run stopped: ' + route + ' capture ' + round);
    // Pace only completed valid captures; no initial/final wait and no retries.
    if (records.length < 36) await delay(35000);
  }
} finally {
 await writeFile(join(output, 'summary.json'), JSON.stringify({attempts:records.length,valid:records.filter(r=>r.valid).length,invalid:records.filter(r=>!r.valid).length,noNavStart:records.filter(r=>r.runtimeError?.code==='NO_NAVSTART').length},null,2));
}
const summary = { attempts: records.length, valid: records.filter(r => r.valid).length, noNavStart: records.filter(r => r.runtimeError?.code === 'NO_NAVSTART').length, invalid: records.filter(r => !r.valid).length };
await writeFile(join(output, 'summary.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary));
if (summary.attempts !== 36 || summary.valid !== 36 || lhrs.length !== 36) throw new Error('Incomplete homogeneous production matrix');
// Use the pinned LHCI assertion implementation and exact repository configuration.
const { getAllAssertionResults } = require('@lhci/utils/src/assertions.js');
const assertions = getAllAssertionResults({ ...config.ci.assert, includePassedAssertions: true }, lhrs);
await writeFile(join(output, 'assertion-results.json'), JSON.stringify(assertions, null, 2));
const failed = assertions.filter(result => !result.passed && result.level === 'error');
await writeFile(join(output, 'budget-summary.json'), JSON.stringify({ reports:36, routes:12, failed:failed.length, passed:failed.length===0, assertions:config.ci.assert }, null, 2));
console.log(safety.sanitize(JSON.stringify({budgetFailures:failed})));
process.exitCode = failed.length ? 1 : 0;

}
try { await collect(); } catch { process.exitCode = 1; console.error('Production collection failed; inspect sanitized evidence if available.'); }
try { if (safetyFailed) throw new Error('Unsafe evidence'); await safety.seal(output); } catch { await rm(join(output,'SAFE_TO_UPLOAD'),{force:true}); process.exitCode = 1; console.error('Evidence safety validation failed; artifact upload prohibited.'); }
