import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { primaryNavigation, requiredPublicRoutes, trustNavigation } from '../src/lib/navigation.ts';
import { shouldIncludeInSitemap } from '../src/lib/indexing.ts';
import { getPublicSectionPath, sectionDefinitions } from '../src/lib/sections.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

const approvedRoutes = [
  '/',
  '/start/',
  '/systems/',
  '/crops/',
  '/nutrients-water/',
  '/equipment/',
  '/best/',
  '/reviews/',
  '/compare/',
  '/problems/',
  '/tools/',
  '/about/',
  '/testing-methodology/',
  '/editorial-policy/',
  '/affiliate-disclosure/',
  '/contact/',
  '/search/',
];

test('centralized navigation contains the approved public architecture', () => {
  assert.deepEqual([...new Set(requiredPublicRoutes)], approvedRoutes);
  assert.equal(primaryNavigation.length, 11);
  assert.equal(trustNavigation.length, 5);
  assert.ok(primaryNavigation.every(({ href }) => href.startsWith('/') && !href.includes('#')));
  assert.ok(trustNavigation.every(({ href }) => href.startsWith('/') && !href.includes('#')));
});

test('primary discovery stays keyboard and mobile accessible without hydration', async () => {
  const header = await read('src/components/SiteHeader.astro');
  const navTag = header.match(/<nav[^>]*aria-label="Primary navigation"[^>]*class="([^"]+)"/);

  assert.ok(navTag, 'primary navigation is missing');
  const classes = navTag[1].split(/\s+/);
  assert.ok(classes.includes('flex'));
  assert.ok(classes.includes('w-full'));
  assert.ok(classes.includes('flex-wrap'));
  assert.ok(!classes.includes('hidden'));
  assert.match(header, /<details/);
  assert.match(header, /<summary class="hr-focus/);
  assert.match(header, /sectionNavigation\.map/);
  assert.doesNotMatch(header, /<script|client:(load|idle|visible|media|only)/);
});

test('Start Here exposes all intended beginner decision paths', async () => {
  const start = await read('src/pages/start.astro');

  for (const path of ['/systems/', '/crops/', '/nutrients-water/', '/equipment/', '/problems/']) {
    assert.ok(start.includes(path) || start.includes(`getPublicSectionPath`), `Start Here is missing ${path}`);
  }
  for (const phrase of [
    'I am new to hydroponics',
    'I need to choose a system',
    'I need to choose a crop',
    'I need to understand nutrients or water',
    'I need to choose equipment',
    'Something is going wrong',
  ]) assert.match(start, new RegExp(phrase));
  assert.doesNotMatch(start, /calculator result|calculate now/i);
});

test('all required section and trust route sources exist', async () => {
  assert.deepEqual(
    sectionDefinitions.map(({ slug }) => `/${slug}/`),
    approvedRoutes.slice(2, 11),
  );

  for (const file of [
    'src/pages/start.astro',
    'src/pages/about.astro',
    'src/pages/testing-methodology.astro',
    'src/pages/editorial-policy.astro',
    'src/pages/affiliate-disclosure.astro',
    'src/pages/contact.astro',
    'src/pages/search.astro',
  ]) await access(new URL(file, root));
});

test('nutrients and water has one canonical public landing', async () => {
  const dynamicLanding = await read('src/pages/[section]/index.astro');
  const articleRoute = await read('src/pages/[category]/[slug].astro');
  const articleLayout = await read('src/layouts/content/ArticleLayout.astro');

  assert.equal(getPublicSectionPath('nutrients'), '/nutrients-water/');
  assert.ok(!sectionDefinitions.some(({ slug }) => slug === 'nutrients'));
  assert.match(dynamicLanding, /params: \{ section: section\.slug \}/);
  assert.match(articleRoute, /getSectionDefinition\(entry\.data\.category\)\.slug/);
  assert.match(articleLayout, /`\/\$\{section\.slug\}\/\$\{data\.route\}\/`/);
  assert.equal(shouldIncludeInSitemap('/nutrients/'), false);
  assert.equal(shouldIncludeInSitemap('/nutrients-water/'), true);
});

