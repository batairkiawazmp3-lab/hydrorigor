# M08 owner-controlled Linux production window

Status: M08_LINUX_PRODUCTION_WORKFLOW_READY_FOR_OWNER_WINDOW. Preparation only; not triggered.

This plan supersedes the earlier mixed Windows/Linux acceptance proposal. The seven historical Windows reports and all poor scores remain incident evidence only. Authoritative acceptance requires 36 NEW valid reports from one GitHub-hosted Linux workflow run: all 12 routes in the exact release lighthouserc.cjs, three captures each. No old report import, replacement, or retry. First runtime/collector-invalid capture stops the run; valid poor scores remain and collection continues to the final unchanged median assertions.

Release: 141e3716aabef104adc5319215e0ddc607512162.
Workflow: .github/workflows/m08-production-lighthouse.yml.
Collector: scripts/collect-m08-production-lighthouse.mjs.
Branch: m08-search-production-fix. No merge required.

## Environment and gates

ubuntu-24.04; Node pinned24.21.0; release lockfile supplies Lighthouse12.6.1/LHCI0.15.1; installed Chrome must exactly match validated155.0.8059.39 or stop before collection. Runner image/kernel metadata are recorded; GitHub image updates cannot be assumed identical. No browser installation or dependency upgrade is attempted.

Headless=new, original chrome-launcher defaults plus disable-gpu/no-first-run; independent fresh process/profile per capture; navigation mode. Mobile simulated slow4G: RTT150ms, throughput1638.4Kbps, request latency562.5ms, download1474.56/upload675Kbps, CPU4x; viewport412x823, DPR1.75. Original Lighthouse12.6.1 defaults and category set retained. Exact effective configSettings remain in every LHR.

One preflight GET https://hydrorigor.com/ with redirects disabled must return200; otherwise stop with zero captures. No waiting for manual unpause, no provider calls. Exact release checked out separately from workflow/collector code, npm ci only, no application build or deployment. PUBLIC_ENABLE_VERCEL_ANALYTICS=false.

After36 valid reports, invoke pinned @lhci/utils getAllAssertionResults with the unchanged release ci.assert configuration. Per-route/per-metric median, P>=95, A=100, SEO=100 except/search/, LCP<=2500ms, CLS<=0.1, TBT<=200ms. Repository ceilings are inclusive; this preserves accepted rules despite shorthand strict '<' in the request. Field INP is not measured.

Always upload LHRs, raw traces, DevTools/browser/collector logs, version/settings metadata, route/capture manifest, records, collection summary and assertion results when reached. Partial evidence retained on failure; profiles excluded. Job timeout40minutes. No Vercel CLI/API/token, no deployment permission or environment secrets; workflow contents permission is read-only. The job cannot control Vercel pause/unpause. OWNER must re-pause on success, failure, cancellation or timeout.

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

Preparation pushes do not trigger this workflow. It only listens for changes to .agent/requests/m08-production-window.json on m08-search-production-fix. The request file is intentionally absent now. This avoids default-branch workflow_dispatch registration and does not require merging. After the owner explicitly confirms manual unpause, execute in PowerShell from D:\hydrorigor:

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
