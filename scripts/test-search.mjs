import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { requiredPublicRoutes } from '../src/lib/navigation.ts';
import { EMPTY_SECTION_PATHS } from '../src/lib/indexing.ts';
import { getM06Path, m06ContentItems } from '../src/data/m06-content.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distRoot = join(projectRoot, 'dist');
const bundleRoot = join(distRoot, 'pagefind');
const bundlePath = join(bundleRoot, 'pagefind.js');

await access(bundlePath);

const contentTypes = new Map([
  ['.js', 'text/javascript'],
  ['.json', 'application/json'],
  ['.wasm', 'application/wasm'],
]);
const nativeFetch = globalThis.fetch;

globalThis.fetch = async (input, init) => {
  const rawUrl = typeof input === 'string'
    ? input
    : input instanceof URL
      ? input.href
      : input.url;

  if (!rawUrl.startsWith('file:')) return nativeFetch(input, init);

  const fileUrl = new URL(rawUrl);
  fileUrl.search = '';

  try {
    const body = await readFile(fileURLToPath(fileUrl));
    return new Response(body, {
      status: 200,
      headers: { 'content-type': contentTypes.get(extname(fileUrl.pathname)) ?? 'application/octet-stream' },
    });
  } catch {
    return new Response(null, { status: 404 });
  }
};

const normalizePath = (url) => new URL(url, 'https://hydrorigor.com').pathname;
const routeFile = (route) => route === '/'
  ? join(distRoot, 'index.html')
  : join(distRoot, ...route.split('/').filter(Boolean), 'index.html');
const readRoute = (route) => readFile(routeFile(route), 'utf8');
const extractMeta = (html, name) => html.match(
  new RegExp(`<meta name="${name}" content="([^"]+)"`),
)?.[1];
const extractAnchorPaths = (html) => [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)]
  .map(([, href]) => href)
  .filter((href) => href.startsWith('/'))
  .map(normalizePath);
const loadResults = async (instance, query) => {
  const response = await instance.search(query);
  return Promise.all(response.results.map((result) => result.data()));
};

let search;

