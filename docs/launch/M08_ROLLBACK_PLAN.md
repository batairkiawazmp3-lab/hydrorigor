# M08 rollback plan

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
