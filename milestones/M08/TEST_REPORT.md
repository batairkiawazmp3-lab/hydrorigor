# M08 test report

## Current launch blocker — 2026-10-11

BLOCKED — current production dependency audit fails: 5 vulnerabilities
(4 high, 1 moderate). Gate C readiness is NOT established; do not merge/deploy.
High: devalue, http-cache-semantics, sharp, source-map-js. Moderate: smol-toml.
Both human-readable and JSON npm audit --omit=dev agree; exit 1. The prior clean
September audit is preserved as historical evidence, not current assurance.
npm reports fixes available, but no dependency/lockfile change, forced audit fix,
LHCI downgrade or toolchain migration was performed in this reconciliation.
Next step requires scoped dependency remediation and full exact-head green CI.
Existing 10 LHCI dev-only advisories (7 high/1 moderate/2 low) remain the accepted
M07 historical disclosure; they do not explain away these new production findings.

Reconciliation validation: lint PASS; local 44-route/25-page launch rehearsal PASS;
security integrity PASS (7 policies, strict CSP, zero scripts on 25 editorial pages).
No production smoke was run. Existing 522cc5e CI was green; new-head CI must be
reported separately. Original PR Chrome-startup failure run 35861548521 attempt 1
and successful same-head attempt 2 remain disclosed, with no threshold change.
The prepared Gate C sequence is conditional on remediation and subsequent approval.


## Current reconciliation — 2026-10-11

HOSTING_DECISION = VERCEL_PRO_FINAL
DOMAIN_OWNERSHIP = COMPLETE
DOMAIN = hydrorigor.com
DOMAIN_PURCHASE_PRICE = USD 11.25
AUTO_RENEW = ON
DOMAIN_ATTACHED_TO_PROJECT = YES
PRODUCTION_DEPLOYMENT = NOT_YET_AUTHORIZED
ANALYTICS = DISABLED
SEARCH_CONSOLE = NOT_CONNECTED
CUSTOM_HSTS = NOT_AUTHORIZED
M09 = NOT_STARTED / NOT_AUTHORIZED

Owner completed the Pro upgrade, domain purchase and Production attachment.
Purchase price USD 11.25, renewal shown USD 11.25/year and estimated checkout tax
USD 0.00 are owner-reported purchase facts, not a newly retrieved invoice.
No external mutation was performed by Codex during this reconciliation.

Authenticated read-only API verifies Pro on team_1vAKWbbo2FshNGErHHmrMzBM
(batairkiawazmp3-9310s-projects); project hydrorigor,
prj_Lbm21h2zFAWCHMMwaRsh7KsHD9ee. GitHub batairkiawazmp3-lab/hydrorigor,
main, Astro, Node 24.x, npm ci, npm run build, dist all match.
PUBLIC_ENABLE_VERCEL_ANALYTICS=false covers production/preview/development;
webAnalytics and analytics are null. Deployment count = 0.

Domain API verifies correct team, boughtAt 2026-10-11T12:58:06Z, renew=true,
and verified=true. Project domains are hydrorigor.com and hydrorigor.vercel.app;
no www, no redirect. Apex has gitBranch=null/customEnvironmentId=null (default
Production binding), corroborating the owner's Production-screen observation.
Nameservers and intended nameservers both ns1.vercel-dns.com/ns2.vercel-dns.com;
nsVerifiedAt 2026-10-11T13:22:16.930Z. Domain config: misconfigured=false,
conflicts=[], configuredBy=A, observed A values 216.150.16.1/216.150.16.193.
These are observations, not instructions to alter DNS. Global propagation is not
proven by one provider observation. Certificate cert_SBYwhW1HuxtDUrI2VoLXJ7QG
covers hydrorigor.com, autoRenew=true, created 2026-10-11T13:04:08.500Z,
expires 2027-01-09T12:05:35Z. Actual served chain/HTTPS remains post-deploy evidence.

Canonical remains https://hydrorigor.com/. Adding www and a permanent apex redirect
is recommended as a separate Gate B/C approval, not implemented or needed for an
apex-only first launch. No Search Console connection/submission or custom HSTS.
Provider default HSTS max-age=63072000 is expected and is not itself a failure
or custom-policy approval. Record real headers after deployment; do not configure
includeSubDomains/preload. M08 remains IN_PROGRESS and not independently accepted.

The following September records are historical evidence; this October reconciliation
supersedes their pending purchase, Hobby limitation and provider-HSTS conflict states.


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

## Gate A verification — 2026-09-24

Gate A project-only setup: OWNER_APPROVED / COMPLETED / VERIFIED, 2026-09-24.
Project hydrorigor (prj_Lbm21h2zFAWCHMMwaRsh7KsHD9ee), Vercel team
batairkiawazmp3-9310s-projects (team_1vAKWbbo2FshNGErHHmrMzBM), Hobby.
GitHub batairkiawazmp3-lab/hydrorigor linked; production branch main.
Astro / Node 24.x / npm ci / npm run build / dist. Analytics flag false in
production, preview and development; Web Analytics not enabled.
Read-back 2026-09-24T13:21:36Z confirmed settings; deployment list was empty.
Local .vercel link completed. CLI generated ignored .env.local with an OIDC token;
no token was printed or committed. No interactive login occurred.
Preview deployments disabled; autoAssignCustomDomains=false; ignored-build
command exit 0. Branch vercel.json also disables Git deployments. These controls
are not a universal manual-deployment lock. Gate C still requires approval.
Deployment-policy guard was rejected with HTTP 403 on Hobby; no upgrade occurred.
Gate B automated checkout NOT_APPROVED: owner intends personal purchase.
No domain purchase/connection/DNS, deployment, analytics activation, Search Console,
custom HSTS or release tag occurred. M09 NOT_STARTED / NOT_AUTHORIZED.
M08 remains IN_PROGRESS, NOT_INDEPENDENTLY_AUDITED.
Next checkpoint: GATE_A_COMPLETE_READY_FOR_DOMAIN_OWNER_PURCHASE.

Existing full local gate was not repeated for documentation-only changes.
