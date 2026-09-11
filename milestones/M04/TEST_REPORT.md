# M04 Test Report

Status: LOCAL_GATE_PASS_PENDING_GITHUB_CI

Validation date: 2026-09-11

## Required local gate

- `npm ci`: PASS — 287 packages installed, 0 vulnerabilities.
- `npm run lint`: PASS.
- `npm run check`: PASS — 59 files, 0 errors, 0 warnings, 0 hints.
- `npm test`: PASS — 46/46.
- `npm run test:data`: PASS — 3 sources, 8 records, 5 crops, no ppm/TDS
  conversion.
- `npm run build`: PASS — 23 static pages; Pagefind indexed 18 public pages.
- `npm run test:search`: PASS — 19 required public routes verified; both M04
  tools found; drafts, 404, and search excluded.

## Independent known-answer arithmetic

The expected answers below are written explicitly rather than generated from a
second invocation of the calculator:

| Case | Inputs | Independent expected result | Result |
| --- | --- | --- | --- |
| A | 10 L; 2 mL/L | `10 × 2 = 20 mL` | PASS |
| B | 5 US gal; 4 mL/US gal | `5 × 4 = 20 mL` | PASS |
| C | 5 US gal; 2 mL/L | `5 × 3.785411784 × 2 = 37.85411784 mL` | PASS |
| D | 10 L; 4 mL/US gal | `40 ÷ 3.785411784 = 10.566882094... mL` | PASS |

The conversion constant `3.785411784 L/US gal` is asserted separately. Zero,
negative, `NaN`, positive infinity, and negative infinity are rejected for both
input dimensions; unsupported units are also rejected.

## Coverage summary

The 46-test suite retains all M01–M03 checks and adds M04 coverage for source and
target schemas, IDs, dates, HTTPS URLs, provenance relationships, range bounds,
unit policy, ppm/TDS rejection, all four formula paths, input boundaries,
accessible calculator markup, required warnings, static source rendering, tool
discovery, sitemap/Pagefind behavior, and absence of affiliate, pricing, rating,
or commerce behavior.

## Pending

GitHub Actions has not run on the M04 pull request yet. M04 remains pending both
green CI and independent ChatGPT audit.
