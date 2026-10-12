# M08 production runbook

## Remediation update — 2026-10-12

The October 11 production-audit blocker is locally resolved by compatible lockfile
updates; all local gates and 36-capture Lighthouse assertions pass. See
../../milestones/M08/DEPENDENCY_REMEDIATION.md for exact advisories, versions,
http-cache-semantics caveat, 21 development-only findings and recovery evidence.
Exact remediation-head CI must pass before readiness is reported in PR #8.
No merge/deploy approval is implied. The older audit-blocker text below records
the October 11 state and is superseded by this update.


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

## Historical September setup and planning

The following September record is retained for chronology. October reconciliation
and the controlled release plan below supersede pending Hobby/purchase issues and
the earlier policy that treated provider-default HSTS as a Gate F conflict.

# M08 production runbook

Status: approved Gate A project-only setup complete; no deployment.
Authorization: GRANTED_WITH_HUMAN_LAUNCH_GATES. M09 unauthorized.

## Evidence vocabulary

| State | Meaning |
| --- | --- |
| COMPLETED | Actual repository work/test with evidence |
| VERIFIED_READ_ONLY | Provider/registry observation, no change |
| AWAITING_OWNER_APPROVAL | Proposed mutation, not executed |
| EXTERNALLY_EXECUTED | Timestamped approved action, ID and verified result |
| INDEPENDENTLY_AUDITED | ChatGPT decision, never self-awarded by Codex |

Baseline/branch: COMPLETED. M07: INDEPENDENTLY_AUDITED and merged.
Current M08 local results: TEST_REPORT.md. M08 external execution: Gate A only; see ledger.
M08 independent audit: NOT_PERFORMED. Do not conflate these states.

## Read-only preflight — 2026-09-19 Asia/Karachi

Vercel CLI 59.10.0 installed; whoami returns batairkiawazmp3-9310. Accessible
scope batairkiawazmp3-9310s-projects has three unrelated projects, no HydroRigor
project and zero domains. No local .vercel/project.json. This does not establish
what exists in other accounts. Connector team list was empty; authenticated CLI
reads succeeded. The CLI update-check worker warned/timed out but account reads
succeeded. No interactive login, project create/link, settings or deploy ran.
Domain preflight: see DOMAIN_DNS_PLAN; no registration or DNS found.

Read-only /v2/teams confirms the accessible team is on Hobby. Vercel restricts
Hobby to non-commercial personal use. Do not assume HydroRigor's planned affiliate
business is eligible merely because monetization is not yet enabled. Owner must
choose an eligible account/plan or obtain provider clarification before launch.
Pro's current published platform fee is USD 20/month including one deploying seat,
plus applicable usage/add-ons/taxes. No upgrade or paid service is approved.
This account decision is part of the approval package, not an automatic upgrade.

## Approved project — Gate A applied and verified

| Setting | Value |
| --- | --- |
| Provider/account | Vercel / batairkiawazmp3-9310s-projects; owner-approved setup |
| Project/framework | hydrorigor / Astro static |
| Repository/root | batairkiawazmp3-lab/hydrorigor / repository root |
| Production branch/Node | main / 24.x |
| Install/build/output | npm ci / npm run build / dist |
| Production env | PUBLIC_ENABLE_VERCEL_ANALYTICS=false; no secret required |
| Analytics/Search Console | disabled / unconnected |
| Automatic Git deployments | disabled; Gate C required for publishing |

Official docs support static Astro without an adapter and Node 24.x. Explicit
build preserves Pagefind. No adapter/toolchain migration for disabled analytics;
recheck current integration if Gate D is later approved. vercel.json pins build
settings and git.deploymentEnabled=false; this does not prevent dashboard import
or manual deploy. Verify non-deploying operation before linking. If import bundles
publishing, Gate A alone is insufficient; stop for C or use a verified project-only
operation. Plan/billing suitability must be confirmed before any paid action.

## Ordered launch

1. Complete full local gate and PR #8 quality/governance. Keep PR unmerged until
   independent repository review and the owner-approved release sequence.
2. Present one approval package; resolve account/plan, domain quote and provider
   HSTS conflict. Approval for one gate never authorizes another.
