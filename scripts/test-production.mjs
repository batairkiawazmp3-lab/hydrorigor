import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium, expect } from '@playwright/test';
import { productionTarget } from './production-target.mjs';
import { m06ContentItems, getM06Path } from '../src/data/m06-content.ts';
import { requiredPublicRoutes } from '../src/lib/navigation.ts';
import { fixtureRoutes, representativeRoutes, retiredRoutes } from '../tests/e2e/routes.mjs';

const local = process.argv.includes('--local');
const canonicalOrigin = 'https://hydrorigor.com';
// Reject an absent/unsafe production target before creating a browser/network request.
let origin = local ? undefined : productionTarget(process.env.PRODUCTION_BASE_URL);
let server;
let browser;
const failures = [];
const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
const expectedHeaders = config.headers.find(({ source }) => source === '/(.*)').headers;
const editorial = m06ContentItems.map(getM06Path);
const publicPaths = [...new Set([...requiredPublicRoutes, ...editorial])];
const indexable = publicPaths.filter((path) => path !== '/search/');
const failuresFromBrowser = [];
const normalized = (text) => text.replace(/\s+/g, ' ').trim();

function headersMatch(response, path) {
  const headers = response.headers();
  for (const { key, value } of expectedHeaders) {
    assert.equal(normalized(headers[key.toLowerCase()] ?? ''), normalized(value), `${path}: ${key}`);
  }
  // Owner policy (2026-10-11): observe provider HSTS separately from custom policy.
  // Repository security validation still forbids an unauthorized custom HSTS header.
  if (local) {
    assert.equal(headers['strict-transport-security'], undefined, `${path}: unexpected local HSTS`);
  } else {
    process.stdout.write(`OBSERVED provider HSTS ${path}: ${headers['strict-transport-security'] ?? 'absent'}\n`);
  }
  assert.doesNotMatch(headers['x-robots-tag'] ?? '', /noindex|none/i, `${path}: global X-Robots-Tag`);
}

async function check(label, action) {
  try {
    await action();
    process.stdout.write(`PASS ${label}\n`);
  } catch (error) {
    failures.push(`${label}: ${error.message}`);
    process.stderr.write(`FAIL ${label}: ${error.message}\n`);
  }
}

