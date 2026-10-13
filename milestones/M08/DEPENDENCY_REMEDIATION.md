# M08 production dependency remediation — 2026-10-11

Status: IMPLEMENTED; full local validation PASS; exact-head CI pending push. PR #8 stays open/unmerged.
Baseline: cb6fdd83f5234228aba45cdc8663519907b2abe4.

## Failure and scope

October audit at the baseline found five vulnerable production dependency nodes
(4 high/1 moderate), covering ten advisories. CI stopped at Production dependency
audit after earlier steps passed; Chromium/axe/launch/Lighthouse were skipped.
September clean-audit evidence and prior Chrome startup failure/successful retry
are retained, not rewritten. Current advisories are time-dependent evidence.

Evidence: npm audit --omit=dev --json, npm ls and npm explain for each package;
GitHub advisory API and published npm package metadata/source. Raw inspection logs
are in ignored .agent/tmp/m08-remediation-* and m08-cache-*; no secrets included.

## Decision reported before package edits

Target compatible transitive versions within existing parent ranges. No direct
package change is needed: Astro remains 7.3.2, Tailwind 4.3.0, Node 24.x.
Changing direct framework dependencies would expand the diff unnecessarily.
No overrides, downgrade, major upgrade, audit suppression or forced fix.
Command: npm update devalue http-cache-semantics sharp source-map-js smol-toml
--package-lock-only --ignore-scripts, followed by npm ci.

| Package | Installed before | After | Parent range | Relationship / production graph |
| --- | --- | --- | --- | --- |
| devalue | 5.9.2 | 5.9.4 | Astro ^5.8.1 | Transitive; yes |
| http-cache-semantics | 4.2.0 | 4.3.0 | Astro ^4.2.0 | Transitive; yes |
| sharp | 0.35.4 | 0.35.5 | Astro optional ^0.35.4 | Transitive optional; yes |
| source-map-js | 1.2.1 | 1.2.2 | ^1.2.1 / ^1.0.1 | Transitive; yes |
| smol-toml | 1.8.0 | 1.9.1 | Astro/helpers ^1.6.0 | Transitive; yes |

The proposed devalue minimum was 5.9.3; npm selected compatible patch 5.9.4.
Sharp platform packages move 0.35.4 to 0.35.5; accompanying libvips packages
1.3.3 to 1.3.4 across supported platforms. Only package-lock.json is changed
among dependency manifests; package.json remains byte-for-byte unchanged.

## Advisory inventory

Medium in GitHub API corresponds to npm moderate. A blank CVE means no CVE is
assigned in the retrieved GitHub record, not an assertion that none can exist.

