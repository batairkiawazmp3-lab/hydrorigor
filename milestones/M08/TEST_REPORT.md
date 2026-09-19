# M08 test report

Status: local prelaunch gate PASS (2026-09-19 Asia/Karachi).
Baseline: 53e80f5db2633d06d08ec4e3684820465bca7f8c; branch m08-production-launch.

Full ordered stack launched with PUBLIC_ENABLE_VERCEL_ANALYTICS=false:
npm ci; lint; Astro diagnostics; unit tests; data; commerce; content; build;
search; links; security; audit:prod; Chromium; axe; M08 local smoke; Lighthouse.
Raw logs: .agent/tmp/m08-preflight/. All ordered steps completed. Later unit rerun
found one stale milestone-state assertion after documentation reconciliation;
fixed the test to preserve M06 acceptance and verify gated M08 state. Initial
failure retained in test-final.log; final successful rerun in test-final-fixed.log.

| Check | Actual result |
| --- | --- |
| npm ci / lint | PASS; original lockfile unchanged |
| Astro diagnostics | PASS: 95 files, 0 errors/warnings/hints |
| Unit tests (final rerun) | PASS: 98/98, including production-target refusal and Lighthouse parity |
| M04 data | PASS: 3 sources, 8 records, 5 crops |
| M05 commerce | PASS: 2 source-backed identities, 4 sources, no merchants/destinations |
| M06 content | PASS: 25 pages, 24 sources, stable routes |
| Build / search | PASS: 48 HTML pages; Pagefind 43 pages, 2014 words; 44 public routes |
| Links / fragments | PASS: 1823 page, 51 asset, 56 fragment references; 44 sitemap locations including child sitemap |
| Security | PASS: seven headers, strict CSP, analytics disabled, zero scripts on 25 editorial pages |
| Production npm audit | PASS: 0 vulnerabilities |
| Chromium smoke | PASS: 22/22 |
| axe / keyboard / focus | PASS: 17/17 |
| M08 local launch rehearsal | PASS: 44 public routes, all 25 pages, canonical/OG/sitemap/header/functionality checks |
| Lighthouse | PASS: 12 routes × 3 = 36 captures; assertion-results.json = [] |

### Default-mobile Lighthouse route medians

All Performance/Accessibility medians are 100. SEO is 100 except intentional
noindex search (66). CLS is 0 everywhere. Default slow-4G/4xCPU/viewport unchanged.

| Route | LCP ms | TBT ms |
| --- | ---: | ---: |
| / | 987 | 4 |
| /start/ | 842 | 1 |
| /systems/ | 828 | 1 |
| /systems/indoor-hydroponic-systems-for-home/ | 923 | 0 |
| /nutrients-water/hydroponic-nutrients/ | 864 | 2 |
| /best/hydroponic-system-for-home-growers/ | 897 | 0 |
| /crops/hydroponic-strawberries/ | 870 | 1 |
| /reviews/masterblend-hydroponic-nutrients/ | 1021 | 1 |
| /tools/ph-ec-targets/ | 1196 | 2 |
| /tools/nutrient-mixing-calculator/ | 915 | 23 |
| /search/ | 959 | 0 |
| /testing-methodology/ | 856 | 0 |

One of 36 captures warned the local CPU was slower than expected; retained default
profile, no threshold relaxation. Raw matrix archived at
.agent/tmp/m08-preflight/lighthouse/. Local run finished while the interactive
session handle was lost at a resume boundary: completed autorun log, all 36 JSON
reports and empty assertion failures establish completion; no rerun was needed.

M07 historical debt retained: ten dev-only LHCI advisories (7 high/1 moderate/2 low),
clean production audit. Current M08 production audit passed. No forced fix or
breaking downgrade. Accepted post-optimization baseline chronology is unchanged.
Current npm ci audit still reports exactly 10 (7 high/1 moderate/2 low). A future
compatible transitive patch update could be evaluated in isolation with the full
locked matrix; no verified advisory-free replacement is claimed and no migration
was undertaken. npm ci also disclosed an esbuild install-script allowlist warning;
build and all runtime checks succeeded, with no allowlist mutation performed.
Field INP unmeasured; <200 ms remains field target, TBT is only lab proxy.

Production HTTPS/headers/DNS/certificates/Lighthouse/Search Console are NOT_EXECUTED.
Local results are not production evidence. PR #8 must pass quality/governance;
keep unmerged pending independent review and owner launch decisions.
Final GitHub run IDs and exact head SHA are recorded in PR #8's evidence section
after the final documentation head completes; do not backdate a CI result here.
