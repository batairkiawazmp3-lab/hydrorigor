# M08 owner-controlled Linux production window

Status: M08_VERCEL_AUTOMATION_BYPASS_READY. The finalized bypass implementation has not been triggered; earlier production attempts are preserved below as history.

This plan supersedes the earlier mixed Windows/Linux acceptance proposal. The seven historical Windows reports and all poor scores remain incident evidence only. Authoritative acceptance requires 36 NEW valid reports from one GitHub-hosted Linux workflow run: all 12 routes in the exact release lighthouserc.cjs, three captures each. No old report import, replacement, or retry. First runtime/collector-invalid capture stops the run; valid poor scores remain and collection continues to the final unchanged median assertions.

Release: 141e3716aabef104adc5319215e0ddc607512162.
Workflow: .github/workflows/m08-production-lighthouse.yml.
Collector: scripts/collect-m08-production-lighthouse.mjs.
Branch: m08-search-production-fix. No merge required.

## Environment and gates

ubuntu-24.04; Node pinned24.21.0; release lockfile supplies Lighthouse12.6.1/LHCI0.15.1; installed Chrome must exactly match validated155.0.8059.39 or stop before collection. Runner image/kernel metadata are recorded; GitHub image updates cannot be assumed identical. No browser installation or dependency upgrade is attempted.

Headless=new, original chrome-launcher defaults plus disable-gpu/no-first-run; independent fresh process/profile per capture; navigation mode. Mobile simulated slow4G: RTT150ms, throughput1638.4Kbps, request latency562.5ms, download1474.56/upload675Kbps, CPU4x; viewport412x823, DPR1.75. Original Lighthouse12.6.1 defaults and category set retained. Uploaded LHRs retain non-sensitive effective configSettings; configSettings.extraHeaders and other sensitive values are redacted. Raw secret-bearing settings remain only in ephemeral scratch.

One preflight GET https://hydrorigor.com/ with redirects disabled must return200; otherwise stop with zero captures. Preflight uses the authorized automation headers in memory. No waiting for manual unpause and no provider configuration API calls. Exact release checked out separately from workflow/collector code, npm ci only, no application build or deployment. PUBLIC_ENABLE_VERCEL_ANALYTICS=false.

After36 valid reports, invoke pinned @lhci/utils getAllAssertionResults with the unchanged release ci.assert configuration. Per-route/per-metric median, P>=95, A=100, SEO=100 except/search/, LCP<=2500ms, CLS<=0.1, TBT<=200ms. Repository ceilings are inclusive; this preserves accepted rules despite shorthand strict '<' in the request. Field INP is not measured.

Only sanitized LHRs, traces, DevTools/browser/collector logs, version/settings metadata, route/capture manifest, records, collection summary and assertion results may enter DIAGNOSTIC_OUTPUT. Raw secret-bearing material stays in ephemeral scratch and is never uploaded. Upload requires SAFE_TO_UPLOAD after the sanitization and leak scan passes, including on handled collection failure; unsafe evidence is not uploaded. Profiles are excluded. Job timeout40minutes. VERCEL_AUTOMATION_BYPASS_SECRET is stored only as a GitHub Actions repository secret for this workflow, exposed only to the production collection step. Its value exists at runtime only in memory and temporary restricted headers files; Lighthouse receives only a headers-file path. No credential is stored in repository files, flags.json or uploaded artifacts. No Vercel management credentials or deployment permission are provided; workflow contents permission is read-only. System Mitigations remain active, no System Bypass IP is used, and no custom firewall weakening occurs. The job cannot control Vercel pause/unpause. OWNER must re-pause on success, failure, cancellation or timeout.

## Exact routes

1. /
2. /start/
3. /systems/
4. /systems/indoor-hydroponic-systems-for-home/
5. /nutrients-water/hydroponic-nutrients/
6. /best/hydroponic-system-for-home-growers/
7. /crops/hydroponic-strawberries/
8. /reviews/masterblend-hydroponic-nutrients/
9. /tools/ph-ec-targets/
10. /tools/nutrient-mixing-calculator/
11. /search/
12. /testing-methodology/

## Trigger only AFTER owner confirms manual unpause

Preparation pushes do not trigger this workflow. It only listens for changes to .agent/requests/m08-production-window.json on m08-search-production-fix. The existing request file must not be modified during preparation; only a separately authorized owner-window request may change it. This avoids default-branch workflow_dispatch registration and does not require merging. After the owner explicitly confirms manual unpause, execute in PowerShell from D:\hydrorigor:

```powershell
New-Item -ItemType Directory -Force .agent/requests | Out-Null
@{ release='141e3716aabef104adc5319215e0ddc607512162'; ownerConfirmedUnpaused=$true; requestedAt=[DateTime]::UtcNow.ToString('o') } | ConvertTo-Json | Set-Content .agent/requests/m08-production-window.json
git add .agent/requests/m08-production-window.json
git commit -m "test(m08): request owner-controlled production window"
git push origin m08-search-production-fix
```

Do not run this block before confirmation. It records authorization state; no secret. Verify workflow head/run and preserve artifacts. Owner re-pauses immediately after run termination; then verify paused=true and apex503 separately read-only. No automatic controller is created; the prior policy block is not bypassed. No application/threshold/dependency changes, deployment, DNS, analytics, Search Console, custom HSTS or M09. M08 remains unaccepted.

## Preparation validation

