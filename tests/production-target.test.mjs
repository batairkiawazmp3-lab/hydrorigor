import test from 'node:test';
import assert from 'node:assert/strict';
import { productionTarget } from '../scripts/production-target.mjs';
import { createRequire } from 'node:module';

test('production smoke refuses absent, insecure, preview and credentialed targets', () => {
  for (const target of [undefined, '', 'http://hydrorigor.com', 'http://localhost:4321',
    'https://hydrorigor.vercel.app', 'https://www.hydrorigor.com',
    'https://owner:secret@hydrorigor.com', 'https://hydrorigor.com/start/',
    'https://hydrorigor.com/?token=secret', 'https://hydrorigor.com/#fragment']) {
    assert.throws(() => productionTarget(target));
  }
  assert.equal(productionTarget('https://hydrorigor.com/'), 'https://hydrorigor.com');
});

test('production Lighthouse preserves the complete M07 matrix and budgets without a local server', () => {
  const require = createRequire(import.meta.url);
  const previous = process.env.PRODUCTION_BASE_URL;
  process.env.PRODUCTION_BASE_URL = 'https://hydrorigor.com/';
  try {
    const local = require('../lighthouserc.cjs');
    const production = require('../lighthouserc.production.cjs');
    assert.deepEqual(production.ci.assert, local.ci.assert);
    assert.deepEqual(production.ci.collect.settings, local.ci.collect.settings);
    assert.equal(production.ci.collect.numberOfRuns, 3);
    assert.equal(production.ci.collect.staticDistDir, undefined);
    assert.deepEqual(production.ci.collect.url,
      local.ci.collect.url.map((url) => `https://hydrorigor.com${new URL(url).pathname}`));
    assert.equal(production.ci.collect.url.length, 12);
    assert.equal(production.ci.upload.target, 'filesystem');
  } finally {
    if (previous === undefined) delete process.env.PRODUCTION_BASE_URL;
    else process.env.PRODUCTION_BASE_URL = previous;
  }
});
