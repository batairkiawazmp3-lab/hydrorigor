# M07 implementation reality record

Status: ACCEPTED
Exact milestone state: M07 — Quality & Observability: ACCEPTED
Independent ChatGPT audit: ACCEPTED, as communicated by the user on 2026-09-18.
Accepted final PR head: `2f573de06d4c73d3519fda667675ab1d49e0b560`.
M06 is accepted and merged at `a01934e7e2379b38249a6562f7697febddc20a2c`.

The implementation and test reports describe observed local evidence. The
performance matrix and historical failures are recorded in
`docs/research/M07_QUALITY_BASELINE.md`; no failed route may be summarized as
overall PASS. The first preserved performance collection is not proof of an
untouched M06 baseline. Recovery rebuilt the exact accepted M06 source and
measured nine routes / 27 samples with its original lockfile. This supplies
source-comparison evidence but does not retroactively satisfy the prescribed
baseline-before-optimization order; that procedural deviation is accepted by the independent M07 audit.

Prepared headers have been exercised locally, not deployed. HSTS remains an
M08 domain decision. Analytics code is prepared with official pinned Astro
integration and collection is disabled. Search Console has preparation notes
only: no property, token, connection, submission or indexing request was made.

All 25 M06 pages remain indexable and carry zero executable client scripts.
Content and commercial validators preserve the 24-source registry,
manufacturer-only reviews, strawberry provenance, sourced crop values and the
absence of affiliate destinations, prices, ratings and fabricated experience.
Pagefind, sitemap, canonicals, corrected ID 24 route and retired-route exclusions
pass local validation. Built links/assets/fragments and strict CSP checks pass.

Production dependency audit reports zero vulnerabilities. Development LHCI
advisories are separately disclosed in `TEST_REPORT.md`. Automated Chromium
and axe tests pass, including 13 representative routes and critical interaction
states. This is not comprehensive accessibility, security or legal certification.

INP is NOT field-measured preproduction. TBT is a lab proxy only. No real-user
CWV achievement is claimed. No production, domain, DNS, affiliate, analytics
activation or M08 action occurred. Implementation e80277f passed quality and
governance on push and PR events. PR #7 is the open audit vehicle.

Final local performance: PASS across 36 samples / 12 routes. Every route has
median Performance/Accessibility 100; indexable routes have SEO 100. The exact
LCP/CLS/TBT table is in the baseline document. The clean-source M06 reconstruction
completed with 25 failed baseline assertions, retained in the comparison table.
The accepted final head passed push and PR quality/governance. See TEST_REPORT
for links. The acceptance-only documentation head must pass those same gates
before the authorized squash merge, followed by merge-SHA CI verification.

## Independent audit acceptance scope

The independent ChatGPT audit accepted:

- Lighthouse CI architecture and unchanged hard budgets; the default-mobile
  12-route / 36-capture matrix; Performance >=95, Accessibility 100, SEO 100
  for indexable routes, LCP <=2.5 s, CLS <=0.1 and TBT <=200 ms as a lab proxy.
- Explicit non-measurement of field INP; INP <200 ms remains a production field
  target and is not proven by Lighthouse or TBT.
- Playwright Chromium smoke coverage, axe WCAG A/AA automated coverage,
  keyboard/focus/skip-link behavior, and built link/fragment validation.
- Clean production dependency audit, security-header configuration, strict CSP,
  script-src restrictions, script-src-attr 'none', object-src 'none',
  frame-ancestors 'none', the narrow Pagefind wasm-unsafe-eval exception and
  exact calculator SHA-256 allowance; no general unsafe-eval or unsafe-inline.
- HSTS deferral to M08; no includeSubDomains/preload assumptions.
- Analytics prepared but disabled by default (PUBLIC_ENABLE_VERCEL_ANALYTICS=false);
  Search Console preparation only, with no connection or sitemap submission.
- Zero executable client scripts on all 25 ordinary M06 editorial pages,
  preservation of all M04/M05/M06 integrity gates, and accepted final-head
  push/PR CI and governance.

## Accepted limitations and debt

The pristine accepted-M06 baseline at
`a01934e7e2379b38249a6562f7697febddc20a2c` was reconstructed AFTER M07
optimization using its original lockfile in an isolated clean worktree. This
is an accepted procedural deviation, not a claim of baseline-first measurement.
Historical failures and measurements remain unchanged.

Production dependencies are clean. The ten disclosed LHCI/dev-tool advisories
(7 high, 1 moderate, 2 low) are accepted M07 development-tool debt for future
toolchain maintenance / separately authorized M08 preflight. No forced audit
fix or breaking LHCI downgrade was performed. Field INP remains unmeasured.

M08 remains NOT_STARTED / NOT_AUTHORIZED. This acceptance authorizes only M07
documentation finalization, green-head squash merge, synchronization and
post-merge verification; it does not authorize production or service changes.