3. Execute approved Gate A only; verify project ID/settings/Git branch/env false
   and deployment list unchanged. No hidden import-triggered publication.
4. Execute approved Gate B purchase/connection; snapshot records and obtain actual
   project-specific DNS values. Obtain exact record approval before DNS changes.
5. Gate C requires a reviewed auditable main SHA, domain plan and HSTS resolution.
   Deploy that committed SHA only, record deployment ID and source SHA. No public
   preview or local uncommitted state as a gate workaround.
6. Verify certificates/HTTPS, routes, all seven actual edge headers and smoke.
   Stop on mismatches or regression triggers in ROLLBACK_PLAN. Connect aliases
   only under B/C approvals; test HTTP→HTTPS and optional www→apex, path/query intact.
7. Run production checks; Gate E then covers property, verification, sitemap and
   URL Inspection. Exact Google TXT also needs B. Indexing is not guaranteed.
8. D remains optional/disabled; F deferred. Activations need separate approvals
   and verification. No includeSubDomains/preload without reviewed domain scope.
9. Return READY_FOR_CHATGPT_M08_AUDIT with separated evidence. Only after independent
   production verification and exact release SHA, create approved annotated
   hydrorigor-v0.1-launch tag. Do not self-accept M08; do not start M09.

## Production verification commands — after approved deployment only

```powershell
$env:PRODUCTION_BASE_URL='https://hydrorigor.com/'
npm run test:production
npm run test:lighthouse:production
```

Set PRODUCTION_CHECK_WWW=true only if www is connected. Smoke rejects missing,
insecure, preview, credentialed/non-apex targets. It checks all public routes and
25 M06 pages, headings/canonical/OG/robots, zero editorial JS, seven headers,
sitemap set, fixtures, retired/intentional 404, search, calculator 10 L × 2 mL/L,
console/tracker absence and production redirects. test:launch labels itself LOCAL
REHEARSAL and starts only loopback. Browser TLS validation is not bypassed.

Production Lighthouse reuses all M07 routes, 36 captures and locked budgets,
using HTTPS instead of staticDistDir. Archive each run before .lighthouseci is
overwritten. Field INP is separate. Manually verify certificate hostname, expiry
and chain, and nested-path/query redirects; homepage checks alone are insufficient.

## HSTS conflict — unresolved before Gate C

Vercel documents default Strict-Transport-Security max-age=63072000. Repository
omission does NOT prove absence at the edge. Smoke fails on unexpected HSTS.
Before C, resolve provider behavior versus F with the owner; no silent exception
or disabling override. Even a proposed max-age=0 override needs a scoped decision.
F activation must follow proven HTTPS/domain scope; C approval is not F approval.

## External mutation ledger

Gate A execution record follows. For each future mutation append: UTC timestamp; gate/owner approval;
provider/account; exact action; non-secret project/deployment/domain ID;
before/after state; read-back/HTTP/DNS/browser verification; rollback and result.
Never record credentials, billing details or registrant personal data.

