import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { contentItems } from '../src/data/content-manifest.ts';
import { sectionDefinitions } from '../src/lib/sections.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

async function registry() {
  const source = await read('src/data/photos.ts');
  const imports = [...source.matchAll(/^import (\w+) from '\.\.\/assets\/photos\/([a-z0-9-]+\.jpg)';$/gmu)]
    .map(([, name, file]) => ({ name, file }));
  const photoBlock = source.slice(source.indexOf('export const photos = {'), source.indexOf('} satisfies Record<string, SitePhoto>'));
  const photos = [...photoBlock.matchAll(/^ {2}'([a-z0-9-]+)': photo\((\w+), '([^']+)', '([^']+)', '([^']+)'\),$/gmu)]
    .map(([, key, image, alt, photographer, username]) => ({ key, image, alt, photographer, username }));
  const mapBlock = (name) => {
    const start = source.indexOf(`export const ${name}`);
    const block = source.slice(start, source.indexOf('};', start));
    return Object.fromEntries([...block.matchAll(/^ {2}'?([a-z0-9-]+)'?: '([a-z0-9-]+)',$/gmu)].map(([, from, to]) => [from, to]));
  };
  return { source, imports, photos, guides: mapBlock('guidePhotoKeys'), sections: mapBlock('sectionPhotoKeys') };
}

test('every photo is a local, credited Unsplash image with descriptive alt text', async () => {
  const { source, imports, photos } = await registry();
  assert.ok(photos.length >= 20, 'photo registry should list the site photos');
  assert.match(source, /free Unsplash License/u);
  assert.doesNotMatch(source, /plus\.unsplash\.com|images\.unsplash\.com/u, 'photos must be self-hosted, not hotlinked');
  const importNames = new Map(imports.map(({ name, file }) => [name, file]));
  for (const photo of photos) {
    assert.ok(importNames.has(photo.image), `${photo.key} must use an imported local file`);
    await access(new URL(`src/assets/photos/${importNames.get(photo.image)}`, root));
    assert.ok(photo.alt.length >= 20 && photo.alt.length <= 140, `${photo.key} alt text should describe the image`);
    assert.doesNotMatch(photo.alt, /^(image|photo|picture) of/iu, `${photo.key} alt text should not start with "image of"`);
    assert.ok(photo.photographer.trim() && /^[A-Za-z0-9_.-]+$/u.test(photo.username), `${photo.key} needs a photographer credit`);
  }
});

test('every published guide and section has a photo from the registry', async () => {
  const { photos, guides, sections } = await registry();
  const keys = new Set(photos.map(({ key }) => key));
  for (const item of contentItems) {
    assert.ok(guides[item.route], `${item.route} has no hero photo`);
    assert.ok(keys.has(guides[item.route]), `${item.route} points at unknown photo ${guides[item.route]}`);
  }
  for (const section of sectionDefinitions) {
    assert.ok(keys.has(sections[section.id]), `${section.id} section has no banner photo`);
  }
});

test('photo heroes are credited and kept out of the search index', async () => {
  for (const path of [
    'src/layouts/content/ArticleLayout.astro',
    'src/layouts/content/ReviewLayout.astro',
    'src/components/content/SectionLanding.astro',
    'src/pages/start.astro',
  ]) {
    const source = await read(path);
    assert.match(source, /<PhotoCredit/u, `${path} must credit its photo`);
    assert.match(source, /<figure[^>]*data-pagefind-ignore="all"/u, `${path} photo must not feed search metadata`);
  }
  const photo = await read('src/components/Photo.astro');
  assert.match(photo, /data-pagefind-ignore="all"/u);
  assert.match(photo, /format="webp"/u);
  assert.match(await read('src/pages/index.astro'), /Photos by/u);
});
