import { access, mkdir, mkdtemp, readdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { chromium } from '@playwright/test';

// Resolve the launcher's public defaults from the pinned Lighthouse dependency.
// A manually managed Windows profile must still use the normal audit flags.
const lighthouseRequire = createRequire(import.meta.resolve('lighthouse'));
const { Launcher } = await import(pathToFileURL(lighthouseRequire.resolve('chrome-launcher')).href);

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const configPath = resolve(projectRoot, process.argv.slice(2).find((arg) => arg !== '--startup-only') ?? 'lighthouserc.cjs');
const reportsDirectory = fileURLToPath(new URL('../.lighthouseci/', import.meta.url));
const systemChromeCandidates =
  process.platform === 'win32'
    ? [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      ]
    : ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium'];
const executablePath =
  process.env.CHROME_PATH ??
  systemChromeCandidates.find((candidate) => existsSync(candidate)) ??
  chromium.executablePath();
const cliPath = fileURLToPath(new URL('../node_modules/@lhci/cli/src/cli.js', import.meta.url));

try {
  await access(executablePath);
} catch {
  process.stderr.write('Chromium is not installed. Run: npx playwright install chromium\n');
  process.exit(1);
}

function getOpenPort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.unref();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : 0;
      server.close(() => resolve(port));
    });
  });
}

async function waitForChrome(port, child) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (child.exitCode !== null || child.signalCode !== null || spawnError) {
      throw new Error(`Chrome exited before readiness: code=${child.exitCode}, signal=${child.signalCode}, error=${spawnError ?? 'none'}`);
    }
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`, { signal: AbortSignal.timeout(1000) });
      if (response.ok) return await response.json();
    } catch {
      // Chrome has not opened its debugging endpoint yet.
    }
    await delay(200);
  }
  throw new Error(`Chrome debugging endpoint did not open on port ${port}.`);
}

function waitForExit(child) {
  if (child.exitCode !== null || child.signalCode !== null) return Promise.resolve(child.exitCode ?? 1);
  return new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('exit', (code) => resolve(code ?? 1));
  });
}

async function waitForFreshReportCount(expectedCount, shouldStop) {
  let observedReset = false;

  while (!shouldStop()) {
    let reportCount = 0;
    try {
      const entries = await readdir(reportsDirectory);
      reportCount = entries.filter(
        (entry) => entry.startsWith('lhr-') && entry.endsWith('.json'),
      ).length;
    } catch {
      observedReset = true;
    }

    if (reportCount < expectedCount) observedReset = true;
    if (observedReset && reportCount >= expectedCount) return true;
    await delay(250);
  }

  return false;
}

async function stopChrome(child) {
  if (!child.pid || child.exitCode !== null || child.signalCode !== null) return;

  if (process.platform === 'win32') {
    const taskkill = spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], {
      stdio: 'ignore',
    });
    await waitForExit(taskkill);
    return;
  }

  child.kill('SIGTERM');
  await Promise.race([waitForExit(child), delay(5_000)]);
  if (child.exitCode === null && child.signalCode === null) {
    const killed = waitForExit(child);
    child.kill('SIGKILL');
    await killed;
  }
}

const chromePort = await getOpenPort();
const chromeProfile = await mkdtemp(join(tmpdir(), 'hydrorigor-lighthouse-'));
const chromeArgs = [
  ...Launcher.defaultFlags(),
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  `--remote-debugging-port=${chromePort}`,
  `--user-data-dir=${chromeProfile}`,
  'about:blank',
];
const diagnosticsDirectory = join(projectRoot, '.agent/tmp/lighthouse-startup');
await mkdir(diagnosticsDirectory, { recursive: true });
const inspect = (command, args) => {
  const result = spawnSync(command, args, { encoding: 'utf8', timeout: 3000, windowsHide: true });
  return { status: result.status, stdout: result.stdout ?? '', stderr: result.stderr ?? '', error: result.error?.message };
};
const diagnostics = {
  startedAt: new Date().toISOString(), platform: process.platform, node: process.version,
  executablePath, args: chromeArgs, port: chromePort, profile: chromeProfile,
  image: process.env.ImageOS, imageVersion: process.env.ImageVersion,
  version: process.platform === 'linux' ? inspect(executablePath, ['--version']) : undefined,
  processesBefore: process.platform === 'linux' ? inspect('pgrep', ['-a', 'chrome|chromium']) : undefined,
};
let chromeStdout = '';
let chromeStderr = '';
let spawnError;
const chrome = spawn(executablePath, chromeArgs, { stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
chrome.on('error', (error) => { spawnError = error.message; });
chrome.stdout.on('data', (chunk) => { chromeStdout += chunk.toString(); });
chrome.stderr.on('data', (chunk) => { chromeStderr += chunk.toString(); });
chrome.on('exit', (code, signal) => { diagnostics.exit = { code, signal, at: new Date().toISOString() }; });
diagnostics.pid = chrome.pid;

try {
  diagnostics.endpoint = await waitForChrome(chromePort, chrome);
  diagnostics.readyAt = new Date().toISOString();
  if (process.argv.includes('--startup-only')) {
    process.stdout.write(`Chrome startup probe passed: ${diagnostics.endpoint.Browser} on port ${chromePort}\n`);
  } else {
    const { default: lighthouseConfig } = await import(pathToFileURL(configPath).href);
    const expectedReportCount =
      lighthouseConfig.ci.collect.url.length * lighthouseConfig.ci.collect.numberOfRuns;
    const child = spawn(
      process.execPath,
      [cliPath, 'autorun', `--config=${configPath}`],
      {
        cwd: projectRoot,
        env: {
          ...process.env,
          CHROME_PATH: executablePath,
          LIGHTHOUSE_CHROME_PORT: String(chromePort),
        },
        stdio: 'inherit',
      },
    );

    let stopWatching = false;
    const childExit = waitForExit(child);
    const firstCompletion = await Promise.race([
      childExit.then((code) => ({ type: 'exit', code })),
      waitForFreshReportCount(expectedReportCount, () => stopWatching).then(() => ({
        type: 'reports',
      })),
    ]);
    stopWatching = true;

    if (firstCompletion.type === 'reports') {
      await delay(1_000);
      await stopChrome(chrome);
      process.exitCode = await childExit;
    } else {
      process.exitCode = firstCompletion.code;
    }
  }
} catch (error) {
  diagnostics.failure = error.message;
  diagnostics.portState = process.platform === 'linux' ? inspect('ss', ['-ltnp', `sport = :${chromePort}`]) : undefined;
  process.stderr.write(`Chrome startup diagnostics: ${JSON.stringify(diagnostics)}\n${chromeStderr}\n`);
  process.stderr.write(`Unable to run Lighthouse CI: ${error.message}\n`);
  process.exitCode = 1;
} finally {
  await stopChrome(chrome);
  diagnostics.finishedAt = new Date().toISOString();
  diagnostics.spawnError = spawnError;
  await writeFile(join(diagnosticsDirectory, 'environment.json'), JSON.stringify(diagnostics, null, 2));
  await writeFile(join(diagnosticsDirectory, 'chrome.stderr.log'), chromeStderr);
  await writeFile(join(diagnosticsDirectory, 'chrome.stdout.log'), chromeStdout);
  await rm(chromeProfile, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
}
