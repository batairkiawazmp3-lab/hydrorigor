# M08 — Production Launch

Authorization: GRANTED_WITH_HUMAN_LAUNCH_GATES (owner instruction, 2026-09-19).
Status: IN_PROGRESS. M09: NOT_STARTED / NOT_AUTHORIZED.

## Authority and baseline

Read-only extraction of `docs/reference/HydroRigor_Master_Strategy.xlsx`,
`Build Milestones!A12:H12`, confirms: Domain + deploy + indexing; production
Vercel project, hydrorigor.com, sitemap submission, indexability checks,
redirects/404, backup/tag; production smoke test and Search Console URL
inspection pass; all prior milestones; production deployment; 25 pages.
The workbook's historical PLANNED cell is unchanged. The owner's current
authorization controls execution and imposes the human gates below.

M07 — Quality & Observability: ACCEPTED AND MERGED. Required baseline:
`53e80f5db2633d06d08ec4e3684820465bca7f8c`. Before edits, main and origin/main
matched this SHA, tree was clean, PR #7 was merged, and post-merge ci/quality
and governance/m00-governance succeeded. Work branch: `m08-production-launch`.

## Repository scope

Prepare production configuration, validation, governance, release/rollback and
DNS/Search Console runbooks. Preserve all 25 M06 pages and 24 editorial sources,
M04 data provenance, M05 commercial rules, route stability, zero ordinary
editorial executable scripts and every accepted M07 security/accessibility gate.
No article rewrites, articles 26–100, merchant feeds, prices, ratings, additional
affiliate relationships, new monitoring vendors, or architecture migration.

Canonical origin is exactly `https://hydrorigor.com/`. A connected www host must
permanently redirect to apex. No localhost or preview canonical/sitemap/OG URLs.
Retired `/nutrients/` and `/best/best-hydroponic-system-for-home-growers/` remain
honest 404s; no broad redirects masking missing pages. Search, 404 and accepted
development fixtures remain noindex/excluded from the sitemap.

## Mandatory human gates

Repository preparation, Git branch/PR work, local tests and authenticated
read-only inspection are authorized. No external launch mutation is authorized.
Approval is per gate, not transferable. Stop immediately before execution:

| Gate | Mutations requiring explicit owner approval | Stop state |
| --- | --- | --- |
| A | Create/link Vercel project/repository; project settings; production environment | AWAITING_OWNER_APPROVAL_GATE_A_VERCEL |
| B | Domain purchase/transfer/connection; A/AAAA/CNAME/TXT/NS or nameservers | AWAITING_OWNER_APPROVAL_GATE_B_DOMAIN_DNS |
| C | Public production deployment, preview promotion, production aliases | AWAITING_OWNER_APPROVAL_GATE_C_DEPLOY |
| D | Vercel Web Analytics activation, collection, production flag true | AWAITING_OWNER_APPROVAL_GATE_D_ANALYTICS |
| E | Search Console property/token/verification, sitemap, indexing, URL Inspection | AWAITING_OWNER_APPROVAL_GATE_E_SEARCH_CONSOLE |
| F | HSTS after HTTPS/domain scope is proven; subdomain/preload scope separately | AWAITING_OWNER_APPROVAL_GATE_F_HSTS |

No interactive login or unprovisioned secrets. If account access is unavailable,
record BLOCKED_AT_HUMAN_GATE and exact owner action; never commit tokens.
Unowned domain requires HUMAN_GATE_DOMAIN_PURCHASE_REQUIRED, current reliable
quote and unknown charges disclosed, with no purchase. Missing project requires
HUMAN_GATE_VERCEL_PROJECT_REQUIRED and a concrete configuration proposal.

Build proposal: hydrorigor / Astro / main / Node 24.x / npm ci / npm run build /
dist. Keep PUBLIC_ENABLE_VERCEL_ANALYTICS=false. No Google Analytics, pixels,
Hotjar, Sentry, advertising trackers, or implicit deployment during Git linking.
If a provider operation bundles project import and deployment, Gate A alone is
insufficient: pause for Gate C or use a verified non-deploying operation.

## Required local and CI gate

Run npm ci, npm run lint, npm run check, npm test, npm run test:data,
npm run test:commerce, npm run test:content, npm run build, npm run test:search,
npm run test:links, npm run test:security, npm run audit:prod,
npm run test:e2e, npm run test:a11y, npm run test:lighthouse. All must pass.
Add locally exercised production-safe smoke automation, with no credentials and
explicit HTTPS target. Preserve Performance >=95, Accessibility=100,
indexable SEO=100, LCP<=2500 ms, CLS<=0.1, TBT<=200 ms, 12 routes/36 captures.
Never equate TBT/Lighthouse with field INP.

Retain accepted M07 debt: baseline reconstructed AFTER optimization at M06
`a01934e7e2379b38249a6562f7697febddc20a2c` with original lockfile in clean
worktree; 10 dev-only LHCI advisories (7 high/1 moderate/2 low), production audit
clean. No npm audit fix --force or breaking downgrade to suppress advisories.
Current audit changes must be reported honestly, not forced to match old totals.

## Release sequence and acceptance

Create the four milestone artifacts and five requested launch runbooks. Separate
completed repository work, verified read-only observations, awaiting approval,
externally executed actions and independent audit. Open PR #8 after repository
preparation, require green quality/governance/repository checks; do not merge
merely because CI passes. Return one concrete approval package after preflight.

After explicit approvals, deploy only auditable accepted main SHA. Record UTC
timestamp, provider/action, non-secret IDs, verification and rollback after each
mutation. Validate actual HTTPS production, all 25 pages, representative routes,
calculator 10 L × 2 mL/L = 20 mL, search, headers/CSP, 404/retired routes, robots,
sitemap, canonical/OG URLs, console errors, analytics absence and real edge
redirects. Run production Lighthouse with unchanged thresholds. Local results
do not establish production behavior. Header mismatch stops progression.

Gate E: prefer a reasoned property selection; Domain DNS verification also
requires Gate B for the exact TXT. Submit only
`https://hydrorigor.com/sitemap-index.xml`; record representative URL Inspection
states without promising immediate indexing. Field INP may remain NOT YET
AVAILABLE — awaiting real-user field data; target <200 ms.

Gate F remains deferred until certificates, HTTPS, redirects and domain scope
are proven. No casual includeSubDomains/preload. Gate D remains optional and
disabled unless explicitly approved, followed by request/CSP/smoke verification.

Prepare rollback using accepted M07 Git SHA, but do not mislabel it an existing
production deployment. Record real deployment ID when created. Stop on 5xx,
HTTPS/canonical/noindex/CSP/accessibility/performance/DNS regressions; roll back
only if authorized and safe. Do not blindly undo DNS ownership verification.
Only after independently verified release and known exact SHA create approved
annotated tag `hydrorigor-v0.1-launch`; no provisional final tag.

Prelaunch handoff: READY_FOR_OWNER_M08_LAUNCH_APPROVAL with specific gate states.
After approved external execution: READY_FOR_CHATGPT_M08_AUDIT. Codex must not
self-accept M08. M09 needs separate authorization after M08 acceptance.
