# M08 search failure investigation — 2026-10-14

Latest checkpoint: M08_PRODUCTION_LIGHTHOUSE_COLLECTION_BLOCKED (7/36 valid).
See the appended Lighthouse recovery section; production remains paused.
Earlier checkpoints below are historical.

Latest checkpoint: M08_SECOND_PRODUCTION_VALIDATION_FAILED due to Lighthouse
NO_NAVSTART; second production search and all other completed checks passed.
See the appended second-validation section. Earlier statements below are historical.

Current review outcome: M08_SEARCH_INCIDENT_NONREPRODUCIBLE_READY_FOR_RELEASE_DECISION.
The authorized real-production diagnostic and final classification are appended
below. Earlier unresolved findings remain intact as historical evidence.

Status: M08_SEARCH_FAILURE_ROOT_CAUSE_UNRESOLVED.
No application/test fix, timeout change, commit or new PR is justified yet.

## Preserved incident and scope

Release: `141e3716aabef104adc5319215e0ddc607512162`.
Paused production deployment: `dpl_DbGiGTwLdwHvPJHoEoCPwxH8pYcX`.
Investigation branch: `m08-search-production-fix`, created from that exact main
SHA while preserving the uncommitted Gate C incident documentation. Accepted
source, dependencies, configuration and tests remain identical to the release.

The original `.agent/tmp/m08-gate-c/production-smoke.log` was not overwritten.
It records /search/, query `hydroponic strawberries`, expected visible selector
`#search-results a[href="/crops/hydroponic-strawberries/"]`, timeout 5000 ms,
and element(s) not found. It records no page/console errors or tracker requests.
It did NOT capture failed requests, individual asset statuses, search-status text,
initialization timings or eventual results after the deadline. Production UI
initialization, Pagefind readiness and original asset reachability are UNKNOWN.
An absence of recorded console errors does not prove those requests succeeded;
the application also catches search failures and displays a status message.

Earlier successful production route, calculator, security, DNS/HTTPS and audit
checks, followed by the verified project pause, remain recorded unchanged in
GATE_C_RELEASE_EVIDENCE.md. No production Lighthouse/accessibility pass is claimed.

## Exact-release local reproduction

Completed without source changes:

- `npm ci`: PASS; package.json/package-lock.json unchanged. Full install audit
  still reported 21 findings (2 low, 6 moderate, 12 high, 1 critical), previously
  disclosed development-tool debt; no forced audit fixes.
- `npm run build`: PASS, 48 HTML pages; Pagefind ran afterward and indexed
  43 pages / 2014 words.
- `npm run test:search`: PASS, semantic index checks and exclusions, 44 public
  routes including 25 M06 pages.
- `npm run test:launch`: PASS, unchanged authoritative implementation, same
  5000 ms strawberry expectation; all 44 routes / 25 M06 pages passed.

The separate diagnostic browser used the same `scripts/serve-dist.mjs`, with
the accepted CSP and security headers. Three fresh contexts executing the exact
strawberry steps and unchanged assertion all passed in 834, 424 and 404 ms
(click-to-assertion timing). All returned six results, including:

`Hydroponic Strawberries: Complete Indoor Growing Guide`
at `/crops/hydroponic-strawberries/`, and the separate NFT strawberry guide.
All recorded search asset requests were 200; console/page/failed-request lists
were empty. Thus the expected title/path is correct for the release index.

## Instrumented cold/warm comparison

Diagnostic-only browser interception added performance marks to the served copy
of search.js. It changed no repository or dist files, introduced no waits and
did not change the assertion. It measured navigation timeOrigin, script execution,
Pagefind load invocation, exported init start/end, query dispatch, search API
start/end and result rendering. Raw JSONL includes every requested asset, status,
timing, actual result title/href and browser error list.

Fresh-browser cases each used two fresh contexts and a cold then warm query.
The first case started a new instance of the accepted static server; later cases
used that server with fresh browsers. This is a cold application/browser cache
comparison, not a claim to flush the operating system's disk cache. Throttled
cases used Chromium CDP latency with 200000 bytes/s download (1.6 Mbps) and
93750 bytes/s upload. These are simulations, NOT measurements of the original
production connection. Timing instrumentation itself can add overhead.

| Scenario | Cold assertion | Query dispatch to rendered result | Warm dispatch to render | Asset/error result |
| --- | --- | --- | --- | --- |
| Fresh browser, new server, 2 contexts | 2/2 PASS | 597 / 383 ms | 33 / 42 ms | All 200; no errors |
| Fresh browser, existing server, 2 contexts | 2/2 PASS | 328 / 321 ms | 39 / 36 ms | All 200; no errors |
| Simulated 150 ms latency, 2 contexts | 2/2 PASS | 2488 / 2451 ms | 33 / 33 ms | All 200; no errors |
| Simulated 500 ms latency, 2 contexts | 2/2 PASS | 4590 / 4542 ms | 25 / 53 ms | All 200; no errors |
| Simulated 800 ms latency, 2 contexts | 2/2 FAIL at unchanged 5000 ms | 6629 / 6427 ms, observed afterward | 39 / 19 ms | All 200; no errors |

