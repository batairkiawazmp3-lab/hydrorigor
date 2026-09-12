# M05 Test Report

Status: CORRECTIVE_LOCAL_PASS_CI_PENDING

Validation date: 2026-09-12

## Required local gate

- `npm ci`: PASS — 287 packages installed, 0 vulnerabilities. npm reported its
  informational allow-scripts review warning for `esbuild@0.28.2`; installation
  completed successfully.
- `npm run lint`: PASS — HydroRigor source lint checks passed.
- `npm run check`: PASS — 75 files, 0 errors, 0 warnings, 0 hints.
- `npm test`: PASS — 74/74 tests.
- `npm run test:data`: PASS — 3 sources, 8 contextual records, 5 crops, no
  ppm/TDS conversion.
- `npm run test:commerce`: PASS — production registries empty; no raw tracking
  destinations or unsupported non-hands-on prose found.
- `npm run build`: PASS — 23 static pages built; Pagefind indexed 18 public
  pages and excluded pages without the indexable body marker.
- `npm run test:search`: PASS — 19 required public routes verified; M04 tools
  and M05 commercial/trust landings found; drafts, 404, and search excluded.

## M05 automated coverage

`tests/commercial-integrity.test.mjs` contains 27 focused tests covering:

- empty production registries and isolated fictional product fixtures;
- strict products and compatible evidence-source provenance;
- manufacturer, third-party, observation, and interpretation claim handling;
- complete hands-on review and per-item comparison requirements;
- non-hands-on claim boundaries and acquisition disclosures;
- structured verdict/methodology/pros/cons rejection for unmistakable
  first-person testing claims;
- allowed manufacturer-testing, third-party-testing, and testing-methodology
  language without false rejection;
- MDX-body rejection for non-hands-on reviews and comparisons, with complete
  hands-on evidence allowed;
- rejection of price, availability, score, star, and rating fields;
- one-to-one comparison evidence and use-case-only conclusions;
- merchant/program/destination relationship integrity;
- affiliate disclosure consistency and destination resolution;
- registry-backed `AffiliateLink destinationId` behavior and unknown-ID
  failure;
- `sponsored nofollow` behavior for affiliate links and non-sponsored
  editorial links;
- safe `_blank` attributes;
- Product/Review JSON-LD gating and forbidden rating/offer fields;
- honest commercial components and public empty states; and
- draft fixture isolation and absence of live tracking destinations.

Existing M01–M04 unit, content, data, route, SEO, sitemap, Pagefind, and scope
tests remain green. The search smoke also confirms that development review and
comparison fixtures have no Pagefind exposure, no Review JSON-LD, and no
affiliate relationship markup.

## GitHub Actions

Pull request #5 is open at
`https://github.com/batairkiawazmp3-lab/hydrorigor/pull/5`. For implementation
commit `7aed764b3ffac9a674a312959c3d01843fdc3db0`, both `ci / quality`
and `governance / m00-governance` passed on push and pull-request events. The
first independent audit rejected prose and component-registry bypasses. The
focused corrective local gate passes; corrective GitHub CI is pending push.
M05 is not accepted and ChatGPT re-audit remains required.
