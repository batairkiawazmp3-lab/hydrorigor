import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { pageTitle } from '../src/lib/seo.ts';
import { buildArticleJsonLd } from '../src/lib/structured-data.ts';
import { m06ContentItems } from '../src/data/m06-content.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('page titles keep the brand only when they fit in 60 characters', () => {
  assert.equal(pageTitle('Hydroponic Lettuce'), 'Hydroponic Lettuce — HydroRigor');
  const long = 'Hydroponic Strawberries: Complete Indoor Growing Guide';
  assert.equal(pageTitle(long), long);
  for (const { title } of m06ContentItems) {
    assert.ok(pageTitle(title).length <= 60, `"${title}" is too long for a search result title`);
  }
});

test('favicon and touch icon are published and linked without extra render-path requests', async () => {
  for (const file of ['favicon.ico', 'apple-touch-icon.png', 'icon-512.png']) {
    await access(new URL(`public/${file}`, root));
  }
  const layout = await read('src/layouts/BaseLayout.astro');
  assert.match(layout, /rel="icon" href="\/favicon\.ico" sizes="48x48"/u);
  assert.match(layout, /rel="apple-touch-icon"/u);
  // An SVG icon or a web manifest is fetched before first paint and costs Lighthouse time.
  assert.doesNotMatch(layout, /favicon\.svg|rel="manifest"/u);
  assert.match(layout, /image \?\? await socialImage/u, 'pages without their own photo need a default share image');
});

test('author structured data carries the real credential and the publisher logo', () => {
  const ld = buildArticleJsonLd({
    headline: 'Hydroponic lettuce',
    description: 'A guide.',
    url: '/crops/hydroponic-lettuce/',
    author: 'Najeeb',
    publishDate: '2026-09-12',
  });
  assert.equal(ld.author['@type'], 'Person');
  assert.equal(ld.author.hasCredential.name, 'MSc in Environmental Sciences');
  assert.equal(ld.author.jobTitle, 'Founder and editor');
  assert.equal(ld.publisher.logo.url, 'https://hydrorigor.com/icon-512.png');
  assert.equal(buildArticleJsonLd({ headline: 'x', description: 'y', url: '/x/', author: 'HydroRigor Editorial', publishDate: '2026-09-12' }).author['@type'], 'Organization');
});

test('privacy policy describes the analytics and hosting honestly', async () => {
  const privacy = await read('src/pages/privacy.astro');
  assert.match(privacy, /Vercel Web Analytics/u);
  assert.match(privacy, /does not set cookies/u);
  assert.match(privacy, /discards it after 24 hours/u);
  assert.match(privacy, /does not currently use affiliate links/u);
  assert.match(privacy, /runs entirely in your browser|all run in your browser/u);
  assert.match(await read('src/lib/navigation.ts'), /href: '\/privacy\/'/u);
});

test('public pages carry no internal milestone codes', async () => {
  for (const path of [
    'src/components/commercial/CommercialSectionStatus.astro',
    'src/pages/search.astro',
    'src/pages/affiliate-disclosure.astro',
    'src/pages/editorial-policy.astro',
    'src/pages/tools/index.astro',
    'src/pages/privacy.astro',
    'src/components/content/SectionLanding.astro',
    'src/pages/start.astro',
  ]) {
    const source = (await read(path)).replace(/^---[\s\S]*?---/u, '');
    assert.doesNotMatch(source, />[^<]*\bM0\d\b[^<]*</u, `${path} shows an internal milestone code`);
    assert.doesNotMatch(source, /Content Wave|site boundary/iu, `${path} shows internal wording`);
  }
});
