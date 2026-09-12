import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { developmentProductFixtures } from '../src/data/commercial/fixtures.ts';
import { commercialDestinations, merchants } from '../src/data/merchants/index.ts';
import { products } from '../src/data/products/index.ts';
import { productEvidenceSources } from '../src/data/products/sources.ts';
import { validateCommercialMdxSource } from '../src/lib/commercial/content-integrity.ts';
import { validateCommercialRegistry } from '../src/lib/commercial/registry.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const contentRoot = join(projectRoot, 'src', 'content');
const componentRoot = join(projectRoot, 'src', 'components');
const contentLayoutRoot = join(projectRoot, 'src', 'layouts', 'content');
const violations = [];
const forbiddenFrontmatterField = /^\s*(affiliateUrl|merchantUrl|buyUrl|trackingId|price|availability|rating|stars|score)\s*:/im;
const trackingDestination = /(?:[?&](?:tag|aff(?:iliate)?(?:_?id)?|ref|subid)=|amzn\.to\/)/i;

async function matchingFiles(directory, extensions) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await matchingFiles(path, extensions));
    else if (extensions.includes(extname(entry.name))) files.push(path);
  }
  return files;
}

validateCommercialRegistry({
  products,
  sources: productEvidenceSources,
  merchants,
  destinations: commercialDestinations,
});

if (products.length !== 0 || productEvidenceSources.length !== 0
  || merchants.length !== 0 || commercialDestinations.length !== 0) {
  violations.push('M05 production product, evidence-source, merchant, and destination registries must remain empty.');
}

for (const fixture of developmentProductFixtures) {
  if (!fixture.developmentFixture || fixture.status !== 'fixture' || fixture.evidenceBasis !== 'fixture') {
    violations.push(`Development product ${fixture.id} is not fail-closed as a fixture.`);
  }
  if (fixture.manufacturerUrl || fixture.sourceRefs.length > 0) {
    violations.push(`Development product ${fixture.id} contains a production-like destination or source claim.`);
  }
}

for (const file of await matchingFiles(contentRoot, ['.md', '.mdx'])) {
  const source = await readFile(file, 'utf8');
  const path = relative(projectRoot, file);
  if (forbiddenFrontmatterField.test(source)) {
    violations.push(`${path}: commercial values must use typed registry references, not raw frontmatter fields.`);
  }
  if (trackingDestination.test(source)) {
    violations.push(`${path}: raw tracking destinations are forbidden.`);
  }
  violations.push(...validateCommercialMdxSource(path, source));
}

for (const directory of [componentRoot, contentLayoutRoot]) {
  for (const file of await matchingFiles(directory, ['.astro', '.ts'])) {
    const source = await readFile(file, 'utf8');
    if (trackingDestination.test(source)) {
      violations.push(`${relative(projectRoot, file)}: component-level tracking destinations are forbidden.`);
    }
  }
}

if (violations.length > 0) {
  process.stderr.write(`${violations.join('\n')}\n`);
  process.exit(1);
}

process.stdout.write('HydroRigor commercial integrity validation passed: no live commercial records, raw tracking destinations, or unsupported hands-on prose.\n');
