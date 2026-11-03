import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('brand tokens match the Lab Garden HydroRigor palette', async () => {
  const css = await read('src/styles/global.css');
  for (const token of ['#0e1a14', '#0f6b4f', '#3e9b6a', '#c6f35e', '#e3f1e8', '#f5f7f2', '#3f5248', '#c9872d']) {
    assert.match(css.toLowerCase(), new RegExp(token));
  }
});

test('font families are configured', async () => {
  const css = await read('src/styles/global.css');
  for (const family of ['Plus Jakarta Sans', 'Inter', 'JetBrains Mono']) assert.ok(css.includes(family), `missing font family ${family}`);
  assert.match(css, /@fontsource/, 'fonts must be self-hosted');

  const layout = await read('src/layouts/BaseLayout.astro');
  assert.doesNotMatch(layout, /fonts\.googleapis|fonts\.gstatic/);
});

test('homepage preserves M01 scope boundary', async () => {
  const page = await read('src/pages/index.astro');
  assert.match(page, /Grow indoors with evidence, not guesswork\./);
  assert.match(page, /no affiliate links/i);
  assert.doesNotMatch(page, /amazon\.com|letpot\.com|gardyn\.com|lettucegrow\.com/i);
});

test('layout includes skip link and primary navigation', async () => {
  const layout = await read('src/layouts/BaseLayout.astro');
  const header = await read('src/components/SiteHeader.astro');
  assert.match(layout, /Skip to content/);
  assert.match(header, /aria-label="Primary navigation"/);
});

test('primary navigation remains visible and wraps at the mobile breakpoint', async () => {
  const header = await read('src/components/SiteHeader.astro');
  const navTag = header.match(/<nav[^>]*aria-label="Primary navigation"[^>]*class="([^"]+)"/);

  assert.ok(navTag, 'primary navigation element is missing');
  const navClasses = navTag[1].split(/\s+/);

  assert.ok(navClasses.includes('flex'), 'primary navigation must display at the base breakpoint');
  assert.ok(navClasses.includes('w-full'), 'primary navigation must occupy a mobile row');
  assert.ok(navClasses.includes('flex-wrap'), 'primary navigation must wrap on narrow screens');
  assert.ok(!navClasses.includes('hidden'), 'primary navigation must not be hidden on mobile');
});
