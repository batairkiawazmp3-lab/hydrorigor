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
