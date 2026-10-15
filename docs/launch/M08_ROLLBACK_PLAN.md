# M08 rollback plan

## Lighthouse recovery safe stop — 2026-10-15

M08_PRODUCTION_LIGHTHOUSE_COLLECTION_BLOCKED. Seven valid reports preserved:
/ 3/3, /start/ 3/3, /systems/ 1/3, other nine routes 0/3. Both complete route
medians pass; no /systems/ median or full-matrix assertion is possible.
/systems/ capture 2 failed NO_NAVSTART twice, exhausting its one permitted retry.
No third attempt; no valid report retried/discarded. Worst valid Performance 53,
LCP 4455.585 ms and TBT 784 ms remain disclosed variance risks. Cause of
NO_NAVSTART remains unproven; fresh profiles did not reliably prevent it.
Finally re-pause verified; apex 503 DEPLOYMENT_PAUSED reconfirmed 12:32:59Z.
Same deployment/source, zero additional deployments. Analytics false; Search
Console/custom HSTS/M09 untouched. M08 not accepted; no permanent unpause.
See M08 GATE_C_RELEASE_EVIDENCE.md and SEARCH_FAILURE_INVESTIGATION.md for
all seven scores, retry ledger, local probe, chronology and next investigation.
Earlier checkpoints below are historical.

## Second production validation checkpoint — 2026-10-15

M08_SECOND_PRODUCTION_VALIDATION_FAILED. Three cold searches and warm search
passed unchanged; 44 routes / 25 M06 pages, calculator, TLS/metadata/security,
zero-vulnerability production audit and 17/17 accessibility passed. Lighthouse
first capture failed NO_NAVSTART; 0/36 valid production reports, no medians or
budget pass claimed. Automatic re-pause verified and reconfirmed on resume:
paused=true, apex 503 DEPLOYMENT_PAUSED. Same deployment dpl_DbGiGTwLdwHvPJHoEoCPwxH8pYcX
and release 141e3716aabef104adc5319215e0ddc607512162; zero additional deployments.
Analytics disabled; Search Console/custom HSTS untouched; M09 NOT_STARTED /
NOT_AUTHORIZED. www remains unconfigured with certificate mismatch. No code,
test, configuration or timeout changes. Production stays paused pending review
of Lighthouse collection and a separately approved continuation. M08 not accepted.
See milestones/M08/GATE_C_RELEASE_EVIDENCE.md and SEARCH_FAILURE_INVESTIGATION.md
for timestamps, complete passed evidence and preserved failure history.

Earlier entries below are historical checkpoints, not the current authorization.

## Gate C release attempt — 2026-10-13

Current state: PRODUCTION_ROLLED_BACK_GATE_C_FAILED.
PR #8 squash-merged to 141e3716aabef104adc5319215e0ddc607512162; exact-main
quality (38378777665) and governance (38378777968) both SUCCESS.
Owner-approved first production deployment dpl_DbGiGTwLdwHvPJHoEoCPwxH8pYcX
used that exact Git SHA and reached READY. All 44 public routes / 25 M06 pages,
calculator, headers, canonicals, robots/sitemap and zero-vulnerability production
audit passed, but the required Pagefind result was absent at the 5000 ms timeout.
Root cause remains undiagnosed; no assertion was weakened.
Approved first-release rollback paused only HydroRigor. API paused=true and apex
plus deployment URL HTTP 503 DEPLOYMENT_PAUSED verified at 16:46Z. Domain/DNS
preserved; ignored-build guard restored to exit 0. Production Lighthouse and
accessibility NOT_RUN after failure. Analytics flag false in all environments;
no activation or requests observed. Search Console untouched; no custom HSTS.
M09 NOT_STARTED / NOT_AUTHORIZED. M08 IN_PROGRESS / NOT_ACCEPTED.
See milestones/M08/GATE_C_RELEASE_EVIDENCE.md for timestamps, full evidence,
provider HSTS observations, www limitation and recovery prerequisites.
Do not resume/deploy again without recovery approval. Historical entries below
are retained; their unmerged/zero-deployment/pending-Gate-C state is superseded.


PREPARED; no production release or rollback executed.
Last known good Git SHA: 53e80f5db2633d06d08ec4e3684820465bca7f8c (accepted M07).
Last known good production deployment: NONE VERIFIED. A Git baseline is not a
previously deployed ID. Release SHA/deployment URL/id/tag: NOT_SELECTED/NOT_CREATED.

Before deployment record reviewed main SHA, clean checkout, green CI, build/env
settings, project ID, approved DNS snapshot and certificate state. Git remote and
retained M07 branch preserve the baseline. No final tag before independent release
verification. Obtain explicit incident rollback scope with C; DNS reversal also
needs B, environment changes A, analytics changes D as applicable.

Stop launch progression on 5xx, broken HTTPS, canonical corruption, global noindex,
CSP breaking core functionality, major accessibility/performance regression,
incorrect DNS or header mismatch. Record timestamp/ID/SHA/failing requests/scope.

For future releases with an eligible verified known-good deployment, and only
with rollback approval, select its exact ID in Vercel Instant Rollback. Check
domains/plan eligibility before executing and HTTP/headers/search/calculator/source
afterward. Provider rollback restores the old build, not newly changed build-time
environment values. Automatic production domain assignment may be disabled after
rollback; do not re-enable without approval.

First launch has no eligible previous production deployment. Stop and notify the
owner. Within approved incident scope, remove only the new alias or restore exact
prior DNS, or prepare a reviewed corrective/revert release and redeploy after
approval. No blind project/domain deletion or invented fallback deployment.

Analytics default is false. If later enabled and rollback approved, disable provider
collection, set PUBLIC_ENABLE_VERCEL_ANALYTICS=false and rebuild/redeploy the approved
commit because it is a build-time flag. Verify no insights requests and CSP/smoke.
Do not interpret a Git revert as authorization for environment/provider changes.

Custom HSTS remains unauthorized; provider-default HSTS is expected. Browser-cached
HSTS cannot be immediately undone by a Git revert. Keep HTTPS healthy, never
enable includeSubDomains/preload as an incident workaround.

Git recovery: normal revert commit on a branch/PR, full checks and review; no reset
or force-push main. DNS recovery: only specific authorized affected values from
snapshot with TTL propagation verified. Never blindly remove verification TXT,
replace NS, alter MX, transfer ownership, cancel renewal or delete the domain.
Record incident/verification/remaining debt in REALITY_AUDIT and mutation ledger.

Reference: [Vercel Instant Rollback](https://vercel.com/docs/instant-rollback).

## October first-release incident plan

Owner purchase/Pro/attachment is complete; do not undo it during rollback.
There is no previous deployed known-good version: vercel rollback cannot restore
an invented baseline. Gate C should explicitly authorize pausing this project if
the first release is harmful, then verify it no longer serves the failed site.
Pause is reversible but intentionally interrupts availability, including deployment
URLs. Resume needs owner review and a validated corrective release.
Preserve DNS/domain/renewal and all other projects. Do not delete the deployment,
project or domain. Keep the deployment ID/logs for investigation.
After a later known-good deployment exists, rollback may restore that exact ID
under approved incident scope, followed by all relevant smoke/header checks.
Git rollback is a normal revert PR with green CI and separate deployment approval;
no reset, force push or blind DNS reversal. Restore the ignored-build guard exit 0
after the controlled launch attempt. Custom HSTS stays absent; provider browser
HSTS caches are not undone by Git rollback, so preserve HTTPS capability.
