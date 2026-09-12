import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { cropTargetSchema, sourceRecordSchema } from '../src/data/models.ts';
import { hydroData } from '../src/data/index.ts';
import { validateHydroData } from '../src/data/validate.ts';
import {
  US_GALLON_LITERS,
  calculateNutrientMix,
  convertDoseToMlPerLiter,
  convertVolumeToLiters,
  formatMeasuredAmount,
} from '../src/lib/tools/nutrient-mixing.ts';
import { requiredPublicRoutes, toolNavigation } from '../src/lib/navigation.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const closeTo = (actual, expected, tolerance = 1e-12) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} is not within ${tolerance} of ${expected}`);
};

test('source registry contains unique, complete HTTPS institutional records', () => {
  assert.equal(hydroData.sources.length, 3);
  assert.equal(new Set(hydroData.sources.map(({ id }) => id)).size, hydroData.sources.length);

  for (const source of hydroData.sources) {
    assert.ok(source.url.startsWith('https://'));
    assert.ok(source.publisher.length > 0);
    assert.ok(source.locator.length > 0);
    assert.ok(source.evidenceScope.length > 0);
    assert.match(source.accessedDate, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test('Virginia and UF/IFAS provenance corrections remain explicit and numeric selections stay unchanged', async () => {
  const virginia = hydroData.sources.find(({ id }) => id === 'virginia-tech-spes-466');
  const ifas = hydroData.sources.find(({ id }) => id === 'uf-ifas-hs1422');
  const lettuce = hydroData.cropTargets.find(({ id }) => id === 'lettuce-small-systems-ifas');
  const ledger = await read('docs/research/M04_SOURCE_LEDGER.md');

  assert.ok(virginia);
  assert.match(virginia.locator, /^SPES-466NP,/);
  assert.doesNotMatch(JSON.stringify(virginia), /VCE-466NP/);
  assert.match(ledger, /Virginia Cooperative Extension, SPES-466NP \(2023\)/);
  assert.doesNotMatch(ledger, /VCE-466NP/);

  assert.ok(ifas);
  assert.ok(lettuce);
  const provenance = `${ifas.locator} ${ifas.evidenceScope} ${ifas.notes} ${lettuce.contextNotes} ${lettuce.evidenceNotes} ${ledger}`;
  assert.match(provenance, /Plant nutrition/);
  assert.match(provenance, /Further Considerations/);
  assert.match(provenance, /1\.4–1\.8 mS\/cm/);
  assert.match(provenance, /1\.2–1\.8 mS\/cm/);
  assert.match(provenance, /not averaged|no invented reconciliation/i);
  assert.deepEqual(
    { phMin: lettuce.phMin, phMax: lettuce.phMax, ecMin: lettuce.ecMin, ecMax: lettuce.ecMax },
    { phMin: 6, phMax: 7, ecMin: 1.4, ecMax: 1.8 },
  );
});

test('crop registry has eight contextual records covering the five authorized crops', () => {
  assert.equal(hydroData.cropTargets.length, 8);
  assert.deepEqual(
    [...new Set(hydroData.cropTargets.map(({ crop }) => crop))].sort(),
    ['Basil', 'Lettuce', 'Pepper', 'Strawberry', 'Tomato'],
  );
  assert.equal(new Set(hydroData.cropTargets.map(({ id }) => id)).size, hydroData.cropTargets.length);
});

test('every crop source reference resolves and every source is used', () => {
  const sourceIds = new Set(hydroData.sources.map(({ id }) => id));
  const referenced = new Set(hydroData.cropTargets.flatMap(({ sourceRefs }) => sourceRefs));

  for (const target of hydroData.cropTargets) {
    assert.ok(target.sourceRefs.length >= 1);
    assert.ok(target.sourceRefs.every((sourceRef) => sourceIds.has(sourceRef)));
  }
  assert.deepEqual(referenced, sourceIds);
});

test('all published ranges are ordered, physically bounded, and use supported EC units', () => {
  for (const target of hydroData.cropTargets) {
    assert.ok(target.phMin >= 0 && target.phMax <= 14 && target.phMin <= target.phMax);
    assert.ok(target.ecMin >= 0 && target.ecMin <= target.ecMax);
    assert.equal(target.ecUnit, 'mS/cm');
    assert.ok(['mS/cm', 'dS/m'].includes(target.sourceEcUnit));
    assert.match(target.lastVerified, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test('crop schema rejects reversed, impossible, negative, and ppm-derived records', () => {
  const valid = hydroData.cropTargets[0];
  assert.equal(cropTargetSchema.safeParse({ ...valid, phMin: 8 }).success, false);
  assert.equal(cropTargetSchema.safeParse({ ...valid, phMax: 15 }).success, false);
  assert.equal(cropTargetSchema.safeParse({ ...valid, ecMin: 2, ecMax: 1 }).success, false);
  assert.equal(cropTargetSchema.safeParse({ ...valid, ecMin: -0.1 }).success, false);
  assert.equal(cropTargetSchema.safeParse({ ...valid, sourceEcUnit: 'ppm' }).success, false);
  assert.equal(cropTargetSchema.safeParse({ ...valid, sourceEcUnit: 'TDS' }).success, false);
});

test('source schema rejects insecure URLs and invalid access dates', () => {
  const valid = hydroData.sources[0];
  assert.equal(sourceRecordSchema.safeParse({ ...valid, url: 'http://example.edu/source' }).success, false);
  assert.equal(sourceRecordSchema.safeParse({ ...valid, accessedDate: '2026-02-30' }).success, false);
});

test('relationship validation rejects unknown refs, duplicate contexts, and unused sources', () => {
  const unknownRef = hydroData.cropTargets.map((target, index) => (
    index === 0 ? { ...target, sourceRefs: ['missing-source'] } : target
  ));
  assert.throws(
    () => validateHydroData(hydroData.sources, unknownRef),
    /references unknown source missing-source/,
  );

  const duplicateContext = [
    ...hydroData.cropTargets,
    { ...hydroData.cropTargets[0], id: 'duplicate-lettuce-context' },
  ];
  assert.throws(
    () => validateHydroData(hydroData.sources, duplicateContext),
    /Duplicate crop\/stage\/system record/,
  );

  const unusedSource = [
    ...hydroData.sources,
    { ...hydroData.sources[0], id: 'unused-source' },
  ];
  assert.throws(
    () => validateHydroData(unusedSource, hydroData.cropTargets),
    /Source unused-source is not referenced/,
  );
});

test('US gallon conversion constant and direct conversions are exact', () => {
  assert.equal(US_GALLON_LITERS, 3.785411784);
  assert.equal(convertVolumeToLiters(1, 'us-gallons'), 3.785411784);
  assert.equal(convertVolumeToLiters(10, 'liters'), 10);
  assert.equal(convertDoseToMlPerLiter(2, 'ml-per-liter'), 2);
  closeTo(convertDoseToMlPerLiter(4, 'ml-per-us-gallon'), 4 / 3.785411784);
});

test('known answer A: 10 L at 2 mL/L equals 20 mL', () => {
  const result = calculateNutrientMix({
    reservoirVolume: 10,
    reservoirUnit: 'liters',
    labelDose: 2,
    doseUnit: 'ml-per-liter',
  });
  assert.equal(result.totalMl, 20);
});

test('known answer B: 5 US gal at 4 mL/US gal equals 20 mL', () => {
  const result = calculateNutrientMix({
    reservoirVolume: 5,
    reservoirUnit: 'us-gallons',
    labelDose: 4,
    doseUnit: 'ml-per-us-gallon',
  });
  closeTo(result.totalMl, 20);
});

test('known answer C: 5 US gal at 2 mL/L equals 37.85411784 mL', () => {
  const result = calculateNutrientMix({
    reservoirVolume: 5,
    reservoirUnit: 'us-gallons',
    labelDose: 2,
    doseUnit: 'ml-per-liter',
  });
  closeTo(result.totalMl, 37.85411784);
});

test('known answer D: 10 L at 4 mL/US gal uses independent division', () => {
  const expected = 40 / 3.785411784;
  const result = calculateNutrientMix({
    reservoirVolume: 10,
    reservoirUnit: 'liters',
    labelDose: 4,
    doseUnit: 'ml-per-us-gallon',
  });
  closeTo(result.totalMl, expected);
});

test('zero, negative, NaN, and infinite calculator inputs are rejected', () => {
  for (const invalid of [0, -1, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
    assert.throws(() => calculateNutrientMix({
      reservoirVolume: invalid,
      reservoirUnit: 'liters',
      labelDose: 2,
      doseUnit: 'ml-per-liter',
    }), /Reservoir volume must be a positive finite number/);
    assert.throws(() => calculateNutrientMix({
      reservoirVolume: 10,
      reservoirUnit: 'liters',
      labelDose: invalid,
      doseUnit: 'ml-per-liter',
    }), /Label dose must be a positive finite number/);
  }
});

test('unsupported units and invalid display amounts are rejected', () => {
  assert.throws(() => convertVolumeToLiters(1, 'quarts'), /Unsupported reservoir unit/);
  assert.throws(() => convertDoseToMlPerLiter(1, 'ounces-per-gallon'), /Unsupported dose unit/);
  assert.throws(() => formatMeasuredAmount(-1), /finite, non-negative/);
  assert.equal(formatMeasuredAmount(20), '20');
  assert.equal(formatMeasuredAmount(37.85411784), '37.85');
});

test('calculator component is accessible and states every v1 assumption', async () => {
  const component = await read('src/components/tools/NutrientMixingCalculator.astro');
  const page = await read('src/pages/tools/nutrient-mixing-calculator.astro');
  const combined = `${component}\n${page}`;

  assert.match(component, /<form[^>]+novalidate/s);
  assert.match(component, /<fieldset>/);
  assert.match(component, /<label[^>]+for="reservoir-volume"/);
  assert.match(component, /<label[^>]+for="label-dose"/);
  assert.match(component, /role="status"/);
  assert.match(component, /aria-live="polite"/);
  assert.match(combined, /manufacturer(?:'s|-provided| label) actual label dose|actual dose printed by your nutrient manufacturer/i);
  assert.match(combined, /multi-part nutrient separately/i);
  assert.match(combined, /scales volume only/i);
  assert.match(combined, /does not predict final EC/i);
  assert.match(combined, /does not replace an EC meter/i);
  assert.match(combined, /No network request is needed and no input is stored/i);
  assert.doesNotMatch(combined, /fetch\(|localStorage|sessionStorage|client:(load|idle|visible|media|only)/);
});

test('pH/EC reference visibly attributes every record and explains variation', async () => {
  const page = await read('src/pages/tools/ph-ec-targets.astro');
  const table = await read('src/components/tools/PhEcTargetTable.astro');

  assert.match(page, /Reported reference ranges/);
  assert.match(page, /pH<\/strong> is dimensionless/);
  assert.match(page, /mS\/cm/);
  assert.match(page, /cultivar, growth stage, climate, system, source water, meter method, and nutrient formulation/i);
  assert.match(table, /target\.sourceRefs\.map/);
  assert.match(table, /hydroSourceById\.get/);
  assert.match(page, /target="_blank" rel="noopener noreferrer"/);
  assert.doesNotMatch(page, /<script|client:(load|idle|visible|media|only)/);
});

test('tools landing and public route inventory expose exactly both M04 outputs', async () => {
  const toolsPage = await read('src/pages/tools/index.astro');
  assert.deepEqual(
    toolNavigation.map(({ href }) => href),
    ['/tools/ph-ec-targets/', '/tools/nutrient-mixing-calculator/'],
  );
  assert.ok(toolNavigation.every(({ href }) => requiredPublicRoutes.includes(href)));
  assert.match(toolsPage, /toolNavigation\.map/);
});

test('M04 implementation adds no affiliate, price, rating, or commerce behavior', async () => {
  const files = [
    'src/pages/tools/index.astro',
    'src/pages/tools/ph-ec-targets.astro',
    'src/pages/tools/nutrient-mixing-calculator.astro',
    'src/components/tools/PhEcTargetTable.astro',
    'src/components/tools/NutrientMixingCalculator.astro',
    'src/lib/tools/nutrient-mixing.ts',
    'src/data/crop-targets/index.ts',
    'src/data/sources/index.ts',
  ];
  const forbidden = /amazon\.|amzn\.|shareasale\.|impact\.com|awin\.|clickbank\.|utm_(source|medium|campaign)=|\$\s*\d|rating\s*:|Product JSON-LD|Review JSON-LD/i;

  for (const file of files) assert.doesNotMatch(await read(file), forbidden);
});
