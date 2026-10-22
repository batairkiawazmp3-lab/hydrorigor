# M08 implementation report

## Lighthouse recovery safe stop — 2026-10-15

M08_PRODUCTION_LIGHTHOUSE_COLLECTION_BLOCKED. Seven valid reports preserved:
/ 3/3, /start/ 3/3, /systems/ 1/3, other nine routes 0/3. Both complete route
medians pass; no /systems/ median or full-matrix assertion is possible.
/systems/ capture 2 failed NO_NAVSTART twice, exhausting its one permitted retry.
No third attempt; no valid report retried/discarded. Worst valid Performance 53,
LCP 4455.585 ms and TBT 784 ms remain disclosed variance risks. Cause of
NO_NAVSTART remains unproven; fresh profiles did not reliably prevent it.
Finally re-pause verified; apex 503 DEPLOYMENT_PAUSED reconfirmed 12:32:59Z.
Same deployment/source, zero additional deployments. Analytics false; Search
Console/custom HSTS/M09 untouched. M08 not accepted; no permanent unpause.
See M08 GATE_C_RELEASE_EVIDENCE.md and SEARCH_FAILURE_INVESTIGATION.md for
all seven scores, retry ledger, local probe, chronology and next investigation.
Earlier checkpoints below are historical.

## Second production validation checkpoint — 2026-10-15

M08_SECOND_PRODUCTION_VALIDATION_FAILED. Three cold searches and warm search
passed unchanged; 44 routes / 25 M06 pages, calculator, TLS/metadata/security,
zero-vulnerability production audit and 17/17 accessibility passed. Lighthouse
first capture failed NO_NAVSTART; 0/36 valid production reports, no medians or
budget pass claimed. Automatic re-pause verified and reconfirmed on resume:
paused=true, apex 503 DEPLOYMENT_PAUSED. Same deployment dpl_DbGiGTwLdwHvPJHoEoCPwxH8pYcX
and release 141e3716aabef104adc5319215e0ddc607512162; zero additional deployments.
Analytics disabled; Search Console/custom HSTS untouched; M09 NOT_STARTED /
NOT_AUTHORIZED. www remains unconfigured with certificate mismatch. No code,
test, configuration or timeout changes. Production stays paused pending review
of Lighthouse collection and a separately approved continuation. M08 not accepted.
See milestones/M08/GATE_C_RELEASE_EVIDENCE.md and SEARCH_FAILURE_INVESTIGATION.md
for timestamps, complete passed evidence and preserved failure history.

Earlier entries below are historical checkpoints, not the current authorization.

## Search investigation — 2026-10-14

M08_SEARCH_FAILURE_ROOT_CAUSE_UNRESOLVED. Exact-release clean install/build,
semantic index checks and unchanged local launch rehearsal pass. Three fresh
unmodified browser contexts pass the strawberry assertion. Instrumented cold/warm
and throttled runs show synthetic cold-loading latency can exceed 5000 ms while
all assets return 200 and correct results eventually render, but original production
network evidence is missing. No original production root cause is proven.
No application/test change, timeout increase, commit or new PR. Investigation
branch m08-search-production-fix is based on 141e3716aabef104adc5319215e0ddc607512162.
Production remains paused; exactly one original deployment exists. Analytics false,
Search Console untouched, no custom HSTS or M09 work. See
milestones/M08/SEARCH_FAILURE_INVESTIGATION.md for timings, asset observations,
Pagefind init semantics, evidence limitations and required next evidence.


## Gate C release attempt — 2026-10-13

Current state: PRODUCTION_ROLLED_BACK_GATE_C_FAILED.
PR #8 squash-merged to 141e3716aabef104adc5319215e0ddc607512162; exact-main
quality (38378777665) and governance (38378777968) both SUCCESS.
Owner-approved first production deployment dpl_DbGiGTwLdwHvPJHoEoCPwxH8pYcX
used that exact Git SHA and reached READY. All 44 public routes / 25 M06 pages,
calculator, headers, canonicals, robots/sitemap and zero-vulnerability production
audit passed, but the required Pagefind result was absent at the 5000 ms timeout.
Root cause remains undiagnosed; no assertion was weakened.
Approved first-release rollback paused only HydroRigor. API paused=true and apex
plus deployment URL HTTP 503 DEPLOYMENT_PAUSED verified at 16:46Z. Domain/DNS
preserved; ignored-build guard restored to exit 0. Production Lighthouse and
accessibility NOT_RUN after failure. Analytics flag false in all environments;
no activation or requests observed. Search Console untouched; no custom HSTS.
M09 NOT_STARTED / NOT_AUTHORIZED. M08 IN_PROGRESS / NOT_ACCEPTED.
See milestones/M08/GATE_C_RELEASE_EVIDENCE.md for timestamps, full evidence,
provider HSTS observations, www limitation and recovery prerequisites.
Do not resume/deploy again without recovery approval. Historical entries below
are retained; their unmerged/zero-deployment/pending-Gate-C state is superseded.


## Scoped dependency remediation — 2026-10-12

Owner authorized compatible production dependency remediation from cb6fdd83f5234228aba45cdc8663519907b2abe4.
The five production package findings have been removed from npm's audit graph:
devalue 5.9.2 -> 5.9.4; http-cache-semantics 4.2.0 -> 4.3.0;
sharp 0.35.4 -> 0.35.5 with matching platform binaries/libvips;
source-map-js 1.2.1 -> 1.2.2; smol-toml 1.8.0 -> 1.9.1.
Only compatible lockfile entries changed; package.json, Astro 7.3.2, Tailwind 4.3.0,
Node 24.x, accepted application/content/data/config and security policies unchanged.
Production JSON audit: zero vulnerabilities at every severity. Full audit: 21
DEV-ONLY findings (2 low/6 moderate/12 high/1 critical), including proxy-addr via
LHCI/Express. No forced fix, audit suppression, overrides or toolchain migration.
http-cache-semantics is a disputed advisory; 4.3.0 is outside the audit range but
is NOT claimed to be a proven upstream security fix. Actual Astro build-time use
and residual caveat are documented in milestones/M08/DEPENDENCY_REMEDIATION.md.

Local remediation gates COMPLETE: npm ci; lint; Astro diagnostics; 98 unit tests;
M04 data/M05 commerce/M06 content validators; build; search; links; security;
production audit (zero at all severities); Chromium 22/22; axe/focus 17/17;
44-route/25-page launch rehearsal; authoritative Lighthouse assertion PASS on
12 routes / 36 mobile captures. Exact-head GitHub CI is required after this commit;
its SHA/run evidence will be attached to PR #8 without changing the tested head.

 October audit failure, September clean audit,
Chrome startup failure/retry and the interrupted local build OOM remain historical
evidence below. M08 is not accepted; PR #8 must remain open/unmerged. No deployment,
analytics activation, Search Console change, custom HSTS, DNS change or M09 work.


## Historical launch blocker — 2026-10-11

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
