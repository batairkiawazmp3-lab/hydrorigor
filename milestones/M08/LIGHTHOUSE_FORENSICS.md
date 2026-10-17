# M08 Lighthouse local forensic verdict — 2026-10-16

Status: M08_LIGHTHOUSE_HARNESS_RELIABILITY_UNRESOLVED.

Release: 141e3716aabef104adc5319215e0ddc607512162. Deployment: dpl_DbGiGTwLdwHvPJHoEoCPwxH8pYcX. Historical production evidence remains unchanged: seven valid production reports, including every poor score, and the exhausted /systems/ capture-2 collector retry. This investigation does not complete or replace that matrix.

## Completed local experiment

18 attempts: 15 valid (83.33%), three invalid NO_NAVSTART (16.67%). Five valid samples per route. Homepage 7 attempts/2 invalid; start 5/0; systems 6/1. The interrupted final homepage capture completed with Performance 76 and TBT 1162.219 ms and is preserved. No completed capture was rerun to improve a score.

Lighthouse 12.6.1, LHCI 0.15.1, Chrome 154.0.8037.93, Node 24.18.0. Existing exact-release static build; no rebuild. Fresh unique Chrome profile/process/debug port, explicit DevTools readiness, serialized CLI navigation, collector exit before owned-browser cleanup. Original mobile simulated slow-4G/4x CPU settings and budgets retained. Raw asset saving and host/lifecycle instrumentation affect evidence retention, not acceptance criteria. Scratch collector is ignored, not a committed replacement harness.

Evidence: .agent/tmp/m08-lighthouse-forensics/experiment.jsonl, analysis.json, final-forensics.json and each round-*-route-* directory (LHR, raw trace, DevTools log, browser/collector logs, attempt metadata and profile). Production reports remain separately preserved under m08-lighthouse-recovery/production-valid. No generated artifacts are proposed for Git.

## Five-sample characterization (min / median / max)

These five-run statistics are forensic characterization, NOT the three-run acceptance test. All valid reports have Accessibility 100, SEO 100 and CLS 0.

| Route | Performance | LCP ms | TBT ms | Server response ms | Main-thread ms | Longest audit task ms |
|---|---|---|---|---|---|---|
| / | 76 / 95 / 100 | 1205.199 / 1353.968 / 1706.171 | 0 / 251.77 / 1162.219 | 2.834 / 5.576 / 193.699 | 1212.028 / 1574.184 / 3171.712 | 284 / 500 / 1264 |
| /start/ | 80 / 95 / 99 | 1250.827 / 1316.045 / 2066.087 | 53 / 256.536 / 685.5 | 3.611 / 4.793 / 6.784 | 1251.42 / 1608.792 / 3886.428 | 366 / 515 / 949 |
| /systems/ | 95 / 100 / 100 | 1206.212 / 1255.906 / 1391.48 | 43 / 73.5 / 261.396 | 2.799 / 3.898 / 4.234 | 1128.024 / 1381.408 / 1664.248 | 368 / 417 / 604 |

## High/low comparisons

For tied highest scores, the earliest highest-scoring valid report is compared; all other reports remain in the evidence. Durations below are Lighthouse audits, not raw thread CPU totals.

- / Low: round-7-route-0, P76; server 6.723 ms; main-thread 3171.712 ms; groups styleLayout 2537.60 ms, other 435.37 ms, paintCompositeRender 120.50 ms, scriptEvaluation 39.33 ms, parseHTML 38.08 ms, scriptParseCompile 0.85 ms.
- / High: round-3-route-0, P100; server 2.834 ms; main-thread 1212.028 ms; groups styleLayout 777.15 ms, other 303.21 ms, paintCompositeRender 65.96 ms, parseHTML 34.74 ms, scriptEvaluation 29.46 ms, scriptParseCompile 1.50 ms.
- /start/ Low: round-1-route-1, P80; server 4.793 ms; main-thread 3886.428 ms; groups styleLayout 2786.90 ms, other 515.01 ms, scriptEvaluation 278.43 ms, paintCompositeRender 239.93 ms, parseHTML 63.74 ms, scriptParseCompile 2.42 ms.
- /start/ High: round-2-route-1, P99; server 5.908 ms; main-thread 2008.628 ms; groups styleLayout 1273.73 ms, other 434.42 ms, paintCompositeRender 212.79 ms, parseHTML 48.98 ms, scriptEvaluation 37.37 ms, scriptParseCompile 1.33 ms.
- /systems/ Low: round-1-route-2, P95; server 3.898 ms; main-thread 1381.408 ms; groups styleLayout 829.30 ms, other 390.40 ms, paintCompositeRender 84.39 ms, scriptEvaluation 42.52 ms, parseHTML 33.06 ms, scriptParseCompile 1.74 ms.
- /systems/ High: round-2-route-2, P100; server 4.140 ms; main-thread 1286.084 ms; groups styleLayout 724.87 ms, other 421.02 ms, paintCompositeRender 58.37 ms, parseHTML 43.77 ms, scriptEvaluation 36.86 ms, scriptParseCompile 1.20 ms.

