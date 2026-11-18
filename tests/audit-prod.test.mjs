import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { evaluateAudit, advisoryId } from '../scripts/audit-prod.mjs';

const report = {
  vulnerabilities: {
    picomatch: { severity: 'high', via: [{ url: 'https://github.com/advisories/GHSA-fc5q-39xc-vjpf', severity: 'high', title: 'ReDoS' }] },
    vite: { severity: 'high', via: ['picomatch'] },
    astro: {
      severity: 'high',
      via: ['picomatch', { url: 'https://github.com/advisories/GHSA-r3h5-4585-7x3w', severity: 'moderate', title: 'Image endpoint' }],
    },
  },
};
const entry = { id: 'GHSA-fc5q-39xc-vjpf', approvedBy: 'owner', expires: '2026-12-18' };

test('advisory ids are read from advisory URLs', () => {
  assert.equal(advisoryId('https://github.com/advisories/GHSA-fc5q-39xc-vjpf'), 'GHSA-fc5q-39xc-vjpf');
});

test('an unlisted high advisory blocks', () => {
  const result = evaluateAudit(report, [], '2026-11-18');
  assert.deepEqual(result.blocking.map((a) => a.id), ['GHSA-fc5q-39xc-vjpf']);
});

test('a listed advisory is allowed only until it expires, and moderate advisories never block', () => {
  const ok = evaluateAudit(report, [entry], '2026-11-18');
  assert.equal(ok.blocking.length, 0);
  assert.equal(ok.allowed.length, 1);
  const late = evaluateAudit(report, [entry], '2026-12-19');
  assert.equal(late.expired.length, 1);
  assert.equal(late.blocking.length, 1);
});

test('a new high advisory still blocks while another is allowlisted', () => {
  const extra = structuredClone(report);
  extra.vulnerabilities.other = { severity: 'critical', via: [{ url: 'https://github.com/advisories/GHSA-aaaa-bbbb-cccc', severity: 'critical', title: 'New' }] };
  assert.deepEqual(evaluateAudit(extra, [entry], '2026-11-18').blocking.map((a) => a.id), ['GHSA-aaaa-bbbb-cccc']);
});

test('allowlist entries carry an owner approval and an expiry at most 31 days after approval', () => {
  const { advisories } = JSON.parse(readFileSync(new URL('../audit-allowlist.json', import.meta.url), 'utf8'));
  for (const a of advisories) {
    assert.match(a.id, /^GHSA-/);
    assert.ok(a.approvedBy && a.reason && a.expires, a.id);
    const approved = a.approvedBy.match(/\d{4}-\d{2}-\d{2}/)?.[0];
    assert.ok(approved, `${a.id} approvedBy needs a date`);
    assert.ok((Date.parse(a.expires) - Date.parse(approved)) / 86400000 <= 31, `${a.id} expires too late`);
  }
});