All ten warm-query assertions passed. The two slow cold failures remain failures;
observing their eventual completion does not convert them into passing tests.
Both had `Searching for “hydroponic strawberries”…` at the deadline and subsequently
rendered the six correct results. No lost query was observed.

Example slow-context timeline, milliseconds since navigation:

- navigation start: 0; search script executes: 2405.8;
- focus invokes Pagefind load: 2508.4;
- query dispatch: 2563.4;
- exported Pagefind init starts: 3624.6, returns: 3628.9;
- search API starts: 3629.0, resolves: 8255.6;
- results render: 9192.3 (6628.9 ms after dispatch).

The second slow context independently reproduced the same pattern. Unthrottled
contexts showed no intermittent failure in these samples; this does not prove
absence of all possible flakiness or reproduce the original Vercel response path.

## Actual built/requested assets and index evidence

Generated bundle: Pagefind 1.5.2, entry language en, hash `en_7ca326df25`,
page_count 43. Semantic queries and rendered results prove the strawberry articles
are indexed; file existence alone is not used as proof. Public articles carry
data-pagefind-body and indexable metadata; fixtures/search/404 are excluded by
the existing semantic tests.

Observed requests (all HTTP 200 locally):

- `/scripts/search.js`, `/pagefind/pagefind.js`, `/pagefind/pagefind-worker.js`;
- `/pagefind/pagefind-entry.json?ts=...`;
- `/pagefind/pagefind.en_7ca326df25.pf_meta`;
- `/pagefind/wasm.en.pagefind` (actual WASM bundle name, not pagefind.wasm);
- `/pagefind/index/en_2f95da7.pf_index` and `en_42b2635.pf_index`;
- six `/pagefind/fragment/*.pf_fragment` files for the returned results.

The built output also contains the third index chunk, 43 fragments, unknown-language
WASM, and Pagefind UI helpers. HydroRigor's custom UI does not request
pagefind-ui.js; its presence is not required for this flow. JS was served as
text/javascript, entry as application/json, binary bundles as application/octet-stream.
The accepted CSP permits these same-origin resources, worker and narrow WASM
execution. No CSP violation occurred in the local browser evidence.

## Implementation and authoritative test review

Search script imports `/pagefind/pagefind.js` from the origin root, initializes
on first input focus or query, caches the promise, awaits search, loads up to
20 result fragments, and renders href/title with DOM properties. There is no
production-only domain branch or preview/local base override. The exact relative
result URL in the test agrees with the actual index and renderer.

The production test navigates to /search/, fills the visible input (which focuses
it), clicks Search, then polls the result locator for 5000 ms. It does not wait
for a Pagefind-ready signal. Its result deadline includes remaining module,
worker, metadata/WASM, index and fragment loading. The app waits for the shared
load promise and Pagefind's search method waits for internal initialization;
query submission before initialization does not by itself lose the query.

Important limitation: Pagefind 1.5.2's exported `init` is
`async()=>{init_pagefind();}`. Its return does not establish that all core assets
or query-specific chunks are ready. The observed short init interval is the
exported call duration, not total engine readiness. Setting a UI ready flag merely
after `await pagefind.init()` would be misleading. Pagefind documents focus-time
initialization and separate query/result data fetching:
https://pagefind.app/docs/api/.

No proven expectation defect, canonical/path defect, CSP defect, index defect or
lost-query initialization race was found. Cold asset-loading latency can reproduce
the failure signature under synthetic conditions. That is a plausible production
hypothesis, not proof of B/C (initialization/test synchronization) as the original
incident's root cause. Original asset-load failure or host behavior cannot yet
be excluded. Classification remains UNRESOLVED, with cold-loading latency the
leading demonstrated hypothesis.

## Paused deployment read-only inspection

Vercel project inspect confirmed correct team/project. Project API confirmed
paused=true, analytics flag false in production/preview/development and no
analytics activation timestamp. Deployment API confirms the exact source SHA,
READY build state, npm run build, dist and no exposed custom routes (routes=null).
Committed vercel.json has no search rewrites/redirects. None of this proves every
provider-generated asset route behaved correctly during the original request.

Retained Vercel build logs prove all 48 pages preceded Pagefind, 43 pages/2014 words
were indexed, and output deployment completed. The public REST file-tree endpoint
returned 404 `File tree not found`; the available metadata exposed builds=[] and
no static-file manifest. Individual deployed Pagefind bytes/statuses therefore
remain unverified; do not claim a complete deployed-artifact inspection.