try {
  const routeDocuments = new Map();
  const titles = new Set();
  const descriptions = new Set();

  const productionRoutes = m06ContentItems.map(getM06Path);
  const routesUnderTest = [...requiredPublicRoutes, ...productionRoutes];

  for (const route of routesUnderTest) {
    const html = await readRoute(route);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = extractMeta(html, 'description');
    const robots = extractMeta(html, 'robots');

    assert.ok(title, `${route} does not have a title`);
    assert.ok(description, `${route} does not have a meta description`);
    assert.match(
      html,
      new RegExp(`<link rel="canonical" href="https://hydrorigor\\.com${route.replaceAll('/', '\\/')}"`),
      `${route} does not self-canonicalize`,
    );
    assert.equal(
      robots,
      route === '/search/' || EMPTY_SECTION_PATHS.has(route) ? 'noindex, nofollow' : 'index, follow',
      `${route} has the wrong robots directive`,
    );

    if (route === '/search/' || EMPTY_SECTION_PATHS.has(route)) {
      assert.doesNotMatch(html, /data-pagefind-body/);
    } else {
      assert.match(html, /data-pagefind-body/);
    }

    assert.ok(!titles.has(title), `${route} reuses the title “${title}”`);
    assert.ok(!descriptions.has(description), `${route} reuses a meta description`);
    titles.add(title);
    descriptions.add(description);
    routeDocuments.set(route, html);
  }

  for (const [route, html] of routeDocuments) {
    for (const linkedPath of extractAnchorPaths(html)) {
      assert.doesNotThrow(
        () => routeFile(linkedPath),
        `${route} contains an invalid internal link: ${linkedPath}`,
      );
      await assert.doesNotReject(
        access(routeFile(linkedPath)),
        `${route} links to missing static output: ${linkedPath}`,
      );
    }
  }

  await assert.rejects(
    access(join(distRoot, 'nutrients', 'index.html')),
    'the retired /nutrients/ landing was generated',
  );
  await assert.rejects(
    access(join(distRoot, 'best', 'best-hydroponic-system-for-home-growers', 'index.html')),
    'the temporary /best/best-hydroponic-system-for-home-growers/ route was generated',
  );

  const sitemap = await readFile(join(distRoot, 'sitemap-0.xml'), 'utf8');
  assert.match(sitemap, /<loc>https:\/\/hydrorigor\.com\/nutrients-water\/<\/loc>/);
  for (const toolPath of [
    '/tools/ph-ec-targets/',
    '/tools/nutrient-mixing-calculator/',
  ]) {
    assert.ok(
      sitemap.includes(`https://hydrorigor.com${toolPath}`),
      `${toolPath} was missing from the sitemap`,
    );
  }
  for (const commercialPath of [
    '/best/',
    '/reviews/',
    '/affiliate-disclosure/',
    '/testing-methodology/',
  ]) {
    assert.ok(
      sitemap.includes(`https://hydrorigor.com${commercialPath}`),
      `${commercialPath} was missing from the sitemap`,
    );
  }
  for (const productionPath of productionRoutes) {
    assert.ok(
      sitemap.includes(`https://hydrorigor.com${productionPath}`),
      `${productionPath} was missing from the sitemap`,
    );
  }
  for (const excludedPath of [
    '/nutrients/',
    '/search/',
    '/404/',
    '/systems/development-sample-system-article/',
    '/reviews/development-sample-review/',
    '/compare/development-sample-comparison/',
    '/best/best-hydroponic-system-for-home-growers/',
    ...EMPTY_SECTION_PATHS,
  ]) {
    assert.ok(
      !sitemap.includes(`https://hydrorigor.com${excludedPath}`),
      `${excludedPath} appeared in the sitemap`,
    );
  }

  const pagefind = await import(pathToFileURL(bundlePath).href);
  search = pagefind.createInstance({
    basePath: `${pathToFileURL(bundleRoot).href}/`,
    baseUrl: '/',
    language: 'en',
    noWorker: true,
  });
  await search.init();

  const publicResults = await loadResults(search, 'first harvest');
  assert.ok(
    publicResults.some(({ url }) => normalizePath(url) === '/start/'),
    'representative Pagefind query did not return the public Start Here page',
  );

  const targetResults = await loadResults(search, 'published reference ranges');
  assert.ok(
    targetResults.some(({ url }) => normalizePath(url) === '/tools/ph-ec-targets/'),
    'Pagefind did not return the public pH/EC target reference',
  );

  const calculatorResults = await loadResults(search, 'manufacturer label dose');
  assert.ok(
    calculatorResults.some(({ url }) => normalizePath(url) === '/tools/nutrient-mixing-calculator/'),
    'Pagefind did not return the public nutrient mixing calculator',
  );

  const reviewLandingResults = await loadResults(search, 'Manufacturer-documentation guides only');
  assert.ok(
    reviewLandingResults.some(({ url }) => normalizePath(url) === '/reviews/'),
    'Pagefind did not return the public review landing',
  );

  const disclosureResults = await loadResults(search, 'no paid links, tracking IDs, live prices');
  assert.ok(
    disclosureResults.some(({ url }) => normalizePath(url) === '/affiliate-disclosure/'),
    'Pagefind did not return the current affiliate disclosure',
  );

  const waveQueries = [
    ['shallow continuous nutrient stream', '/crops/nft-hydroponic-strawberries/'],
    ['root support water and oxygen', '/systems/deep-water-culture-hydroponics/'],
    ['essential macro and micronutrients', '/nutrients-water/hydroponic-nutrients/'],
    ['three-component base nutrient system', '/reviews/general-hydroponics-nutrients/'],
    ['requirements sheet crop space root zone', '/best/hydroponic-systems-for-sale/'],
    ['single best hydroponic system every home', '/best/hydroponic-system-for-home-growers/'],
  ];
  for (const [query, expectedPath] of waveQueries) {
    const results = await loadResults(search, query);
    assert.ok(
      results.some(({ url }) => normalizePath(url) === expectedPath),
      `Pagefind query “${query}” did not return ${expectedPath}`,
    );
  }

  const excludedCases = [
    ['sample fixture reservoir monitor', '/reviews/development-sample-review/'],
    ['sample development system article', '/systems/development-sample-system-article/'],
    ['fixture system alpha beta', '/compare/development-sample-comparison/'],
    ['that channel runs dry', '/404/'],
    ['static site search search terms', '/search/'],
    ['single best hydroponic system every home', '/best/best-hydroponic-system-for-home-growers/'],
  ];

  for (const [query, excludedPath] of excludedCases) {
    const queryResults = await loadResults(search, query);
    assert.ok(
      queryResults.every(({ url }) => normalizePath(url) !== excludedPath),
      `${excludedPath} appeared in Pagefind results`,
    );
  }

  const publicStart = routeDocuments.get('/start/');
  const excludedFixture = await readFile(
    join(distRoot, 'reviews', 'development-sample-review', 'index.html'),
    'utf8',
  );
  const excludedSearch = await readFile(join(distRoot, 'search', 'index.html'), 'utf8');

  assert.match(publicStart, /data-pagefind-body/);
  assert.doesNotMatch(excludedFixture, /data-pagefind-body/);
  assert.doesNotMatch(excludedFixture, /"@type":"Review"/);
  assert.doesNotMatch(excludedFixture, /data-commercial-relationship="affiliate"/);
  assert.doesNotMatch(excludedSearch, /data-pagefind-body/);

  process.stdout.write(
    `HydroRigor search smoke passed: ${routesUnderTest.length} public routes verified, including ${productionRoutes.length} M06 production pages; representative systems, crops, nutrients, buyer research, and manufacturer-documentation queries passed; drafts, 404, and search are excluded.\n`,
  );
} finally {
  if (search) await search.destroy();
  globalThis.fetch = nativeFetch;
}