Text is the LCP element. Resource audits show no downloaded application/Pagefind JS, fonts or images on these routes. Main-frame FunctionCall URLs are _lighthouse-eval.js. There is no demonstrated application script bottleneck. Style/layout dominates the larger main-thread totals; total work is not identical to TBT because the blocking window and simulated task timings differ.

Raw homepage P76 layout: 614.21 ms wall / 310.36 ms thread CPU; its RunTask 632.14 / 326.07 ms. Homepage P100 round 3 layout: 115.22 / 108.91 ms. Start P80 layout: 449.46 / 101.00 ms; P99 round 2 layout: 303.67 / 237.79 ms. These gaps support off-CPU waiting/scheduling as a contributor but do not identify a responsible process or prove a specific OS/Chrome bug. Rendering and paint also vary; no application-only cause is established. Per-event CPU is available, but summing nested trace events would double-count total CPU, so no fabricated aggregate is reported.

Available RAM before valid attempts ranged 818.58–1259.37 MiB on an approximately 8 GiB machine. Instrumented aggregate CPU was approximately 79.4–87.0%; valid and invalid runs overlap. Process snapshots retain Chrome/Node counts and resident processes; they are observational, not a controlled contention intervention. No unrelated process was terminated. Earlier OOM is historical context, not proof of this experiment's cause. No OOM occurred here.

## Production response-delay distinction

Poor production homepage P81 had server response 65.09 ms, comparable with P100 runs 65.42/62.12 ms, but greater main-thread work (2323.73 versus 1432.79/1507.86 ms). Response latency does not explain that outlier.

Production /systems/ P53 had server response 4323.09 ms and simulated LCP 4455.585 ms. Its observed text-LCP phases are TTFB 4330.038 ms plus render delay 3118.173 ms = observed LCP 7448.211 ms. Do NOT add observed phases and label them a decomposition of simulated 4.456 s LCP. No LCP image resource-load phase applies. Local systems observed TTFB was approximately 10.58–23.75 ms and render delay 576.84–886.37 ms. Production response/network delay and render delay both contributed; the evidence cannot isolate Vercel origin, edge, internet path or client scheduling. Production raw traces were not retained, limiting task-level attribution.

## Every local NO_NAVSTART

All three: document HTTP 200; intended local URL committed; DOMContentLoaded and load fired; DevTools logs contain no detach/crash event; Chrome alive at collector completion; cleanup subsequently removed the owned PID. Browser logs include GCM authentication/updater named-pipe errors, without evidence these caused trace omission. Lighthouse completed gathering/audits then reported NO_NAVSTART; no watchdog termination. Raw trace JSON is readable and includes later paint events. No evidence of early browser cleanup or page-load failure.

| Attempt | Chrome PID | Trace start/end (monotonic microseconds) | navStart / commit / send / receive / FCP / LCP-event counts | DCL / load (monotonic seconds) |
|---|---|---|---|---|
| round-4-route-0 | 11196 | 871815209330 / 871818559039 | 0 / 1 / 1 / 2 / 1 / 11 | 871815.728851 / 871816.125256 |
| round-4-route-2 | 6936 | 871861140826 / 871864461524 | 0 / 1 / 1 / 2 / 1 / 9 | 871861.997777 / 871861.999466 |
| round-5-route-0 | 5276 | 871880956700 / 871884090800 | 0 / 1 / 2 / 2 / 1 / 11 | 871881.394622 / 871881.653082 |

Round-4 homepage additionally shows browser navigation start/commit followed by the new renderer's first non-metadata trace event approximately 55 ms after commit. Later main-thread work exists, so this is not an entirely absent renderer track. Proximate classification: early navigation marker absent from the raw trace. Underlying cause remains UNRESOLVED among Chrome tracing/renderer handoff/DevTools timing; parser-only failure is unsupported because navigationStart is absent before parsing. Three readable traces ending after paint do not prove every trace event was captured. Explicit readiness and fresh profiles did not prevent this failure.

