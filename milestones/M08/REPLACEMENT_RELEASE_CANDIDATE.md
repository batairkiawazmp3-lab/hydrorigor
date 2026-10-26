# M08 replacement release candidate

Owner authorization: repository preparation and full non-production validation only. Production must remain paused. No merge/deploy/promote/unpause, DNS, analytics, Search Console, custom HSTS or M09 action.

## Source and scope

Historical PR #8 merged on 2026-10-13T09:46:57Z, squash141e3716aabef104adc5319215e0ddc607512162. Existing deployment dpl_DbGiGTwLdwHvPJHoEoCPwxH8pYcX remains on that source. Replacement candidate is the exact head of the new unmerged PR from m08-search-production-fix; record the SHA and exact checks in its PR description/final handoff, avoiding self-referential documentation hashes.

Compared with existing main: no application/content/schema/SEO/security-header modifications. Runtime dependency change is the scoped Vite8.3.0→8.3.3 lockfile remediation, required Rolldown/bindings1.2.8→1.2.11 and types0.149.0→0.151.0. Upstream bundled launch-editor2.14.1→2.14.2. package.json unchanged. Also included: investigation evidence, pinned Ubuntu CI, diagnostic/production Lighthouse tooling and official automation-header safety. Original failures/outliers and subsequent recoveries remain disclosed. Historical request JSON remains untouched; it is not fresh authorization.

## Fresh validation

The candidate push/PR runs full Ubuntu24.04 CI: npm ci, lint, Astro check, secret-safety sentinel tests, unit tests, M04/M05/M06 integrity, build, search/links/security, production audit, Chromium smoke, axe/focus accessibility,44-route local launch rehearsal,12-route×3 mobile Lighthouse and governance. No production HTTP measurement or real automation credential is used. Results are pending until exact-head workflows finish; prior results are historical only. CI secret-safety step is now explicit.

## Proposed integration and deployment decision (not executed)

1. Review exact candidate PR head and require green quality/governance. Owner separately approves integration/deployment scope. No auto-merge or force merge.
2. If approved, squash merge to main and capture the actual resulting SHA; rerun/wait for exact-main quality/governance and exact-release production audit. Never deploy the old141e release as though the branch fix were included.
3. Update production validation pins in a reviewed harness-only follow-up to that actual approved source SHA, with no trigger-file change. Existing pins intentionally remain141e until the real replacement release is known. Revalidate secret safety, Chrome .39/.84 exact allowlist, Node24.21.0, Ubuntu24.04, Lighthouse12.6.1,35-second pacing,36 fresh captures, median budgets, no retries and stop-on-invalid.
4. A replacement deployment is an external mutation: owner must explicitly approve exact SHA, project, settings/alias scope and rollback procedure. Verify source and resulting deployment before any access. Keep analytics false; clarify provider Web Analytics configuration ID without assuming it proves client collection. No DNS or other gates included.
5. Owner-controlled public window only after deployment/readiness approval. Confirm HTTP200 and correct source, trigger by a new authorized request-file commit, collect one homogeneous fresh36-report production matrix. Old partial reports never count. Owner re-pauses on completion, failure, cancellation or timeout. No automatic provider controller.
6. Inspect SAFE_TO_UPLOAD, sanitized artifacts,36unique URLs/captures, all median assertions and outliers; rerun real smoke/security/metadata/search/calculator/accessibility for the replacement deployment. Independent M08 review and separate permanent-launch approval remain required. Search Console/indexing, release tag and www scope remain separate outstanding decisions.

Rollback readiness: preserve original deployment/incident history, domain and DNS. Original deployment is not a clean-audit known-good fallback. Until an approved safe replacement is verified, paused state is the fallback. Never restore public access to a known-failing release automatically.

## Post-merge verification and separate validation-pin reconciliation — 2026-10-23

The earlier candidate/pending language above is historical. Owner-approved PR #9 was squash-merged on 2026-10-22T18:12:37Z from head `712788c44a3b30a3b38f3c3cbb6856a6cd239f84`. The resulting verified main/replacement source is `625ba09db5f2891156e8324bafcb7616f1628c8f`.

Exact-source quality run **39829340680** and governance run **39829340764** both completed SUCCESS. Quality evidence: production audit found **0 vulnerabilities**, locked Vite **8.3.3**, Chromium **22 passed**, accessibility **17 passed**, local launch rehearsal **44 public routes / all 25 M06 pages**, and Lighthouse assertions over **12 URLs / 36 runs passed**. These are local/CI results, not production acceptance. Field INP remains unmeasured.

