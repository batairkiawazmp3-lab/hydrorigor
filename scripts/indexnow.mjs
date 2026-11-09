#!/usr/bin/env node
/**
 * Tells IndexNow search engines (Bing, plus Yandex, Seznam, Naver and Yep) which guides changed in
 * a production deploy, so they recrawl them the same day instead of whenever their crawler next
 * visits. Bing also supplies results to Yahoo and DuckDuckGo.
 *
 * Run by .github/workflows/indexnow.yml after Vercel reports a successful deploy of `main`.
 * Locally: `node scripts/indexnow.mjs <commit-sha> --dry-run` prints what would be sent.
 *
 * The key is not a secret. IndexNow proves site ownership by fetching `public/<key>.txt` from
 * hydrorigor.com, so the key must be public. Deleting that file stops submissions working.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { contentItems, getContentPath } from '../src/data/content-manifest.ts';
import { SITE_ORIGIN, absoluteUrl } from '../src/lib/site.ts';

export const INDEXNOW_KEY = '592dc5bf73f91af36cc3dd225f5b6778';
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const HOST = new URL(SITE_ORIGIN).host;

const CONTENT_FILE = /^src\/content\/(articles|reviews|comparisons)\/[^/]+\.mdx$/u;

/** Section landing pages that list guides (comparisons have no public landing). */
const sectionOf = (path) => {
  const section = `/${path.split('/')[1]}/`;
  return section === '/compare/' ? undefined : section;
};

/**
 * Public URLs to submit for a list of changed files ({ status: 'A'|'M'|'D', path }): each published
 * guide that was added or changed, the section page that lists it, and the home page.
 */
export function urlsForChangedFiles(changes, readFile = (path) => readFileSync(path, 'utf8')) {
  const urls = new Set();
  for (const { status, path } of changes) {
    if (status === 'D') continue;
    const match = path.match(CONTENT_FILE);
    if (!match) continue;
    const frontmatter = readFile(path).split(/^---$/mu)[1] ?? '';
    if (/^draft:\s*true\b/mu.test(frontmatter)) continue;
    const route = frontmatter.match(/^route:\s*["']?([a-z0-9-]+)["']?\s*$/mu)?.[1];
    const item = contentItems.find((entry) => entry.collection === match[1] && entry.route === route);
    if (!item) continue; // fixtures and files not in the manifest are not public guides
    const path_ = getContentPath(item);
    urls.add(absoluteUrl(path_));
    const section = sectionOf(path_);
    if (section) urls.add(absoluteUrl(section));
    urls.add(absoluteUrl('/'));
  }
  return [...urls].sort();
}

/** Files changed by one commit, from git. */
export function changedFiles(sha) {
  const output = execFileSync('git', ['diff', '--name-status', '--no-renames', `${sha}^`, sha], { encoding: 'utf8' });
  return output
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [status, path] = line.split('\t');
      return { status: status[0], path };
    });
}

export function payload(urlList) {
  return { host: HOST, key: INDEXNOW_KEY, keyLocation: absoluteUrl(`/${INDEXNOW_KEY}.txt`), urlList };
}

async function main() {
  const [sha = 'HEAD', ...flags] = process.argv.slice(2);
  const urls = urlsForChangedFiles(changedFiles(sha));
  if (urls.length === 0) {
    console.log(`IndexNow: no published guide changed in ${sha}; nothing to submit.`);
    return;
  }
  console.log(`IndexNow: ${urls.length} URL(s) from ${sha}:\n  ${urls.join('\n  ')}`);
  if (flags.includes('--dry-run')) return;

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload(urls)),
  });
  // 200 = accepted; 202 = accepted while the key file is checked (first submissions).
  if (response.status === 200 || response.status === 202) {
    console.log(`IndexNow: accepted (HTTP ${response.status}).`);
    return;
  }
  const detail = (await response.text()).slice(0, 300);
  console.error(`IndexNow: rejected with HTTP ${response.status}. ${detail}`);
  process.exitCode = 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
