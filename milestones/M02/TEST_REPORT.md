# M02 Test Report

Status: LOCAL_GATE_PASS_GITHUB_CI_PENDING

Validation date: 2026-09-11

Environment:

- Node.js: v24.18.0
- npm: 11.16.0
- Astro: 7.3.2

## Required local gate

1. `npm ci`: PASS — 285 packages installed, 286 audited, 0 vulnerabilities.
   npm emitted its informational allow-scripts review warning for the declared
   `esbuild` install script.
2. `npm run lint`: PASS.
3. `npm run check`: PASS — 35 files, 0 errors, 0 warnings, 0 hints.
4. `npm test`: PASS — 15/15 tests.
5. `npm run build`: PASS — 14 static pages generated and sitemap created.

## Automated coverage

The ten M02 tests cover:

- valid article, review, and comparison schema fixtures;
- rejection of missing required fields and unsupported review ratings;
- incomplete review/comparison rejection;
- default and explicit canonical generation;
- draft robots/indexability behavior;
- BlogPosting JSON-LD output;
- BreadcrumbList generation;
- the exact nine section routes;
- sitemap and robots exclusions; and
- development fixture draft state and absence of affiliate destinations.

The five M01 shell/accessibility tests also pass unchanged.

## Generated-output verification

- The sitemap contains the homepage and all nine M02 landing routes.
- Draft sample routes and `/404/` are absent from the sitemap.
- Each sample page emits `noindex, nofollow`, canonical metadata, visible
  breadcrumbs, matching BreadcrumbList JSON-LD, and a development notice.
- The sample article additionally emits matching BlogPosting and publication
  metadata.
- No generated page contains a client-side module script or affiliate URL.

## Resolved validation failures

- Replaced deprecated Zod URL validators so the final Astro check has no hints.
- Updated Astro 7.3.0 to 7.3.2 after the initial build failed on Astro's internal
  `_internal/logger` export. The build and complete gate pass on 7.3.2.

## GitHub CI

Pending branch push and pull-request creation. This report will be updated from
the final pull-request head after GitHub Actions completes.
