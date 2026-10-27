# M08 protected staged validation — 2026-10-27

Owner authorized validation only of deployment dpl_Frkh5svBZaSvpaqsWpxHSdwBtpy2, source 50966ce935cb2b7dbdc1ea3b4630b9feb1e9f50d. Preflight verified READY, exact meta.gitCommitSha, paused=true, protection=all and autoAssignCustomDomains=false.

Unpause was requested at 2026-10-27T16:38:56.8470473Z. The immediate anonymous apex check returned HTTP 503 DEPLOYMENT_PAUSED, not the required authentication gate. The controller stopped before pushing the staged-validation workflow or starting any smoke/accessibility/Lighthouse collection. This does not prove authentication failure or public exposure; propagation timing remains a possible explanation.

Cleanup requested pause at 2026-10-27T16:39:04.2090004Z. Read-back confirmed paused=true, protection=all, autoAssignCustomDomains=false and apex HTTP 503 DEPLOYMENT_PAUSED. All four alias mappings matched the pre-window snapshot. No deployment or promotion was performed.

Smoke, accessibility, canonical/robots/sitemap/structured-data/security, search/tools/content and Lighthouse were NOT RUN in this window. Promotion is NOT recommended without successful validation. Existing READY build status is not validation acceptance.

The staged-only test adapter/workflow is committed locally on codex/m08-staged-validation and has NOT been pushed or executed. It retains apex canonical expectations, strict security checks, exact deployment URL, secret-safe artifacts, Linux Chrome guard and full unchanged 12x3 Lighthouse budgets. It excludes the apex redirect test because that would exercise the old deployment. Application/dependencies and the owner production request remain unchanged. No M08 acceptance or M09 authorization is implied.

Local evidence: .agent/tmp/m08-staged-validation-window/result.json and anonymous/final apex responses. Preserve this failed preflight. Do not automatically reopen another window.
