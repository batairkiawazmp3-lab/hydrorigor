HydroRigor M07 — Quality & Observability is explicitly AUTHORIZED by ChatGPT.

Project root:
D:\hydrorigor

Authoritative remote:
batairkiawazmp3-lab/hydrorigor

Required baseline:
main = a01934e7e2379b38249a6562f7697febddc20a2c

Previous milestone:
M06 — Content Wave 1: ACCEPTED AND SQUASH-MERGED

M08 and all later milestones remain unauthorized.

You are the primary autonomous implementation, validation, Git, PR, CI,
performance, accessibility and security-hardening agent for M07.

==================================================
AUTHORITATIVE M07 SCOPE
==================================================

The approved HydroRigor master strategy defines:

Milestone:
M07 — Quality & Observability

Scope:
Performance / security / accessibility / analytics

Key outputs:
- security headers
- analytics preparation/integration
- Search Console preparation
- Lighthouse CI
- Playwright smoke testing
- broken-link checking

Acceptance:
- CWV/lab performance budgets met
- accessibility gate met

Dependency:
M01–M06

Deployment:
PREVIEW ONLY

Content volume:
existing 25 M06 production pages

M07 does NOT authorize M08 production launch.

==================================================
1. PRE-M07 REALITY VERIFICATION
==================================================

Before changing files:

Verify:

- current branch = main
- local main == origin/main
- HEAD exactly:
  a01934e7e2379b38249a6562f7697febddc20a2c
- working tree clean
- PR #6 merged
- M06 state = ACCEPTED

Then create:

m07-quality-observability

Do not work directly on main.

==================================================
2. RECONCILE POST-M06 STATE
==================================================

Inspect:

- .agent/state/CURRENT_MILESTONE.md
- .agent/state/CURRENT_HANDOFF.md
- README.md

Correct stale post-M06 wording.

Record truthfully:

M06 — Content Wave 1: ACCEPTED AND MERGED
M07 authorization: GRANTED
M07 status: IN_PROGRESS
M08: NOT_STARTED / NOT_AUTHORIZED

Do not rewrite M01–M06 historical audit records inaccurately.

==================================================
3. READ AUTHORITATIVE GOVERNING FILES
==================================================

Before implementation inspect:

- docs/reference/HydroRigor_Master_Strategy.xlsx
- docs/QUALITY_GATES.md
- docs/SECURITY_AND_CONTENT_INTEGRITY.md
- docs/DEVELOPMENT_RULES.md
- docs/GIT_WORKFLOW.md
- docs/HANDOFF_PROTOCOL.md
- current Astro/CI/package configuration

Read the workbook read-only.

Confirm that the M07 row matches:

Performance/security/accessibility/analytics
Outputs:
headers, analytics, Search Console prep,
Lighthouse CI, Playwright smoke, broken-link checks
Acceptance:
CWV/lab budgets met; accessibility gate met
Deployment:
Preview only

If the authoritative workbook materially conflicts with this authorization:

STOP with:

BLOCKED — authoritative M07 scope conflict

==================================================
4. M07 GOVERNANCE
==================================================

Create:

milestones/M07/SPECIFICATION.md
milestones/M07/IMPLEMENTATION_REPORT.md
milestones/M07/TEST_REPORT.md
milestones/M07/REALITY_AUDIT.md

Also create useful evidence documents such as:

docs/research/M07_QUALITY_BASELINE.md
docs/research/M07_ACCESSIBILITY_AUDIT.md
docs/research/M07_SECURITY_HEADERS.md

and:

docs/launch/ANALYTICS_PREP.md
docs/launch/SEARCH_CONSOLE_PREP.md

Do not mark M07 accepted.
Independent ChatGPT audit remains required.

==================================================
5. LOCKED QUALITY TARGETS
==================================================

HydroRigor's accepted targets are:

- LCP < 2.5 seconds
- CLS < 0.1
- INP field target < 200 ms
- Lighthouse MOBILE Performance >= 95
- Lighthouse Accessibility = 100
- Lighthouse SEO = 100
- ordinary editorial pages near-zero client JavaScript

IMPORTANT:

INP is a real-user field metric and cannot be truthfully proven from a
pre-production Lighthouse run.

Therefore:

