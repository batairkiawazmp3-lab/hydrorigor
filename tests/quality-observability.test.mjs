import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const lighthouseConfig = (await import('../lighthouserc.cjs')).default;

test('M07 dependencies and quality commands are pinned and reproducible', async () => {
  const packageFile = JSON.parse(await read('package.json'));
  assert.equal(packageFile.dependencies['@vercel/analytics'], '2.0.1');
  assert.equal(packageFile.devDependencies['@playwright/test'], '1.63.0');
  assert.equal(packageFile.devDependencies['@axe-core/playwright'], '4.13.0');
  assert.equal(packageFile.devDependencies['@lhci/cli'], '0.15.1');
  assert.equal(packageFile.devDependencies.typescript, '6.0.3');

  for (const command of [
    'test:links',
    'test:security',
    'audit:prod',
    'test:e2e',
    'test:a11y',
    'test:lighthouse',
  ]) assert.ok(packageFile.scripts[command], `missing ${command}`);
});

test('security header configuration is strict and explicitly scoped', async () => {
  const config = JSON.parse(await read('vercel.json'));
  const rule = config.headers.find(({ source }) => source === '/(.*)');
  assert.ok(rule);
  const headers = new Map(rule.headers.map(({ key, value }) => [key, value]));

  for (const name of [
    'Content-Security-Policy',
    'X-Content-Type-Options',
    'X-Frame-Options',
    'Referrer-Policy',
    'Permissions-Policy',
  ]) assert.ok(headers.has(name), `missing ${name}`);

  const csp = headers.get('Content-Security-Policy');
  assert.match(csp, /script-src 'self'/);
  assert.match(csp, /'sha256-[A-Za-z0-9+/]+=*'/);
  assert.match(csp, /object-src 'none'/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(csp, /'wasm-unsafe-eval'/);
  assert.match(csp, /style-src 'self'; font-src 'self'/);
  assert.doesNotMatch(csp, /fonts\.googleapis|fonts\.gstatic/);
  assert.doesNotMatch(csp, /'unsafe-inline'|'unsafe-eval'|\*/);
  assert.equal(headers.get('X-Frame-Options'), 'DENY');
  assert.equal(headers.get('X-Content-Type-Options'), 'nosniff');
  assert.equal(headers.has('Strict-Transport-Security'), false, 'HSTS is deferred to M08 domain review');
});

test('Vercel Web Analytics is official, pinned, and disabled by default', async () => {
  const component = await read('src/components/observability/WebAnalytics.astro');
  const layout = await read('src/layouts/BaseLayout.astro');
  const example = await read('.env.example');

  assert.match(component, /@vercel\/analytics\/astro/);
  assert.match(component, /PUBLIC_ENABLE_VERCEL_ANALYTICS === 'true'/);
  assert.match(layout, /<WebAnalytics \/>/);
  assert.match(example, /^PUBLIC_ENABLE_VERCEL_ANALYTICS=false$/m);
  assert.doesNotMatch(example, /token|secret|key=/i);
});

test('search application code is served as a CSP-compatible same-origin module', async () => {
  const page = await read('src/pages/search.astro');
  const script = await read('public/scripts/search.js');
  assert.match(page, /<script is:inline type="module" src="\/scripts\/search\.js"><\/script>/);
  assert.doesNotMatch(page, /const pagefindPromise|function runSearch/);
  assert.match(script, /import\('\/pagefind\/pagefind\.js'\)/);
});

test('Lighthouse CI uses repeated explicit mobile runs and hard budgets', () => {
  const config = lighthouseConfig;
  assert.equal(config.ci.collect.numberOfRuns, 3);
  assert.equal(config.ci.collect.settings.formFactor, 'mobile');
  assert.equal(config.ci.collect.settings.throttlingMethod, 'simulate');
  assert.equal(config.ci.collect.settings.throttling, undefined);
  assert.equal(config.ci.collect.settings.screenEmulation, undefined);
  for (const matrix of config.ci.assert.assertMatrix) assert.equal(matrix.aggregationMethod, 'median');
  assert.equal(config.ci.collect.url.length, 12);
  for (const required of [
    '/',
    '/start/',
    '/systems/',
    '/systems/indoor-hydroponic-systems-for-home/',
    '/nutrients-water/hydroponic-nutrients/',
    '/best/hydroponic-system-for-home-growers/',
    '/crops/hydroponic-strawberries/',
    '/reviews/masterblend-hydroponic-nutrients/',
    '/tools/ph-ec-targets/',
    '/tools/nutrient-mixing-calculator/',
    '/search/',
    '/testing-methodology/',
  ]) assert.ok(config.ci.collect.url.some((url) => url.endsWith(required)), `missing Lighthouse route ${required}`);

  const source = lighthouseConfig;
  const assertions = source.ci.assert.assertMatrix[0].assertions;
  assert.deepEqual(assertions['categories:performance'], ['error', { minScore: 0.95 }]);
  assert.deepEqual(assertions['categories:accessibility'], ['error', { minScore: 1 }]);
  assert.deepEqual(assertions['largest-contentful-paint'], ['error', { maxNumericValue: 2500 }]);
  assert.deepEqual(assertions['cumulative-layout-shift'], ['error', { maxNumericValue: 0.1 }]);
  assert.deepEqual(assertions['total-blocking-time'], ['error', { maxNumericValue: 200 }]);
  assert.deepEqual(source.ci.assert.assertMatrix[1].assertions['categories:seo'], ['error', { minScore: 1 }]);
});

test('Playwright and axe cover the required routes and critical interactions', async () => {
  const config = await read('playwright.config.mjs');
  const smoke = await read('tests/e2e/smoke.spec.mjs');
  const accessibility = await read('tests/e2e/accessibility.spec.mjs');
  const routes = await read('tests/e2e/routes.mjs');

  assert.match(config, /Desktop Chrome/);
  assert.match(config, /npm run preview/);
  assert.equal((JSON.parse(await read('package.json'))).scripts.preview, 'node scripts/serve-dist.mjs');
  assert.match(smoke, /mobile navigation/);
  assert.match(smoke, /nutrient calculator/);
  assert.match(smoke, /static search/);
  assert.match(smoke, /retiredRoutes/);
  assert.match(accessibility, /AxeBuilder/);
  assert.match(accessibility, /wcag2a/);
  assert.match(accessibility, /skip link and visible focus/);
  assert.match(routes, /hydroponic-strawberries/);
  assert.match(routes, /masterblend-hydroponic-nutrients/);
});

test('generated browser and Lighthouse reports remain ignored', async () => {
  const ignore = await read('.gitignore');
  for (const artifact of ['playwright-report/', 'test-results/', '.lighthouseci/', 'dist/', '.astro/']) {
    assert.ok(ignore.includes(artifact), `missing ignore rule for ${artifact}`);
  }
});

test('CI preserves M01–M06 gates and adds all M07 validators', async () => {
  const workflow = await read('.github/workflows/ci.yml');
  for (const command of [
    'npm ci',
    'npm run lint',
    'npm run check',
    'npm test',
    'npm run test:data',
    'npm run test:commerce',
    'npm run test:content',
    'npm run build',
    'npm run test:search',
    'npm run test:links',
    'npm run test:security',
    'npm run audit:prod',
    'npm run test:e2e',
    'npm run test:a11y',
    'npm run test:lighthouse',
  ]) assert.ok(workflow.includes(command), `CI missing ${command}`);
  assert.match(workflow, /playwright install --with-deps chromium/);
});
