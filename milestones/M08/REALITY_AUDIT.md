# M08 reality audit

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
