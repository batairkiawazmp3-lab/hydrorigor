import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { diagramFigure, stackTable } from '../src/lib/guide-media.ts';

const el = (tagName, children = [], properties = {}) => ({ type: 'element', tagName, properties, children });
const txt = (value) => ({ type: 'text', value });
const row = (tag, cells) => el('tr', cells.map((cell) => el(tag, [txt(cell)])));

test('tables with three or more columns stack on phones and keep their headings', () => {
  const table = el('table', [
    el('thead', [row('th', ['Measure', 'Target', 'Source'])]),
    el('tbody', [row('td', ['pH', '5.5–6.5', 'Oklahoma State HLA-6722'])]),
  ]);
  const stacked = stackTable(table);
  assert.deepEqual(stacked.properties.className, ['hr-table-stack']);
  assert.equal(stacked.properties.role, 'table');
  const cells = stacked.children[1].children[0].children;
  assert.deepEqual(cells.map((cell) => cell.properties.dataLabel), ['Measure', 'Target', 'Source']);
  assert.ok(cells.every((cell) => cell.properties.role === 'cell'));
  assert.deepEqual(cells[2].properties.className, ['hr-cell-source'], 'source cells are styled as citations');
  assert.equal(stacked.children[0].children[0].children[0].properties.role, 'columnheader');
  assert.equal(table.properties.className, undefined, 'the input tree is not mutated');

  const narrow = el('table', [el('thead', [row('th', ['Crop', 'Spacing'])]), el('tbody', [row('td', ['Lettuce', '6–8 in'])])]);
  assert.equal(stackTable(narrow), undefined, 'two-column tables already fit a phone');
});

test('diagrams link to their full-size file, reserve their space and carry the caption', () => {
  const src = '/images/guides/hydroponic-tower-cross-section.svg';
  const figure = diagramFigure(el('img', [], { src, alt: 'Cross-section' }), el('em', [txt('How a tower works.')]));
  assert.equal(figure.tagName, 'figure');
  const [link, caption] = figure.children;
  assert.equal(link.tagName, 'a');
  assert.equal(link.properties.href, src);
  const img = link.children[0];
  assert.equal(img.properties.alt, 'Cross-section', 'the alt text names the link');
  assert.equal(img.properties.width, 640);
  assert.equal(img.properties.height, 1110);
  assert.deepEqual(figure.properties.className, ['hr-figure', 'hr-figure-tall'], 'portrait diagrams get a narrower desktop frame');
  assert.equal(img.properties.loading, 'lazy');
  assert.ok(link.children.slice(1).every((hint) => hint.properties.ariaHidden === 'true'), 'hints are not read twice');
  assert.equal(caption.tagName, 'figcaption');
  assert.equal(caption.children[0].value, 'How a tower works.');
});

// Guide diagrams drawn before this rule landed (PR #41, 2026-11-08) used a 960-wide canvas with
// 11–16 unit labels, which shrink to about 5 px in a phone's article column; they open full size
// on tap instead. Every new diagram must be readable in place on a phone.
const LEGACY_DIAGRAMS = new Set([
  'diy-dwc-tote-build.svg',
  'diy-hydroponic-builds-compared.svg',
  'dwc-lettuce-crop-timeline.svg',
  'dwc-system-cross-section.svg',
  'indoor-crop-light-needs-dli.svg',
  'indoor-hydroponic-system-types-compared.svg',
  'lettuce-quick-reference.svg',
  'lettuce-seed-germination-timeline.svg',
  'nutrients-mixing-steps.svg',
  'strawberry-quick-reference.svg',
  'tomato-nutrient-mixing-steps.svg',
  'tomato-nutrients-by-growth-stage.svg',
]);
const PHONE_COLUMN_PX = 380;
const MIN_PHONE_TEXT_PX = 10.5;

test('new guide diagrams have phone-readable text', () => {
  const dir = new URL('../public/images/guides/', import.meta.url);
  const files = readdirSync(dir).filter((file) => file.endsWith('.svg'));
  for (const legacy of LEGACY_DIAGRAMS) assert.ok(files.includes(legacy), `${legacy} is listed as legacy but missing`);
  for (const file of files) {
    const svg = readFileSync(new URL(file, dir), 'utf8');
    assert.match(svg, /role="img"/u, `${file} needs role="img"`);
    assert.match(svg, /<title[\s>]/u, `${file} needs a <title>`);
    assert.doesNotMatch(svg, /\sstyle=/u, `${file} uses inline style; use presentation attributes`);
    if (LEGACY_DIAGRAMS.has(file)) continue;
    const width = Number(svg.match(/viewBox="[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)/u)?.[1]);
    assert.ok(width > 0, `${file} needs a viewBox`);
    const sizes = [...svg.matchAll(/font-size="([\d.]+)"/gu)].map((match) => Number(match[1]));
    const smallest = Math.min(...sizes);
    const onPhone = (smallest * PHONE_COLUMN_PX) / width;
    assert.ok(
      onPhone >= MIN_PHONE_TEXT_PX,
      `${file}: its smallest text (font-size ${smallest} on a ${width}-wide canvas) is ${onPhone.toFixed(1)} px on a phone; ` +
        `use a canvas no wider than 720 with labels of 20 or more (see CLAUDE.md, "Draw for phones")`,
    );
  }
});
