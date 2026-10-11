# M08 release checklist

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

## Current gate status

- [x] Owner completed Pro upgrade, purchase and apex Production attachment.
- [x] Codex read-only account/project/domain/DNS/certificate inventory verified.
- [x] Existing PR head 522cc5e has successful quality and governance.
- [ ] Reconciliation head exact quality/governance: evidence in PR #8.
- [ ] Explicit approval for controlled squash merge and first deployment.
- [ ] Exact resulting main SHA and post-merge checks recorded.
- [ ] Production smoke/accessibility/Lighthouse and independent audit.

No deployment/merge approval is implied by green CI. Optional www is separate.
Use the October controlled release plan in M08_PRODUCTION_RUNBOOK.md.

## Historical September approval package (superseded by current status)

# M08 release checklist / consolidated approval package

Current phase: Gate A complete; owner personal domain purchase pending.

- [x] Baseline clean/merged/green; m08-production-launch branch created.
- [x] Authoritative strategy read; state reconciled; M09 unauthorized.
- [x] Governance/runbooks and launch smoke tooling prepared.
- [x] Full local prelaunch gate green; results recorded.
- [x] PR #8 quality/governance green at fb73f62; keep unmerged. Any new head needs fresh CI.

## Owner approval package

Each row is separate. Unknown totals, record values and final release SHA must be
resolved before execution. Silence or approval for one gate does not authorize others.

Accessible Vercel team is Hobby, whose documented use is non-commercial/personal.
Before launch, owner must select an eligible existing plan/account or explicitly
approve a paid plan. Pro published base is USD 20/month (one deploying seat), plus
usage/add-ons/taxes; no upgrade has occurred. A plan upgrade is account-wide and
may affect other projects, so it is not bundled silently into project creation.

| Gate/action | Provider/account; public effect | Cost/reversibility | Records/env; security/rollback |
| --- | --- | --- | --- |
| A COMPLETED: create hydrorigor, Astro/main/Node24/npm ci/npm run build/dist; link only without deployment | Vercel / batairkiawazmp3-9310s-projects, owner to confirm; project metadata only | No purchase requested; verify plan/billing eligibility; settings/link reversible | Env PUBLIC_ENABLE_VERCEL_ANALYTICS=false; no DNS. Limit Git access to this repo; verify zero deployments. Restore settings/unlink only if approved. Import bundling deploy requires C. |
| B1 OWNER PERSONAL PURCHASE ONLY, automated checkout NOT_APPROVED: hydrorigor.com | Proposed Vercel Domains in confirmed owner account; registration, possibly bundled DNS | USD 11.25 first year and USD 11.25 current renewal quote; taxes/checkout fees unknown; refund not assumed | .com privacy supported, exact inclusion unverified; auto-renew defaults on. Owner enters contacts/payment privately. Verify final total and bundled DNS/renewal scope; preserve ownership. |
| B2: connect apex/optional www, exact DNS records | Vercel plus chosen DNS provider; routing/certificate effects | NOT READY: values/TTLs not yet assigned; charges unverified; propagation affects reversibility | Obtain exact A/CNAME/TXT diff; preserve MX/TXT/CAA; restore only prior approved affected values. |
| C: deploy exact reviewed main release SHA, production alias | Vercel; public HTTPS 25-page release | NOT READY: no owned domain/release SHA, HSTS conflict unresolved; hosting plan charges unverified | Analytics false; obtain incident scope; no previous production rollback ID on first launch. |
| D: Vercel Web Analytics | Deferred, not requested now; visitor data collection | No cost/activation approval now | Keep false; later A environment + D + C rebuild approvals as applicable. Verify requests/CSP/privacy; disable/rebuild to roll back. |
| E: Domain property/verification/sitemap/URL Inspection | Deferred until live HTTPS; owner Google account; search discovery/reporting | No paid purchase proposed; property/removal only by approval | Exact Google TXT requires E+B; indexing requests separate. Preserve verification record. |
| F: HSTS after HTTPS/domain proof | Deferred; browser security policy | NOT READY: Vercel default two-year HSTS conflicts with deferral; cache not instantly reversible | Resolve before C; no includeSubDomains/preload; HTTPS must remain valid. |

Gate A is complete. Owner will purchase personally; no automated checkout.
DNS and deployment require their exact later approval package.

If proposing a plan upgrade: provider Vercel, same team only if owner chooses;
account-wide billing effect, no DNS/env effect; privacy unchanged; no production
deployment implied. Reversal is a separately reviewed downgrade subject to provider
limitations and other projects, not deletion of the team. Obtain explicit total/
spend settings approval; do not assume the base fee caps usage.

Approval requirement comes from the owner's explicit M08 HUMAN LAUNCH GATES.
State: GATE_A_COMPLETE_READY_FOR_DOMAIN_OWNER_PURCHASE.
Domain connection/DNS remains AWAITING_OWNER_APPROVAL_GATE_B_DOMAIN_DNS.

## External release

- [x] A approved/executed/read-back verified; project ID and plan recorded.
- [ ] Domain purchase/control verified; exact B DNS diff approved and verified.
- [ ] Provider HSTS conflict resolved with owner before C.
- [ ] Exact reviewed main SHA, C and incident scope approved.
- [ ] Certificate/HTTPS/redirects and seven actual edge headers verified.
- [ ] Real smoke/canonicals/OG/robots/sitemap/all 25 pages pass.
- [ ] Real Lighthouse budgets pass; INP evidence separate.
- [ ] E property/verification/sitemap/representative inspection pass.
- [ ] Analytics remains disabled or D executed/verified; HSTS deferred or F
      explicitly approved after HTTPS proof; no unsupported activation claims.
- [ ] Independent ChatGPT M08 audit; no Codex self-acceptance.
- [ ] Approved annotated tag at exact independently verified release SHA;
      deployment ID/date/rollback recorded. M09 remains unauthorized.

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