Read-only Vercel project verification on 2026-10-23 returned `paused: true` for `prj_Lbm21h2zFAWCHMMwaRsh7KsHD9ee`. No deployment or provider mutation was performed. The existing deployed source remains the historical PR #8 release; it has not been replaced by merging PR #9.

The separate `codex/m08-replacement-validation-pins` branch changes only the four production-workflow source/request guards and the collector source SHA to the verified replacement SHA, plus this evidence. Main is not edited directly. Diagnostic historical pins, request JSON, dependency files, application/content/schema, budgets, median semantics, browser allowlist, pacing, sanitization and SAFE_TO_UPLOAD remain unchanged. The request file still names the old source and is deliberately not a new authorization.

Before a later owner-authorized production window, the reviewed pin changes must be integrated into the workflow trigger branch `m08-search-production-fix` without modifying the request file. Only after separate deployment/access approval and owner confirmation may a fresh matching request commit trigger collection. This PR neither triggers collection nor authorizes access. Final acceptance still requires one fresh homogeneous 36-report production matrix plus replacement-production smoke/security/accessibility evidence.

### Proposed replacement deployment — not executed

After separate owner approval, reverify the exact SHA, paused project/settings, analytics=false and green checks. Proposed action is `vercel api /v13/deployments --method POST --input <reviewed-payload.json> --scope batairkiawazmp3-9310s-projects`, with project `prj_Lbm21h2zFAWCHMMwaRsh7KsHD9ee`, name `hydrorigor`, target `production`, and GitHub gitSource org `batairkiawazmp3-lab`, repo `hydrorigor`, ref `main`, **sha `625ba09db5f2891156e8324bafcb7616f1628c8f`**. Reverify API support and ignored-build settings before execution; any required settings override, promotion or alias assignment must be expressly included in the deployment approval. Do not deploy an ambiguous branch tip or local working tree. Verify returned source SHA and deployment status before proposing owner-controlled access. No public unpause is included in this preparation.

Rollback sequence: stop validation on critical failure, preserve sanitized evidence, have the owner retain/restore the approved paused state, verify paused/503, and retain DNS/domain configuration. Do not automatically restore public access to the old Vite-vulnerable deployment. Any code rollback uses a reviewed revert PR, not history rewriting. Remaining risks include incomplete production acceptance, provider/browser drift, previously observed performance variance and mitigation challenges, www configuration, development-tool audit debt, and separate Search Console/final-launch gates. Analytics, Search Console, custom HSTS and M09 remain unchanged; M08 is not accepted.


## Security-clean main and separate pin reconciliation — 2026-10-25

The PR #9 source and proposed deployment SHA above are historical and superseded. Owner-approved PR #10 was squash-merged at 2026-10-25T08:48:52Z from `44bf0eac86142efa7f7d9e452d27dfaac29312d2`, producing main `50966ce935cb2b7dbdc1ea3b4630b9feb1e9f50d`. Exact-main quality **40178115836** and governance **40178115964** both completed SUCCESS. Production audit found **zero vulnerabilities**; resolved versions are Astro **7.3.3**, Vite **8.3.3**, undici **8.12.3** and zod **4.6.7**. Chromium **22/22**, accessibility **17/17**, the **44-route/all 25 M06 pages** local rehearsal, and unchanged Lighthouse assertions over **12 routes × 3 captures = 36 runs** passed. These results are CI evidence, not live production acceptance.

Read-only verification on 2026-10-25 confirmed project `prj_Lbm21h2zFAWCHMMwaRsh7KsHD9ee` has `paused=true`; apex returned HTTP **503 DEPLOYMENT_PAUSED**. Exactly one deployment remains: `dpl_DbGiGTwLdwHvPJHoEoCPwxH8pYcX`, source `141e3716aabef104adc5319215e0ddc607512162`. PR #10 did not create a replacement deployment.

Branch `codex/m08-security-clean-validation-pins` reconciles only four workflow SHA references and one collector SHA reference from the PR #9 source to security-clean main `50966ce935cb2b7dbdc1ea3b4630b9feb1e9f50d`, plus this evidence note. The owner request, diagnostic historical pins, dependencies, application/content/schema, Lighthouse budgets/settings/routes/count, browser guard, pacing, bypass and sanitizer remain unchanged. This PR must remain unmerged pending owner approval. No production workflow is triggered by this branch.

Later integration into the production trigger branch and a fresh matching owner request remain separate controlled steps. Do not execute the historical deployment proposal above using its superseded SHA. Any replacement deployment must receive explicit approval for the exact security-clean source and reviewed provider action. No deployment, unpause, DNS/alias, analytics, Search Console, HSTS or M09 mutation is authorized by this reconciliation. Production acceptance still requires a fresh homogeneous 36-report production matrix and replacement-production validation; paused state remains the safe fallback.
