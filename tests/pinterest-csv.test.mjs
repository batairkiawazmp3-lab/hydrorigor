import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { HEADER, pinRows, toCsv } from '../scripts/pinterest-csv.mjs';

test('Pinterest rows follow the bulk-upload rules and point at real pin images', () => {
  const rows = pinRows({ start: '2030-01-01' });
  assert.ok(rows.length >= 10 && rows.length <= 200, `${rows.length} rows`);
  for (const row of rows) {
    assert.ok(row.Title.length <= 100, row.Title);
    assert.ok(row.Description.length <= 500, row.Title);
    assert.ok(row['Pinterest board'], row.Title);
    assert.equal(row.Thumbnail, '');
    assert.match(row['Media URL'], /^https:\/\/hydrorigor\.com\/pins\/[a-z0-9-]+\.jpg$/u);
    assert.ok(existsSync(`public${new URL(row['Media URL']).pathname}`), row['Media URL']);
    assert.match(row.Link, /^https:\/\/hydrorigor\.com\/[a-z-]+\/[a-z0-9-]+\/\?utm_source=pinterest&utm_medium=social&utm_campaign=guide-pins$/u);
    assert.match(row['Publish date'], /^\d{4}-\d{2}-\d{2}$/u);
  }
  assert.deepEqual(rows.slice(0, 3).map((row) => row['Publish date']), ['2030-01-01', '2030-01-02', '2030-01-03']);
  assert.equal(new Set(rows.map((row) => row.Link)).size, rows.length, 'one Pin per guide');
});

test('short launch guides wait for a rebuild unless named, and the CSV quotes commas', () => {
  const links = pinRows({ start: '2030-01-01' }).map((row) => row.Link);
  assert.ok(links.some((link) => link.includes('/crops/hydroponic-basil/')));
  assert.ok(!links.some((link) => link.includes('/crops/hydroponic-tomato-seeds/')));
  const named = pinRows({ start: '2030-01-01', only: ['hydroponic-tomato-seeds'], perDay: 2 });
  assert.equal(named.length, 1);

  const csv = toCsv(pinRows({ start: '2030-01-01', perDay: 2 }));
  const [header, first] = csv.split('\n');
  assert.equal(header, HEADER.join(','));
  assert.match(first, /^"?[^,]+.*,https:\/\/hydrorigor\.com\/pins\//u);
  assert.match(csv, /^"Hydroponic Tower Garden: How It Works, Crops & DIY Build",/mu);
  assert.match(csv, /^pH Meter for Hydroponics: How to Choose & Calibrate,[^,]+,Hydroponic Nutrients & pH,/mu);
  const boards = new Set(pinRows({ start: '2030-01-01' }).map((row) => row['Pinterest board']));
  const existing = ['Hydroponic Systems & DIY Builds', 'Hydroponic Nutrients & pH', 'Hydroponic Tomatoes', 'Hydroponic Lettuce & Greens'];
  assert.deepEqual([...boards].filter((board) => !existing.includes(board)), [], 'only boards that exist on the account');
});
