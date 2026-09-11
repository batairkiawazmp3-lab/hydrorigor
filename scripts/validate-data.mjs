import assert from 'node:assert/strict';
import { hydroData } from '../src/data/index.ts';
import { validateHydroData } from '../src/data/validate.ts';

const validated = validateHydroData(hydroData.sources, hydroData.cropTargets);
const crops = new Set(validated.cropTargets.map(({ crop }) => crop));

assert.equal(validated.sources.length, 3, 'expected three authoritative source records');
assert.equal(validated.cropTargets.length, 8, 'expected eight context-specific crop records');
assert.deepEqual(
  [...crops].sort(),
  ['Basil', 'Lettuce', 'Pepper', 'Strawberry', 'Tomato'],
  'unexpected crop set',
);
assert.ok(validated.sources.every(({ url }) => url.startsWith('https://')));
assert.ok(validated.cropTargets.every(({ ecUnit }) => ecUnit === 'mS/cm'));
assert.ok(validated.cropTargets.every(({ sourceEcUnit }) => sourceEcUnit !== 'ppm' && sourceEcUnit !== 'TDS'));

process.stdout.write(
  `HydroRigor data verification passed: ${validated.sources.length} sources, ${validated.cropTargets.length} records, ${crops.size} crops, no ppm/TDS conversion.\n`,
);
