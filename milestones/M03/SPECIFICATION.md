# M03 Specification — Core Information Architecture

Status: READY_FOR_AUDIT

## Authorization and baseline

M03 was explicitly authorized after M02 acceptance and squash merge. The clean
baseline is `ca09c97579d350cdde95ddba5eeeb61c6daea032`. M04 and later milestones
are not authorized.

## Objective

Build HydroRigor's useful public information architecture with a real homepage,
beginner path, section landings, trust/support pages, accessible centralized
navigation, static Pagefind search, and coherent internal discovery while
remaining static-first and evidence-honest.

## Public routes

- `/`
- `/start/`
- `/systems/`
- `/crops/`
- `/nutrients-water/`
- `/equipment/`
- `/best/`
- `/reviews/`
- `/compare/`
- `/problems/`
- `/tools/`
- `/about/`
- `/testing-methodology/`
- `/editorial-policy/`
- `/affiliate-disclosure/`
- `/contact/`
- `/search/`

`/nutrients-water/` is the sole indexable public nutrient landing. Internal
article category data may remain `nutrients`, but its public path must map to
`nutrients-water`. No duplicate indexable `/nutrients/` landing is permitted.

## Required implementation

- one typed source of truth for primary, section, and trust/support navigation
- semantic, keyboard-accessible navigation that remains usable at mobile and
  desktop widths without a client framework
- the approved homepage hero and honest paths to current structural pages
- a static beginner decision path at `/start/`
- useful, distinct section landing content with subtopics and internal links
- About, Testing Methodology, Editorial Policy, Affiliate Disclosure, and
  Contact trust/support pages with accurate pre-production language
- Pagefind indexing after Astro build and an accessible `/search/` interface
  using only search-specific client JavaScript
- exclusion of drafts, 404, non-indexable pages, technical output, and the
  search page from the search index
- preserved M02 SEO, canonical, breadcrumb, JSON-LD, sitemap, and draft rules
- M03 regression and built-output/search smoke tests

## Content integrity

No page may imply that future calculators, datasets, testing, recommendations,
affiliate relationships, contact infrastructure, prices, or production
services already exist. No fake article cards, product claims, ratings, prices,
or contact channels are permitted.

## Explicitly out of scope

- pH/EC or crop-target datasets
- calculator formulas or working calculators
- product/merchant registries, affiliate links, tracking, or paid links
- prices, availability, numeric ratings, commercial recommendations, or
  Product/Review rich-result schema
- production article batches, CMS, database, accounts, analytics, or Search
  Console
- Vercel/deployment, publishing, domain, or DNS actions
- M04, M05, M06, M07, or later milestone implementation

## Required validation

1. `npm ci`
2. `npm run lint`
3. `npm run check`
4. `npm test`
5. `npm run build`
6. `npm run test:search`
7. GitHub Actions on the M03 pull request
8. Independent ChatGPT M03 reality audit

## Acceptance criteria

- all required public routes build with unique metadata and coherent links
- navigation uses the centralized typed definition and is keyboard/mobile usable
- homepage and Start Here offer honest, useful discovery paths
- trust pages distinguish current reality from future policy/methodology
- `/nutrients-water/` is canonical with no indexable duplicate `/nutrients/`
- Pagefind indexes legitimate public pages and excludes drafts/search/404
- existing M01/M02 behavior and tests remain green
- no generated build, dependency, or Pagefind output is tracked
- M03 reports and handoff match repository reality
- M03 remains pending independent ChatGPT audit