- retain INP <200 ms as the production field target
- do NOT claim M07 measured or achieved real-world INP
- use Total Blocking Time as a lab responsiveness proxy
- target TBT <= 200 ms for the representative Lighthouse matrix
- explicitly document this distinction

Do not mislabel TBT as INP.

==================================================
6. PERFORMANCE BASELINE FIRST
==================================================

Before optimization:

Build the current accepted M06 baseline and record lab measurements.

Measure representative public surfaces including at minimum:

- /
- /start/
- /systems/indoor-hydroponic-systems-for-home/
- /crops/hydroponic-strawberries/
- /nutrients-water/hydroponic-nutrients/
- /best/hydroponic-system-for-home-growers/
- /reviews/masterblend-hydroponic-nutrients/
- /tools/ph-ec-targets/
- /tools/nutrient-mixing-calculator/

Search may be tested separately because it is intentionally interactive/noindex.

Record baseline and final numbers.

Do not hide failed baseline scores.

==================================================
7. LIGHTHOUSE CI
==================================================

Add Lighthouse CI using the current compatible official package.

Prefer a pinned dev dependency rather than unversioned npx execution.

Create an explicit LHCI configuration.

Use the MOBILE/default mobile lab profile.

Run multiple samples where supported to reduce runner noise.

Hard acceptance assertions for representative indexable pages:

- Performance >= 0.95
- Accessibility = 1.00
- SEO = 1.00
- LCP <= 2500 ms
- CLS <= 0.10
- TBT <= 200 ms

Do not weaken assertions simply to make CI green.

If a specific legitimate page class cannot meet one budget:
investigate and optimize within M07 scope.
If it still cannot meet the authoritative gate, return BLOCKED.

Lighthouse reports must be generated as ignored CI artifacts,
not committed repository output.

==================================================
8. CLIENT-JAVASCRIPT BUDGET
==================================================

Preserve Astro's static-first architecture.

Ordinary editorial articles should not acquire framework hydration.

Add automated verification that ordinary M06 article/review pages do not
silently gain unnecessary client-side bundles.

Legitimate interactive exceptions include:

- /search/
- /tools/nutrient-mixing-calculator/
- other explicitly interactive accepted tools

Do NOT add React/Vue/Svelte merely for M07.

Do not hydrate navigation for convenience.

==================================================
9. PLAYWRIGHT SMOKE TESTING
==================================================

Add Playwright using a pinned compatible official version.

Chromium only is sufficient for M07 unless the authoritative plan says otherwise.

Create a reproducible local/CI test server against the built static site.

Playwright smoke coverage must include at minimum:

- homepage loads
- desktop navigation works
- mobile navigation remains usable
- Start Here loads
- section landing loads
- representative M06 article loads
- representative review loads
- pH/EC tool loads
- nutrient calculator loads
- search loads and finds a real M06 page
- calculator known-answer case still works:
  10 L × 2 mL/L = 20 mL
- corrected ID 24 route loads:
  /best/hydroponic-system-for-home-growers/
- obsolete /best/best-hydroponic-system-for-home-growers/ does not resolve
- retired /nutrients/ does not become public
- development fixtures remain non-public/noindex as previously designed
- no unexpected browser console errors on representative public routes

Test meaningful behavior, not merely HTTP status.

==================================================
10. ACCESSIBILITY GATE
==================================================

Add automated accessibility testing to the Playwright route matrix.

Use a maintained accessibility engine such as axe through the official or
well-supported Playwright integration.

Test at least:

- homepage
- Start Here
- representative section landing
- representative systems article
- representative crop article
- representative nutrients article
- buyer research article
- manufacturer-only review
- pH/EC tool
- nutrient calculator
- search

Require no WCAG A/AA violations in the tested surfaces.

Also explicitly test critical interaction behavior:

- skip link reaches main content
- keyboard navigation works
- visible focus exists
- form controls have labels
- calculator result/status is announced appropriately
- search input/results are accessible
- native details/summary navigation remains keyboard usable

Lighthouse accessibility must still score 100.

Do not suppress genuine axe violations without documented technical reasoning.

==================================================
11. BROKEN-LINK VALIDATION
==================================================

Create a dedicated command such as:

npm run test:links

Validate built output, not only source MDX.

At minimum verify:

- every internal page href resolves
- every same-site asset reference resolves
- fragment links point to an existing target ID where applicable
- canonical destinations resolve to intended routes
- all 25 M06 production pages remain reachable
- section landing links resolve
- tool links resolve
- sitemap URLs map to built public pages
- no internal links use retired /nutrients/
- no internal links use obsolete /best/best-*
- development fixtures are not accidentally linked from public pages

Do not make CI depend on live availability of third-party websites.

External source URLs should receive syntax/HTTPS integrity validation,
not flaky live-network crawling.

==================================================
12. SECURITY HEADERS
==================================================

Prepare production-compatible security headers without deploying them.

Because M08 is the planned Vercel launch, a version-controlled Vercel-compatible
header configuration is appropriate if it fits the architecture.

Implement and validate headers such as:

- Content-Security-Policy
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- frame protection via CSP frame-ancestors and/or X-Frame-Options
- a restrictive Permissions-Policy
- appropriate cross-origin protections only where they do not break legitimate behavior

CSP must be derived from the actual built site.

Do NOT casually add:

unsafe-eval

Avoid:

unsafe-inline

when the current Astro architecture can operate without it.

If the current structured-data implementation, search, or calculator requires
a CSP accommodation, determine the exact requirement rather than weakening the
whole policy.

Do not whitelist unrelated third-party domains.

Do not configure an analytics domain merely because it might be useful later.

HSTS:

Do NOT activate an aggressive domain-level HSTS/includeSubDomains policy merely
as a preview assumption.

Document HSTS as an M08 production-domain decision unless the governing strategy
already explicitly requires it now.

==================================================
13. SECURITY VALIDATOR
==================================================

Create:

npm run test:security

or equivalent.

It should validate where practical:

- required security headers exist in configuration
- CSP includes restrictive default/object/frame/base rules
- no unsafe-eval
- no unexpected third-party script origin
- no mixed-content http:// production resources
- target=_blank links are safely qualified
- no committed environment secrets
- no unauthorized analytics/search-console token
- no merchant/affiliate regression
- no accidental iframe/embed addition
- generated security configuration is internally consistent

Do not build a fake secret scanner that claims comprehensive coverage.

Use clear, bounded validation language.

==================================================
14. PRODUCTION DEPENDENCY AUDIT
==================================================

Add an appropriate production-dependency vulnerability check.

Prefer:

npm audit --omit=dev --audit-level=high

or the current npm equivalent compatible with this project.

High/critical vulnerabilities in production dependencies must fail M07.

Document dev-only advisory findings separately if any.

Do not auto-run npm audit fix --force.
Do not make major dependency upgrades outside M07 without clear necessity.

==================================================
15. VERCEL WEB ANALYTICS — PREPARED, NOT ACTIVATED
==================================================

The strategy includes analytics, but M07 is preview-only and external production
activation is NOT authorized.

Prepare the code using the current official Vercel Web Analytics approach
compatible with Astro.

Requirements:

- use official current documentation
- pin compatible dependency versions
- no secret required
- analytics disabled by default
- CI/local builds must not transmit analytics events
- activation must require an explicit non-secret deployment setting such as:
  PUBLIC_ENABLE_ANALYTICS=true
  or an equivalently clear mechanism
- default repository/example configuration remains disabled
- no production Vercel project is created
- no Vercel account/project setting is changed
- no analytics data collection is activated in this milestone

Test that the ordinary default build contains no active analytics request.

Document exact M08 activation steps in:

docs/launch/ANALYTICS_PREP.md

Do NOT add:
- Google Analytics
- Meta Pixel
- Hotjar
- Sentry
- ad trackers
- session replay
- additional telemetry vendors

unless separately authorized.

==================================================
16. SEARCH CONSOLE PREPARATION — NO CONNECTION
==================================================

Create:

docs/launch/SEARCH_CONSOLE_PREP.md

Verify and record:

- intended canonical production origin:
  https://hydrorigor.com/
- actual generated sitemap index path from the build
- robots behavior
- indexable/noindex boundaries
- canonical behavior
- 404 behavior
- corrected M06 routes
- verification methods available later
- exact M08 sitemap submission procedure

CRITICAL:

Do NOT:

- create a Search Console property
- sign into Google Search Console
- add a real verification token
- add a fake verification token
- submit sitemap
- request indexing
- connect Google APIs

Search Console must remain preparation-only.

==================================================
17. ANALYTICS / PRIVACY TRUTHFULNESS
==================================================

