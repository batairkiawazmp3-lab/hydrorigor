# M08 Gate C release attempt — 2026-10-13

Latest checkpoint: M08_PRODUCTION_LIGHTHOUSE_COLLECTION_BLOCKED (7/36 valid).
See the appended Lighthouse recovery section; production remains paused.
Earlier checkpoints below are historical.

Latest checkpoint: M08_SECOND_PRODUCTION_VALIDATION_FAILED due to Lighthouse
NO_NAVSTART; production is re-paused. See the appended second-validation evidence.
Earlier release/rollback statements below retain their original chronology.

Status: PRODUCTION_ROLLED_BACK_GATE_C_FAILED.
M08 remains IN_PROGRESS / NOT_ACCEPTED. M09 remains NOT_STARTED / NOT_AUTHORIZED.

## Authorization and Git evidence

The owner explicitly approved squash merge of PR #8 at
`b07573459826275f8619a01e09a495493a59ba45`, waiting for exact-main checks,
then a SHA-pinned first production deployment and first-release rollback on a
critical failure. No analytics, Search Console, custom HSTS, DNS or M09 changes
were authorized or performed.

PR #8 was squash-merged without bypass at 2026-10-13T09:46:57Z.
Release/main SHA: `141e3716aabef104adc5319215e0ddc607512162`.
Local main and origin/main matched; the tree matched the approved PR head and
the working tree was clean before release. Remote main was rechecked after the
wait and still matched. The original M08 branch is retained.