Read-only deployment list: exactly one deployment, the original ID. Apex probe
2026-10-14T07:55:52Z returned 503 DEPLOYMENT_PAUSED with provider HSTS
max-age=63072000. No extra deployment or unpause occurred. Domain/DNS, Search
Console, analytics, custom HSTS and M09 were not changed.

## Decision and next evidence needed

No source/test change, readiness contract, timeout increase or commit/PR was made.
The owner's instruction permits a fix only after a proven cause. Full post-fix
regression and Lighthouse are not applicable because there is no fix; earlier
passes remain historical evidence and no production retest is claimed.

To establish the production cause, obtain the original failed HAR/trace if one
exists outside this repository, or obtain separately authorized access to capture
the unchanged deployment's Pagefind requests, response bodies/statuses, UI state
and complete initialization timeline. The current instruction forbids unpause
and deployment; neither was used as an investigation shortcut. A production
request failure must be distinguished from valid results arriving after 5 seconds
before selecting a minimal fix or readiness contract. No recovery launch is ready.

## Local evidence

New evidence only: `.agent/tmp/m08-search-investigation/` contains npm-ci.log,
build.log, index-search.log, exact-launch-local.log, search-probe.jsonl,
timing-probe.jsonl, slow-start-probe.jsonl, diagnostic scripts, retained deployment
build log, selected metadata/project/deployment-list responses and paused-apex
response. The first attempt to summarize timing JSONL read a still-writing final
line and failed parsing; after the producer completed, all records parsed normally.
That was an observation-script interruption, not a search failure.

Original Gate C evidence and all earlier remediation/Lighthouse evidence remain
preserved. Documentation remains uncommitted on the investigation branch, per
the instruction to commit only after root cause is proven.

## Authorized unchanged-production diagnostic — 2026-10-14

The owner explicitly authorized temporary access to the original paused deployment
for trace collection, immediately followed by re-pause. No rebuild, redeployment,
application/test change, timeout change, DNS/alias change, analytics activation,
Search Console action, custom HSTS change or M09 action was performed.

Deployment: `dpl_DbGiGTwLdwHvPJHoEoCPwxH8pYcX`.
Source SHA: `141e3716aabef104adc5319215e0ddc607512162`.
Read-only preflight verified paused=true, this exact SHA, the existing apex alias,
exactly one deployment and analytics false in all three environments. The public
API exposes project-level pause/unpause; there was only this one deployment.

UTC mutation ledger (request and successful response times, not invented internal
provider transition timestamps):

| Action | Request | Command success |
| --- | --- | --- |
| Unpause original project | 2026-10-14T08:03:13.2350494Z | 2026-10-14T08:03:22.5624295Z |
| Pause after collection | 2026-10-14T08:03:50.7323477Z | 2026-10-14T08:03:58.7146403Z |

Unpause read-back showed paused=false. Vercel's unpause operation inherently set
autoAssignCustomDomains=true; its matching pause restored false. The ignored-build
guard stayed `exit 0`; no separate settings PATCH or alias operation occurred.
The capture was bounded and pause ran in a finally block immediately after capture.

The original production strawberry assertion was executed verbatim, with its
unchanged default 5000 ms timeout, in two new anonymous browser contexts plus a
warm query in the first context. There was no interception/replacement of the
production search script. Diagnostic DOM event listeners, MutationObserver, HAR
and Playwright traces observed behavior without changing search code or waits.
This tested the exact search assertion, not a rerun of the entire 44-route suite.

## Real production timing and results

All times below are milliseconds since that context's navigation start except
the elapsed columns. DOM events use the browser performance clock; HAR asset
intervals in the next table use the HAR navigation request as zero. Their origins
differ slightly and must not be subtracted across clocks. Original raw records
are retained for precise analysis.

| Observation | Cold context 1 | Cold context 2 | Warm query, context 1 |
| --- | ---: | ---: | ---: |
| Navigation request UTC (HAR) | 08:03:36.580Z | 08:03:46.729Z | Same navigation as context 1 |
| DOMContentLoaded event | 4519.0 | 793.1 | No new navigation |
| Load event | 4519.6 | 794.0 | No new navigation |
| Input focus | 4766.6 | 967.2 | 8640.7 |
| Query dispatch | 4999.2 | 1024.2 | 8763.7 |
| First matching result rendered | 7641.5 | 2387.2 | 8829.3 |
| Dispatch to matching result | 2642.3 | 1363.0 | 65.6 |
| Click-call through assertion completion | 2970.2 | 1682.6 | 172.1 |
| Original 5000 ms assertion | PASS | PASS | PASS |
| Console messages / page errors / failed requests | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 |

Each query returned six results including exactly:
`Hydroponic Strawberries: Complete Indoor Growing Guide` at
`/crops/hydroponic-strawberries/`. No expectation or URL normalization was changed.

