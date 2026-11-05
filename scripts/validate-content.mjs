import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { m06ContentItems, getM06Path } from '../src/data/m06-content.ts';
import { contentItems, getContentPath, phase2ContentItems } from '../src/data/content-manifest.ts';
import { m06EditorialSourceById, m06EditorialSources } from '../src/data/editorial-sources/m06.ts';
import { findUnmistakableHandsOnClaim } from '../src/lib/commercial/content-integrity.ts';
import { shouldIncludeInSitemap } from '../src/lib/indexing.ts';
import { requiredPublicRoutes } from '../src/lib/navigation.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const violations = [];
const topScalar = (frontmatter, key) => {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'mu'));
  const value = match?.[1]?.trim();
  if (!value) return undefined;
  return ((value.startsWith('"') && value.endsWith('"'))
    || (value.startsWith("'") && value.endsWith("'")))
    ? value.slice(1, -1)
    : value;
};
const splitMdx = (source) => {
  const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/u);
  return match ? { frontmatter: match[1], body: match[2] } : undefined;
};
const internalLinks = (source) => [...source.matchAll(/\]\((\/[a-z0-9/-]+\/?)(?:#[^)]+)?\)/giu)]
  .map((match) => match[1]);
const forbiddenField = /^\s*(price|availability|rating|stars|score|offer|affiliateUrl|merchantUrl|buyUrl|trackingId)\s*:/imu;
const trackingDestination = /(?:amazon\.|amzn\.|[?&](?:tag|aff(?:iliate)?(?:_?id)?|ref|subid)=)/iu;
const fixtureMarker = /\bSAMPLE\b|development-sample|fixture-(?:reservoir|system)/iu;

try {
  assert.equal(m06ContentItems.length, 25, 'strategy requires exactly 25 M06 pages');
  assert.deepEqual(m06ContentItems.map(({ id }) => id), Array.from({ length: 25 }, (_, index) => index + 1));
} catch (error) {
  violations.push(error.message);
}

const distribution = Object.fromEntries(
  [...new Set(m06ContentItems.map(({ category }) => category))].map((category) => [
    category,
    m06ContentItems.filter((item) => item.category === category).length,
  ]),
);
if (JSON.stringify(distribution) !== JSON.stringify({ systems: 4, best: 5, crops: 7, nutrients: 7, reviews: 2 })) {
  violations.push(`M06 category distribution is incorrect: ${JSON.stringify(distribution)}`);
}

for (const [label, values] of [
  ['routes', m06ContentItems.map(getM06Path)],
  ['titles', m06ContentItems.map(({ title }) => title)],
  ['route segments', m06ContentItems.map(({ route }) => route)],
  ['primary target topics', m06ContentItems.map(({ primaryTopic }) => primaryTopic)],
]) {
  if (new Set(values).size !== values.length) violations.push(`M06 ${label} are not unique.`);
}

for (const item of m06ContentItems) {
  if (getM06Path(item).startsWith('/best/best-')) {
    violations.push(`${getM06Path(item)}: buyer-guide route repeats the public section word.`);
  }
}

for (const source of m06EditorialSources) {
  if (!source.url.startsWith('https://')) violations.push(`${source.id}: source URL must use HTTPS.`);
  if (!source.title || !source.publisher || !source.locator) violations.push(`${source.id}: source metadata is incomplete.`);
}

const validPaths = new Set([...requiredPublicRoutes, ...contentItems.map(getContentPath)]);

for (const [label, values] of [
  ['IDs', contentItems.map(({ id }) => id)],
  ['routes', contentItems.map(getContentPath)],
  ['titles', contentItems.map(({ title }) => title)],
]) {
  if (new Set(values).size !== values.length) violations.push(`Content manifest ${label} are not unique across all phases.`);
}
for (const item of phase2ContentItems) {
  if (!Number.isInteger(item.id) || item.id < 26 || item.id > 100) violations.push(`${getContentPath(item)}: Phase 2+ plan ID must be 26–100.`);
}
const descriptions = new Set();
const contentFiles = { articles: [], reviews: [], comparisons: [] };

for (const collection of Object.keys(contentFiles)) {
  const directory = join(projectRoot, 'src', 'content', collection);
  contentFiles[collection] = (await readdir(directory)).filter((name) => name.endsWith('.mdx'));
}

const productionFiles = Object.entries(contentFiles)
  .flatMap(([collection, names]) => names.map((name) => `${collection}/${name}`))
  .filter((name) => !name.split('/')[1].startsWith('development-'));
const manifestFiles = new Set(contentItems.map((item) => `${item.collection}/${item.route}.mdx`));
for (const file of productionFiles) {
  if (!manifestFiles.has(file)) violations.push(`src/content/${file}: production MDX file has no content manifest entry.`);
}
if (productionFiles.length !== contentItems.length) {
  violations.push(`Expected ${contentItems.length} production MDX files (one per manifest entry); found ${productionFiles.length}.`);
}

for (const item of contentItems) {
  const file = join(projectRoot, 'src', 'content', item.collection, `${item.route}.mdx`);
  let source;
  try {
    source = await readFile(file, 'utf8');
  } catch {
    violations.push(`${getContentPath(item)}: expected MDX file is missing.`);
    continue;
  }

  const parts = splitMdx(source);
  if (!parts) {
    violations.push(`${getContentPath(item)}: malformed or missing frontmatter.`);
    continue;
  }

  const title = topScalar(parts.frontmatter, 'title');
  const route = topScalar(parts.frontmatter, 'route');
  const description = topScalar(parts.frontmatter, 'description');
  if (title !== item.title) violations.push(`${getContentPath(item)}: title does not match the strategy manifest.`);
  if (route !== item.route) violations.push(`${getContentPath(item)}: route does not match the strategy manifest.`);
  if (!description || description.length < 60 || description.length > 180) {
    violations.push(`${getContentPath(item)}: description must be sensible and 60–180 characters.`);
  } else if (descriptions.has(description)) {
    violations.push(`${getContentPath(item)}: duplicate description.`);
  } else descriptions.add(description);

  if (!/^draft:\s*false\s*$/mu.test(parts.frontmatter)) violations.push(`${getContentPath(item)}: production page must be non-draft.`);
  if (!/^affiliateDisclosure:\s*false\s*$/mu.test(parts.frontmatter)) violations.push(`${getContentPath(item)}: affiliate disclosure must reflect no affiliate links.`);
  if (!/^commercialDestinationIds:\s*\[\]\s*$/mu.test(parts.frontmatter)) violations.push(`${getContentPath(item)}: commercial destinations must be empty.`);
  if (forbiddenField.test(parts.frontmatter)) violations.push(`${getContentPath(item)}: forbidden commercial field in frontmatter.`);
  if (trackingDestination.test(source)) violations.push(`${getContentPath(item)}: tracking or affiliate destination detected.`);
  if (fixtureMarker.test(source)) violations.push(`${getContentPath(item)}: development fixture marker leaked into production content.`);

  const claim = findUnmistakableHandsOnClaim(source);
  if (claim) violations.push(`${getContentPath(item)}: unsupported HydroRigor hands-on phrase “${claim.phrase}”.`);

  const sourceIds = [...parts.frontmatter.matchAll(/^\s+- id:\s*["']([^"']+)["']\s*$/gmu)]
    .map((match) => match[1]);
  if (sourceIds.length === 0) violations.push(`${getContentPath(item)}: page has no visible sources.`);
  if (new Set(sourceIds).size !== sourceIds.length) violations.push(`${getContentPath(item)}: duplicate source IDs.`);
  if ([...sourceIds].sort().join('|') !== [...item.sourceIds].sort().join('|')) {
    violations.push(`${getContentPath(item)}: source IDs do not match the content manifest.`);
  }
  for (const sourceId of sourceIds) {
    if (!m06EditorialSourceById.has(sourceId)) violations.push(`${getContentPath(item)}: unknown source ID ${sourceId}.`);
  }

  for (const link of internalLinks(parts.body)) {
    const normalized = link.endsWith('/') ? link : `${link}/`;
    if (!validPaths.has(normalized)) violations.push(`${getContentPath(item)}: unresolved internal link ${link}.`);
  }
  for (const toolLink of item.toolLinks) {
    if (!source.includes(`](${toolLink})`)) violations.push(`${getContentPath(item)}: required M04 tool link ${toolLink} is missing.`);
  }

  const commercialArticle = item.collection === 'articles'
    && ([1, 2, 3, 16, 17, 23, 24, 25].includes(item.id) || (item.id > 25 && item.category === 'best'));
  if (commercialArticle && !/^commercialResearch:\s*$/mu.test(parts.frontmatter)) {
    violations.push(`${getContentPath(item)}: commercial research page lacks typed evidence scope.`);
  }
  if (item.collection === 'reviews' && !/^evidenceBasis:\s*["']manufacturer-spec-only["']\s*$/mu.test(parts.frontmatter)) {
    violations.push(`${getContentPath(item)}: M06 review must remain manufacturer-specification-only.`);
  }
  if (!shouldIncludeInSitemap(getContentPath(item))) violations.push(`${getContentPath(item)}: route is not sitemap eligible.`);
}

if (validPaths.has('/nutrients/')) violations.push('Retired /nutrients/ route is indexable.');

const landing = await readFile(join(projectRoot, 'src', 'components', 'content', 'SectionLanding.astro'), 'utf8');
if (!/contentItems/u.test(landing) || !/getContentPath/u.test(landing)) {
  violations.push('Section landing discovery is not connected to the content manifest.');
}

if (violations.length > 0) {
  process.stderr.write(`${violations.join('\n')}\n`);
  process.exit(1);
}

process.stdout.write(
  `HydroRigor content validation passed: ${contentItems.length} production pages (${m06ContentItems.length} launch + ${phase2ContentItems.length} Phase 2+), ${m06EditorialSources.length} source records, unique routes/titles/descriptions, resolved links, no fixture or commercial-integrity leakage.\n`,
);
