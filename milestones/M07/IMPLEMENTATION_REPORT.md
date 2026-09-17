# M07 implementation report

M06 baseline: `a01934e7e2379b38249a6562f7697febddc20a2c`, accepted and
squash-merged through PR #6. Branch: `m07-quality-observability`.
M07 is authorized; independent acceptance has not occurred. M08 is unauthorized.

The original task verified the clean synchronized baseline, branch creation
and read-only workbook row. Recovery reused that completed evidence. The
workbook row is: performance/security/accessibility/analytics; outputs headers,
analytics, Search Console prep, Lighthouse CI, Playwright smoke and broken-link
checks; acceptance CWV/lab budgets and accessibility gate; M01–M06 dependency;
preview only. The workbook was not modified.

## Changes

- Pinned `@vercel/analytics` 2.0.1, `@playwright/test` 1.63.0,
  `@axe-core/playwright` 4.13.0 and `@lhci/cli` 0.15.1. TypeScript now pins
  the previously resolved 6.0.3; Astro/Tailwind architecture is unchanged.
- Prepared seven Vercel-compatible headers with strict self-origin CSP, the
  exact calculator script hash and the narrow Pagefind WASM exception. No
  deployment occurred. HSTS is deferred to production-domain review in M08.
- Extracted the unchanged search behavior into a same-origin public module.
  The 404 no longer emits a canonical for a nonexistent route.
- Removed external Google font loading. Existing family stacks use system
  fallbacks. Corrected link/hero contrast and made skip-to-main focus testable.
- Added a built-static test server applying the actual header configuration,
  real 404 status, MIME types and constrained dist-path resolution.
- Corrected the manually managed Lighthouse browser to inherit the pinned
  launcher's standard flags. Windows temporary-profile cleanup and final
  keep-alive release remain automated; all failing assertions exit nonzero.
- Added 22 Chromium smoke scenarios, 17 axe/focus scenarios, 12-route repeated
  mobile Lighthouse configuration, built-link and bounded security validators.
- Extended CI with all M07 gates while preserving M01–M06 checks. Reports stay
  ignored. Lighthouse uses default mobile simulation and unchanged thresholds;
  medians aggregate three samples per route. Search alone excludes SEO scoring.
- Gated the official Astro analytics component behind an explicit build flag,
  disabled by default; documented future activation and Search Console setup
  without account changes, tokens, connections or sitemap submission.
- Restored the original authorization verbatim as `SPECIFICATION.md`, created
  evidence documents and replaced stale M06-only handoff content.

## Recovery corrections

The interrupted implementation omitted three required article routes, retained
an HSTS assumption and had just edited CPU slowdown to 1.2x. Recovery added the
systems/nutrients/buyer routes, removed HSTS and restored the complete default
mobile profile. It also strengthened public-fixture/canonical validation and
search coverage. None of these changes reimplements completed M06 content.

Historical failed measurements remain summarized in
`docs/research/M07_QUALITY_BASELINE.md`. The first preserved collection already
contained M07 changes. Recovery rebuilt exact accepted commit a01934e in an
isolated worktree with its original lockfile and measured all nine required
routes three times. The baseline-first chronological requirement was missed;
the retrospective reconstruction and its 25 failed assertions are disclosed.

## Integrity and external effects

All 25 production pages, 24 editorial sources, strawberry provenance, sourced
pH/EC values and manufacturer-only review boundaries remain intact. No content
IDs 26–100, merchants, affiliate relationships, ratings or prices were added.
Package/advisory services and official public documentation were read. Existing
GitHub authentication was used to push the authorized branch, create PR #7
and read its CI checks; no credential value was printed. No production service, domain, DNS or deployment was changed.

Actual gate results and remaining blockers are recorded in `TEST_REPORT.md`
and `REALITY_AUDIT.md`; this implementation report does not certify acceptance.

## Delivery

Implementation commit: `e80277f0a82d4dcce9bafba78b12b1ec08d365f3`.
Pull request: [#7](https://github.com/batairkiawazmp3-lab/hydrorigor/pull/7).
All implementation-head push/PR quality and governance checks succeeded.
Documentation-only finalization records baseline comparison, CI and handoff;
its exact head must also pass before independent audit. No merge is authorized.

40 files changed: state/handoff and README; CI/ignore/package configuration;
four M07 milestone documents; three research and two launch documents;
Lighthouse/Playwright configuration; four quality/server scripts; search module;
analytics/SEO/layout and minimal page/style fixes; updated regression tests
and three browser-suite files. No accepted content, data or workbook changed.