Initialization observation: focus was followed by the Pagefind JS, worker, entry,
metadata and WASM requests shown below, then query indexes and fragments. The
internal exported init call was not instrumented on production, and a completed
asset request is not mislabeled as a definitive engine-ready event. The existing
Pagefind init-return limitation described above still applies.

### Actual production asset trace

Every row returned HTTP 200 in both cold contexts. Values are request start–end
milliseconds relative to that context's HAR navigation request, rounded. Warm
query issued no additional matching asset requests; it reused loaded state.
No UI helper script or hypothetical pagefind.wasm was required or requested.

| Requested path | Cold 1 start–end | Cold 2 start–end |
| --- | ---: | ---: |
| /scripts/search.js | 3575–3987 | 517–600 |
| /pagefind/pagefind.js | 4762–5371 | 967–1040 |
| /pagefind/pagefind-worker.js | 5457–6046 | 1064–1553 |
| /pagefind/pagefind-entry.json (timestamp query) | 6070–6411 | 1567–1639 |
| /pagefind/pagefind.en_2d1cf0458c.pf_meta | 6439–6573 | 1651–1722 |
| /pagefind/wasm.en.pagefind | 6447–6574 | 1660–1779 |
| /pagefind/index/en_5e45d38.pf_index | 6753–6832 | 2019–2131 |
| /pagefind/index/en_6c1128d.pf_index | 6754–7078 | 2024–2097 |
| /pagefind/fragment/en_1c46974.pf_fragment | 7197–7609 | 2261–2332 |
| /pagefind/fragment/en_3d378d7.pf_fragment | 7198–7284 | 2262–2330 |
| /pagefind/fragment/en_81ce8c8.pf_fragment | 7200–7279 | 2264–2333 |
| /pagefind/fragment/en_5eb94a3.pf_fragment | 7203–7525 | 2266–2335 |
| /pagefind/fragment/en_b3c442a.pf_fragment | 7206–7515 | 2268–2335 |
| /pagefind/fragment/en_1ca1e60.pf_fragment | 7213–7294 | 2272–2342 |

Production's actual metadata/index hash names differ from the separately generated
local bundle. Both independently produced correct results; no hash equality or
deterministic build claim is made. This trace establishes production asset access
for this diagnostic window, not retroactively for the failed launch.

Cold 1 had X-Vercel-Cache MISS on pagefind.js, worker, entry, one index chunk and
three fragments; other relevant assets were HIT. Cold 2's relevant assets were
all HIT. Both browser contexts began fresh, but the second context did not flush
the Vercel CDN. Resource requests reached the bom1 edge. These observations
support variable cold-loading cost; they do not establish the original request's
network or edge conditions.

## Re-pause verification and final state

Initial post-diagnostic read-back confirmed paused=true, autoAssignCustomDomains=false,
ignored-build guard `exit 0`, analytics false in production/preview/development,
and no analytics activation timestamp. Apex and original deployment URL returned
503 DEPLOYMENT_PAUSED at 2026-10-14T08:04:27Z.

The interrupted review was resumed with read-only verification first. At
2026-10-14T13:38:32Z apex again returned HTTP 503 with
X-Vercel-Error: DEPLOYMENT_PAUSED. Project paused=true, original deployment/source
SHA and exactly one deployment were reconfirmed. All alias identities, creation
timestamps and null redirect fields match the pre-diagnostic snapshot. Domain
config remains misconfigured=false, conflicts=[], configuredBy=A with
ns1.vercel-dns.com/ns2.vercel-dns.com. No domain/DNS operation occurred.

Analytics remains disabled (all flags false, no enabledAt); Search Console was
not accessed or changed. No custom HSTS was introduced. Apex provider-default
HSTS remains max-age=63072000. M09 remains NOT_STARTED / NOT_AUTHORIZED.
There is no additional deployment. No second diagnostic session was performed
for this final review. Production remains paused, and M08 is not accepted.

## Final comparison and decision

- Original launch: unchanged assertion failed at 5000 ms; no per-asset trace or
  eventual-result observation, no recorded console error. Preserve as a failure.
- Exact-release local: unchanged searches pass in 404–834 ms click-to-assertion.
- Artificial 800 ms latency: cold assertion fails, correct results later appear
  after 6.4–6.6 s; all assets 200. This is a simulation, not Vercel telemetry.
- Actual production diagnostic: unchanged assertion passes in both cold contexts
  and warm comparison, matching results in 2.642 s / 1.363 s / 0.066 s from dispatch.
  Every relevant requested asset was 200, with no browser errors.

Classification: **E — transient production/edge/network latency event is probable;
F — the original event is not forensically provable because its failed request
trace is missing.** Confidence is high in successful unchanged search during the
captured diagnostic, moderate in transient latency as the leading explanation,
and insufficient to attribute the original failure to a specific request/provider
component. No proven application, initialization or asset-serving defect, and no
proven deterministic 5-second timeout defect. Do not manufacture certainty or
reinterpret the original failure as a pass.

