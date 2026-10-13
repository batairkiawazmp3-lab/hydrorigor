# Current Milestone

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


Milestone: M08 — Production Launch
Status: IN_PROGRESS
M08 authorization: GRANTED_WITH_HUMAN_LAUNCH_GATES
Previous milestone: M07 — Quality & Observability: ACCEPTED AND MERGED
M07 integration: PR #7 — SQUASH_MERGED
Verified baseline: 53e80f5db2633d06d08ec4e3684820465bca7f8c
M07 post-merge quality: SUCCESS
M07 post-merge governance: SUCCESS
Branch: m08-production-launch
Specification: milestones/M08/SPECIFICATION.md
M09 status: NOT_STARTED
M09 authorization: NOT_AUTHORIZED

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

Checkpoint: LOCAL_REMEDIATION_COMPLETE_AWAITING_EXACT_HEAD_CI
