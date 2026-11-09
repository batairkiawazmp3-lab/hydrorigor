import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { INDEXNOW_KEY, payload, urlsForChangedFiles } from '../scripts/indexnow.mjs';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('the IndexNow key file is public and matches the key the script sends', async () => {
  assert.match(INDEXNOW_KEY, /^[0-9a-f]{32}$/u);
  assert.equal((await read(`public/${INDEXNOW_KEY}.txt`)).trim(), INDEXNOW_KEY);
  assert.deepEqual(payload(['https://hydrorigor.com/']), {
    host: 'hydrorigor.com',
    key: INDEXNOW_KEY,
    keyLocation: `https://hydrorigor.com/${INDEXNOW_KEY}.txt`,
    urlList: ['https://hydrorigor.com/'],
  });
});

test('a changed guide submits its URL, its section page and the home page', () => {
  const urls = urlsForChangedFiles([
    { status: 'M', path: 'src/content/articles/hydroponic-basil.mdx' },
    { status: 'A', path: 'src/content/articles/hydroponic-lettuce.mdx' },
    { status: 'M', path: 'public/images/guides/hydroponic-basil-timeline.svg' },
  ]);
  assert.deepEqual(urls, [
    'https://hydrorigor.com/',
    'https://hydrorigor.com/crops/',
    'https://hydrorigor.com/crops/hydroponic-basil/',
    'https://hydrorigor.com/crops/hydroponic-lettuce/',
  ]);
});

test('deleted files, drafts and development fixtures are never submitted', () => {
  assert.deepEqual(
    urlsForChangedFiles([
      { status: 'D', path: 'src/content/articles/hydroponic-basil.mdx' },
      { status: 'M', path: 'src/content/reviews/development-sample-review.mdx' },
      { status: 'M', path: 'src/content/comparisons/development-sample-comparison.mdx' },
      { status: 'M', path: 'src/pages/index.astro' },
    ]),
    [],
  );
  const draft = urlsForChangedFiles([{ status: 'M', path: 'src/content/articles/hydroponic-basil.mdx' }], () =>
    '---\nroute: "hydroponic-basil"\ndraft: true\n---\n');
  assert.deepEqual(draft, []);
});

test('IndexNow runs only after a successful Vercel deploy of main, outside ci.yml', async () => {
  const workflow = await read('.github/workflows/indexnow.yml');
  assert.match(workflow, /^on:\n  status:/mu);
  assert.match(workflow, /github\.event\.context == 'Vercel'/u);
  assert.match(workflow, /github\.event\.state == 'success'/u);
  assert.match(workflow, /contains\(github\.event\.branches\.\*\.name, 'main'\)/u);
  assert.match(workflow, /node scripts\/indexnow\.mjs "\$DEPLOYED_SHA"/u);
  assert.doesNotMatch(await read('.github/workflows/ci.yml'), /indexnow/iu);
});
