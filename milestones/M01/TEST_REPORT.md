# M01 Test Report

Status: LOCAL_GATE_PASS / GITHUB_CI_PENDING

## Environment

- Local Node: v24.18.0
- Local npm: 11.16.0
- M01 required Node: 24 LTS (pinned in `.nvmrc`, `package.json`, and CI)
- Validation date: 2026-09-11

## Dependency installation

### `npm ci`
PASS

- installed from committed `package-lock.json`
- 278 packages added / 279 packages audited
- 0 vulnerabilities reported
- npm emitted an informational allow-scripts review warning for the `esbuild`
  postinstall; all diagnostics, tests, and build steps still completed successfully

## Application gates

### `npm run lint`
PASS

The dependency-free HydroRigor lint script reported that source lint checks passed.

### `npm run check`
PASS — 0 errors / 0 warnings / 0 hints across 11 files

### `npm test`
PASS — 4/4 tests

1. approved HydroRigor palette tokens present
2. Manrope / Inter / IBM Plex Mono font setup present
3. homepage preserves M01 scope boundary and contains no affiliate destinations
4. skip link and primary-navigation accessibility hooks present

### `npm run build`
PASS — static production build completed; `/index.html` and `/404.html` generated

## CI readiness

`.github/workflows/ci.yml` is prepared to repeat the gate using:

- `actions/checkout@v7`
- `actions/setup-node@v7`
- Node 24
- `npm ci`
- `npm run lint`
- `npm run check`
- `npm test`
- `npm run build`

## Gate

The local gate is complete. M01 remains unaccepted until the pull-request CI
checks pass and ChatGPT completes the independent reality audit. M02 remains
unauthorized.