try {
  if (local) {
    const port = await new Promise((resolve, reject) => {
      const socket = createServer();
      socket.once('error', reject);
      socket.listen(0, '127.0.0.1', () => {
        const selected = socket.address().port;
        socket.close(() => resolve(selected));
      });
    });
    origin = `http://127.0.0.1:${port}`;
    server = spawn(process.execPath, ['scripts/serve-dist.mjs', '--port', String(port)], {
      cwd: new URL('../', import.meta.url), stdio: 'ignore', windowsHide: true,
    });
    let spawnError;
    server.on('error', (error) => { spawnError = error; });
    let ready = false;
    for (let attempt = 0; attempt < 100; attempt += 1) {
      if (spawnError) throw spawnError;
      if (server.exitCode !== null) throw new Error('Local preview exited before readiness.');
      try {
        if ((await fetch(origin, { signal: AbortSignal.timeout(1000) })).ok) { ready = true; break; }
      } catch { /* Wait only for the local preview startup. */ }
      await delay(100);
    }
    assert.ok(ready, 'Local preview startup timeout');
  }
  process.stdout.write(`${local ? 'LOCAL REHEARSAL — NOT PRODUCTION EVIDENCE' : 'PRODUCTION HTTPS VALIDATION'} ${origin}\n`);
  browser = await chromium.launch();
  const context = await browser.newContext({ baseURL: origin });
  context.setDefaultTimeout(10_000);
  const request = context.request;
  const page = await context.newPage();
  page.on('pageerror', (error) => failuresFromBrowser.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') failuresFromBrowser.push(message.text());
  });
  page.on('request', (request) => {
    if (/_vercel\/insights|vercel-insights|vercel-analytics|google-analytics|hotjar|facebook\.com\/tr/i.test(request.url())) {
      failuresFromBrowser.push(`Unauthorized tracker: ${new URL(request.url()).origin}`);
    }
  });

  for (const path of publicPaths) {
    await check(`route ${path}`, async () => {
      const response = await request.get(path, { maxRedirects: 0, timeout: 20_000 });
      assert.equal(response.status(), 200, path);
      headersMatch(response, path);
      await page.goto(path, { waitUntil: 'networkidle', timeout: 30_000 });
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toBeVisible();
      const representative = representativeRoutes.find((route) => route.path === path);
      if (representative) await expect(page.locator('h1')).toHaveText(representative.heading);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonicalOrigin + path);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', canonicalOrigin + path);
      const robots = await page.locator('meta[name="robots"]').getAttribute('content');
      if (path === '/search/') assert.match(robots, /noindex/i);
      else assert.doesNotMatch(robots ?? '', /noindex|none/i);
      if (editorial.includes(path)) {
        const scripts = await page.locator('script').evaluateAll((elements) => elements.filter(
          (element) => element.type !== 'application/ld+json',
        ).length);
        assert.equal(scripts, 0, 'ordinary editorial executable scripts');
      }
    });
  }
  await check('calculator 10 L × 2 mL/L = 20 mL', async () => {
    await page.goto('/tools/nutrient-mixing-calculator/');
    await page.getByLabel('Volume', { exact: true }).fill('10');
    await page.getByLabel('Dose printed on the label').fill('2');
    await page.getByRole('button', { name: 'Scale label dose' }).click();
    await expect(page.getByRole('status')).toContainText('Scaled amount: 20 mL');
  });
  await check('Pagefind search', async () => {
    await page.goto('/search/');
    await page.getByRole('searchbox', { name: 'Search terms' }).fill('hydroponic strawberries');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('#search-results a[href="/crops/hydroponic-strawberries/"]')).toBeVisible();
  });
  await check('no console errors or unauthorized analytics', async () => {
    await page.waitForLoadState('networkidle');
    assert.deepEqual(failuresFromBrowser, []);
  });
  // Expected 404 browser console messages are excluded from the success-route check above.
  for (const path of ['/m08-intentional-missing-page/', ...retiredRoutes]) {
    await check(`honest 404 ${path}`, async () => {
      const response = await request.get(path, { maxRedirects: 0 });
      assert.equal(response.status(), 404);
      headersMatch(response, path);
      await page.goto(path);
      await expect(page.locator('h1')).toHaveText('That channel runs dry.');
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    });
  }
  for (const path of fixtureRoutes) {
    await check(`fixture noindex ${path}`, async () => {
      const response = await page.goto(path);
      assert.equal(response.status(), 200);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    });
  }
  await check('robots and exact canonical sitemap set', async () => {
    const robots = await request.get('/robots.txt', { maxRedirects: 0 });
    assert.equal(robots.status(), 200);
    const text = await robots.text();
    assert.match(text, /^Sitemap: https:\/\/hydrorigor\.com\/sitemap-index\.xml\s*$/m);
    assert.doesNotMatch(text, /^Disallow:\s*\/\s*$/m);
    const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    const sitemap = await request.get('/sitemap-index.xml', { maxRedirects: 0 });
    assert.equal(sitemap.status(), 200);
    const children = locs(await sitemap.text());
    assert.ok(children.length > 0, 'empty sitemap index');
    const urls = [];
    for (const child of children) {
      const url = new URL(child);
      assert.equal(url.origin, canonicalOrigin);
      const response = await request.get(url.pathname, { maxRedirects: 0 });
      assert.equal(response.status(), 200);
      urls.push(...locs(await response.text()));
    }
    assert.deepEqual(urls.sort(), indexable.map((path) => canonicalOrigin + path).sort());
  });
  if (!local) {
    for (const url of ['http://hydrorigor.com/', ...(process.env.PRODUCTION_CHECK_WWW === 'true'
      ? ['https://www.hydrorigor.com/', 'http://www.hydrorigor.com/'] : [])]) {
      await check(`permanent redirect ${url}`, async () => {
        const response = await request.get(url, { maxRedirects: 0 });
        assert.ok([301, 308].includes(response.status()), `status ${response.status()}`);
        assert.equal(new URL(response.headers().location, url).href, `${canonicalOrigin}/`);
      });
    }
  }
  assert.equal(editorial.length, 25);
  if (failures.length) throw new Error(`${failures.length} launch validation checks failed.`);
  process.stdout.write(`PASS ${publicPaths.length} public routes, all 25 M06 pages; field INP NOT MEASURED.\n`);
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
} finally {
  await browser?.close();
  server?.kill();
}
