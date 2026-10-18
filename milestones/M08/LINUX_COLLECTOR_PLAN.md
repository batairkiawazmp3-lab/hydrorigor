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

Workflow checks out the exact release separately from diagnostic source, uses Node24 and its locked Lighthouse12.6.1, records Ubuntu image/Chrome/flags/resources, builds locally with analytics false, and runs 15 serialized fresh-browser attempts with no replacement. A nonzero diagnostic exit means collector invalidity, not a budget relaxation. All raw LHR/trace/devtools/browser logs and settings are uploaded on completion/failure; profiles are excluded. Existing CI, dependency files and application remain untouched. Local validation: Node syntax, YAML parsing, pinned CLI resolution, and diff whitespace checks pass. Production apex remains 503 DEPLOYMENT_PAUSED before push.