## Upstream review and compatibility decision

- [Lighthouse #15382](https://github.com/GoogleChrome/lighthouse/issues/15382) documents intermittent NO_NAVSTART in upstream tests, with an entire main-thread track missing. This shares the error but differs from our preserved later renderer events; it does not prove the same cause.
- [Lighthouse #17148](https://github.com/GoogleChrome/lighthouse/issues/17148) reports headless frame-delivery delays and includes Chrome 154/newer Lighthouse observations. This is relevant candidate context, not a confirmed match or a demonstrated fix for our missing marker. Our traces have not established that issue's specific compositor signature.
- [LHCI releases](https://github.com/GoogleChrome/lighthouse-ci/releases) document the bundled Lighthouse 12.6.1 upgrade. [Lighthouse releases](https://github.com/GoogleChrome/lighthouse/releases) show newer major versions change audits/runtime requirements. Version recency alone does not demonstrate compatibility or a fix.

No authoritative matched fix or known-good alternative pairing was established. Therefore the conditional alternative-version experiment was not performed; no package/lockfile changed. A future isolated comparison is reasonable research once a specific pairing/hypothesis is selected, but a project upgrade or another production window is not justified by current evidence. Never choose a pairing because its scores are higher.

## Exact authoritative acceptance rule

lighthouserc.cjs collect.numberOfRuns = 3 and both assertMatrix entries specify aggregationMethod: 'median'. The SEO matching expression excludes /search/ only. lighthouserc.production.cjs inherits these assertions. LHCI utils assertions logic sorts values per assertion and takes the median; it does not select a single representative run. M07 IMPLEMENTATION_REPORT also states three-sample medians per route.

Unchanged gates: Performance >=95; Accessibility =100; SEO =100 except search; LCP <=2500 ms; CLS <=0.1; TBT <=200 ms (inclusive ceilings in repository configuration). Five-sample medians above cannot replace this rule or establish production acceptance. Field INP remains unmeasured; TBT is a lab proxy.

## Verdict and boundaries

M08_LIGHTHOUSE_HARNESS_RELIABILITY_UNRESOLVED. Local performance variance is best classified as HOST/SCHEDULING-supported with unresolved browser/rendering contributions; production systems additionally has demonstrated response/network delay (MIXED). Collector trace omission is separately demonstrated, with its mechanism unresolved. Application remediation is not justified by this evidence; failing forensic TBT medians do not prove application responsibility. No reliable collection correction has been demonstrated. Another production Lighthouse window is not technically justified yet.

Production remained paused throughout this local investigation. Fresh apex read-only check 2026-10-16 02:04:01 UTC returned HTTP 503, X-Vercel-Error: DEPLOYMENT_PAUSED, provider HSTS max-age=63072000. No new deployments, application/test/config changes, analytics activation, Search Console action, custom HSTS, DNS/domain changes or M09 work were performed. Analytics remains disabled per preserved provider evidence; M09 NOT_STARTED / NOT_AUTHORIZED. M08 remains unaccepted. Provider metadata refresh outcome is recorded separately below.

Read-only provider refresh completed 2026-10-16T02:04:05Z: paused=true; exact deployment and release SHA match; deployment count=1 (zero additional); PUBLIC_ENABLE_VERCEL_ANALYTICS=false in production/preview/development. Web Analytics object has an ID but no enabledAt; this is not activation evidence. Apex recheck 02:04:12Z again returned 503 DEPLOYMENT_PAUSED. No provider mutation occurred.


## 2026-10-16 isolated Lighthouse version comparison — complete

Verdict: **M08_LIGHTHOUSE_HARNESS_RELIABILITY_UNRESOLVED**. All 30 planned slots completed: five attempts per route per version, no replacements or score selection. This is separate from the earlier 18-attempt baseline and seven preserved production captures. No production window was opened.

### Versions and protocol

Baseline Lighthouse 12.6.1 comes from @lhci/cli 0.15.1 and @lhci/utils 0.15.1 (deduplicated). Alternative 13.5.0 was verified from official npm latest metadata and the [official release](https://github.com/GoogleChrome/lighthouse/releases/tag/v13.5.0). It is installed only under .agent/tmp/lighthouse-version-lab with its own package/lockfile. Project package.json and package-lock.json are unchanged. Both use Node 24.18.0 and Chrome 154.0.8037.93 at C:/Program Files/Google/Chrome/Application/chrome.exe, the existing static build at localhost:4359, fresh profiles/processes, the baseline chrome-launcher flags, headless=new, and serialized execution. Exact flags, PIDs, profiles, RAM, aggregate CPU, timestamps, LHRs, DevTools logs and traces are retained per attempt in the ignored lab. Version order reverses each round.

### Material experimental limitations

The first six slots failed before navigation because the lab copied null LHR metadata options into CLI flags; both versions rejected them with Cannot read properties of null (reading split). These are LAB_CLI_SERIALIZATION failures, not NO_NAVSTART. Scheduling was stopped, only null CLI options were omitted, and the remaining 24 slots ran with unchanged substantive settings. No first-round slot was rerun. Each version therefore has 15 total slots, only 12 reaching a correctly configured collector invocation.

The interrupted session contains large wall-clock gaps; the exact suspension/host cause was not established. A 13.5.0 watchdog expiry and CHROME_INTERSTITIAL_ERROR are preserved. This is a small, interrupted observational sample, not proof of either version's general failure probability. No headful control was added: the requested 30-slot experiment is complete and unresolved collector failures already answer the upgrade question; headful data would not repair this comparison.

### Configuration equivalence

Every available LHR configSettings matches all baseline keys: formFactor mobile; viewport 412x823, DPR1.75; simulate; RTT150 ms, throughput1638.4 Kbps, request latency562.5 ms, download1474.56/upload675 Kbps, CPU4x; en-US; same emulated UA; navigation mode; same quiet/load settings and trace options. config-differences.json is empty. No settings were normalized after measurement.

**Audit-set limitation:** onlyCategories=null means default all categories. 12.6.1 emits performance/accessibility/best-practices/seo; 13.5.0 additionally emits agentic-browsing. The requested shared categories exist in both, but full audit sets are not identical. No claim of fully equivalent audit workload or scoring internals is made. No category was removed mid-experiment. Core metric definitions/units remain available; this alone does not prove cross-major scoring equivalence.

Acceptance remains the repository's three captures per route, per-assertion median, with /search/ SEO exemption only. Budgets/mobile throttling/routes are unchanged. The five-attempt distributions here are diagnostic, not an acceptance replacement.

### Reliability — all slots counted

| Version | Attempts | Valid | Invalid | Valid % | NO_NAVSTART | NO_NAVSTART % | Other failures |
|---|---:|---:|---:|---:|---:|---:|---|
| 12.6.1 | 15 | 8 | 7 | 53.33 | 4 | 26.67 | 3 lab CLI serialization |
| 13.5.0 | 15 | 5 | 10 | 33.33 | 5 | 33.33 | 3 lab CLI serialization; 1 interstitial; 1 watchdog/no LHR |

Among the 12 post-correction collector invocations per version: baseline 8/12 valid, 4/12 NO_NAVSTART; newer 5/12 valid, 5/12 NO_NAVSTART plus two other failures. These conditional rates supplement, never replace, the all-attempt totals. 13.5.0 did not improve observed reliability. No statistical superiority or causal regression is claimed.

### All 30 attempt outcomes

Identifiers rN/pI map to round N and route index I (0=/, 1=/start/, 2=/systems/). Times are UTC; full lifecycle and resource measurements remain in attempt.json.

| Slot | Version | Start | End | Outcome | P | LCP ms | TBT ms |
|---|---|---|---|---|---:|---:|---:|
| round-1-route-0 | 12.6.1 | 2026-10-16T07:48:12.288Z | 2026-10-16T07:49:29.479Z | LAB_CLI_SERIALIZATION | — | — | — |
| round-1-route-0 | 13.5.0 | 2026-10-16T07:49:29.910Z | 2026-10-16T07:49:40.233Z | LAB_CLI_SERIALIZATION | — | — | — |
| round-1-route-1 | 12.6.1 | 2026-10-16T07:49:40.553Z | 2026-10-16T07:49:49.013Z | LAB_CLI_SERIALIZATION | — | — | — |
| round-1-route-1 | 13.5.0 | 2026-10-16T07:49:49.484Z | 2026-10-16T07:49:57.583Z | LAB_CLI_SERIALIZATION | — | — | — |
| round-1-route-2 | 12.6.1 | 2026-10-16T07:49:58.108Z | 2026-10-16T07:50:05.796Z | LAB_CLI_SERIALIZATION | — | — | — |
| round-1-route-2 | 13.5.0 | 2026-10-16T07:50:06.447Z | 2026-10-16T07:50:19.431Z | LAB_CLI_SERIALIZATION | — | — | — |
| round-2-route-0 | 12.6.1 | 2026-10-16T07:51:19.555Z | 2026-10-16T07:52:02.148Z | VALID | 98 | 1447.95 | 161.00 |
| round-2-route-0 | 13.5.0 | 2026-10-16T07:50:51.183Z | 2026-10-16T07:51:18.848Z | VALID | 90 | 1340.17 | 431.22 |
| round-2-route-1 | 12.6.1 | 2026-10-16T07:52:29.307Z | 2026-10-16T07:52:55.540Z | VALID | 91 | 1318.87 | 377.59 |
| round-2-route-1 | 13.5.0 | 2026-10-16T07:52:02.640Z | 2026-10-16T07:52:28.872Z | VALID | 98 | 1408.50 | 145.00 |
| round-2-route-2 | 12.6.1 | 2026-10-16T07:53:19.710Z | 2026-10-16T07:53:56.514Z | VALID | 100 | 1433.37 | 43.00 |
| round-2-route-2 | 13.5.0 | 2026-10-16T07:52:56.005Z | 2026-10-16T07:53:19.289Z | VALID | 100 | 1281.12 | 72.50 |
| round-3-route-0 | 12.6.1 | 2026-10-16T07:53:56.996Z | 2026-10-16T07:54:31.623Z | VALID | 84 | 1342.59 | 621.00 |
| round-3-route-0 | 13.5.0 | 2026-10-16T07:54:32.122Z | 2026-10-16T07:55:01.636Z | NO_NAVSTART | — | — | — |
| round-3-route-1 | 12.6.1 | 2026-10-16T07:55:02.083Z | 2026-10-16T07:55:34.543Z | VALID | 83 | 1373.77 | 676.00 |
| round-3-route-1 | 13.5.0 | 2026-10-16T07:55:35.394Z | 2026-10-16T07:56:09.465Z | VALID | 92 | 1256.25 | 331.50 |
| round-3-route-2 | 12.6.1 | 2026-10-16T07:56:10.196Z | 2026-10-16T07:56:47.811Z | VALID | 99 | 1486.49 | 100.00 |
| round-3-route-2 | 13.5.0 | 2026-10-16T07:56:48.180Z | 2026-10-16T10:57:11.117Z | CHROME_INTERSTITIAL_ERROR | — | — | — |
| round-4-route-0 | 12.6.1 | 2026-10-16T14:12:09.864Z | 2026-10-16T14:12:58.280Z | VALID | 97 | 1495.03 | 173.50 |
| round-4-route-0 | 13.5.0 | 2026-10-16T10:57:11.497Z | 2026-10-16T14:12:06.494Z | WATCHDOG_NO_LHR | — | — | — |
| round-4-route-1 | 12.6.1 | 2026-10-16T14:13:48.253Z | 2026-10-16T14:14:21.104Z | VALID | 100 | 1530.89 | 39.50 |
| round-4-route-1 | 13.5.0 | 2026-10-16T14:12:58.721Z | 2026-10-16T14:13:47.805Z | VALID | 85 | 1464.80 | 586.50 |
| round-4-route-2 | 12.6.1 | 2026-10-16T14:14:43.077Z | 2026-10-16T14:15:05.795Z | NO_NAVSTART | — | — | — |
| round-4-route-2 | 13.5.0 | 2026-10-16T14:14:21.474Z | 2026-10-16T14:14:42.644Z | NO_NAVSTART | — | — | — |
| round-5-route-0 | 12.6.1 | 2026-10-16T14:15:06.126Z | 2026-10-16T14:15:30.636Z | NO_NAVSTART | — | — | — |
| round-5-route-0 | 13.5.0 | 2026-10-16T14:15:31.178Z | 2026-10-16T14:15:52.448Z | NO_NAVSTART | — | — | — |
| round-5-route-1 | 12.6.1 | 2026-10-16T14:15:52.907Z | 2026-10-16T14:16:13.749Z | NO_NAVSTART | — | — | — |
| round-5-route-1 | 13.5.0 | 2026-10-16T14:16:14.150Z | 2026-10-16T14:16:35.934Z | NO_NAVSTART | — | — | — |
| round-5-route-2 | 12.6.1 | 2026-10-16T14:16:36.389Z | 2026-10-16T14:16:56.998Z | NO_NAVSTART | — | — | — |
| round-5-route-2 | 13.5.0 | 2026-10-16T14:16:57.356Z | 2026-10-16T14:17:16.923Z | NO_NAVSTART | — | — | — |

### Valid-report distributions

Each cell is min / median / max / population standard deviation. An SD of zero with n=1 has no evidentiary value for repeatability. Invalid reports are not assigned zero performance scores.

| Version | Route | Valid n | Performance points | LCP ms | TBT ms |
|---|---|---:|---|---|---|
| 12.6.1 | / | 3 | 84.00 / 97.00 / 98.00 / 6.38 | 1342.59 / 1447.95 / 1495.03 / 63.73 | 161.00 / 173.50 / 621.00 / 213.96 |
| 12.6.1 | /start/ | 3 | 83.00 / 91.00 / 100.00 / 6.94 | 1318.87 / 1373.77 / 1530.89 / 89.85 | 39.50 / 377.59 / 676.00 / 260.02 |
| 12.6.1 | /systems/ | 2 | 99.00 / 99.50 / 100.00 / 0.50 | 1433.37 / 1459.93 / 1486.49 / 26.56 | 43.00 / 71.50 / 100.00 / 28.50 |
| 13.5.0 | / | 1 | 90.00 / 90.00 / 90.00 / 0.00 | 1340.17 / 1340.17 / 1340.17 / 0.00 | 431.22 / 431.22 / 431.22 / 0.00 |
| 13.5.0 | /start/ | 3 | 85.00 / 92.00 / 98.00 / 5.31 | 1256.25 / 1408.50 / 1464.80 / 88.09 | 145.00 / 331.50 / 586.50 / 180.96 |
| 13.5.0 | /systems/ | 1 | 100.00 / 100.00 / 100.00 / 0.00 | 1281.12 / 1281.12 / 1281.12 / 0.00 | 72.50 / 72.50 / 72.50 / 0.00 |

| Version | Route | Observed FCP ms | Observed LCP ms | Observed load ms | Server response ms | Main-thread ms |
|---|---|---|---|---|---|---|
| 12.6.1 | / | 630.00 / 828.00 / 839.00 / 96.04 | 828.00 / 839.00 / 925.00 / 43.37 | 604.00 / 756.00 / 759.00 / 72.37 | 3.32 / 6.23 / 9.85 / 2.67 | 1827.93 / 1938.66 / 2262.60 / 184.43 |
| 12.6.1 | /start/ | 529.00 / 779.00 / 802.00 / 123.63 | 529.00 / 779.00 / 1234.00 / 291.84 | 449.00 / 475.00 / 756.00 / 139.00 | 5.53 / 6.28 / 8.57 / 1.29 | 1555.15 / 1801.41 / 2320.72 / 319.10 |
| 12.6.1 | /systems/ | 842.00 / 987.00 / 1132.00 / 145.00 | 842.00 / 987.00 / 1132.00 / 145.00 | 770.00 / 912.00 / 1054.00 / 142.00 | 4.01 / 4.20 / 4.39 / 0.19 | 1740.94 / 1828.75 / 1916.56 / 87.81 |
| 13.5.0 | / | 855.00 / 855.00 / 855.00 / 0.00 | 855.00 / 855.00 / 855.00 / 0.00 | 490.00 / 490.00 / 490.00 / 0.00 | 21.00 / 21.00 / 21.00 / 0.00 | 1639.01 / 1639.01 / 1639.01 / 0.00 |
| 13.5.0 | /start/ | 712.00 / 833.00 / 868.00 / 66.83 | 840.00 / 868.00 / 1079.00 / 106.68 | 662.00 / 802.00 / 805.00 / 66.71 | 6.00 / 7.00 / 8.00 / 0.82 | 1725.00 / 1855.08 / 2330.93 / 260.45 |
| 13.5.0 | /systems/ | 792.00 / 792.00 / 792.00 / 0.00 | 792.00 / 792.00 / 792.00 / 0.00 | 737.00 / 737.00 / 737.00 / 0.00 | 9.00 / 9.00 / 9.00 / 0.00 | 1441.90 / 1441.90 / 1441.90 / 0.00 |

Accessibility / SEO / CLS ranges (min–max):

- 12.6.1 /: A 100–100; SEO 100–100; CLS 0–0.
- 12.6.1 /start/: A 100–100; SEO 100–100; CLS 0–0.
- 12.6.1 /systems/: A 100–100; SEO 100–100; CLS 0–0.
- 13.5.0 /: A 100–100; SEO 100–100; CLS 0–0.
- 13.5.0 /start/: A 100–100; SEO 100–100; CLS 0–0.
- 13.5.0 /systems/: A 100–100; SEO 100–100; CLS 0–0.

### Failed trace examination and #15382

All nine NO_NAVSTART reports show successful HTTP200 document navigation, correct URL commit, DOMContentLoaded, load, paint events, zero raw navigationStart events, and Chrome alive at collector exit. Observed failure is consistent with upstream NO_NAVSTART behavior. [Issue #15382](https://github.com/GoogleChrome/lighthouse/issues/15382) does not prove causality: its example lacks an entire main-thread track, whereas HydroRigor retains later renderer/paint events.

| Invalid slot | HTTP document | Commit | DCL / load | navStart / paint count | Chrome alive |
|---|---|---|---|---|---|
| round-1-route-0-lh-12.6.1 | unavailable/no document response | unavailable | 0 / 0 | 0 / 0 | true |
| round-1-route-0-lh-13.5.0 | unavailable/no document response | unavailable | 0 / 0 | 0 / 0 | true |
| round-1-route-1-lh-12.6.1 | unavailable/no document response | unavailable | 0 / 0 | 0 / 0 | true |
| round-1-route-1-lh-13.5.0 | unavailable/no document response | unavailable | 0 / 0 | 0 / 0 | true |
| round-1-route-2-lh-12.6.1 | unavailable/no document response | unavailable | 0 / 0 | 0 / 0 | true |
| round-1-route-2-lh-13.5.0 | unavailable/no document response | unavailable | 0 / 0 | 0 / 0 | true |
| round-3-route-0-lh-13.5.0 | 200 | http://127.0.0.1:4359/ | 1 / 1 | 0 / 13 | true |
| round-3-route-2-lh-13.5.0 | unavailable/no document response | chrome-error://chromewebdata/ | 1 / 1 | 2 / 0 | true |
| round-4-route-0-lh-13.5.0 | unavailable/no document response | unavailable | 0 / 0 | 0 / 0 | true |
| round-4-route-2-lh-12.6.1 | 200 | http://127.0.0.1:4359/systems/ | 1 / 1 | 0 / 13 | true |
| round-4-route-2-lh-13.5.0 | 200 | http://127.0.0.1:4359/systems/ | 1 / 1 | 0 / 15 | true |
| round-5-route-0-lh-12.6.1 | 200 | http://127.0.0.1:4359/ | 1 / 1 | 0 / 13 | true |
| round-5-route-0-lh-13.5.0 | 200 | http://127.0.0.1:4359/ | 1 / 1 | 0 / 15 | true |
| round-5-route-1-lh-12.6.1 | 200 | http://127.0.0.1:4359/start/ | 1 / 1 | 0 / 13 | true |
| round-5-route-1-lh-13.5.0 | 200 | http://127.0.0.1:4359/start/ | 1 / 1 | 0 / 13 | true |
| round-5-route-2-lh-12.6.1 | 200 | http://127.0.0.1:4359/systems/ | 1 / 1 | 0 / 13 | true |
| round-5-route-2-lh-13.5.0 | 200 | http://127.0.0.1:4359/systems/ | 1 / 1 | 0 / 15 | true |

For startup failures and the watchdog with no LHR/trace, absence of telemetry is not evidence that navigation or paints did not happen. The interstitial is a separate browser navigation failure, not NO_NAVSTART; its DevTools evidence remains preserved.

### #17148 signatures and main-thread behavior

[Issue #17148](https://github.com/GoogleChrome/lighthouse/issues/17148) describes compositor frame-delivery stalls, not every low score. All 13 valid samples have load before FCP; nine also have near-equal FCP/LCP. Their FCP-after-load gaps are only 26–365 ms across all valid samples, not the issue’s characteristic 1–2 second stall. These broad partial similarities do not establish that mechanism. No explicit ThrottleUnresponsiveClient decision was found in retained default traces; absence is not exclusion because detailed viz categories were not added. No run is classified MATCHES SIGNATURE.

| Valid slot | P | FCP−load ms | FCP≈LCP | Classification | Largest raw main RunTask wall/CPU ms |
|---|---:|---:|---|---|---|
| round-2-route-0-lh-12.6.1 | 98 | 83 | true | PARTIAL MATCH | 328.68 / 277.78 |
| round-2-route-0-lh-13.5.0 | 90 | 365 | true | PARTIAL MATCH | 249.09 / 199.12 |
| round-2-route-1-lh-12.6.1 | 91 | 330 | true | PARTIAL MATCH | 249.84 / 211.73 |
| round-2-route-1-lh-13.5.0 | 98 | 63 | true | PARTIAL MATCH | 305.98 / 254.66 |
| round-2-route-2-lh-12.6.1 | 100 | 78 | true | PARTIAL MATCH | 319.86 / 265.43 |
| round-2-route-2-lh-13.5.0 | 100 | 55 | true | PARTIAL MATCH | 253.39 / 222.69 |
| round-3-route-0-lh-12.6.1 | 84 | 26 | false | DOES NOT MATCH | 217.91 / 184.13 |
| round-3-route-1-lh-12.6.1 | 83 | 46 | false | DOES NOT MATCH | 249.47 / 157.41 |
| round-3-route-1-lh-13.5.0 | 92 | 50 | false | DOES NOT MATCH | 101.11 / 83.56 |
| round-3-route-2-lh-12.6.1 | 99 | 72 | true | PARTIAL MATCH | 348.95 / 218.26 |
| round-4-route-0-lh-12.6.1 | 97 | 69 | true | PARTIAL MATCH | 289.56 / 232.42 |
| round-4-route-1-lh-12.6.1 | 100 | 54 | true | PARTIAL MATCH | 217.30 / 193.27 |
| round-4-route-1-lh-13.5.0 | 85 | 31 | false | DOES NOT MATCH | 184.75 / 140.17 |

Low-score runs remain dominated by style/layout and other main-thread work, with comparatively modest script evaluation. For example baseline start P83 style/layout1409.38 ms and main RunTask249.47wall/157.42CPU; newer start P85 style/layout1063.32 ms, one task85.75wall/7.59CPU. Off-CPU gaps support scheduling/waiting contributions without identifying a process. No application change occurred. Differences in score medians cannot establish a collector improvement or systematic scoring change because samples are small, interrupted, unpaired in timing, and audit sets differ.

### Integration implications — proposals only

No adoption is recommended from these results. A direct Lighthouse dependency alone does not guarantee LHCI uses it: current LHCI owns its pinned collector dependency. Options if later evidence identifies a reliable candidate:

- Upgrade LHCI to a release officially bundling the desired collector: package.json and package-lock.json; validate scripts/run-lighthouse.mjs and lighthouserc compatibility. Do not assume such a release exists or force an override without testing.
- Standalone pinned collector: package.json/package-lock.json plus scripts/run-lighthouse.mjs (or a dedicated collector script called there) to collect with the pinned binary and pass retained LHRs to unchanged median assertions. Existing CI invokes npm run test:lighthouse, so .github/workflows/ci.yml need not change if that interface is preserved; it would change if collection is split into a separate CI step. Explicit categories would require reviewed configuration/runner changes to avoid the new default category.
- Forcing a transitive major override would touch package.json/package-lock.json and needs LHCI compatibility evidence; it is not the preferred untested shortcut.

Smallest currently justified repository toolchain change: **none**. No reliable collector candidate found; no owner-approved dependency/CI/config changes implemented. Further offline investigation on a controlled, uninterrupted host is preferable to another production window. Headful comparison remains optional future diagnostic work, not an acceptance alternative.

The six lab setup errors, watchdog, interstitial and interruption are retained candidly. They limit precision but do not hide the decisive result that both versions still omit navigationStart on successfully loaded pages. Production remains paused; no deployment, analytics activation, Search Console, custom HSTS, DNS/domain or M09 action. M08 remains unaccepted.

Final safety verification 2026-10-16T14:18:01Z: provider paused=true; deployment dpl_DbGiGTwLdwHvPJHoEoCPwxH8pYcX; source141e3716aabef104adc5319215e0ddc607512162; count1; analytics false in production/preview/development. Apex 14:18:09Z HTTP503 DEPLOYMENT_PAUSED. Project dependency hashes match before experiment: package.json 192482AFB590A0350FEC3C4D6A716B92D46CF70413EFF49ED02C78DEC97D01A6; package-lock.json 899D2AE51A2162DB6A83BA24FF93FDF3CD3A9F94B22F988208984B4470CFB838. Local server stopped after collection. Documentation remains uncommitted; no generated lab artifacts staged.

Interstitial detail: round-3-route-2-lh-13.5.0 DevTools Network.loadingFailed reports net::ERR_NETWORK_IO_SUSPENDED for the Document. This supports a runtime/network suspension contribution to that separate failed slot; it does not establish the cause of NO_NAVSTART or justify assigning every timestamp gap to OS sleep. Representative raw LHR metrics were manually checked against analysis output; all six version/route groups contain exactly five attempts.
