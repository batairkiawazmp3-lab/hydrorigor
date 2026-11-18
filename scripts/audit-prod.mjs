#!/usr/bin/env node
// Production dependency audit (npm run audit:prod, run by CI).
// Fails on any high or critical advisory in production dependencies, except advisories
// listed in audit-allowlist.json. Each allowlist entry needs an owner approval and an
// expiry date; an expired entry fails the audit, so an exception cannot outlive its review.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const BLOCKING = new Set(['high', 'critical']);

export function advisoryId(url = '') {
  const match = String(url).match(/GHSA-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}/i);
  return match ? match[0] : String(url);
}

// Returns { blocking, allowed, expired } from an `npm audit --json` (v2) report.
export function evaluateAudit(report, allowlist, today = new Date().toISOString().slice(0, 10)) {
  const active = new Map();
  const expired = [];
  for (const entry of allowlist) {
    if (!entry.id || !entry.expires || !entry.approvedBy) {
      throw new Error(`Allowlist entry needs id, expires and approvedBy: ${JSON.stringify(entry)}`);
    }
    if (entry.expires < today) expired.push(entry);
    else active.set(entry.id, entry);
  }
  const seen = new Map();
  for (const [name, vuln] of Object.entries(report.vulnerabilities ?? {})) {
    for (const via of vuln.via ?? []) {
      if (typeof via !== 'object' || !BLOCKING.has(via.severity)) continue;
      const id = advisoryId(via.url);
      if (!seen.has(id)) seen.set(id, { id, package: name, severity: via.severity, title: via.title });
    }
  }
  const blocking = [];
  const allowed = [];
  for (const advisory of seen.values()) (active.has(advisory.id) ? allowed : blocking).push(advisory);
  return { blocking, allowed, expired };
}

function runAudit() {
  try {
    return execFileSync('npm', ['audit', '--omit=dev', '--json'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  } catch (error) {
    // npm audit exits non-zero when it finds anything; the JSON is still on stdout.
    if (error.stdout) return error.stdout;
    throw error;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const allowlist = JSON.parse(readFileSync(new URL('../audit-allowlist.json', import.meta.url), 'utf8')).advisories;
  const report = JSON.parse(runAudit());
  if (report.error) {
    console.error(`npm audit failed: ${report.error.summary ?? JSON.stringify(report.error)}`);
    process.exit(1);
  }
  const { blocking, allowed, expired } = evaluateAudit(report, allowlist);
  for (const a of allowed) {
    const entry = allowlist.find((e) => e.id === a.id);
    console.log(`Allowed until ${entry.expires} (${entry.approvedBy}): ${a.id} ${a.package} [${a.severity}] ${a.title}`);
  }
  for (const e of expired) console.error(`Expired allowlist entry ${e.id} (expired ${e.expires}): re-check for a fix and remove or renew it.`);
  for (const a of blocking) console.error(`Blocking: ${a.id} ${a.package} [${a.severity}] ${a.title}`);
  if (blocking.length || expired.length) process.exit(1);
  console.log(`Production audit passed: no unlisted high or critical advisories (${allowed.length} allowlisted).`);
}