Official references: [Astro](https://vercel.com/docs/frameworks/frontend/astro),
[Astro deploy guide](https://docs.astro.build/en/guides/deploy/vercel/),
[Node](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions),
[Git deployment switch](https://vercel.com/docs/project-configuration/git-configuration),
[provider HSTS](https://vercel.com/docs/headers/response-headers).

Plan references: [fair use](https://vercel.com/docs/limits/fair-use-guidelines),
[Pro pricing](https://vercel.com/docs/plans/pro-plan).

### Gate A ledger

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

Creation timestamp: 2026-09-24T02:12:22.390Z.
Git link timestamp: 2026-09-24T13:20:31.209Z.
Settings and local link completed 2026-09-24, read back at the time above.
Provider: Vercel. Project-only POST /v11/projects; PATCH /v9/projects/{id};
POST /v9/projects/{id}/link; local vercel link. Settings read-back and empty
GET /v6/deployments verified the result. No DNS records were changed.
Rollback: retain inactive project; settings can be restored and Git unlinked with
owner approval. No deployment exists to roll back. Do not delete the team/domain.

## Controlled Gate C release plan — NOT EXECUTED / BLOCKED BY AUDIT

Current audit finds 5 production vulnerabilities (4 high/1 moderate). The following
sequence is prepared for review only; remediation and fresh green CI are mandatory.

1. Owner approves the exact reconciliation PR #8 head recorded in the approval
   report. Recheck OPEN/unmerged, branch/head, clean tree and all exact-head CI.
   If head or base changed, stop and refresh approval. Current main baseline is
   53e80f5db2633d06d08ec4e3684820465bca7f8c. Do not deploy the pre-merge PR SHA.
2. Squash merge only after approval, without force/admin bypass:
   `gh pr merge 8 --squash --match-head-commit <APPROVED_PR_HEAD>`.
   Retain the branch. Read the actual mergeCommit.oid as RELEASE_SHA, switch main,
   pull --ff-only, verify local main == origin/main == RELEASE_SHA and clean tree.
   The resulting main SHA is NOT_YET_CREATED; inventing one now would be false.
   Confirm its tree matches the approved PR tree, and wait for post-merge quality
   and governance SUCCESS at RELEASE_SHA before any deployment.
3. Recheck Vercel project/env/domain/settings and zero deployments. Current state:
   gitProviderOptions.createDeployments=enabled at provider level, but committed
   git.deploymentEnabled=false, previewDeploymentsDisabled=true and ignored-build
   exit 0 prevent the normal Git workflow from building. deploymentPolicy=null:
   there is no deny-all deployment policy. Do not claim automatic deployments are
   globally locked. Keep these Git controls through merge and verify no deployment.
4. For this controlled build only, obtain scoped Gate A settings approval bundled
   with C to change commandForIgnoringBuildStep from exit 0 to null, and restore
   exit 0 afterward (including failure). It is a reversible project mutation.
   Do not enable Git deployments, change preview settings, enable auto domain
   assignment, install a new deployment policy or change analytics. Policy changes
   would need separate approval; none is needed for the proposed manual API build.
5. Pin the Git source to RELEASE_SHA in the following deployment body, materialized
   only after it is known. This uses committed Git source, not uncommitted files.
   Manual deployment is a real public external mutation and requires Gate C.

```json
{
  "name": "hydrorigor",
  "project": "prj_Lbm21h2zFAWCHMMwaRsh7KsHD9ee",
  "target": "production",
  "gitSource": {
    "type": "github",
    "org": "batairkiawazmp3-lab",
    "repo": "hydrorigor",
    "ref": "main",
    "sha": "<RELEASE_SHA_FROM_APPROVED_SQUASH_MERGE>"
  },
  "projectSettings": {
    "framework": "astro",
    "nodeVersion": "24.x",
    "installCommand": "npm ci",
    "buildCommand": "npm run build",
    "outputDirectory": "dist",
    "commandForIgnoringBuildStep": null
  }
}
```

Proposed command (NOT RUN):
`vercel api /v13/deployments --method POST --input <REVIEWED_RELEASE_JSON> --scope batairkiawazmp3-9310s-projects`

The projectSettings fields may persist; restoration of exit 0 is included in the
requested approval. Read back each setting mutation. Poll deployment readiness
and verify its project, target and source SHA. On ambiguous API failure, inspect
existing deployments before retrying; do not create duplicate launches blindly.
If provider blocks this request despite stated controls, stop and report instead
of silently enabling more settings.

6. autoAssignCustomDomains remains false. Once READY and source/build verified,
   under the same Gate C approval explicitly assign only the already attached
   hydrorigor.com and hydrorigor.vercel.app to the returned deployment:
   `vercel alias set <VERIFIED_DEPLOYMENT_URL> hydrorigor.com --scope batairkiawazmp3-9310s-projects`
   and the same command with hydrorigor.vercel.app. Read back aliases and test
   actual apex HTTPS. Do not attach www, change DNS, or enable another environment.
7. Record UTC timestamps, RELEASE_SHA, deployment ID/URL, aliases, all setting
   changes/restoration, verification results and rollback state. No final release
   tag until independently verified production release and approved tag creation.

### Post-deployment validation

Run `npm run test:production` with PRODUCTION_BASE_URL=https://hydrorigor.com/.
Keep PRODUCTION_CHECK_WWW unset while www is absent. This covers all 44 public
routes/all 25 M06 pages, main landings, Systems/Crops/Nutrients, buyer page ID 24,
Masterblend review, tools, search, canonicals/OG, robots, sitemap set, noindex
fixtures, genuine 404/retired routes, seven accepted headers/CSP, analytics absence,
console errors, calculator 10 L x 2 mL/L = 20 mL. Do not use local results as proof.
Inspect served JSON-LD on representative articles/buyer/review/tool pages: parse
it, compare URLs and claims to visible text, reject preview/local origins or
invented ratings/prices. Recheck all published routes against the M06 inventory.

Verify authoritative and recursive NS/A/AAAA, certificate hostname/chain/expiry,
HTTP to HTTPS redirects, apex remains canonical (including nested paths/query),
and provider domain/alias state. No redirect to www. Inspect robots.txt and
sitemap-index.xml plus child sitemaps over HTTPS; no global noindex or preview
canonical leakage. Inspect actual CSP and all other security headers. Preserve
exact calculator hash, Pagefind wasm-only exception and zero editorial scripts.
Observe/log actual provider HSTS without treating presence as failure. No custom
HSTS, includeSubDomains or preload is added; investigate unexpected scope separately.

Run `npm run test:lighthouse:production` with the same target: 12 routes x 3,
Performance >=95, Accessibility=100, SEO=100 indexable, LCP<=2500 ms, CLS<=0.1,
TBT<=200 ms. Field INP remains unmeasured, target <200 ms; TBT is not field proof.
For real-site axe/focus coverage, create an ignored temporary Playwright config
in the repository root that imports the accepted config, sets webServer=undefined
and use.baseURL to productionTarget(process.env.PRODUCTION_BASE_URL), retaining
all devices/timeouts/tests. Run the existing smoke.spec.mjs and accessibility.spec.mjs
with that config after approval. Never pass the normal localhost suite as production
evidence. Run npm run audit:prod on the exact release lockfile; require zero
production vulnerabilities. Local full stack is enforced by exact-main CI.
Analytics stays false; verify no insights requests. Search Console stays untouched.

### Approval scope, consequences and recovery

Provider/account: Vercel Pro, batairkiawazmp3-9310s-projects; GitHub PR #8.
Public effect: the first public release of the existing 25 pages on apex and the
existing Vercel host. No domain purchase or new paid upgrade; existing Pro usage
charges apply and build/traffic spending is not capped by this plan. Git squash
merge is reversible by a new revert commit, not by erasing history. Settings and
aliases are reversible, but public copies, crawler discovery, usage charges and
browser HSTS caching cannot be fully undone. No visitor analytics collection.

On critical failure, stop immediately, retain deployment/log evidence, restore
exit 0 and, if incident scope is approved, pause only hydrorigor:
`vercel api /v1/projects/prj_Lbm21h2zFAWCHMMwaRsh7KsHD9ee/pause --method POST --scope batairkiawazmp3-9310s-projects`.
Verify provider pause state and actual apex/deployment URL behavior. Do not assume
all aliases are blocked from command success alone. First launch has no previous
deployment to roll back to. Corrective/revert PR and green checks come before a
separately approved recovery deployment/resume. Preserve purchased domain, DNS,
renewal and other projects. See M08_ROLLBACK_PLAN.md.

Required owner sentence (substitute the exact reported reconciliation head):
“I approve Gate C for PR #8 at <APPROVED_PR_HEAD>: squash-merge without bypass,
wait for green checks on the resulting main SHA, temporarily clear and then
restore the ignored-build guard, deploy only that exact SHA to the existing
HydroRigor project and assign the existing apex and Vercel aliases. Keep analytics
disabled, Search Console untouched and custom HSTS absent. If the first release
critically fails, I authorize pausing only this project while preserving domain
and DNS. I do not approve www or any additional DNS change.”

Optional www approval must be separate and cover its exact provider/DNS changes.

References: [deployment API](https://vercel.com/docs/rest-api/deployments/create-a-new-deployment),
[domain redirects](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting),
[provider headers](https://vercel.com/docs/headers/response-headers),
[project pause](https://vercel.com/docs/rest-api/projects/pause-a-project).