Do not write public copy claiming analytics is active while it is disabled.

Do not write public copy claiming no analytics infrastructure exists after
adding the gated integration.

Any documentation must distinguish:

- analytics code prepared
- analytics production collection NOT activated

Do not introduce cookie banners unless the actual enabled technology and legal
context make one necessary.

M07 is not a legal-compliance certification.

==================================================
18. SEO REGRESSION GATE
==================================================

M07 must not regress M02–M06 SEO.

Verify:

- 25 M06 production pages remain indexable
- canonical URLs unchanged
- corrected ID 24 path remains canonical
- old /best/best-* absent
- /nutrients/ remains absent
- sitemap remains correct
- robots remains correct
- Pagefind remains correct
- BlogPosting/Breadcrumb/WebSite structured data remains visible and valid
- manufacturer-only reviews still do not emit unsupported Review schema
- no Offer/aggregateRating/reviewRating appears

Lighthouse SEO must be 100 on the representative matrix.

==================================================
19. CONTENT-INTEGRITY REGRESSION GATE
==================================================

M07 is NOT a content-rewrite milestone.

Do not materially rewrite the accepted 25 M06 articles unless a performance,
accessibility, broken-link, or security issue genuinely requires a minimal edit.

Preserve:

- 25-page M06 scope
- 24-source registry
- accepted strawberry provenance
- accepted M04 pH/EC values
- accepted M05 evidence/commercial rules
- manufacturer-only evidence boundaries
- no affiliate relationships
- no prices/availability
- no ratings/scores
- no hands-on claims

==================================================
20. OBSERVABILITY WITHOUT EXTERNAL SERVICE SPRAWL
==================================================

For M07, "observability" means:

- reproducible performance reports
- accessibility reports
- CI quality evidence
- link integrity
- security configuration validation
- prepared analytics instrumentation

Do not add an error-monitoring SaaS or additional paid/free observability vendor.

Sentry and similar services are OUT OF SCOPE unless separately authorized.

==================================================
21. GENERATED ARTIFACTS
==================================================

Ensure these remain ignored/untracked as applicable:

- dist/
- .astro/
- node_modules/
- Pagefind output
- playwright-report/
- test-results/
- .lighthouseci/
- Lighthouse reports
- temporary local browser profiles
- coverage artifacts unless intentionally versioned

CI may upload test/Lighthouse reports as GitHub Actions artifacts.

Do not commit generated reports containing machine-specific paths or transient
measurements unless the M07 documentation intentionally summarizes the results.

==================================================
22. PERFORMANCE OPTIMIZATION RULES
==================================================

When fixing Lighthouse failures:

Prefer:

- removing unnecessary JavaScript
- reducing blocking resources
- preserving static HTML
- optimizing CSS/font loading
- reserving layout dimensions
- fixing semantic/accessibility issues
- reducing unnecessary requests

Do NOT:

- remove useful content merely to game Lighthouse
- hide visible content from auditing
- disable accessibility features
- lower assertions
- switch to misleading desktop-only scores
- defer essential text purely for a score
- add CDN/deployment-specific assumptions that cannot be tested

==================================================
23. CI ARCHITECTURE
==================================================

Extend GitHub Actions reproducibly.

Preserve existing quality gates:

- npm ci
- lint
- Astro check
- unit tests
- M04 data verification
- M05 commercial verification
- M06 content verification
- production build
- Pagefind/search smoke

Add M07 gates such as:

- production dependency audit
- security/header validation
- built broken-link validation
- Playwright Chromium smoke
- accessibility tests
- Lighthouse CI

Install only the browser/runtime needed.

Do not silently skip browser or Lighthouse tests on pull requests.

If CI duration becomes unnecessarily high, use logically separate jobs while
retaining required gating.

All required M07 jobs must be green before independent audit.

==================================================
24. RECOMMENDED COMMAND SURFACE
==================================================

Prefer clear scripts such as:

npm run test:security
npm run test:links
npm run test:e2e
npm run test:a11y
npm run test:lighthouse

Exact naming may differ if the architecture benefits from consolidation.

Do not hide a failing gate inside a script that always exits zero.

==================================================
25. FULL LOCAL GATE
==================================================

Run the full accepted stack in a deterministic order.

At minimum:

npm ci
npm run lint
npm run check
npm test
npm run test:data
npm run test:commerce
npm run test:content
npm run build
npm run test:search
npm run test:links
npm run test:security
npm audit --omit=dev --audit-level=high
npm run test:e2e
npm run test:a11y
npm run test:lighthouse

If some browser/accessibility checks are intentionally combined, document the
actual command mapping clearly.

Do not claim a command passed if it was not run.

==================================================
26. M07 REALITY AUDIT
==================================================

milestones/M07/REALITY_AUDIT.md must report actual evidence including:

- M06 merge baseline
- dependency changes
- security-header configuration
- analytics prepared/enabled state
- Search Console connection state
- Playwright route matrix
- accessibility route matrix
- axe results
- Lighthouse route matrix
- Performance score per tested route
- Accessibility score per tested route
- SEO score per tested route
- LCP per tested route
- CLS per tested route
- TBT per tested route
- explicit statement that INP is NOT field-measured preproduction
- broken-link results
- production dependency audit
- browser console-error result
- ordinary editorial JS-budget result
- all previous M01–M06 gate results
- CI results

Do not summarize a failed route as an overall PASS.

==================================================
27. BLOCKER CONDITIONS
==================================================

STOP with BLOCKED rather than weakening gates if:

- Performance cannot reach >=95 without scope-breaking redesign
- Accessibility cannot reach 100 on required Lighthouse pages
- axe finds a genuine unresolved A/AA violation
- SEO cannot reach 100 without incorrect indexability changes
- LCP remains >=2.5s on representative required pages
- CLS remains >=0.1
- TBT remains >200ms
- a required Playwright behavior fails
- internal broken links remain
- a high/critical production dependency advisory remains unresolved
- secure headers cannot be made compatible without dangerous CSP weakening
- analytics would require production deployment/account mutation
- Search Console preparation would require account mutation
- M08 deployment becomes necessary to complete a claimed test

Do not claim real INP measurement as a blocker because field INP is intentionally
deferred until production measurement.

==================================================
28. EXPLICITLY OUT OF SCOPE
==================================================

Do NOT:

- start M08
- deploy to Vercel
- create/link a production Vercel project
- enable production analytics data collection
- connect Google Search Console
- submit a sitemap
- request indexing
- modify hydrorigor.com
- modify DNS
- enable production HSTS assumptions without review
- enroll in affiliates
- add merchant destinations
- add tracking IDs
- add prices/availability
- add product ratings
- purchase/test products
- contact manufacturers
- publish IDs 26–100
- add Sentry
- add Google Analytics
- add advertising trackers
- add a CMS/database/account system

==================================================
29. GIT / PR WORKFLOW
==================================================

After implementation:

1. inspect the entire diff
2. verify only M07-authorized scope changed
3. verify generated outputs are untracked
4. verify no credentials/secrets/tokens
5. verify M06 content integrity remains intact
6. update M07 reports and handoff
7. commit
8. push:
   m07-quality-observability
9. open PR against main
10. monitor ALL required GitHub Actions
11. autonomously fix M07-scoped failures
12. repeat until final PR head is fully green

DO NOT MERGE THE PR.

Stop for independent ChatGPT M07 audit.

==================================================
FINAL REPORT
==================================================

Report:

- branch
- final SHA
- implementation SHA
- PR number/URL
- files changed
- authoritative M07 workbook scope extracted
- dependencies added/changed
- security headers implemented
- CSP summary
- HSTS status and rationale
- analytics integration status
- analytics enabled/disabled state
- Search Console preparation status
- Search Console connection/submission status
- Playwright tests and routes
- accessibility test routes/results
- Lighthouse tested routes
- Lighthouse performance/accessibility/SEO scores
- LCP/CLS/TBT for each route
- explicit INP field-status statement
- broken-link result
- internal URL/fragment count checked
- production npm audit result
- editorial client-JS budget result
- total unit/regression test count
- npm ci result
- lint result
- check result
- test result
- test:data result
- test:commerce result
- test:content result
- build result
- test:search result
- test:links result
- test:security result
- test:e2e result
- test:a11y result
- test:lighthouse result
- GitHub CI results
- git status
- known limitations
- deferred field-INP verification
- confirmation no deployment/domain/DNS/Search Console submission/
  production analytics activation/M08 action occurred

Final exact state:

READY_FOR_CHATGPT_M07_AUDIT

or

BLOCKED — <exact reason>