Recommended OPTION 1: no application or assertion change. Preserve the exact
implementation, expected strawberry URL and 5000 ms criterion. Seek a separate
owner release decision for controlled second validation of this same existing
deployment/SHA; a rebuild/new deployment is unnecessary for unchanged code.
If approved, collect HAR/trace from the start, run the original complete production
smoke, then the outstanding production accessibility and Lighthouse gates with
unchanged budgets. Preserve any failure and apply the approved pause/rollback
rule; no automatic deadline relaxation or retry-to-green policy.

OPTION 2 is optional future review: preserve richer failure-only screenshots,
search-status text, request statuses/timings and console/page/request errors in
the validation harness. This could improve forensic evidence without changing
user-visible behavior, assertion, timeout or success criteria. Existing ignored
diagnostic tooling already demonstrates capture; no repository test change is
implemented or required for the current recommendation. Review any persistent
diagnostic patch separately before relying on it for another launch.

No speculative application fix, fake ready flag or timeout increase is justified.
Release approval remains pending, so incident documentation is deliberately not
committed. Branch remains m08-search-production-fix at the original release SHA.

Final state: M08_SEARCH_INCIDENT_NONREPRODUCIBLE_READY_FOR_RELEASE_DECISION.

## Production diagnostic evidence retained

`.agent/tmp/m08-production-diagnostic/` contains results.jsonl, two full HARs,
two Playwright trace ZIPs, three screenshots, capture.mjs/capture.log, mutation
ledger and selected before/during/after/final-review provider responses. These
ignored files preserve request timestamps, response statuses/headers/bodies,
DOM events, result timing/title/URL and all recorded browser errors. No browser
login context or secrets were used, and no generated trace is staged for commit.
All original launch and earlier local investigation evidence remains untouched.


## Second production validation — 2026-10-14 UTC; final verification 2026-10-15 UTC

**M08_SECOND_PRODUCTION_VALIDATION_FAILED**. Search and all pre-Lighthouse
production checks passed; Lighthouse collection failed before any valid capture.
M08 is not accepted. Production remains paused. No permanent unpause is authorized.

The owner authorized temporary access to the same existing deployment only:
`dpl_DbGiGTwLdwHvPJHoEoCPwxH8pYcX`, source
`141e3716aabef104adc5319215e0ddc607512162`.
Unpause requested 2026-10-14T18:46:40.5359630Z; API success
18:46:48.5238517Z. No rebuild, redeployment, code/test/config change, timeout
change, domain/DNS/alias change, or threshold change occurred.

### Completed production evidence

- Unchanged 5000 ms strawberry assertion: three cold contexts PASS, query dispatch
  to matching result 1368.9 / 1263.0 / 1139.5 ms; warm comparison 71.7 ms PASS.
- Query: `hydroponic strawberries`. Expected and actual title:
  Hydroponic Strawberries: Complete Indoor Growing Guide;
  URL `/crops/hydroponic-strawberries/`. Six results rendered.
- Each cold context requested 14 search assets, all HTTP 200. No console errors,
  page errors or failed requests. Warm query needed no additional search requests.
- Authoritative production smoke PASS: 44 public routes, all 25 M06 pages,
  search, both tools, 10 L × 2 mL/L = 20 mL, intended retired-route 404s,
  development-fixture noindex, robots and exact canonical sitemap set.
- Locked M07 security headers/CSP and zero executable client scripts on the
  25 ordinary editorial pages PASS. Provider HSTS `max-age=63072000` observed;
  no custom HydroRigor HSTS was added.
- All 44 routes' title/canonical/OG/Twitter/robots/JSON-LD matched the existing
  exact-release local build. Apex HTTPS canonical retained; no www-first redirect.
- TLS 1.3, authorized certificate for hydrorigor.com, issuer Let's Encrypt YR2,
  valid 2026-10-11 through 2027-01-09. HTTP to HTTPS 308 retained path/query.
- www remains unconfigured; its certificate does not cover www.hydrorigor.com.
  This is a known release-decision item, not changed during validation.
- Production dependency audit PASS, zero vulnerabilities (2026-10-14).
- Authoritative production accessibility suite: 17/17 PASS, including automated
  WCAG A/AA scans, mobile navigation, search/calculator states, skip link and focus.

### Lighthouse failure and limits

