// Owner-approved M08 production collection: missing slots only; no deployment APIs.
import { spawn, execFileSync } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { mkdir, mkdtemp, readFile, writeFile, copyFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { createServer } from 'node:net';
import { freemem, totalmem, cpus, release } from 'node:os';
import { setTimeout as delay } from 'node:timers/promises';

const sourceSha = '141e3716aabef104adc5319215e0ddc607512162';
const root = process.cwd();
const require = createRequire(join(root, 'package.json'));
const config = require('./lighthouserc.cjs');
const lhPackage = require('lighthouse/package.json');
if (process.platform !== 'linux') throw new Error('Linux-only diagnostic');
if (execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim() !== sourceSha) throw new Error('Release SHA mismatch');
if (lhPackage.version !== '12.6.1') throw new Error('Lighthouse version mismatch');
if (process.env.PUBLIC_ENABLE_VERCEL_ANALYTICS !== 'false') throw new Error('Analytics must be false');
const output = resolve(process.env.DIAGNOSTIC_OUTPUT || 'diagnostic-output');
await mkdir(output, { recursive: true });
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
if (environment.chromeVersion !== 'Google Chrome 155.0.8059.39') throw new Error('Chrome differs from validated Linux pairing');
await copyFile(join(root, 'lighthouserc.cjs'), join(output, 'lighthouserc.cjs'));
// Wait for the separately controlled owner-approved access window.
// No provider credentials or mutation capabilities are available to this job.
console.log('READY_FOR_CONTROLLED_WINDOW');
let accessible = false;
for (let i = 0; i < 120; i++) {
 try { const r = await fetch(origin + '/', {signal: AbortSignal.timeout(5000)}); if (r.status === 200) { accessible = true; break; } } catch {}
 await delay(5000);
}
if (!accessible) throw new Error('Production window not opened within ten minutes');
const records = [];
try {
  const routes = config.ci.collect.url.map(url => new URL(url).pathname);
  for (const [index, route] of routes.entries()) for (let round = ([3,3,1][index] ?? 0) + 1; round <= 3; round++) for (let attempt = 1; attempt <= 2; attempt++) {
    const folder = join(output, `round-${round}-route-${index}-attempt-${attempt}`);
    await mkdir(folder);
    // Profiles stay outside uploaded evidence; raw logs/traces remain inside.
    const profile = await mkdtemp('/tmp/hydrorigor-m08-chrome-');
    const debugPort = await port();
    const beforeCpu = cpuSnapshot();
    const record = { round, attempt, routeIndex: index, route, url: origin + route, start: new Date().toISOString(), profile, debugPort, memoryBefore: freemem() };
    const chrome = spawn(chromePath, [...flags, `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`, 'about:blank']);
    record.chromePid = chrome.pid;
    const chromeLog = createWriteStream(join(folder, 'chrome.log'));
    chrome.stdout.pipe(chromeLog); chrome.stderr.pipe(chromeLog);
    let collector;
    try {
      await ready(`http://127.0.0.1:${debugPort}/json/version`);
      record.chromeReady = new Date().toISOString();
      // Only real CLI settings, never serialize nullable LHR output metadata.
      const cliFlags = { ...config.ci.collect.settings, port: debugPort, output: ['json'], outputPath: join(folder, 'lhr.json'), saveAssets: true, chromeFlags: '--headless=new' };
      await writeFile(join(folder, 'flags.json'), JSON.stringify(cliFlags, null, 2));
      collector = spawn(process.execPath, [require.resolve('lighthouse/cli/index.js'), record.url, '--cli-flags-path', join(folder, 'flags.json')], { cwd: root });
      const log = createWriteStream(join(folder, 'lighthouse.log'));
      collector.stdout.pipe(log); collector.stderr.pipe(log);
      const timer = setTimeout(() => { record.watchdog = true; collector.kill('SIGKILL'); }, 180000);
      try { record.collectorExit = await exited(collector); } finally { clearTimeout(timer); }
      record.chromeAliveAtCollectorExit = chrome.exitCode === null && chrome.signalCode === null;
      const lhr = JSON.parse(await readFile(join(folder, 'lhr.json'), 'utf8'));
      const trace = JSON.parse(await readFile(join(folder, 'lhr-0.trace.json'), 'utf8'));
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
    } catch (e) { record.valid = false; record.error = e.message; }
    finally {
      await stop(collector); await stop(chrome);
      record.memoryAfter = freemem();
      const afterCpu = cpuSnapshot();
      record.hostCpuBusyPercent = 100 * (1 - (afterCpu.idle - beforeCpu.idle) / (afterCpu.total - beforeCpu.total));
      record.end = new Date().toISOString();
      records.push(record);
      await writeFile(join(folder, 'attempt.json'), JSON.stringify(record, null, 2));
      await writeFile(join(output, 'attempts.json'), JSON.stringify(records, null, 2));
      console.log(JSON.stringify(record));
    }
    if (record.valid) break; // Never retry a valid budget miss.
    if (attempt === 2) throw new Error('Collector failed twice for ' + route + ' capture ' + round);
  }
} finally {
 await writeFile(join(output, 'summary.json'), JSON.stringify({attempts:records.length,valid:records.filter(r=>r.valid).length,invalid:records.filter(r=>!r.valid).length,noNavStart:records.filter(r=>r.runtimeError?.code==='NO_NAVSTART').length},null,2));
}
const summary = { attempts: records.length, valid: records.filter(r => r.valid).length, noNavStart: records.filter(r => r.runtimeError?.code === 'NO_NAVSTART').length, invalid: records.filter(r => !r.valid).length };
await writeFile(join(output, 'summary.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary));
// Diagnostic collection verdict only; scores are preserved, not accepted here.
process.exitCode = summary.valid === 29 ? 0 : 1;