| Package | Advisory | CVE | Severity | Vulnerable range | First patched version |
| --- | --- | --- | --- | --- | --- |
| devalue | [GHSA-j22f-vq7h-c4qm](https://github.com/advisories/GHSA-j22f-vq7h-c4qm) | CVE-2026-92708 | high | >= 5.1.0, <= 5.9.2 | 5.9.3 |
| devalue | [GHSA-hx4r-w6wj-j8fg](https://github.com/advisories/GHSA-hx4r-w6wj-j8fg) | Not assigned in record | medium | <= 5.9.2 | 5.9.3 |
| devalue | [GHSA-mcm9-63f2-9j32](https://github.com/advisories/GHSA-mcm9-63f2-9j32) | Not assigned in record | high | <= 5.9.2 | 5.9.3 |
| devalue | [GHSA-wf3x-273g-mvxv](https://github.com/advisories/GHSA-wf3x-273g-mvxv) | Not assigned in record | low | >= 1.0.0, <= 5.9.2 | 5.9.3 |
| devalue | [GHSA-x5rw-q4pp-hg5g](https://github.com/advisories/GHSA-x5rw-q4pp-hg5g) | Not assigned in record | high | >= 5.8.0, <= 5.9.2 | 5.9.3 |
| devalue | [GHSA-4q55-j62x-fr9h](https://github.com/advisories/GHSA-4q55-j62x-fr9h) | Not assigned in record | medium | <= 5.9.2 | 5.9.3 |
| http-cache-semantics | [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp) | CVE-2026-93748 | high | <= 4.2.0 | None listed; see disputed finding below |
| sharp | [GHSA-wq5f-xc86-pv6w](https://github.com/advisories/GHSA-wq5f-xc86-pv6w) | Upstream CVE-2026-96889 | high | < 0.35.5 | 0.35.5 |
| smol-toml | [GHSA-r4xh-jqrq-34v2](https://github.com/advisories/GHSA-r4xh-jqrq-34v2) | Not assigned in record | medium | <= 1.8.0 | 1.9.0 |
| source-map-js | [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q) | CVE-2026-93749 | high | >= 1.0.0, < 1.2.2 | 1.2.2 |

## Chains and actual exposure

- devalue: HydroRigor -> astro@7.3.2 -> devalue. Used by Astro content data-store
  serialization at build time; actions/session runtime also imports it, but this
  application defines neither server actions nor sessions and builds static output.
  Shared memory, malformed objects, sparse-array expansion and asynchronous rejection
  triggers were not identified in trusted content inputs. No vulnerable serializer
  is intentionally shipped as a visitor-facing service. This is source/config
  analysis, not exhaustive exploit testing; build dependencies are still remediated.
- http-cache-semantics: HydroRigor -> astro@7.3.2 -> http-cache-semantics.
  Astro assets/build/remote.js uses CachePolicy.storable/timeToLive for build-time
  remote images. It does not invoke satisfiesWithoutRevalidation with visitor
  max-stale headers. Source has no astro:assets usage or remote image service route;
  output is static, with no shared session cache shipped. See dispute below.
- sharp: HydroRigor -> astro@7.3.2 -> optional sharp -> @img platform binaries and
  libvips. The issue concerns librsvg decoding on glibc Linux, potentially RCE under
  specified runtime conditions. Windows-only testing is insufficient, so Linux CI
  and all cross-platform lock entries are required. No user-upload/image transform
  endpoint is shipped; no source astro:assets imports were found. Build-image tools
  remain in the production npm graph and are updated, not exempted.
- source-map-js: HydroRigor -> @tailwindcss/vite@4.3.0 -> @tailwindcss/node@4.3.0
  -> source-map-js; also Astro -> Vite -> PostCSS -> source-map-js, Astro -> magicast
  -> source-map-js, and Astro -> svgo -> css-tree / csso -> css-tree -> source-map-js.
  Additional css-tree path: Astro -> unifont -> css-tree. These are CSS/source-map
  build transformations; attacker-controlled indexed source maps are not accepted
  by a deployed Node service. Build tooling can consume maps, so update all deduped
  instances rather than claiming the package is dev-only.
- smol-toml: HydroRigor -> Astro -> smol-toml, and HydroRigor -> @astrojs/mdx ->
  @astrojs/internal-helpers -> smol-toml (Astro and markdown helpers share it too).
  Astro config/content loaders use TOML parsing. Current config is JS and content
  is MDX; no TOML data/config inputs or visitor TOML parser were found. Adversarial
  long-key parsing is not an identified application path; compatible parser update
  protects build tooling without schema changes.

All five are present in the production dependency graph because build/framework
packages are declared dependencies. That does not mean their Node implementations
are served in dist. Static architecture and zero ordinary editorial JS are checked
again by build/security/browser gates; exposure analysis is not audit suppression.

## http-cache-semantics: disputed advisory, not a proven security patch

GitHub GHSA-ch52-4w7c-c8xp/CVE-2026-93748 lists <=4.2.0 with no patched release.
The maintainer disputes the report and closed issue #56 as not planned:
https://github.com/kornelski/http-cache-semantics/issues/56.
Published 4.3.0 is compatible with Astro's range and is outside the audit range.
Inspection shows the disputed cookie-only max-stale behavior persists; do not
claim 4.3.0 fixes it. The release also changes Vary matching and response status.

A scratch test initially asserted that satisfiesWithoutRevalidation alone rejects
private entries; it failed. That assertion omitted the required storage-eligibility
check. Corrected checks confirm storable() rejects private and no-store responses;
the cookie-only max-stale probe still returns true. Both observations are retained.
Astro's actual caller performs storable() and does not implement the affected
visitor cache path. Updating to supported 4.3.0 is a compatible maintenance refresh,
not deletion/ignoring of the advisory or proof of a universal cache security fix.
If HydroRigor later adds an authenticated shared cache/SSR, reassess explicitly.
No custom patched fork or architecture change is justified for this static site.

## Validation

Local remediation gates COMPLETE: npm ci; lint; Astro diagnostics; 98 unit tests;
M04 data/M05 commerce/M06 content validators; build; search; links; security;
production audit (zero at all severities); Chromium 22/22; axe/focus 17/17;
44-route/25-page launch rehearsal; authoritative Lighthouse assertion PASS on
12 routes / 36 mobile captures. Exact-head GitHub CI is required after this commit;
its SHA/run evidence will be attached to PR #8 without changing the tested head.

No merge/deployment, analytics activation, Search Console, custom HSTS or M09 work.

## Development-only debt snapshot — 2026-10-11

The current full npm audit reports 21 development-only package findings:
2 low, 6 moderate, 12 high and 1 critical. Production-only JSON audit reports
zero in every severity. This differs from the historical M07 ten-finding snapshot;
that earlier evidence is retained. No LHCI/dev dependencies were updated in this
scope. The critical finding is proxy-addr@2.0.7, GHSA-jqcg-44mw-7w3h, through
HydroRigor -> dev @lhci/cli@0.15.1 -> express@4.22.3 -> proxy-addr ~2.0.7.
This is not deployed application code, but it remains toolchain debt for explicit
future maintenance. Do not expose the LHCI development server as a trusted proxy.
No audit ignore rule, forced fix, LHCI downgrade or threshold relaxation was added.

## Interrupted-run chronology — preserved

npm ci, lint, Astro diagnostics (95 files; 0 errors, 0 warnings, 1 hint), 98 unit
tests and M04/M05/M06 validations passed on October 11. The first build exited
134 with Node Zone Allocation failed / out-of-memory. On October 12, resumed from
logs without resetting/reinstalling or repeating completed checks. The failed
build was retried unchanged and passed; no process killing or threshold change.
Build produced 48 HTML pages; Pagefind indexed 43 pages/2014 words. Link validation
covered 1823 page links, 51 asset links, 56 fragments and 44 sitemap locations.
Security verified 7 policies and zero ordinary editorial scripts on all 25 pages.

## Lighthouse recovery and complete medians — 2026-10-12

The original collection process ended after 12 valid captures (first four routes).
Those JSON/HTML reports were copied intact to ignored m08-lighthouse-preserved.
A temporary continuation config initially had an incorrect relative require path;
it failed before collection and was corrected. That failure log is preserved.
Only the missing eight routes (24 captures) were collected, using the original
configuration with only the URL subset changed. No captures were cherry-picked.
Combined all 36 originals; verified exactly three valid runs per expected route,
then ran the authoritative assertion command against the full unchanged config:
node node_modules/@lhci/cli/src/cli.js assert --config=lighthouserc.cjs.
Result: exit 0, 12 URLs/36 runs, assertion-results.json empty (no violations).
Different local server ports reflect the interruption, not different targets or
budgets. Default mobile simulated throttling, 4x CPU and all budgets unchanged.

| Route | Performance | Accessibility | SEO | LCP ms | CLS | TBT ms |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| / | 100 | 100 | 100 | 1423.3 | 0 | 64 |
| /start/ | 100 | 100 | 100 | 1079.2 | 0 | 10 |
| /systems/ | 100 | 100 | 100 | 1009.3 | 0 | 8 |
| /systems/indoor-hydroponic-systems-for-home/ | 99 | 100 | 100 | 1315.2 | 0 | 35 |
| /nutrients-water/hydroponic-nutrients/ | 100 | 100 | 100 | 1125.6 | 0 | 52.5 |
| /best/hydroponic-system-for-home-growers/ | 100 | 100 | 100 | 1040.5 | 0 | 1 |
| /crops/hydroponic-strawberries/ | 100 | 100 | 100 | 928.2 | 0 | 1.5 |
| /reviews/masterblend-hydroponic-nutrients/ | 100 | 100 | 100 | 1026.9 | 0 | 3 |
| /tools/ph-ec-targets/ | 100 | 100 | 100 | 1001.5 | 0 | 4.5 |
| /tools/nutrient-mixing-calculator/ | 100 | 100 | 100 | 935.6 | 0 | 1 |
| /search/ | 100 | 100 | 66 | 964.9 | 0 | 0 |
| /testing-methodology/ | 100 | 100 | 100 | 878.0 | 0 | 2.5 |

All median budgets PASS: Performance >=95, Accessibility=100, indexable SEO=100,
LCP<=2500 ms, CLS<=0.1, TBT<=200 ms. Search SEO=66 is expected for the intentionally
noindex search page and is excluded only by the existing M07 rule. Field INP is
NOT_MEASURED; <200 ms remains a field target, not a conclusion from TBT.

## Scope and external verification

Full semantic lockfile review: exactly 31 intended entries changed, no root
metadata changes, no added/removed packages; changes limited to version/resolved/
integrity and matching Sharp binary dependency references. package.json unchanged.
No application, content, schemas, affiliate data, canonical, CSP/security headers,
analytics gate, Search Console or custom HSTS changes in this remediation.
Vercel authenticated GET read-back on October 12: deployments=[]; project
prj_Lbm21h2zFAWCHMMwaRsh7KsHD9ee webAnalytics=null and analytics flag false for
production/preview/development. No external mutation was performed. M09 remains
NOT_STARTED / NOT_AUTHORIZED. PR #8 remains open/unmerged; gate C is not authorized.
