import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { articleSchema, comparisonSchema, reviewSchema } from '../src/content/schemas.ts';
import { isIndexable, shouldIncludeInSitemap } from '../src/lib/indexing.ts';
import { buildSeoMetadata } from '../src/lib/seo.ts';
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  serializeJsonLd,
} from '../src/lib/structured-data.ts';
import {
  articleCategoryValues,
  getPublicSectionPath,
  sectionDefinitions,
} from '../src/lib/sections.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

const source = {
  title: 'Astro content collections documentation',
  url: 'https://docs.astro.build/en/guides/content-collections/',
  publisher: 'Astro',
  accessedDate: '2026-09-11',
};

const common = {
  title: 'Development fixture title',
  description: 'A sufficiently descriptive development fixture used to validate the content schema.',
  route: 'development-sample-entry',
  publishDate: '2026-09-11',
  author: 'HydroRigor Development Fixture',
  sources: [source],
};

test('content schemas accept valid article, review, and comparison data', () => {
  const article = articleSchema.parse({
    ...common,
    category: 'systems',
    tags: ['development'],
  });
  const review = reviewSchema.parse({
    ...common,
    productId: 'fixture-product',
    verdict: 'A fixture verdict with no real product recommendation.',
    methodology: 'Schema and rendering validation only; no product testing occurred.',
    pros: ['Demonstrates a typed field.'],
    cons: ['Represents no real limitation.'],
  });
  const comparison = comparisonSchema.parse({
    ...common,
    comparedItemIds: ['fixture-alpha', 'fixture-beta'],
    criteria: [{ name: 'Schema coverage', description: 'Validates a structured criterion.' }],
    useCaseConclusions: [{ useCase: 'Development', conclusion: 'No real item is recommended by this fixture.' }],
  });

  assert.equal(article.affiliateDisclosure, false);
  assert.equal(article.draft, true);
  assert.equal(review.productId, 'fixture-product');
  assert.equal(comparison.comparedItemIds.length, 2);
});

test('article schema rejects missing required fields and unknown fields', () => {
  const valid = { ...common, category: 'systems', tags: ['development'] };
  const { title: _title, ...withoutTitle } = valid;

  assert.throws(() => articleSchema.parse(withoutTitle));
  assert.throws(() => articleSchema.parse({ ...valid, rating: 5 }));
});

test('review and comparison schemas reject incomplete structures', () => {
  assert.throws(() => reviewSchema.parse({
    ...common,
    productId: 'fixture-product',
    verdict: 'A fixture verdict with no real product recommendation.',
    pros: ['Typed field'],
    cons: ['Typed field'],
  }));
  assert.throws(() => comparisonSchema.parse({
    ...common,
    comparedItemIds: ['fixture-alpha'],
    criteria: [{ name: 'Schema coverage', description: 'Validates a structured criterion.' }],
    useCaseConclusions: [{ useCase: 'Development', conclusion: 'No real item is recommended by this fixture.' }],
  }));
});

test('SEO metadata self-canonicalizes and supports an explicit override', () => {
  const self = buildSeoMetadata({
    title: 'Example — HydroRigor',
    description: 'Example metadata description.',
    pathname: '/systems/example/',
  });
  const override = buildSeoMetadata({
    title: 'Example — HydroRigor',
    description: 'Example metadata description.',
    pathname: '/systems/example/',
    canonical: 'https://hydrorigor.com/canonical-example/',
  });

  assert.equal(self.canonical, 'https://hydrorigor.com/systems/example/');
  assert.equal(self.openGraph.url, self.canonical);
  assert.equal(override.canonical, 'https://hydrorigor.com/canonical-example/');
});

test('draft and explicit noindex inputs produce non-indexable robots metadata', () => {
  const draft = buildSeoMetadata({
    title: 'Draft',
    description: 'Draft metadata description.',
    pathname: '/systems/development-sample-entry/',
    draft: true,
  });

  assert.equal(isIndexable({ draft: true }), false);
  assert.equal(isIndexable({ draft: false }), true);
  assert.equal(isIndexable({ noindex: true }), false);
  assert.equal(draft.robots, 'noindex, nofollow');
});

test('BlogPosting JSON-LD matches supplied visible article metadata', () => {
  const jsonLd = buildArticleJsonLd({
    headline: 'Visible article title',
    description: 'Visible article description.',
    url: '/systems/visible-article/',
    author: 'HydroRigor Editorial',
    publishDate: '2026-09-11',
    reviewer: 'HydroRigor Reviewer',
  });

  assert.equal(jsonLd['@type'], 'BlogPosting');
  assert.equal(jsonLd.headline, 'Visible article title');
  assert.equal(jsonLd.url, 'https://hydrorigor.com/systems/visible-article/');
  assert.equal(jsonLd.mainEntityOfPage, jsonLd.url);
  assert.equal(jsonLd.author.name, 'HydroRigor Editorial');
  assert.equal(jsonLd.reviewedBy?.name, 'HydroRigor Reviewer');
  assert.doesNotMatch(serializeJsonLd(jsonLd), /<script/i);
});

