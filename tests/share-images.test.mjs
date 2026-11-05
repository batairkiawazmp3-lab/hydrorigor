import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { contentItems } from '../src/data/content-manifest.ts';
import { sectionDefinitions } from '../src/lib/sections.ts';

const root = new URL('../', import.meta.url);

/** Width and height from a JPEG's start-of-frame marker. */
async function jpegSize(path) {
  const bytes = await readFile(new URL(path, root));
  assert.equal(bytes.readUInt16BE(0), 0xffd8, `${path} is not a JPEG`);
  let offset = 2;
  while (offset < bytes.length) {
    const marker = bytes.readUInt16BE(offset);
    const length = bytes.readUInt16BE(offset + 2);
    if (marker >= 0xffc0 && marker <= 0xffc3) {
      return { height: bytes.readUInt16BE(offset + 5), width: bytes.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  throw new Error(`${path}: no frame header`);
}

test('every guide has a 1200x630 share image and a 1000x1500 pin', async () => {
  for (const { route } of contentItems) {
    assert.deepEqual(await jpegSize(`public/og/${route}.jpg`), { width: 1200, height: 630 }, `${route} share image`);
    assert.deepEqual(await jpegSize(`public/pins/${route}.jpg`), { width: 1000, height: 1500 }, `${route} pin`);
  }
  for (const name of ['home', 'start', ...sectionDefinitions.map(({ id }) => `section-${id}`)]) {
    assert.deepEqual(await jpegSize(`public/og/${name}.jpg`), { width: 1200, height: 630 }, `${name} share image`);
  }
});

test('share images were rendered with the current titles (run npm run images:share after a title change)', async () => {
  const manifest = JSON.parse(await readFile(new URL('public/og/manifest.json', root), 'utf8'));
  for (const { route, title } of contentItems) {
    assert.equal(manifest[route], title, `public/og/${route}.jpg is stale: run npm run images:share`);
  }
  for (const section of sectionDefinitions) {
    assert.equal(manifest[`section-${section.id}`], section.title, `section ${section.id} share image is stale`);
  }
});

test('pages use the branded images', async () => {
  const read = (path) => readFile(new URL(path, root), 'utf8');
  assert.match(await read('src/layouts/content/ArticleLayout.astro'), /brandedShareImage\(data\.route, data\.title, heroPhoto\)/u);
  assert.match(await read('src/layouts/content/ArticleLayout.astro'), /pinMedia=\{inManifest \? absoluteUrl\(pinImagePath\(data\.route\)\)/u);
  assert.match(await read('src/layouts/content/ReviewLayout.astro'), /brandedShareImage\(data\.route, data\.title, heroPhoto\)/u);
  assert.match(await read('src/components/content/SectionLanding.astro'), /brandedShareImage\(`section-\$\{section\.id\}`/u);
  assert.match(await read('src/layouts/BaseLayout.astro'), /brandedShareImage\('home'/u);
  assert.match(await read('package.json'), /"images:share": "node scripts\/generate-share-images\.mjs"/u);
});