Node syntax and YAML parse passed. Synthetic36-report assertions verified original median behavior (one low outlier retained without changing median; two low reports fail) and search-only SEO exemption. Initial synthetic test misidentified the LHCI result field as categories:performance; corrected test uses auditId=categories/auditProperty=performance. No capture was run. Prior cancelled run39123604914 remains cancelled and produced no production matrix.

## 2026-10-19 pacing-only revision

Owner-verified security state: custom Firewall not configured; Attack Mode off; System Bypass zero IPs; System Mitigations active. Run 39147276614 preserved 32 valid Linux reports with zero NO_NAVSTART, then stopped on /search/ capture 3 with HTTP 403, x-vercel-mitigated: challenge, retry-after: 30. Those reports remain historical evidence, not final acceptance inputs.

Collector now waits 35 seconds after a valid completed capture (including Chrome cleanup) before starting the next capture. Exactly 35 waits for a successful 36-capture matrix, none before the first or after the last; invalid capture still stops immediately without retry. Purpose: reduce automated request bursts while preserving security protections. At this pacing-only checkpoint, no automation bypass or mitigation change was made. Subsequent evidence below shows pacing alone did not prevent another challenge; the finalized implementation uses supported automation credentials without weakening mitigations.

Runtime analysis before deciding timeout: prior collection step took 407 seconds for 33 attempts; extrapolation 407/33*36 = 444 seconds. Added pacing is 35*35 = 1225 seconds (20m25s), giving 1669 seconds (27m49s) plus setup/upload (previous job overhead 25 seconds), approximately 28m14s. Retain 40-minute job cap. Conservative sum of existing startup polling allowance (50*(1s+0.2s)=60s), collector watchdog (180s), and two graceful cleanup waits (6s) is 36*246+1225=10081 seconds (168m1s), excluding unbounded OS/file operations; this is not an expected successful runtime or a strict wall-clock bound. Slow pathological runs already cannot be guaranteed to finish in 40 minutes. The observed successful-capture pace fits; do not extend the owner-controlled exposure window merely to accommodate pathological stalls. Timeout remains a hard stop, not a completeness guarantee.

Synthetic validation of the actual loop with mocked capture dependencies verifies 36 captures, 35 waits of 35000ms after cleanup and before the next capture, no initial/final wait, and stop on invalid without waiting/retrying. Node syntax passed; assertion section unchanged byte-for-byte from HEAD. Application, dependencies, Chrome guard, Lighthouse version, mobile throttling, routes, three captures per route, median budgets and fresh profiles unchanged. No request-file creation/modification and no production trigger. Production remains owner-controlled and must stay paused during preparation. M08 unaccepted; M09 unauthorized.

## 2026-10-20 supported automation credentials and safe evidence

Runs 39147276614 and 39294271928 each preserved 32 valid reports before /search/ capture 3 received HTTP403, x-vercel-mitigated: challenge and retry-after:30. The second run's 35-second pacing did not prevent the challenge. Both incomplete sets remain diagnostic history only. Owner reports Vercel support identified Protection Bypass for Automation as the supported method and provisioned VERCEL_AUTOMATION_BYPASS_SECRET in GitHub. No real secret was retrieved or used during implementation.

The secret is exposed only to the collection step. A missing/empty value fails before collection. Runtime-only mode0600 headers files under unique /tmp scratch directories provide x-vercel-protection-bypass and x-vercel-set-bypass-cookie:true through Lighthouse12.6.1's supported --extra-headers FILE mechanism (verified in installed cli/cli-flags.js). Command arguments contain only the temporary path. Preflight uses these headers in memory and records only safe status/timestamp/URL/configured metadata.

Raw LHRs, traces, DevTools logs and browser/collector logs remain outside DIAGNOSTIC_OUTPUT. Per-capture finally cleanup closes processes/log streams, publishes sanitized copies and removes raw scratch/profile directories. An abrupt runner termination leaves only ephemeral scratch, never an uploaded raw directory. Evidence redacts extraHeaders, authorization, cookies, Set-Cookie, protection-bypass and challenge-token values in maps, name/value records and text. Exact secret replacement is independent of GitHub masking. A final recursive scan on success/handled failure rejects any surviving exact secret and verifies known sensitive values are absent. SAFE_TO_UPLOAD is created only after validation; a sanitization failure blocks that marker. Artifact upload requires the marker via a separate always-run check. Missing credentials or abrupt termination never authorize upload.

Sentinel-only tests: scratch headers contain fake value; evidence has none; configSettings.extraHeaders/header maps/name-value records/logs redacted; valid low score preserved; both successful and failed-capture evidence seal safely; deliberate exact-secret leak fails and removes marker; unsafe symlink also fails closed. Static checks passed for YAML, step-only secret scope, artifact gate, existing 36-capture loop, no retries, 35-second pacing, release/version guards and original LHCI assertion invocation. No production network test or workflow execution performed. Project dependency files and application untouched. Forty-minute timeout unchanged; prior timing analysis remains applicable, with modest sanitization overhead not yet measured in CI.

System Mitigations remain active per owner-verified state. No System Bypass IP, firewall, Attack Mode or other provider change was made. Production stays paused; owner request file untouched. Analytics false; Search Console, DNS, custom HSTS and M09 unchanged. Final acceptance still requires a wholly fresh 36-report matrix in a separately authorized owner-controlled window. This is preparation, not M08 acceptance.

Final read-only provider check confirmed project prj_Lbm21h2zFAWCHMMwaRsh7KsHD9ee paused=true. No HTTP request to production was performed during implementation. Child Chrome/Lighthouse processes do not inherit the secret environment variable; Lighthouse receives only the temporary headers-file path. Real secret never retrieved.