test('BreadcrumbList JSON-LD preserves visible order and absolute URLs', () => {
  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Systems', url: '/systems/' },
    { name: 'Fixture', url: '/systems/development-sample-entry/' },
  ]);

  assert.equal(breadcrumbs.itemListElement.length, 3);
  assert.deepEqual(
    breadcrumbs.itemListElement.map(({ position }) => position),
    [1, 2, 3],
  );
  assert.equal(
    breadcrumbs.itemListElement[2]?.item,
    'https://hydrorigor.com/systems/development-sample-entry/',
  );
});

test('route architecture exposes the nine sections through the canonical public paths', () => {
  assert.deepEqual(
    sectionDefinitions.map(({ slug }) => slug),
    ['systems', 'crops', 'nutrients-water', 'equipment', 'best', 'reviews', 'compare', 'problems', 'tools'],
  );
  assert.ok(articleCategoryValues.includes('nutrients'));
  assert.equal(getPublicSectionPath('nutrients'), '/nutrients-water/');
});

test('sitemap and robots rules exclude development fixtures', async () => {
  for (const path of [
    '/systems/development-sample-system-article/',
    '/reviews/development-sample-review/',
    '/compare/development-sample-comparison/',
  ]) {
    assert.equal(shouldIncludeInSitemap(path), false);
  }
  assert.equal(shouldIncludeInSitemap('/systems/'), true);
  assert.equal(shouldIncludeInSitemap('/404/'), false);
  assert.equal(shouldIncludeInSitemap('/search/'), false);
  assert.equal(shouldIncludeInSitemap('/nutrients/'), false);
  assert.equal(shouldIncludeInSitemap('/nutrients-water/'), true);

  const robots = await read('public/robots.txt');
  assert.match(robots, /Sitemap: https:\/\/hydrorigor\.com\/sitemap-index\.xml/);
  assert.match(robots, /Disallow: \/systems\/development-sample-system-article\//);
  assert.match(robots, /Disallow: \/reviews\/development-sample-review\//);
  assert.match(robots, /Disallow: \/compare\/development-sample-comparison\//);
});

test('reusable content layouts use production-neutral labels and a generic draft notice', async () => {
  const articleLayout = await read('src/layouts/content/ArticleLayout.astro');
  const reviewLayout = await read('src/layouts/content/ReviewLayout.astro');
  const comparisonLayout = await read('src/layouts/content/ComparisonLayout.astro');
  const draftNotice = await read('src/components/content/DevelopmentNotice.astro');

  assert.doesNotMatch(articleLayout, /Sample article/i);
  assert.doesNotMatch(reviewLayout, /Sample editorial review|Fixture verdict|Pros structure|Cons structure/i);
  assert.match(reviewLayout, />Editorial review<\/p>/);
  assert.match(reviewLayout, />Verdict<\/h2>/);
  assert.match(reviewLayout, />Pros<\/h2>/);
  assert.match(reviewLayout, />Cons<\/h2>/);
  assert.doesNotMatch(comparisonLayout, /Sample comparison|Fixture identifiers/i);
  assert.match(comparisonLayout, />Comparison<\/p>/);
  assert.match(comparisonLayout, />Compared items<\/h2>/);

  assert.doesNotMatch(draftNotice, /sample development fixture|validate the M02 content engine/i);
  assert.match(draftNotice, /Draft · Noindex/);
  assert.match(draftNotice, /This unpublished page is excluded from production indexing\./);
});

test('sample content is draft-only and contains no affiliate destinations', async () => {
  const files = [
    'src/content/articles/development-sample-system-article.mdx',
    'src/content/reviews/development-sample-review.mdx',
    'src/content/comparisons/development-sample-comparison.mdx',
  ];
  const affiliateDestination = /amazon\.|amzn\.|shareasale\.|impact\.com|awin\.|clickbank\.|utm_(source|medium|campaign)=/i;

  for (const file of files) {
    const content = await read(file);
    assert.match(content, /^title:\s*["']SAMPLE\b/im);
    assert.match(content, /development/i);
    assert.match(content, /draft: true/);
    assert.match(content, /affiliateDisclosure: false/);
    assert.doesNotMatch(content, affiliateDestination);
  }
});
