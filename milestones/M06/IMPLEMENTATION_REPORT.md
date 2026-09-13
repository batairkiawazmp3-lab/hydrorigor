# M06 — Implementation Report

Status: ACCEPTED

## Baseline and strategy reconciliation

- Verified clean, synchronized `main` at
  `ac2356cc1d238e43158388d2506004a3800d6895` before branching.
- Created `m06-content-wave-1` from that exact accepted M05 merge baseline.
- Inspected `docs/reference/HydroRigor_Master_Strategy.xlsx` read only.
- Extracted `100 Article Plan` IDs 1–25 and the first two `Publishing
  Sequence` stages without altering the workbook.
- Confirmed the authoritative distribution: 4 Systems, 7 Crops, 7 Nutrients &
  Water, 5 Buyer Guides, and 2 Reviews. The workbook assigns no Troubleshooting
  page to the first wave, so none was invented.

## Production content

Twenty-five non-draft content entries were added: 23 articles and 2
manufacturer-documentation reviews. Each entry has a unique route, title,
description, publication date, organizational author, category, source list,
and explicit `affiliateDisclosure: false` state. All render through the
accepted M02 content layouts with self-canonical metadata, publication
metadata, BlogPosting JSON-LD where applicable, visible breadcrumbs, and a
visible source section.

The typed `m06ContentItems` manifest is the canonical implementation inventory
for route discovery, category distribution, search/sitemap assertions, source
expectations, tool links, primary intent, and keyword-metric status. Section
landings render the matching production entries from this manifest, preserving
static output and zero new client hydration.

## Research and evidence

- Added a 24-record M06 editorial source registry using university Extension,
  university research, government, and narrowly scoped manufacturer records.
- Added the content plan, keyword record, route-to-source ledger, and internal
  link map under `docs/research/`.
- Only keyword values supplied as supervisor-verified on 2026-09-12 carry
  numbers. Every other primary topic is marked `METRIC_NOT_REVERIFIED`.
- Crop pH/EC prose points to the accepted M04 source-backed reference rather
  than duplicating or changing its data.
- Calculator links describe only manufacturer-label dose scaling; they do not
  imply EC prediction, formulation, crop dosing, or pH adjustment.

## Independent-audit corrective pass

The first independent audit rejected two narrow issues while accepting the
remaining M06 count, distribution, content, commerce, search, and CI controls.
The corrective pass:

- added University of Minnesota Extension's `Day-neutral strawberries` as
  direct evidence for the guide's day-length and plant-type distinction;
- added University of Minnesota Extension's `How strawberry plants grow` as
  direct evidence for self-fruitfulness, pollen movement, and complete
  pollination, while labeling indoor pollination support as a bounded editorial
  application;
- reviewed all 25 production pages against their listed evidence boundaries,
  with no other material sourcing gap found and no cosmetic source additions;
- changed ID 24 from the temporary
  `/best/best-hydroponic-system-for-home-growers/` route to
  `/best/hydroponic-system-for-home-growers/` before publication, without a
  redirect; and
- added route, sitemap, Pagefind, source-mapping, and built-output regressions
  for both corrections.

The M04 strawberry target data was not changed. The corrective implementation
commit is `5a275b8b08648644242dfba4cd33ab74dce1ba2a`.

## Commercial integrity

Two real product identity records were added only because workbook IDs 21 and
22 name the Masterblend 4-18-38 system and General Hydroponics FloraSeries.
Their four evidence records are manufacturer sources and both pages remain
`manufacturer-spec-only`, acquisition `not-applicable`, and commercial Review
JSON-LD disabled. No price, availability, rating, score, Offer, affiliate
destination, merchant, recommendation, product acquisition, or hands-on claim
was introduced.

Buyer-research pages compare system or nutrient-selection criteria without
inventing product shortlists or winners. Their evidence boundary is typed as
`externally-researched`. Production merchant and destination registries remain
empty, and accepted M05 first-person testing and registry-resolution controls
remain active.

## Discovery and integration

- Updated Systems, Crops, Nutrients & Water, Best, and Reviews landings to
  expose the wave.
- Updated homepage and Start Here wording only where M06 made guides real.
- Preserved `/nutrients-water/`; no duplicate `/nutrients/` landing or article
  route was added.
- Preserved all development fixtures as draft/noindex and excluded from
  sitemap and Pagefind.
- Extended Pagefind smoke coverage to every M06 route and representative
  Systems, Crops, Nutrients, buyer-research, and manufacturer-documentation
  queries.
- Added `npm run test:content` to package scripts and CI.

## Validation outcome

The ordered corrective local gate passed on 2026-09-13. All 88 unit/regression
tests passed. Astro built 48 pages; the sitemap contains 43 eligible URLs;
Pagefind indexed the same 43 eligible pages and 2,014 words. Search validation
checked 44 public routes, including all 25 M06 routes, with the noindex search
page correctly outside the index. A built-output crawl resolved all 1,506
internal href references across those routes. Detailed results are in
`TEST_REPORT.md`.

## Scope and handoff

Initial implementation commit `b67238ac991020848ae9f616df335ed334d96679`
and corrective implementation commit
`5a275b8b08648644242dfba4cd33ab74dce1ba2a` were pushed to
`m06-content-wave-1`. Pull request #6 remains open against `main`. The
corrective implementation head passed `ci / quality` and `governance /
m00-governance` on both push and pull-request events.

No image was added because legally clear imagery was not required to make the
articles useful. No production deployment, publishing service, affiliate
enrollment, live merchant link, analytics, Search Console, Vercel, domain/DNS,
M07, or articles 26–100 work occurred.

The independent ChatGPT final re-audit accepted the complete M06 result at PR
head `9ad8bd2b43c1a8d088f9c2bc1c5a3a4d426c1b82`. M06 is accepted; M07 remains
`NOT_STARTED` and `NOT_AUTHORIZED`.
