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
