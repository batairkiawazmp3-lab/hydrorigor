# M04 Implementation Report

Status: IMPLEMENTED_AND_CI_VALIDATED_PENDING_CHATGPT_AUDIT

## Baseline and scope

M04 was implemented on `m04-data-tools` from clean, synchronized `main` commit
`0dd799dd2877d5c228e9836e78707507c61667c6`. The implementation is limited to
the two authorized M04 outputs. M05 and production actions remain unauthorized.

## Live source verification

Three institutional sources were inspected live on 2026-09-11 and recorded in
the typed source registry:

1. Oklahoma State University Extension, HLA-6722, Table 2;
2. University of Florida IFAS Extension, HS1422, plant-nutrition section;
3. Virginia Cooperative Extension, VCE-466NP/SPES-466, pages 5–6.

The resulting dataset contains eight source/context-specific records covering
lettuce, basil, strawberry, tomato, and pepper. Source disagreements are kept as
separate records. No range is averaged, no ppm/TDS value is converted to EC,
and no unsourced crop value is present. The complete evidence decisions and
locators are in `docs/research/M04_SOURCE_LEDGER.md`.

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
or performed. M04 is not accepted; independent ChatGPT audit is still required.

## GitHub integration

Implementation commit: `e155c1d0be674c8a1170bd689d29e7fb058641a0`.

Pull request #4 is open from `m04-data-tools` into `main`:
`https://github.com/batairkiawazmp3-lab/hydrorigor/pull/4`.

The implementation head passed both `ci / quality` and
`governance / m00-governance` on push and pull-request events. The PR remains
open and unmerged for independent ChatGPT audit.
