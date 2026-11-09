#!/usr/bin/env node
/**
 * Writes a CSV for Pinterest's "Bulk create Pins" upload (Pinterest business account → Create →
 * Bulk create Pins): one scheduled Pin per full-length guide, using the guide's pin image from
 * public/pins/ (made by `npm run images:share`).
 *
 *   node scripts/pinterest-csv.mjs                       # full guides, one a day from tomorrow
 *   node scripts/pinterest-csv.mjs --start 2026-11-20    # first publish date
 *   node scripts/pinterest-csv.mjs --only hydroponic-basil,hydroponic-tomatoes
 *   node scripts/pinterest-csv.mjs --per-day 2 --out /tmp/pins.csv
 *
 * Pinterest rules (help.pinterest.com, "bulk upload" formatting guidelines): Title, Media URL and
 * Pinterest board are required; title 100 characters, description 500; up to 200 rows; boards are
 * created if missing; publish dates are YYYY-MM-DD and a date in the past is rejected.
 * Only guides of 1,500+ words are included: short launch guides get a Pin once rebuilt (--only).
 */
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { contentItems, getContentPath } from '../src/data/content-manifest.ts';
import { absoluteUrl } from '../src/lib/site.ts';

export const HEADER = ['Title', 'Media URL', 'Pinterest board', 'Thumbnail', 'Description', 'Link', 'Publish date', 'Keywords'];
export const MIN_WORDS = 1500;
const UTM = 'utm_source=pinterest&utm_medium=social&utm_campaign=guide-pins';

/** Keyword-rich board names, one per section. */
export const BOARDS = {
  systems: { board: 'Hydroponic Systems & DIY Builds', keyword: 'hydroponic system' },
  crops: { board: 'Grow Vegetables & Herbs Hydroponically', keyword: 'grow vegetables indoors' },
  'nutrients-water': { board: 'Hydroponic Nutrients, pH & EC', keyword: 'hydroponic nutrients' },
  best: { board: 'Choosing a Hydroponic System', keyword: 'best hydroponic system' },
  reviews: { board: 'Hydroponic Nutrients, pH & EC', keyword: 'hydroponic nutrients' },
};

const csvCell = (value) => (/[",\n]/u.test(value) ? `"${value.replace(/"/gu, '""')}"` : value);

function guideFile(item) {
  const dir = `src/content/${item.collection}`;
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.mdx')) continue;
    const text = readFileSync(`${dir}/${name}`, 'utf8');
    const [, frontmatter = '', ...body] = text.split(/^---$/mu);
    if (new RegExp(`^route:\\s*["']?${item.route}["']?\\s*$`, 'mu').test(frontmatter)) {
      return { frontmatter, words: body.join('---').split(/\s+/u).filter(Boolean).length };
    }
  }
  return undefined;
}

const addDays = (day, days) => new Date(Date.parse(`${day}T00:00:00Z`) + days * 86_400_000).toISOString().slice(0, 10);

/** Pin rows, best-searched guides first. */
export function pinRows({ start, perDay = 1, only } = {}) {
  const guides = contentItems
    .map((item) => ({ item, file: guideFile(item) }))
    .filter(({ item, file }) => file && !/^draft:\s*true\b/mu.test(file.frontmatter))
    .filter(({ item, file }) => (only ? only.includes(item.route) : file.words >= MIN_WORDS))
    .sort((a, b) => (b.item.volume ?? 0) - (a.item.volume ?? 0) || a.item.id - b.item.id);

  return guides.map(({ item, file }, index) => {
    const path = getContentPath(item);
    const section = path.split('/')[1];
    const { board, keyword } = BOARDS[section] ?? BOARDS.systems;
    const description = file.frontmatter.match(/^description:\s*"(.*)"\s*$/mu)?.[1] ?? '';
    const media = `/pins/${item.route}.jpg`;
    if (!existsSync(`public${media}`)) throw new Error(`Missing pin image public${media}; run npm run images:share`);
    const keywords = [...new Set([item.primaryTopic, 'hydroponics', 'indoor gardening', keyword])].join(', ');
    return {
      Title: item.title,
      'Media URL': absoluteUrl(media),
      'Pinterest board': board,
      Thumbnail: '',
      Description: `${description} Free guide from HydroRigor, with figures from university and extension research.`,
      Link: `${absoluteUrl(path)}?${UTM}`,
      'Publish date': addDays(start, Math.floor(index / perDay)),
      Keywords: keywords,
    };
  });
}

export function toCsv(rows) {
  return [HEADER, ...rows.map((row) => HEADER.map((column) => row[column]))]
    .map((cells) => cells.map(csvCell).join(','))
    .join('\n')
    .concat('\n');
}

function main() {
  const args = process.argv.slice(2);
  const option = (name) => {
    const index = args.indexOf(`--${name}`);
    return index === -1 ? undefined : args[index + 1];
  };
  const start = option('start') ?? addDays(new Date().toISOString().slice(0, 10), 1);
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(start)) throw new Error('--start must be YYYY-MM-DD');
  const rows = pinRows({ start, perDay: Number(option('per-day') ?? 1), only: option('only')?.split(',') });
  const out = option('out') ?? `docs/marketing/pinterest/pins-${start}.csv`;
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, toCsv(rows));
  console.log(`${rows.length} Pins, ${rows[0]?.['Publish date']} to ${rows.at(-1)?.['Publish date']}: ${out}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
