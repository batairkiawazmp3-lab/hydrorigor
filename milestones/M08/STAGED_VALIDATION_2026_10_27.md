# M08 protected staged validation — 2026-10-27

Owner authorized validation only of deployment dpl_Frkh5svBZaSvpaqsWpxHSdwBtpy2, source 50966ce935cb2b7dbdc1ea3b4630b9feb1e9f50d. Preflight verified READY, exact meta.gitCommitSha, paused=true, protection=all and autoAssignCustomDomains=false.

Unpause was requested at 2026-10-27T16:38:56.8470473Z. The immediate anonymous apex check returned HTTP 503 DEPLOYMENT_PAUSED, not the required authentication gate. The controller stopped before pushing the staged-validation workflow or starting any smoke/accessibility/Lighthouse collection. This does not prove authentication failure or public exposure; propagation timing remains a possible explanation.

Cleanup requested pause at 2026-10-27T16:39:04.2090004Z. Read-back confirmed paused=true, protection=all, autoAssignCustomDomains=false and apex HTTP 503 DEPLOYMENT_PAUSED. All four alias mappings matched the pre-window snapshot. No deployment or promotion was performed.

Smoke, accessibility, canonical/robots/sitemap/structured-data/security, search/tools/content and Lighthouse were NOT RUN in this window. Promotion is NOT recommended without successful validation. Existing READY build status is not validation acceptance.

The staged-only test adapter/workflow is committed locally on codex/m08-staged-validation and has NOT been pushed or executed. It retains apex canonical expectations, strict security checks, exact deployment URL, secret-safe artifacts, Linux Chrome guard and full unchanged 12x3 Lighthouse budgets. It excludes the apex redirect test because that would exercise the old deployment. Application/dependencies and the owner production request remain unchanged. No M08 acceptance or M09 authorization is implied.

Local evidence: .agent/tmp/m08-staged-validation-window/result.json and anonymous/final apex responses. Preserve this failed preflight. Do not automatically reopen another window.

## Resumed controlled window — 2026-10-28

A bounded readiness wait was added only to the ignored local controller: accept only the verified authentication gate; wait only while the response remains explicit 503 DEPLOYMENT_PAUSED; stop on any other unexpected response. No test timeout or acceptance assertion changed.

The anonymous apex gate passed HTTP 302 after unpause at 2026-10-28T03:00:02.1696135Z. GitHub staged-validation run **40624199681**, exact harness head `e164c5aee556b49ebd5749e32895a9ece33dd0d3`, used Ubuntu 24.04 image **20261025.353.1** and Node 24.21.0. It failed at **Unvalidated Chrome version** before any validation stage or Lighthouse capture. All staged site checks remain NOT RUN, not failed application checks. The guard still permits only Google Chrome 155.0.8059.39 and 155.0.8059.84. The adapter did not retain the actual unexpected Chrome string before asserting; do not confuse downloaded Playwright Chromium 153.0.8010.12 with system Google Chrome.

Sanitized artifact `m08-staged-validation-40624199681` was downloaded and preserves the empty stages list and failure. Cleanup requested pause at 2026-10-28T03:01:33.4789769Z and completed at 03:01:54.6901568Z: paused=true, protection=all, autoAssignCustomDomains=false, apex503 DEPLOYMENT_PAUSED, all four aliases unchanged. No deployment, promotion, DNS, analytics, Search Console, HSTS or M09 mutation occurred.

Do not promote based on READY build status. Another validation window requires resolving the runner compatibility gate without weakening it. Preserve this stopped run; no scores exist to reuse.
