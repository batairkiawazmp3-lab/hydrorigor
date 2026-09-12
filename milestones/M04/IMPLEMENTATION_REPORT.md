# M04 Implementation Report

Status: ACCEPTED

## Baseline and scope

M04 was implemented on `m04-data-tools` from clean, synchronized `main` commit
`0dd799dd2877d5c228e9836e78707507c61667c6`. The implementation is limited to
the two authorized M04 outputs. M05 and production actions remain unauthorized.

## Live source verification

Three institutional sources were inspected live on 2026-09-11 and recorded in
the typed source registry:

1. Oklahoma State University Extension, HLA-6722, Table 2;
2. University of Florida IFAS Extension, HS1422, plant-nutrition section;
3. Virginia Cooperative Extension, SPES-466NP, pages 5–6.

The Virginia identifier and UF/IFAS internal EC provenance were reverified on
2026-09-12 during the focused independent-audit corrective pass.

The resulting dataset contains eight source/context-specific records covering
lettuce, basil, strawberry, tomato, and pepper. Source disagreements are kept as
separate records. No range is averaged, no ppm/TDS value is converted to EC,
and no unsourced crop value is present. The complete evidence decisions and
locators are in `docs/research/M04_SOURCE_LEDGER.md`.

## Focused provenance correction

The first independent M04 audit rejected two provenance details while accepting
the numeric values and all other implementation behavior. The correction:

- replaces the incorrect Virginia publication identifier with `SPES-466NP`
  while preserving source ID `virginia-tech-spes-466` and the verified mature
  tomato/pepper values of pH 6.5 and EC 2.0–2.5 mS/cm;
- documents both statements inside UF/IFAS HS1422: the lettuce-specific Plant
  nutrition statement gives ideal EC 1.4–1.8 mS/cm with pH 6.0–7.0, while
  Further Considerations later gives nutritive-solution EC 1.2–1.8 mS/cm
  without a paired pH;
- retains the complete lettuce-specific 1.4–1.8 mS/cm and pH 6.0–7.0 record,
  performs no averaging, and creates no second record with an invented pH;
- adds a dedicated regression test for both corrections and the unchanged
  numeric selection.

## Data architecture

- `src/data/models.ts` defines strict Zod source and crop-target schemas.
- `src/data/sources/index.ts` stores source identity, authors, publisher, URL,
  access date, locator, type, scope, and notes.
- `src/data/crop-targets/index.ts` stores pH and EC ranges in `mS/cm` with
  context, source references, evidence notes, and verification dates.
- `src/data/validate.ts` rejects invalid schemas, duplicate IDs or
  crop/stage/system records, unresolved references, and unused sources.
- `src/data/index.ts` runs relationship validation when the data is imported,
  so an invalid registry also breaks the static build.
- `npm run test:data` provides a dedicated CI-visible integrity check.

## pH and EC reference

`/tools/ph-ec-targets/` is a static, indexable reference with unique metadata,
breadcrumbs, unit definitions, visible context and caveats, per-record source
links, and complete source cards. It labels values as published/reporting
ranges rather than universal prescriptions and requires no client JavaScript.

## Nutrient mixing calculator v1

Pure TypeScript in `src/lib/tools/nutrient-mixing.ts` converts reservoir volume
and label dose into liters and `mL/L`, then calculates:

`total concentrate mL = reservoir liters × label dose mL/L`

It uses exactly `1 US gallon = 3.785411784 liters`. The accessible Astro form
accepts liters or US gallons and `mL/L` or `mL/US gal`, rejects non-positive or
non-finite values, and reports through an `aria-live` status. Its minimal vanilla
script makes no request and stores no input. The page states that the user must
supply the actual manufacturer label dose, calculate multi-part products
separately, and measure the result; it does not predict EC or provide chemistry,
crop dosing, pH adjustment, diagnosis, or product recommendations.

## Discovery, SEO, and search

The explicit `/tools/` landing links both outputs. Central route data,
homepage/Start Here references, canonical route inventory, sitemap assertions,
and Pagefind smoke coverage include both pages. Accepted M01–M03 metadata,
accessibility, mobile navigation, and draft/search exclusions remain intact.

## Boundaries and side effects

No affiliate destination, merchant registry, price, rating, commercial schema,
product recommendation, M05 implementation, production content, analytics,
Search Console, deployment, Vercel connection, domain, or DNS action was added
or performed. M04 is accepted; M05 remains unauthorized.

## GitHub integration

Implementation commit: `e155c1d0be674c8a1170bd689d29e7fb058641a0`.

Pull request #4 is open from `m04-data-tools` into `main`:
`https://github.com/batairkiawazmp3-lab/hydrorigor/pull/4`.

The implementation head passed both `ci / quality` and
`governance / m00-governance` on push and pull-request events. The PR remains
open and unmerged for independent ChatGPT audit.

Focused provenance correction commit:
`87fcaa89aec9bac82fa913f3cc97769e0306e401`.

The corrective implementation head passed `ci / quality` and
`governance / m00-governance` on both push and pull-request events. M04 remains
recorded in PR #4.

Independent ChatGPT re-audit result on 2026-09-12: `ACCEPTED`. Final merge of
PR #4 was authorized only after its acceptance-documentation head is green.
