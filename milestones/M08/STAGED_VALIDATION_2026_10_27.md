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

## Read-only recovery — 2026-10-28

Ordinary CI 40624199484 succeeded on Ubuntu image 20261023.334.3 with Node v24.21.0 and Google Chrome 155.0.8059.39. Later ordinary CI 40624452963 succeeded on image 20261026.354.1 with Node v24.22.1 and Google Chrome 156.0.8078.47. Their startup artifacts were inspected locally. Neither used the failed staged run's image 20261025.353.1, so neither establishes that run's actual rejected Chrome version. These are local-build CI results, not staged production acceptance.

The staged adapter now records the actual Chrome version and safe runner metadata before enforcing the unchanged exact allowlist. This is observability only: no new browser is approved, no assertion is relaxed, and the staged workflow/request file is unchanged. No validation window was opened during recovery. A loopback compatibility diagnostic for a newly observed browser is required before proposing an allowlist change; do not infer approval from a passing ordinary CI run with different Node/browser versions.

Read-only Vercel verification at 2026-10-28 10:03 UTC confirmed paused=true, protection=all, autoAssignCustomDomains=false and apex HTTP 503 with X-Vercel-Error: DEPLOYMENT_PAUSED. No deployment, unpause, promotion, alias/DNS, analytics, Search Console, HSTS or M09 action was performed.

## Loopback compatibility attempt — 2026-10-28

Diagnostic commit `a05368dff40864ad8054d4296521c47dfcb6bca8` updated only the diagnostic push branch, release pin to 50966ce935cb2b7dbdc1ea3b4630b9feb1e9f50d, and diagnostic Chrome candidate to the observed Google Chrome 156.0.8078.47. Node remained 24.21.0, Lighthouse 12.6.1, with the same fifteen independent loopback attempts and unchanged settings. Production/staged workflows, their guards, owner request, application and dependencies were unchanged.

Run **40669808004**, job **122753417211**, failed closed before starting captures: its environment artifact reports Ubuntu image **20261023.334.3**, Node **v24.21.0**, Lighthouse **12.6.1**, and **Google Chrome 155.0.8059.39**. Exact release installation and local build passed. The requested Chrome 156 candidate was not present. **Zero attempts, zero LHRs; no collector-validity or performance verdict is possible.** The environment artifact is preserved locally under `.agent/tmp/m08-chrome156-diagnostic-40669808004/`. This is an environment mismatch, not NO_NAVSTART or a budget failure.

No retry was used to select a favorable runner image. Hosted image/browser heterogeneity is now directly demonstrated; `ubuntu-24.04` alone does not pin the browser. Before another protected window, a reproducible browser provisioning approach must be selected and validated on loopback. No new production browser approval is implied. Production remained paused=true; apex returned 503 DEPLOYMENT_PAUSED at 10:10 UTC. No staged/production validation workflow was triggered by this diagnostic push, and no Vercel mutation occurred.

## Pinned browser diagnostic completed — reviewed 2026-10-29

Run 40721979873, job 122935015325, head abdb7912b1e05b9382a42742ebbf2013677a1a50: SUCCESS. Exact application release 50966ce935cb2b7dbdc1ea3b4630b9feb1e9f50d was built and served on loopback only. Ubuntu 24.04 image 20261025.353.1, Node 24.21.0, Lighthouse 12.6.1, pinned Google Chrome for Testing 156.0.8078.47. Artifact 12831531397 preserves reports, traces and logs. Review verified the completed attempt records in GitHub logs; local artifact download was still pending during review.

Fifteen independent attempts (five per route), fifteen valid, zero invalid, zero NO_NAVSTART. All Performance/Accessibility/SEO scores were 100, all CLS and TBT values zero. LCP min / median / max in milliseconds:

| Route | Minimum | Median | Maximum |
| --- | ---: | ---: | ---: |
| / | 1207.7452 | 1207.8314 | 1209.5328 |
| /start/ | 1202.3649 | 1205.1451 | 1209.0879 |
| /systems/ | 1203.9384 | 1205.4339 | 1206.7281 |

These five-run statistics characterize collector compatibility only; they do not replace the authoritative twelve-route, three-capture median acceptance matrix. Ordinary CI 40721980985 and governance 40721981381 also succeeded on this exact harness head.

Preserved setup history: run 40720523374 stopped at a literal version comparison before captures; trailing whitespace was trimmed without changing the expected version. Run 40720820864 then made 15 attempts, all invalid because Chrome explicitly reported No usable sandbox and exited before readiness. This proves the startup cause for that experiment, not the cause of earlier NO_NAVSTART incidents. Run 40721508689 stopped before collection at the existing sandbox-helper preflight; its logs do not distinguish missing helper from unsuitable permissions.

The successful procedure downloads the exact official Chrome for Testing archive into runner scratch, installs it root-owned under /opt/m08-diagnostic-cft, and loads a root-owned AppArmor userns profile for that exact executable only. No global AppArmor restriction is disabled and no --no-sandbox flag is used. See Chromium's documented scoped profile approach: https://chromium.googlesource.com/chromium/src/+/main/docs/security/apparmor-userns-restrictions.md . Chrome for Testing is distinct from runner-installed Google Chrome: this finite sample validates this specific diagnostic pairing, not every Chrome 156 installation.

Recommended next step: separately review adoption of this exact provisioning procedure in the staged validation harness, including secret-safety tests, before opening another protected window. No production allowlist, staged workflow, production collector, owner request, dependencies, application, budgets or throttling changed in this diagnostic work. No production access was used by the diagnostic. No merge, deployment, promotion, unpause, DNS/alias, analytics, Search Console, custom HSTS or M09 action occurred.

Read-only safety verification on 2026-10-29 at 01:51 UTC: paused=true, protection=all, autoAssignCustomDomains=false; apex HTTP 503 with X-Vercel-Error DEPLOYMENT_PAUSED. M08 remains NOT_ACCEPTED. Staged smoke/accessibility/full Lighthouse acceptance remains outstanding.

## Staged pinned-browser preparation — 2026-10-29

Preparation branch: codex/m08-pinned-staged-browser, based on evidence checkpoint edda55c00a59c08c1df25431770f8d6f5e8a7610. This branch does not match the staged workflow push trigger (codex/m08-staged-validation), so pushing preparation does not open a staged validation window.

The staged workflow now contains the identical provisioning block proven by diagnostic run 40721979873. The adapter checks the exact root-owned /opt/m08-diagnostic-cft/chrome binary and exact Google Chrome for Testing 156.0.8078.47 identity. Its ephemeral collector copy selects that same path and exact identity. The committed apex production collector and its existing allowlist remain unchanged. Playwright smoke/accessibility retain their locked browser dependency; the pinned Chrome applies to Lighthouse and its preflight.

Local validation: adapter syntax PASS; generated collector syntax PASS; exact provisioning-block equivalence PASS; three anchored collector substitutions (existing target URL plus browser path and exact identity) PASS; sentinel secret-safety tests PASS; git diff --check PASS. No change to release SHA, Node, Lighthouse, routes, 36-capture requirement, pacing, budgets, retries, bypass handling, sanitizer, owner request or dependencies.

This is preparation only. Before execution, review this change and reverify deployment identity, source, protection and aliases. Moving this workflow change onto codex/m08-staged-validation triggers site access and must occur only within a separately controlled authorized window, with anonymous apex authentication verification and guaranteed re-pause. Do not promote or claim acceptance based on the loopback diagnostic.