test('homepage links resolve to approved M03 routes', async () => {
  const homepage = await read('src/pages/index.astro');
  const hrefs = [...homepage.matchAll(/href=(?:"([^"]+)"|\{`([^`]+)`\})/g)]
    .map((match) => match[1] ?? match[2])
    .filter(Boolean);

  assert.match(homepage, /Grow indoors with evidence, not guesswork\./);
  assert.ok(hrefs.length >= 7);
  for (const href of hrefs.filter((href) => href.startsWith('/') && !href.includes('${'))) {
    assert.ok(approvedRoutes.includes(href), `homepage link is outside M03 architecture: ${href}`);
  }
  assert.match(homepage, /section\.slug/);
});

test('trust pages state current evidence and service boundaries honestly', async () => {
  const about = await read('src/pages/about.astro');
  const methodology = await read('src/pages/testing-methodology.astro');
  const policy = await read('src/pages/editorial-policy.astro');
  const disclosure = await read('src/pages/affiliate-disclosure.astro');
  const contact = await read('src/pages/contact.astro');

  assert.match(about, /does not rely on invented credentials/i);
  assert.match(methodology, /has not published real hands-on product testing/i);
  assert.match(policy, /Responsible AI assistance/);
  assert.match(policy, /do not create evidence, personal experience, product testing, or authority/i);
  assert.match(disclosure, /does not currently publish affiliate links/i);
  assert.match(contact, /Contact is not active yet/);
  assert.doesNotMatch(contact, /mailto:|<form/i);
});

test('search is accessible, noindex, and the only page with application JavaScript', async () => {
  const search = await read('src/pages/search.astro');
  const sourceFiles = [
    'src/pages/index.astro',
    'src/pages/start.astro',
    'src/pages/about.astro',
    'src/pages/testing-methodology.astro',
    'src/pages/editorial-policy.astro',
    'src/pages/affiliate-disclosure.astro',
    'src/pages/contact.astro',
  ];

  assert.match(search, /noindex=\{true\}/);
  assert.match(search, /role="search"/);
  assert.match(search, /type="search"/);
  assert.match(search, /aria-live="polite"/);
  assert.match(search, /No results found/);
  assert.match(search, /import\('\/pagefind\/pagefind\.js'\)/);
  assert.equal((search.match(/<script/g) ?? []).length, 1);

  for (const file of sourceFiles) assert.doesNotMatch(await read(file), /<script|client:(load|idle|visible|media|only)/);
});

test('Pagefind opt-in excludes non-indexable pages and drafts', async () => {
  const layout = await read('src/layouts/BaseLayout.astro');
  const notFound = await read('src/pages/404.astro');
  const search = await read('src/pages/search.astro');
  const article = await read('src/layouts/content/ArticleLayout.astro');
  const review = await read('src/layouts/content/ReviewLayout.astro');
  const comparison = await read('src/layouts/content/ComparisonLayout.astro');

  assert.match(layout, /data-pagefind-body=\{searchable \? true : undefined\}/);
  assert.match(notFound, /noindex=\{true\}/);
  assert.match(search, /noindex=\{true\}/);
  for (const contentLayout of [article, review, comparison]) {
    assert.match(contentLayout, /noindex=\{data\.draft\}/);
  }
});

test('build and CI reproducibly create and smoke-test the Pagefind index', async () => {
  const packageFile = JSON.parse(await read('package.json'));
  const workflow = await read('.github/workflows/ci.yml');
  const smoke = await read('scripts/test-search.mjs');

  assert.equal(packageFile.devDependencies.pagefind, '1.5.2');
  assert.match(packageFile.scripts.build, /astro build && pagefind --site dist/);
  assert.equal(packageFile.scripts['test:search'], 'node scripts/test-search.mjs');
  assert.match(workflow, /Static search smoke test/);
  assert.match(workflow, /npm run test:search/);
  assert.match(smoke, /beginner orientation/);
  assert.match(smoke, /development-sample-review/);
});

test('M03 page sources contain no affiliate destinations, prices, ratings, or framework hydration', async () => {
  const files = [
    'src/pages/index.astro',
    'src/pages/start.astro',
    'src/pages/about.astro',
    'src/pages/testing-methodology.astro',
    'src/pages/editorial-policy.astro',
    'src/pages/affiliate-disclosure.astro',
    'src/pages/contact.astro',
    'src/pages/search.astro',
    'src/components/content/SectionLanding.astro',
  ];
  const affiliateDestination = /amazon\.|amzn\.|shareasale\.|impact\.com|awin\.|clickbank\.|utm_(source|medium|campaign)=/i;

  for (const file of files) {
    const source = await read(file);
    assert.doesNotMatch(source, affiliateDestination);
    assert.doesNotMatch(source, /\$\s*\d|rating\s*:/i);
    assert.doesNotMatch(source, /client:(load|idle|visible|media|only)/);
  }
});

test('high-priority routes are discoverable from the header, footer, homepage, or Start Here', async () => {
  const shellAndDiscovery = [
    await read('src/components/SiteHeader.astro'),
    await read('src/components/SiteFooter.astro'),
    await read('src/pages/index.astro'),
    await read('src/pages/start.astro'),
    await read('src/lib/navigation.ts'),
  ].join('\n');

  for (const route of approvedRoutes.slice(1)) {
    assert.ok(shellAndDiscovery.includes(route) || shellAndDiscovery.includes('sectionNavigation'), `orphaned route: ${route}`);
  }
});
