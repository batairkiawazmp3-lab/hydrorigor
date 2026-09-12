# M04 Test Report

Status: ACCEPTED

Validation date: 2026-09-12

## Required local gate

- `npm ci`: PASS — 287 packages installed, 0 vulnerabilities.
- `npm run lint`: PASS.
- `npm run check`: PASS — 59 files, 0 errors, 0 warnings, 0 hints.
- `npm test`: PASS — 47/47.
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

The 47-test suite retains all M01–M03 checks and adds M04 coverage for source and
target schemas, IDs, dates, HTTPS URLs, provenance relationships, range bounds,
unit policy, ppm/TDS rejection, all four formula paths, input boundaries,
accessible calculator markup, required warnings, static source rendering, tool
discovery, sitemap/Pagefind behavior, and absence of affiliate, pricing, rating,
or commerce behavior.

The focused provenance regression asserts that the Virginia source metadata
uses `SPES-466NP`, the UF/IFAS source and target evidence expose both EC
statements and the reason for selection, and the selected lettuce record remains
exactly pH 6.0–7.0 and EC 1.4–1.8 mS/cm.

## GitHub and audit outcome

GitHub Actions passed on the pre-correction implementation commit
`e155c1d0be674c8a1170bd689d29e7fb058641a0`:

- `ci / quality` (push): PASS.
- `ci / quality` (pull request): PASS.
- `governance / m00-governance` (push): PASS.
- `governance / m00-governance` (pull request): PASS.

GitHub Actions also passed on focused corrective commit
`87fcaa89aec9bac82fa913f3cc97769e0306e401`:

- `ci / quality` (push): PASS.
- `ci / quality` (pull request): PASS.
- `governance / m00-governance` (push): PASS.
- `governance / m00-governance` (pull request): PASS.

Independent ChatGPT M04 re-audit result: `ACCEPTED`. The final
acceptance-documentation head must be green before the authorized PR #4 merge.
