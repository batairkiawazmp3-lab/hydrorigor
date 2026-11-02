import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { articleSchema } from '../src/content/schemas.ts';
import { getM06Path, m06ContentItems } from '../src/data/m06-content.ts';
import { m06EditorialSources } from '../src/data/editorial-sources/m06.ts';
import { products } from '../src/data/products/index.ts';
import { commercialDestinations, merchants } from '../src/data/merchants/index.ts';
import { shouldIncludeInSitemap } from '../src/lib/indexing.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('M06 manifest exactly matches the 25 strategy-defined Phase 1 records', () => {
  assert.equal(m06ContentItems.length, 25);
  assert.deepEqual(m06ContentItems.map(({ id }) => id), Array.from({ length: 25 }, (_, index) => index + 1));
  assert.deepEqual(
    Object.fromEntries(['systems', 'crops', 'nutrients', 'best', 'reviews'].map((category) => [
      category,
      m06ContentItems.filter((item) => item.category === category).length,
    ])),
    { systems: 4, crops: 7, nutrients: 7, best: 5, reviews: 2 },
  );
});

test('M06 routes, titles, and primary target topics are unique and canonical-path safe', () => {
  for (const values of [
    m06ContentItems.map(getM06Path),
    m06ContentItems.map(({ route }) => route),
    m06ContentItems.map(({ title }) => title),
    m06ContentItems.map(({ primaryTopic }) => primaryTopic),
  ]) assert.equal(new Set(values).size, 25);
  assert.ok(m06ContentItems.every((item) => /^\/[a-z0-9/-]+\/$/u.test(getM06Path(item))));
  assert.ok(m06ContentItems.every((item) => shouldIncludeInSitemap(getM06Path(item))));
  assert.ok(m06ContentItems.every((item) => !getM06Path(item).startsWith('/nutrients/')));
});

test('buyer-guide routes do not repeat the best section segment', () => {
  const bestPaths = m06ContentItems
    .filter(({ category }) => category === 'best')
    .map(getM06Path);

  assert.ok(bestPaths.includes('/best/hydroponic-system-for-home-growers/'));
  assert.ok(bestPaths.every((path) => !path.startsWith('/best/best-')));
});

test('only supervisor-verified keyword metrics carry numbers', () => {
  assert.ok(m06ContentItems
    .filter(({ metricStatus }) => metricStatus === 'METRIC_NOT_REVERIFIED')
    .every(({ volume, seoDifficulty }) => volume === undefined && seoDifficulty === undefined));
  assert.ok(m06ContentItems
    .filter(({ metricStatus }) => metricStatus === 'VERIFIED_2026-09-12')
    .every(({ volume, seoDifficulty }) => Number.isInteger(volume) && Number.isInteger(seoDifficulty)));
});

test('M06 source registry is unique, complete, and HTTPS-only', () => {
  assert.equal(new Set(m06EditorialSources.map(({ id }) => id)).size, m06EditorialSources.length);
  assert.ok(m06EditorialSources.every(({ title, publisher, url, locator }) => title && publisher && locator && url.startsWith('https://')));
  const sourceIds = new Set(m06EditorialSources.map(({ id }) => id));
  assert.ok(m06ContentItems.every(({ sourceIds: refs }) => refs.length > 0 && refs.every((id) => sourceIds.has(id))));
});

