# M08 reality audit

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


NOT_INDEPENDENTLY_AUDITED. M08 IN_PROGRESS, not accepted.
GRANTED_WITH_HUMAN_LAUNCH_GATES. M09 NOT_STARTED / NOT_AUTHORIZED.

## REPOSITORY EVIDENCE

Baseline verified, branch created, strategy read, state reconciled, governance/
runbooks and smoke tooling prepared. Security headers unchanged; analytics false;
existing 25 pages preserved. Actual validation: TEST_REPORT.md.
Local full gate: PASS, including 98 unit, 22 Chromium, 17 axe, 44-route local
launch smoke and 36 Lighthouse captures. Final release SHA: NOT_SELECTED.
PR #8/final-head CI: use PR evidence record for exact SHA and run results.
Git fallback: 53e80f5db2633d06d08ec4e3684820465bca7f8c.
Accepted M07 chronology deviation and dev advisories remain disclosed.

## PRODUCTION EXTERNAL EVIDENCE

| Item | Actual state |
| --- | --- |
| Authentication | VERIFIED_READ_ONLY: existing CLI context |
| Hosting plan | VERIFIED_READ_ONLY: Hobby; eligible commercial plan/account decision pending |
| HydroRigor project | Gate A created and linked; see verified checkpoint below |
| Production deployment URL/id/SHA | NOT_CREATED |
| hydrorigor.com ownership | No ownership established; available, RDAP 404 |
| DNS | VERIFIED_READ_ONLY: NXDOMAIN; no changes |
| Certificate/HTTPS | NOT_VERIFIED |
| Redirects/404/edge headers/CSP | Production NOT_VERIFIED |
| Production smoke/Lighthouse | NOT_EXECUTED |
| Production robots/sitemap reachable | NOT_VERIFIED |
| Search Console property/ownership | NOT_CREATED / NOT_VERIFIED |
| Sitemap submission/URL Inspection | NOT_PERFORMED |
| Analytics | Repository DISABLED; no provider activation |
| HSTS | Repository absent/deferred; provider-default conflict unresolved |
| Release tag | NOT_CREATED |
| Production rollback point | NONE VERIFIED; Git fallback is not deployed fallback |
| Field INP | NOT YET AVAILABLE — awaiting real-user field data |

Gate A alone was approved and executed. For subsequent approvals, record
each actual action/timestamp/non-secret ID/verification/rollback in runbook ledger.
Codex does not self-accept M08 or use local checks as production proof.

## Gate A external setup evidence

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
