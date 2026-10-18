# M08 next diagnostic: controlled Linux runner

Prepared 2026-10-17. Status: PROPOSED; not executed. Production remains paused.

## Evidence and reason

Release 141e3716aabef104adc5319215e0ddc607512162 already passed GitHub CI run 38378777665 and governance run 38378777968. Read-only logs show Ubuntu 24.04 image 20261004.327.1 and Lighthouse collection of 12 URLs x 3 runs, followed by assertions over all 36 reports. No downloadable artifacts remain/listed for that run, so individual scores and exact Chrome version cannot be independently recovered from those artifacts. This is local-build CI evidence, not production HTTPS performance proof or a controlled OS comparison.

The Windows experiment failed with both collector versions. Do not adopt 13.5.0. Test the unchanged baseline on an uninterrupted runner before considering production access.

## Proposed bounded experiment

1. Use one GitHub-hosted Ubuntu 24.04 runner, no production credentials or Vercel integration. Capture runner image, exact Node 24 patch, exact Chrome binary/version, Lighthouse 12.6.1/LHCI 0.15.1, CPU/RAM and all Chrome flags.
2. Checkout the exact release SHA above; npm ci with its unchanged lockfile; build locally with analytics false. Serve only loopback. This does not deploy or publish the site.
3. Use a separately reviewed diagnostic collector, serialized fresh Chrome/profile per attempt, preserving original mobile simulation/viewport/throttling and navigation settings. Validate CLI option serialization before recording experiment slots; never pass raw null LHR metadata as CLI options.
4. Exactly five attempts each for /, /start/, /systems/ (15 diagnostic attempts), with no replacements. Preserve invalid and poor valid reports. Record trace/devtools logs, Chrome lifecycle, resource state and explicit per-attempt outcome. Fail the diagnostic verdict if any trace is invalid; retain all evidence with an always-run artifact upload.
5. Compare collector validity first, then characterize score distributions. Five-run statistics do not replace three-run acceptance. A clean sample is finite evidence, not proof NO_NAVSTART is fixed.
6. If reliable, propose a separate production collection window for owner approval. Do not access the paused production site for Lighthouse, unpause it, reset the preserved production matrix, or replace its seven valid reports.

## Proposed files, not yet changed

- .github/workflows/m08-lighthouse-diagnostic.yml: manual diagnostic workflow, contents:read, timeout bound, no deployment/production tokens, one job, artifact upload even on failure.
- scripts/diagnose-lighthouse.mjs: local-URL-only collector with preserved raw artifacts and per-attempt records; no application changes.
- M08 evidence/report updates after execution.

No package.json/package-lock.json, lighthouserc.cjs, accepted CI workflow, thresholds, route matrix or acceptance-rule changes are proposed. Baseline dependencies are reused. Any exact Chrome pairing selected for a controlled comparison must be recorded; changing OS and browser together is a confound and must not be described as OS causality.

## Approval boundary and cost

Previous instructions explicitly prohibited CI changes during the investigation. This plan is prepared for approval before adding or running a new diagnostic workflow. GitHub-hosted runtime/artifact usage may count against repository/account allowances; do not purchase capacity. No production side effects. The workflow/script are removable through normal Git changes; diagnostic artifacts can expire normally. No DNS, analytics, Search Console, custom HSTS or M09 action.

## Owner authorization and implementation — 2026-10-18

Owner approved diagnostic-only workflow/script, branch commit/push, execution and artifact retrieval. No merge or production mutation. Implemented branch/path-filtered push trigger instead of workflow_dispatch: new manual workflows normally need default-branch registration; push permits execution from the investigation branch without merging. Documentation-only follow-up pushes do not retrigger the diagnostic.

Workflow checks out the exact release separately from diagnostic source, uses Node 24 and its locked Lighthouse 12.6.1, records Ubuntu image/Chrome/flags/resources, builds locally with analytics false, and runs 15 serialized fresh-browser attempts with no replacement. A nonzero diagnostic exit means collector invalidity, not a budget relaxation. All raw LHR/trace/devtools/browser logs and settings are uploaded on completion/failure; profiles are excluded. Existing CI, dependency files and application remain untouched. Local validation: Node syntax, YAML parsing, pinned CLI resolution, and diff whitespace checks pass. Production apex remains 503 DEPLOYMENT_PAUSED before push.

Initial diagnostic workflow run 39102599323 was rejected before any job/capture. Correction: move runner.temp-derived DIAGNOSTIC_OUTPUT from job env to step env, where runner context is available. Preserve this setup failure; zero measurement attempts occurred.


## 2026-10-18 Linux diagnostic complete

M08_LINUX_LIGHTHOUSE_COLLECTOR_VALIDATED_FOR_NEXT_CONTROLLED_STEP. Run 39102647730/job 117601886609 SUCCESS; diagnostic head 3dc9c937539bc254f4242ded3cd1ab3b6fe7471e tested exact release 141e3716aabef104adc5319215e0ddc607512162. Ubuntu 24.04.5/image 20261012.334.1, Node 24.21.0, Lighthouse 12.6.1/LHCI 0.15.1, Chrome 155.0.8059.39:15/15 valid, zero NO_NAVSTART or other collector failures. Artifact 12126952086 independently inspected. All three routes P/A/SEO100, CLS0; LCP medians 1.2030789/1.2054039/1.2033332s; TBT medians 0. Earlier rejected workflow 39102599323 produced no captures and remains disclosed. Chrome differs from Windows154; no OS-only causal claim. See LIGHTHOUSE_FORENSICS.md for full distributions. Sufficient to propose a separately approved controlled production measurement; production remains paused, production matrix incomplete, M08 unaccepted, M09 NOT_STARTED/NOT_AUTHORIZED. No merge or external mutation.

## 2026-10-18 owner-approved controlled production collection

Owner approved controlled Linux production Lighthouse validation. This window targets only the unchanged existing deployment/release. New branch-only workflow checks out exact release dependencies without building or deploying, pins Lighthouse12.6.1 and verifies the validated Chrome155.0.8059.39 pairing. It waits for temporary access controlled locally; no Vercel credentials enter GitHub. Collect only29 missing slots: systems captures2–3 and all3 for the remaining9 routes. Preserve original7 valid reports/outliers. Each invalid collector attempt is preserved and permits one fresh-process retry in this newly approved environment; valid scores are never retried. Both failed attempts stop collection. Prior exhausted Windows attempts remain historical, not erased.

Final combined36-report median assertions remain unchanged, but runner/browser provenance is mixed and must be disclosed; an aggregate pass is not M08 acceptance. Local finally cleanup and an independent time-limited pause guard restore paused state. No permanent unpause, deployment, DNS, analytics, Search Console, HSTS or M09 action.