`npm run test:lighthouse:production` started at 18:50:36.8370465Z with the
unchanged 12-route × 3-run mobile configuration. First homepage run failed with
`NO_NAVSTART`: "Something went wrong with recording the trace over your page
load." Command exited 1 at 18:53:20.0701284Z. There are **0 valid production
captures out of 36**, no production medians and no completed budget assertion.
This is a trace-collection failure, not evidence of a measured performance-budget
regression or a proven application defect. The exact cause of the missing trace
navigation event has not been established. No speculative fix or retry was made.
All budgets remain unchanged: Performance >=95, Accessibility 100, SEO 100 on
indexable routes, LCP 2500 ms ceiling, CLS 0.1 ceiling and TBT <=200 ms; search
retains its intentional noindex SEO exemption. No field INP measurement exists.
Prior 36 local captures were preserved under `prior-local-lighthouse/`; they
are historical local evidence and do not substitute for production Lighthouse.

### Finally cleanup and final read-only verification

Pause requested automatically at 2026-10-14T18:53:20.1068654Z, API success
18:53:27.9921227Z; paused=true and apex DEPLOYMENT_PAUSED verified at
18:53:34.9372652Z. On resume, read-only verification again returned paused=true
and apex HTTP 503 / DEPLOYMENT_PAUSED (response Date 2026-10-15T02:31:05Z).
Deployment ID/SHA unchanged; exactly one deployment exists, zero additional
deployments. The four aliases match the pre-validation snapshot. DNS remains
configuredBy=A, misconfigured=false, conflicts=[], nameservers
ns1.vercel-dns.com and ns2.vercel-dns.com. Domain configuration preserved.

PUBLIC_ENABLE_VERCEL_ANALYTICS=false in production/preview/development;
Web Analytics has an allocated ID but no enabledAt, analytics=null and no
activation was performed. Search Console untouched; custom HSTS unchanged;
M09 NOT_STARTED / NOT_AUTHORIZED. Only ignored diagnostic scripts/logs and M08
documentation were written locally; accepted application/test/config files unchanged.

Original failed launch, first rollback, artificial-latency experiment and first
production diagnostic session remain preserved. Search incident classification
remains E (transient latency leading explanation), with F (original failure not
forensically provable without its missing request trace). The successful second
search validation does not rewrite the original failure.

Recommendation: do not permanently unpause yet. Diagnose the Lighthouse trace
collection problem while production stays paused, then obtain a controlled
validation window to complete the unchanged production matrix. Separately review
adding www with a valid certificate and permanent redirect to the apex before
final M08 acceptance; this requires explicit domain-change approval. Remaining
debt includes the previously disclosed 21 development-only advisories, disputed
http-cache-semantics caveat and unavailable field INP. No M08 acceptance claimed.

Evidence: ignored `.agent/tmp/m08-second-validation/` retains ledger.jsonl,
three HARs/traces, screenshots, results.jsonl, search-summary.json, all validation
logs, TLS record, before/after/final API snapshots and paused HTTP responses.
No generated trace, credential or dependency artifact is intended for Git.

### Second-validation search timing detail

All timing values below are milliseconds from navigation start unless noted.

| Run | Navigation UTC | DOMContentLoaded | Load | Query dispatch | Matching render | Query elapsed |
|---|---|---:|---:|---:|---:|---:|
| 1/1 fresh-context-cold-cache | 2026-10-14T18:47:05.748Z | 4165.0 | 4165.5 | 4715.2 | 6084.1 | 1368.9 |
| 2/1 fresh-context-cold-cache | 2026-10-14T18:47:13.533Z | 1065.2 | 1065.7 | 1302.7 | 2565.7 | 1263.0 |
| 3/1 fresh-context-cold-cache | 2026-10-14T18:47:17.852Z | 717.3 | 717.7 | 898.3 | 2037.8 | 1139.5 |
| 3/2 warm-same-context | 2026-10-14T18:47:17.852Z | 717.3 | 717.7 | 3553.4 | 3625.1 | 71.7 |

Per-asset status and request duration (ms from request start to response end;
raw absolute timings and cache/edge headers remain in the HAR/JSON evidence):