test('strawberry day-length and pollination claims map to direct UMN evidence', async () => {
  const strawberry = m06ContentItems.find(({ id }) => id === 6);
  const sources = new Map(m06EditorialSources.map((source) => [source.id, source]));
  const article = await read('src/content/articles/hydroponic-strawberries.mdx');

  assert.ok(strawberry.sourceIds.includes('umn-day-neutral-strawberries'));
  assert.ok(strawberry.sourceIds.includes('umn-strawberry-plant-growth'));
  assert.match(sources.get('umn-day-neutral-strawberries').locator, /day-length response/iu);
  assert.match(sources.get('umn-strawberry-plant-growth').locator, /pollination/iu);
  assert.match(article, /not sensitive to day length/iu);
  assert.match(article, /self-fruitful/iu);
  assert.match(article, /insects are the primary pollinators/iu);
  assert.match(article, /conservative application of the source's flower biology/iu);
});

test('strawberry numeric targets map to university controlled-environment sources', async () => {
  const strawberry = m06ContentItems.find(({ id }) => id === 6);
  const sources = new Map(m06EditorialSources.map((source) => [source.id, source]));
  const article = await read('src/content/articles/hydroponic-strawberries.mdx');

  for (const id of ['ua-strawberry-irrigation', 'ua-strawberry-environment', 'cornell-indoor-strawberry-basics', 'ua-ceac-berries-cea']) {
    assert.ok(strawberry.sourceIds.includes(id), `${id} must back the strawberry targets`);
  }
  assert.match(sources.get('ua-strawberry-irrigation').locator, /pH 5\.5-6\.0/u);
  assert.match(sources.get('ua-strawberry-irrigation').locator, /EC at or below 1\.0/u);
  assert.match(sources.get('ua-ceac-berries-cea').locator, /DLI/u);
  assert.match(article, /5\.5–6\.0/u);
  assert.match(article, /About 1\.0 dS\/m/u);
  assert.match(article, /HydroRigor has not run its own strawberry trial/u);
});

test('article schema accepts typed external-research scope and rejects unknown source refs', () => {
  const base = {
    title: 'Evidence-bounded buyer research',
    description: 'A sufficiently descriptive production page used to validate the commercial research boundary.',
    route: 'evidence-bounded-buyer-research',
    publishDate: '2026-09-12',
    author: 'HydroRigor Editorial',
    category: 'best',
    tags: ['buyer-research'],
    sources: [{
      id: 'institutional-source',
      title: 'Institutional source',
      publisher: 'University Extension',
      url: 'https://example.edu/source',
      accessedDate: '2026-09-12',
    }],
    draft: false,
    commercialResearch: {
      evidenceBasis: 'externally-researched',
      scope: 'System-level criteria only; no named product is selected.',
      evidenceClaims: [{
        type: 'third-party-evidence',
        summary: 'The institutional source supports the system-level comparison criteria.',
        sourceRefs: ['institutional-source'],
      }],
    },
  };
  assert.doesNotThrow(() => articleSchema.parse(base));
  assert.throws(() => articleSchema.parse({
    ...base,
    commercialResearch: {
      ...base.commercialResearch,
      evidenceClaims: [{ ...base.commercialResearch.evidenceClaims[0], sourceRefs: ['missing'] }],
    },
  }));
});

test('named M06 nutrient pages are manufacturer-only and cannot emit Review JSON-LD', async () => {
  for (const route of ['masterblend-hydroponic-nutrients', 'general-hydroponics-nutrients']) {
    const source = await read(`src/content/reviews/${route}.mdx`);
    assert.match(source, /evidenceBasis:\s*"manufacturer-spec-only"/u);
    assert.match(source, /structuredDataEnabled:\s*false/u);
    assert.match(source, /acquisitionRelationship:\s*"not-applicable"/u);
    assert.doesNotMatch(source, /\bprice\s*:|\bavailability\s*:|\brating\s*:|affiliateUrl|amazon|amzn/iu);
  }
  assert.ok(products.every(({ evidenceBasis }) => evidenceBasis === 'manufacturer-spec-only'));
  assert.deepEqual(merchants, []);
  assert.deepEqual(commercialDestinations, []);
});

test('M04 links are explicit and calculator descriptions preserve the scaling boundary', async () => {
  const nutrientPages = (await Promise.all(
    m06ContentItems.filter(({ category }) => category === 'nutrients').map(({ route }) => read(`src/content/articles/${route}.mdx`)),
  )).join('\n');
  assert.match(nutrientPages, /\/tools\/ph-ec-targets\//u);
  assert.match(nutrientPages, /\/tools\/nutrient-mixing-calculator\//u);
  assert.match(nutrientPages, /manufacturer-provided|manufacturer’s|manufacturer's/iu);
  assert.match(nutrientPages, /does not (?:choose|formulate|predict)/iu);
});

test('section landings expose the M06 manifest and preserve static rendering', async () => {
  const landing = await read('src/components/content/SectionLanding.astro');
  assert.match(landing, /m06ContentItems/u);
  assert.match(landing, /getM06Path/u);
  assert.match(landing, /Published guides/u);
  assert.doesNotMatch(landing, /<script|client:(?:load|idle|visible|media|only)/u);
});

test('M06 production prose contains no fixture markers, tracking links, or numeric rating fields', async () => {
  for (const item of m06ContentItems) {
    const source = await read(`src/content/${item.collection}/${item.route}.mdx`);
    assert.doesNotMatch(source, /\bSAMPLE\b|development-sample|fixture-(?:reservoir|system)/iu);
    assert.doesNotMatch(source, /amazon\.|amzn\.|[?&](?:tag|affiliate_id|affid|subid)=/iu);
    assert.doesNotMatch(source, /^\s*(?:price|availability|rating|stars|score|offer)\s*:/imu);
  }
});

test('M06 acceptance history survives the gated M08 milestone transition', async () => {
  const milestone = await read('.agent/state/CURRENT_MILESTONE.md');
  const audit = await read('milestones/M06/REALITY_AUDIT.md');
  assert.match(milestone, /Previous milestone: M07 — Quality & Observability: ACCEPTED AND MERGED/u);
  assert.match(milestone, /M07 integration: PR #7 — SQUASH_MERGED/u);
  assert.match(milestone, /Milestone: M08 — Production Launch/u);
  assert.match(milestone, /M08 authorization: GRANTED_WITH_HUMAN_LAUNCH_GATES/u);
  assert.match(milestone, /M09 status: NOT_STARTED/u);
  assert.match(milestone, /M09 authorization: NOT_AUTHORIZED/u);
  assert.match(audit, /Status: ACCEPTED/u);
  assert.match(audit, /M06 — Content Wave 1: ACCEPTED/u);
});
