import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { contentItems, getContentPath, phase2ContentItems } from '../src/data/content-manifest.ts';
import { m06ContentItems, getM06Path } from '../src/data/m06-content.ts';
import { m06EditorialSources } from '../src/data/editorial-sources/m06.ts';
import { EMPTY_SECTION_PATHS, shouldIncludeInSitemap } from '../src/lib/indexing.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('the combined manifest keeps the 25 launch guides first and unchanged', () => {
  assert.equal(contentItems.length, m06ContentItems.length + phase2ContentItems.length);
  assert.deepEqual(contentItems.slice(0, 25).map(getContentPath), m06ContentItems.map(getM06Path));
});

test('Phase 2+ entries use plan IDs 26–100 and unique routes, paths and titles', () => {
  for (const item of phase2ContentItems) {
    assert.ok(Number.isInteger(item.id) && item.id >= 26 && item.id <= 100, `${item.route}: plan ID ${item.id}`);
    assert.match(item.route, /^[a-z0-9]+(?:-[a-z0-9]+)*$/u, `${item.route}: route must be kebab-case`);
    assert.ok(item.title.length <= 60, `${item.route}: title over 60 characters`);
    assert.ok(item.sourceIds.length > 0, `${item.route}: needs registered sources`);
  }
  for (const [label, values] of [
    ['IDs', contentItems.map(({ id }) => id)],
    ['paths', contentItems.map(getContentPath)],
    ['files', contentItems.map(({ collection, route }) => `${collection}/${route}`)],
    ['titles', contentItems.map(({ title }) => title)],
  ]) assert.equal(new Set(values).size, values.length, `content manifest ${label} must be unique`);
  assert.ok(contentItems.every((item) => /^\/[a-z0-9/-]+\/$/u.test(getContentPath(item))));
  assert.ok(contentItems.every((item) => shouldIncludeInSitemap(getContentPath(item))));
});

test('every manifest entry has its MDX file and every production MDX file is in the manifest', async () => {
  const files = new Set();
  for (const collection of ['articles', 'reviews', 'comparisons']) {
    for (const name of await readdir(new URL(`src/content/${collection}/`, root))) {
      if (name.endsWith('.mdx') && !name.startsWith('development-')) files.add(`${collection}/${name.slice(0, -4)}`);
    }
  }
  const manifest = new Set(contentItems.map(({ collection, route }) => `${collection}/${route}`));
  assert.deepEqual([...files].filter((file) => !manifest.has(file)), [], 'MDX files without a manifest entry');
  assert.deepEqual([...manifest].filter((file) => !files.has(file)), [], 'manifest entries without an MDX file');
});

test('Phase 2+ guides cite registered sources and never sit in a hidden section', () => {
  const registered = new Set(m06EditorialSources.map(({ id }) => id));
  for (const item of phase2ContentItems) {
    for (const id of item.sourceIds) assert.ok(registered.has(id), `${item.route}: unknown source ${id}`);
    const sectionPath = getContentPath(item).split('/').slice(0, 2).join('/') + '/';
    assert.ok(!EMPTY_SECTION_PATHS.has(sectionPath), `${item.route}: remove ${sectionPath} from EMPTY_SECTION_PATHS when publishing here`);
  }
});

test('the Phase 2+ plan lists plan IDs 26–100 with unique routes per collection', async () => {
  const plan = await read('docs/research/PHASE2_CONTENT_PLAN.md');
  const rows = [...plan.matchAll(/^\| (\d+) \| [^|]+ \| ([a-z]+) \| ([a-z]+) \|.*?`([a-z0-9-]+)`/gmu)];
  assert.deepEqual(rows.map((row) => Number(row[1])), Array.from({ length: 75 }, (_, index) => index + 26));
  const keys = rows.map((row) => `${row[3]}/${row[4]}`);
  assert.equal(new Set(keys).size, keys.length, 'proposed routes must not repeat within a collection');
  const existing = new Set(m06ContentItems.map(({ collection, route }) => `${collection}/${route}`));
  assert.deepEqual(keys.filter((key) => existing.has(key)), [], 'proposed routes must not reuse a launch guide file');
  assert.match(plan, /\| 41 \| Stage 3 \| crops \| articles \| Hydroponic Basil: pH, EC, Light & Harvest Guide .*`hydroponic-basil`/u);
});
