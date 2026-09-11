# M04 Specification — Data & Tools

Status: IMPLEMENTED_PENDING_GITHUB_CI

## Authorization and baseline

M04 was explicitly authorized after M03 acceptance and squash merge. Branch
`m04-data-tools` was created from clean, synchronized `main` commit
`0dd799dd2877d5c228e9836e78707507c61667c6`. M05 and later milestones are not
authorized.

## Objective

Deliver exactly two evidence-transparent public tools:

1. a sourced hydroponic crop pH and EC target reference;
2. a nutrient mixing calculator that only scales a user-supplied manufacturer
   label dose to reservoir volume.

## Source and data requirements

- Numeric crop targets must come from verified live university, extension,
  peer-reviewed, government, FAO, or similarly authoritative technical sources.
- Every source is represented in a typed registry with publisher, URL, access
  date, evidence class, scope, and locator.
- Every crop target cites at least one resolvable source ID and preserves system,
  stage, or other material context.
- pH is dimensionless; EC is stored and displayed only in `mS/cm`.
- `1 dS/m` may be represented as the numerically equivalent `1 mS/cm`.
- ppm/TDS values must never be converted to EC without a source-defined basis.
- Reversed, impossible, uncited, duplicate, or orphan records must fail tests.
- Source disagreements must be preserved or documented, never silently averaged.

## Tool 1 — pH & EC target reference

Route: `/tools/ph-ec-targets/`

The indexable static reference must show crop/context, reported pH and EC ranges,
units, source attribution and links, variation caveats, breadcrumbs, unique SEO,
canonical URL, sitemap inclusion, and Pagefind inclusion. It must work without
client JavaScript and must not imply universal guarantees.

## Tool 2 — nutrient mixing calculator v1

Route: `/tools/nutrient-mixing-calculator/`

The calculator accepts a positive finite reservoir volume in liters or US
gallons and a positive finite label dose in mL/L or mL/US gal. Pure TypeScript
logic must normalize both values and compute:

`total concentrate mL = reservoir liters × label dose mL/L`

The exact conversion is `1 US gallon = 3.785411784 liters`. The interface must
be keyboard accessible, validate inputs, expose an aria-live status, store no
data, make no network request, and clearly state that it only scales the actual
manufacturer label dose. Multi-part products are calculated separately. It does
not predict EC, formulate fertilizer, recommend crop doses, diagnose a reservoir,
or calculate pH/acid/base additions.

## Discovery and preservation

- Update `/tools/` and only the minimum homepage/Start Here wording or links
  needed to expose the two real outputs.
- Preserve all accepted M01–M03 SEO, sitemap, search, accessibility, content
  integrity, and draft exclusions.
- Add both tools to the public navigation/search route inventory where needed.
- Do not add Product/Review/commercial schema or a client framework.

## Required validation

1. `npm ci`
2. `npm run lint`
3. `npm run check`
4. `npm test`
5. `npm run test:data` or equivalent dedicated M04 verification
6. `npm run build`
7. `npm run test:search`
8. GitHub Actions on the M04 pull request
9. Independent ChatGPT M04 reality audit

Known-answer tests must include 10 L at 2 mL/L = 20 mL, 5 US gal at
4 mL/US gal = 20 mL, both cross-unit directions, the gallon constant, and
zero/negative/NaN/infinite rejection.

## Explicitly out of scope

M05 commerce/affiliate infrastructure, merchant or Amazon links, prices,
availability, product ratings/scores, commercial schema, buyer recommendations,
M06 content production, analytics, Search Console, Vercel/deployment,
production publishing, domain/DNS, CMS, database, accounts, fertilizer chemistry,
elemental ppm calculations, EC prediction, crop dosing recipes, pH/acid/base
dosing, and automatic recommendations are not authorized.

## Completion boundary

M04 remains pending independent ChatGPT audit after implementation, local gate,
pull request, and green CI. The M04 pull request must not be merged.
