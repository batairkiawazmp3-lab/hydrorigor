# M07 test report

Validation dates: 2026-09-16–17. Node 24.18.0, Windows local build.
Source baseline: `a01934e7e2379b38249a6562f7697febddc20a2c`.

| Command | Actual result |
|---|---|
| `npm ci` | PASS — 604 packages installed from lockfile |
| `npm run lint` | PASS |
| `npm run check` | PASS — 91 files; 0 errors, warnings or hints |
| `npm test` | PASS — 96/96 unit/regression tests |
| `npm run test:data` | PASS — 3 sources, 8 records, 5 crops; no ppm/TDS conversion |
| `npm run test:commerce` | PASS — 2 source-backed product identities, 4 evidence sources; no merchants/destinations |
| `npm run test:content` | PASS — 25 production pages, 24 editorial sources |
| `npm run build` | PASS — 48 static pages; Pagefind 43 pages / 2,014 words |
| `npm run test:search` | PASS — 44 public routes including all 25 M06 pages |
| `npm run test:links` | PASS — 48 HTML files; 1,823 internal page references; 51 asset references; 56 fragments; 44 sitemap locations |
| `npm run test:security` | PASS — 7 header policies; 48 HTML files; default analytics absent; zero executable scripts across 25 M06 pages |
| `npm run audit:prod` | PASS — zero production vulnerabilities |
| `npm run test:e2e` | PASS — 22 Chromium functional tests; no unexpected console errors in monitored routes |
| `npm run test:a11y` | PASS — 17 tests; no scanned WCAG A/AA violations |
| `npm run test:lighthouse` | PASS — corrected 12-route, 36-sample default-mobile matrix; no failed assertions |
| GitHub CI | PASS — implementation e80277f, both push and PR: quality and m00-governance |

The command `audit:prod` executes `npm audit --omit=dev --audit-level=high`.
The broader advisory inventory has 10 dev-tool findings: 7 high, 1 moderate,
2 low, in the LHCI dependency tree (`@lhci/cli`, `@lhci/utils`, Lighthouse,
Puppeteer, extract-zip, tmp, inquirer, external-editor and uuid). npm's proposed
automatic fix is a breaking downgrade of LHCI to 0.1.0; it was not applied.
No `npm audit fix --force` was run. These packages are not shipped in dist.

The browser route inventory is in `tests/e2e/routes.mjs`; all required systems,
crop, nutrients, buyer, review and tool classes are covered. It preserves
noindex fixtures and honest 404 responses for both retired routes. The search
interaction locates a real M06 strawberry page as well as the calculator.
The known-answer calculator and validation status both pass under configured CSP.

## Historical failures and limits

Earlier tests exposed contrast and CSP/preview issues that were corrected.
Previous Lighthouse collections still failed TBT and some performance scores.
Their route-level numbers are retained in
`docs/research/M07_QUALITY_BASELINE.md`, along with the missing pristine-M06
baseline limitation. They are not relabeled as successful runs.

The restored-profile single-route diagnostic measured `/systems/` at
Performance 89, Accessibility 100, SEO 100, LCP 1,268 ms, CLS 0 and TBT 445 ms.
That diagnostic records the former launcher problem, not the corrected
three-sample final matrix. No field INP was measured; its <200 ms target is
deferred to authorized production measurement.

The launcher correction resolved the observed lab failures: the final matrix
has median Performance and Accessibility 100 on all 12 routes, SEO 100 on all
11 indexable routes, LCP 1,060–1,232 ms, CLS 0 and TBT 0–39 ms. Search's expected
noindex SEO 66 is excluded only from the SEO assertion. Every route's exact
medians are in the baseline evidence document. Unit tests (96/96) and smoke
tests (22/22, including the explicit no-analytics-request detector) passed again
on 2026-09-17 after their final test-only changes.

Local raw logs and recovered Lighthouse JSON are ignored under `.agent/tmp/`;
current reports are ignored under `.lighthouseci/`, `test-results/` and
`playwright-report/`. Only intentional measurement summaries are versioned.

## Baseline reconstruction and CI evidence

The untouched accepted M06 commit was rebuilt separately on 2026-09-17 using
its original lockfile: npm ci and build passed. Its nine-route / 27-sample
measurement exited 1 with 25 failed assertions against M07 budgets. The exact
median table is in the baseline document. This comparison was reconstructed
after optimization; the original baseline-first procedure was missed and is
accepted by the independent audit as a procedural deviation. It does not invalidate the passing
M07 local matrix.

Implementation `e80277f0a82d4dcce9bafba78b12b1ec08d365f3` passed all four checks:

- [push quality](https://github.com/batairkiawazmp3-lab/hydrorigor/actions/runs/35178652068): SUCCESS
- [PR quality](https://github.com/batairkiawazmp3-lab/hydrorigor/actions/runs/35178671214): SUCCESS
- [push governance](https://github.com/batairkiawazmp3-lab/hydrorigor/actions/runs/35178652083): SUCCESS
- [PR governance](https://github.com/batairkiawazmp3-lab/hydrorigor/actions/runs/35178671222): SUCCESS

These CI quality jobs include Chromium smoke, axe and all 36 Lighthouse
captures on Linux in addition to the complete static/integrity gates. The
accepted head `2f573de06d4c73d3519fda667675ab1d49e0b560` also passed all four checks:

- [PR quality](https://github.com/batairkiawazmp3-lab/hydrorigor/actions/runs/35223605209): SUCCESS
- [push quality](https://github.com/batairkiawazmp3-lab/hydrorigor/actions/runs/35223600013): SUCCESS
- [PR governance](https://github.com/batairkiawazmp3-lab/hydrorigor/actions/runs/35223605112): SUCCESS
- [push governance](https://github.com/batairkiawazmp3-lab/hydrorigor/actions/runs/35223600158): SUCCESS

Independent ChatGPT M07 audit: ACCEPTED on 2026-09-18. The ten disclosed
dev-only advisories (7 high, 1 moderate, 2 low) are accepted development-tool
debt for future toolchain maintenance / separately authorized M08 preflight.
Production audit remains clean; no forced fix or breaking downgrade was run.
Field INP remains unmeasured, with <200 ms retained as the production target.

The acceptance-only documentation head must pass full quality and governance
before squash merge; the merge SHA must pass post-merge quality/governance.
These new CI results will be reported with their exact SHAs in the final
completion report and PR #7 record, without backdating outcomes here.