| Asset | Cold 1 | Cold 2 | Cold 3 |
|---|---:|---:|---:|
| /scripts/search.js | 200 / 121.3 ms | 200 / 116.1 ms | 200 / 91.3 ms |
| /pagefind/pagefind.js | 200 / 129.2 ms | 200 / 103.7 ms | 200 / 74.3 ms |
| /pagefind/pagefind-worker.js | 200 / 200.3 ms | 200 / 138.9 ms | 200 / 150.9 ms |
| /pagefind/pagefind-entry.json (per-navigation ts query) | 200 / 73.8 ms | 200 / 77.5 ms | 200 / 75.7 ms |
| /pagefind/wasm.en.pagefind | 200 / 264.7 ms | 200 / 270.4 ms | 200 / 209.3 ms |
| /pagefind/pagefind.en_2d1cf0458c.pf_meta | 200 / 266.9 ms | 200 / 78.6 ms | 200 / 75.4 ms |
| /pagefind/index/en_6c1128d.pf_index | 200 / 150.8 ms | 200 / 129.7 ms | 200 / 89.1 ms |
| /pagefind/index/en_5e45d38.pf_index | 200 / 234.2 ms | 200 / 172.8 ms | 200 / 98.9 ms |
| /pagefind/fragment/en_1c46974.pf_fragment | 200 / 78.8 ms | 200 / 79.1 ms | 200 / 73.8 ms |
| /pagefind/fragment/en_81ce8c8.pf_fragment | 200 / 81.6 ms | 200 / 85.2 ms | 200 / 84.7 ms |
| /pagefind/fragment/en_3d378d7.pf_fragment | 200 / 92.1 ms | 200 / 75.2 ms | 200 / 81.9 ms |
| /pagefind/fragment/en_1ca1e60.pf_fragment | 200 / 91.1 ms | 200 / 77.0 ms | 200 / 74.7 ms |
| /pagefind/fragment/en_5eb94a3.pf_fragment | 200 / 337.7 ms | 200 / 75.8 ms | 200 / 70.7 ms |
| /pagefind/fragment/en_b3c442a.pf_fragment | 200 / 369.9 ms | 200 / 76.5 ms | 200 / 104.4 ms |


## Lighthouse recovery checkpoint — 2026-10-15

**M08_PRODUCTION_LIGHTHOUSE_COLLECTION_BLOCKED**. Seven valid production reports
are preserved. The /systems/ second capture failed NO_NAVSTART on both its initial
attempt and the single permitted fresh-browser retry. Collection stopped; no
third attempt was made. No /systems/ median or full-matrix budget result can be
declared with 1/3 reports. No valid score was discarded or retried.

### Offline collector investigation and local probe

Node 24.18.0, Lighthouse 12.6.1, LHCI 0.15.1, system Chrome 154.0.8037.93.
Earlier passing local reports also used Chrome 154 and Lighthouse 12.6.1, so a
version incompatibility is not established. Approximately 1 GB RAM was free on
the 8 GB machine; resource pressure is a risk, not a proven cause. No stale
HydroRigor Lighthouse Chrome/port process was found before the local probe.

The existing launcher allocates a new debug port and temporary profile, starts
headless Chrome with chrome-launcher default flags, waits for the debugging
endpoint, invokes the pinned LHCI navigation collector and cleans up its browser.
No custom trace categories, navigation mode or timing override was introduced.
The unchanged mobile settings remain simulated slow-4G, 4x CPU and the existing
viewport. Default maxWaitForFcp=30000 and maxWaitForLoad=45000 were unchanged.
The installed trace processor throws NO_NAVSTART when it cannot find the required
navigation-start/time-origin marker. The original log does not establish why that
marker was absent. Upstream issue https://github.com/GoogleChrome/lighthouse/issues/15382
documents similar missing-trace symptoms; this is context, not proof of the same cause.

Using the existing exact-release dist and static server, the unchanged collector
with a fresh Chrome/profile produced a valid local homepage report: Performance
99, Accessibility 100, SEO 100, LCP 1459.604 ms, CLS 0, TBT 121.5 ms. Navigation
timing and trace metrics were present, runtimeError absent, original assertions
passed. No rebuild or application change was needed. Local evidence is separate
from production captures and is not counted toward the matrix.

### Production attempts and recovery policy

The first production recovery window unpaused the same project at
2026-10-15T02:42:01.9983727Z (request 02:41:54.3351457Z). Homepage capture 1
succeeded, then capture 2 failed NO_NAVSTART. Finally cleanup paused at
02:44:09.2170335Z; paused response verified at 02:44:16.1060024Z.
On resume no collector was running and paused=true/503 were reconfirmed.

The next owner-authorized window unpaused at 07:25:55.9276679Z (request
07:25:49.0400485Z). An ignored orchestration script selected only missing slots,
called the existing launcher for one capture at a time with a fresh Chrome/profile,
and copied every valid report into a separate production-valid directory before
the next collection. It inherited the authoritative settings and assertions;
only URL selection and per-invocation run count changed to fill the original
12x3 matrix. No committed harness, configuration, scoring or threshold changed.
Valid reports were retained even when the per-capture assertion exited nonzero.
The final authoritative 36-report median assertion was never reached.

- Homepage capture 2: one fresh-browser retry after prior invalid NO_NAVSTART;
  valid Performance 81 / TBT 784 ms retained. No score-improvement retry.
- /systems/ capture 2: first attempt failed NO_NAVSTART at 07:32:00.749Z;
  one fresh-browser retry also failed NO_NAVSTART at 07:33:00.171Z.
- Two explicit invalid-capture retries were used in this resumed matrix:
  homepage capture 2 and /systems/ capture 2. The earlier all-zero initial
  collection and fresh recovery window remain separately recorded incidents.