- [Post-merge ci / quality](https://github.com/batairkiawazmp3-lab/hydrorigor/actions/runs/38378777665): SUCCESS, exact release SHA; completed 09:56:22Z.
- [Post-merge governance](https://github.com/batairkiawazmp3-lab/hydrorigor/actions/runs/38378777968): SUCCESS, exact release SHA; job completed 09:47:11Z.

All quality steps, including production audit, Chromium, accessibility, local
launch rehearsal and Lighthouse, passed. These CI results are repository evidence,
not production acceptance. Prior September/October failures and retries remain
unchanged in the existing reports.

## External execution

Read-only preflight confirmed Vercel Pro team
`batairkiawazmp3-9310s-projects` / `team_1vAKWbbo2FshNGErHHmrMzBM`,
project `hydrorigor` / `prj_Lbm21h2zFAWCHMMwaRsh7KsHD9ee`, correct GitHub
repository, main, Astro, Node 24.x, npm ci, npm run build and dist.
The deployment list was empty. Apex was verified and attached to default
Production with no redirect; www was absent. Analytics flag was false in
production, preview and development; no custom HSTS exists in vercel.json.

The runbook's controlled ignored-build guard change from `exit 0` to null was
applied and read back. POST /v13/deployments used Git source SHA explicitly,
not local files or an unpinned branch. The guard was restored to `exit 0` and
read back; previewDeploymentsDisabled=true and autoAssignCustomDomains=false
remained unchanged. No Git deployment policy was enabled.

- Deployment ID: `dpl_DbGiGTwLdwHvPJHoEoCPwxH8pYcX`.
- URL: https://hydrorigor-1dl0y65qd-batairkiawazmp3-9310s-projects.vercel.app
- Source: `141e3716aabef104adc5319215e0ddc607512162` (API verified).
- Target: production; build reached READY.
- Created: 2026-10-13T16:41:50.865Z.
- Ready: 2026-10-13T16:42:09.033Z.
- Apex alias assigned: 2026-10-13T16:43:10.518Z.
- Existing hydrorigor.vercel.app alias assigned: 2026-10-13T16:43:27.208Z.
- GET deployment aliases verified both explicit aliases and two provider-generated
  project/branch aliases. No www alias or DNS change was made.

The deployment caused Vercel to allocate a webAnalytics ID. Its object had no
enabledAt or hasData field; analytics remained null and all application flags
remained false. No analytics enable action was called. Real-browser smoke observed
no unauthorized analytics requests. An allocated ID is not reported as activation.

## Production evidence before rollback

`npm run test:production`, with PRODUCTION_BASE_URL=https://hydrorigor.com/,
exited 1 because the Pagefind search assertion failed. Exactly 44 public route
checks passed, including all 25 M06 content pages and both tools.

Passed:

- Real apex HTTPS loaded with normal TLS verification (no bypass). curl also
  accepted the apex certificate. Detailed certificate issuer/expiry capture was
  not completed before rollback.
- Vercel domain config: misconfigured=false, conflicts=[], configuredBy=A;
  nameservers ns1.vercel-dns.com and ns2.vercel-dns.com. Recursive A observation:
  216.150.1.1 / 216.150.16.1; authoritative observation: 216.150.1.1 /
  216.150.16.65. Provider edge answers can vary; no DNS values were changed.
- Apex canonicals, OG URLs, headings and intended indexability for every public
  route; search noindex and development fixture noindex retained.
- All seven locked security headers matched, including strict CSP and exact
  calculator hash, nosniff, DENY framing, Referrer-Policy, Permissions-Policy,
  COOP same-origin and CORP same-site.
- Zero executable scripts on all 25 ordinary editorial pages.
- Calculator: 10 L × 2 mL/L = 20 mL.
- No browser console errors or unauthorized analytics requests during success
  routes and tool/search actions.
- Intentional missing route and both retired routes returned honest HTTP 404.
- robots.txt and the exact canonical sitemap set passed.
- HTTP apex redirected permanently to HTTPS. Additional nested-path/query probe
  returned 308 to https://hydrorigor.com/start/?m08=redirect-check unchanged.
- `npm run audit:prod` on the exact release lockfile: found 0 vulnerabilities.

Provider-default apex HSTS was `max-age=63072000`. No custom HSTS was added.
The unconfigured www HTTPS host produced a certificate-name mismatch; www was
not added, redirected or treated as the supported canonical host. The launch
scope was apex-only. This limitation remains disclosed.

Failed required functional check:

Pagefind query `hydroponic strawberries` did not produce a visible
`#search-results a[href="/crops/hydroponic-strawberries/"]` within the authoritative
5000 ms assertion timeout. The log reported element(s) not found. No console
error was reported. Root cause is NOT_ESTABLISHED: this evidence does not yet
distinguish a production search defect, URL mismatch or network/timing issue.
No timeout or threshold was weakened, and no retry was used to erase failure.

Production accessibility, production Lighthouse, detailed Twitter metadata and
JSON-LD review were NOT_RUN after this critical failure. Local/CI passes must not
be substituted. Field INP remains NOT_MEASURED; target <200 ms.

## Rollback and current state

The first release has no previous safe deployment. The approved runbook recovery
was executed: POST /v1/projects/prj_Lbm21h2zFAWCHMMwaRsh7KsHD9ee/pause.
Read-back confirmed paused=true and the ignored-build guard still `exit 0`.
At 2026-10-13T16:46:03Z apex returned HTTP 503 with
`X-Vercel-Error: DEPLOYMENT_PAUSED`; the deployment URL returned the same at
16:46:04Z. Thus the failed release is no longer served. This intentionally
interrupts availability; it does not restore a nonexistent previous release.

The paused deployment's provider-owned vercel.app URL returned provider HSTS
`max-age=63072000; includeSubDomains; preload`. The apex response still had only
`max-age=63072000`. These are observed provider responses, not repository/custom
HSTS additions or owner authorization for an apex subdomain/preload policy.

Domain ownership, DNS, auto-renew and aliases were preserved. Deployment and logs
were retained for diagnosis. No further deployment, resume, final release tag,
Search Console action or M09 work occurred. M08 is not accepted.

Recovery requires diagnosing the search failure, a reviewed correction if needed,
green checks and separately approved recovery deployment/project resume. Do not
resume the paused project merely to continue the remaining release tests.

Residual debt remains: 21 development-only audit findings, including critical
proxy-addr via LHCI; disputed http-cache-semantics advisory caveat as documented
in DEPENDENCY_REMEDIATION.md; unmeasured field INP; unsupported www; incomplete
production acceptance tests. Production dependency audit remains clean.

## Evidence locations

Ignored local evidence is preserved under `.agent/tmp/m08-gate-c/`: merge.json,
post-merge-quality.json, post-merge-governance.json, project/team/domain preflight,
deployment request/created/status/aliased records, aliases-verified.json,
guard read-backs, production-smoke.log, production-audit.log and rollback
project/apex/deployment responses. Existing local Lighthouse captures and all
remediation failure/retry logs remain untouched. No generated evidence or secrets
are staged for commit.


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


## 2026-10-16 local Lighthouse forensic verdict

M08_LIGHTHOUSE_HARNESS_RELIABILITY_UNRESOLVED. Completed 18 local attempts: 15 valid (five per representative route), three NO_NAVSTART. All low valid scores and failed raw traces preserved. No application fix or further production window justified. Production remains paused; M08 unaccepted; M09 NOT_STARTED / NOT_AUTHORIZED. See milestones/M08/LIGHTHOUSE_FORENSICS.md for the full matrix, trace evidence, upstream review and unchanged three-run per-metric median rule.
