# M08 implementation report

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


IN_PROGRESS — repository preparation complete; approved Gate A setup complete.
Baseline 53e80f5db2633d06d08ec4e3684820465bca7f8c verified before branching.
M07 history preserved; current state reconciled. Strategy read-only at
Build Milestones!A12:H12; no workbook modification.

Updated the M06 governance test's active-milestone assertions to the M08 transition
while retaining checks of M06's independent acceptance document. The original
M06/M07 acceptance files were not edited. Target validation has negative cases and
production Lighthouse has a regression test proving unchanged M07 budgets/matrix.

Created four milestone artifacts and five launch runbooks. Explicit Astro build
configuration and git.deploymentEnabled=false added without changing seven M07
headers. .vercel ignored to avoid future linkage metadata in Git.

test:production uses explicit canonical HTTPS target; test:launch starts its own
loopback preview and is labeled local rehearsal. Coverage: public routes/all 25
pages, canonical/OG/indexability, sitemap/robots, seven headers, zero editorial
JS, fixtures/404, calculator/search, console and tracker absence. Production
Lighthouse reuses M07 thresholds/routes. CI exercises local launch smoke.

Initial September 19 preflight found no HydroRigor project/domain. Domain
quoted available at USD 11.25 for year one; RDAP 404 and DNS NXDOMAIN. At that time project
and purchase human gates were pending. Provider default HSTS is documented as a
launch prerequisite conflict. No production request or deployment performed.

Current renewal quote also USD 11.25/year; taxes/checkout fees unknown. .com privacy
is supported but exact checkout inclusion unverified. Accessible team is Hobby;
owner must settle eligible hosting account/plan before launch. No paid upgrade.

No article/data/source/merchant changes, dependency migration, lower thresholds,
analytics/Search Console/HSTS activation, DNS, purchase,
deployment or final release tag. M09 remains unauthorized. See TEST_REPORT for
actual results; M08 independent audit has not occurred.

## Approved Gate A completion — 2026-09-24

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

## October validation reconciliation

The M08 production smoke now observes/logs provider HSTS instead of failing solely
on its presence, per the owner's 2026-10-11 policy. Local rehearsal still requires
no HSTS. All seven configured headers remain exact checks; the M08 smoke configuration
check prohibits custom HSTS. No accepted M01-M07 code, data or
content, budget, dependency or CSP policy was changed.