- All original failure logs remain intact. Fresh profiles sometimes produced valid
  reports but also produced NO_NAVSTART. **The cause remains unproven; fresh-profile
  use is not claimed to have fixed it.** No valid budget miss was treated as invalid.

### Preserved counts and complete-route medians

| Route | Valid count | Performance | Accessibility | SEO | LCP ms | CLS | TBT ms |
|---|---:|---:|---:|---:|---:|---:|---:|
| / | 3/3 | 100 | 100 | 100 | 1356.579 | 0 | 0 |
| /start/ | 3/3 | 97 | 100 | 100 | 1401.027 | 0 | 170 |
| /systems/ | 1/3 | NOT EVALUATED | NOT EVALUATED | NOT EVALUATED | NOT EVALUATED | NOT EVALUATED | NOT EVALUATED |
| /systems/indoor-hydroponic-systems-for-home/ | 0/3 | — | — | — | — | — | — |
| /nutrients-water/hydroponic-nutrients/ | 0/3 | — | — | — | — | — | — |
| /best/hydroponic-system-for-home-growers/ | 0/3 | — | — | — | — | — | — |
| /crops/hydroponic-strawberries/ | 0/3 | — | — | — | — | — | — |
| /reviews/masterblend-hydroponic-nutrients/ | 0/3 | — | — | — | — | — | — |
| /tools/ph-ec-targets/ | 0/3 | — | — | — | — | — | — |
| /tools/nutrient-mixing-calculator/ | 0/3 | — | — | — | — | — | — |
| /search/ | 0/3 | — | — | exempt | — | — | — |
| /testing-methodology/ | 0/3 | — | — | — | — | — | — |

Both complete routes' medians meet the unchanged budgets. This is not a full
production pass and does not establish perfect stability. Of the seven valid
reports, minimum Performance=53, maximum LCP=4455.585 ms, maximum CLS=0 and
maximum TBT=784 ms. Accessibility and SEO are 100 in all seven (all indexable).
The severe valid outliers remain material production measurement variance risk.
They cannot be blamed on the collector error or removed as inconvenient scores.

### Safe stop and next decision

The failed retry triggered finally cleanup. Pause requested
2026-10-15T07:33:00.5905878Z; success 07:33:09.1968535Z; verified paused=true
and apex DEPLOYMENT_PAUSED at 07:33:18.3348435Z. On the next resume, apex again
returned HTTP 503 DEPLOYMENT_PAUSED (response Date 2026-10-15T12:32:59Z).
Same original deployment dpl_DbGiGTwLdwHvPJHoEoCPwxH8pYcX and source
141e3716aabef104adc5319215e0ddc607512162; exactly one deployment, zero additional.
Analytics remains false in production/preview/development. Search Console,
custom HSTS, DNS/aliases and M09 untouched. M09 NOT_STARTED / NOT_AUTHORIZED;
M08 not accepted. Provider apex HSTS remains max-age=63072000.

Do not permanently unpause. Further collection needs investigation of raw Chrome
trace/navigation evidence and a reviewed recovery plan: the allowed /systems/
capture retry is exhausted. Retain all seven valid scores for any future authorized
continuation. Assess the severe measured outliers separately from collector
reliability before deciding launch variance is acceptable. www remains unconfigured
with its previously disclosed certificate mismatch. Prior successful search,
44-route/25-page smoke, calculator, TLS/metadata/security, zero production audit
and 17/17 accessibility remain valid historical checks; they were not repeated.

Ignored evidence: .agent/tmp/m08-lighthouse-recovery/ contains local-one-evidence,
original recovery log/ledger, production-valid (seven LHRs), captures.jsonl,
per-attempt logs, preserved-seven.json and resume-window final-state/pause records.
No generated reports, logs, profiles or secrets are included in the documentation
checkpoint. No application/content/schema/dependency change was made.

### Every retained valid production capture

| URL | Fetch UTC | Performance | Accessibility | SEO | LCP ms | CLS | TBT ms |
|---|---|---:|---:|---:|---:|---:|---:|
| / | 2026-10-15T02:42:59.933Z | 100 | 100 | 100 | 1356.579 | 0 | 0 |
| / | 2026-10-15T07:26:23.168Z | 81 | 100 | 100 | 1421.566 | 0 | 784 |
| / | 2026-10-15T07:27:05.478Z | 100 | 100 | 100 | 1349.018 | 0 | 0 |
| /start/ | 2026-10-15T07:28:14.391Z | 99 | 100 | 100 | 1628.461 | 0 | 88.5 |
| /start/ | 2026-10-15T07:29:02.893Z | 97 | 100 | 100 | 1401.027 | 0 | 170 |
| /start/ | 2026-10-15T07:29:38.504Z | 86 | 100 | 100 | 1367.000 | 0 | 391.5 |
| /systems/ | 2026-10-15T07:30:38.372Z | 53 | 100 | 100 | 4455.585 | 0 | 536 |
