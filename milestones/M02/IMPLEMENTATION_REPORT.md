# M02 Implementation Report

Status: ACCEPTED

## Baseline and scope

- branch: `m02-content-engine`
- accepted M01 baseline: `edde009b77f706d25833b6a6f13d69c1f369c924`
- scope: M02 content engine and SEO only
- rendering model: static Astro output with no client framework or hydration

## Implemented

- Added strict Astro Content Collection schemas for `articles`, `reviews`, and
  `comparisons`, using the Astro 7 content-layer `glob()` loader.
- Added one clearly labeled draft development MDX fixture per collection.
- Added typed static routes and reusable layouts for article, review, and
  comparison content.
- Added reusable prose, source/reference, publication metadata, development
  notice, and affiliate-disclosure hook components.
- Added the nine minimum M02 section landings: systems, crops, nutrients,
  equipment, best, reviews, compare, problems, and tools.
- Added self-canonical and override canonical support, title and description
  metadata, Open Graph metadata, Twitter/X card metadata, publication/update
  dates, and draft indexing controls.
- Added typed WebSite, BlogPosting, and BreadcrumbList JSON-LD helpers plus
  visible breadcrumbs that use the same source data.
- Added `@astrojs/mdx` 8.0.1 and `@astrojs/sitemap` 3.7.4, a sitemap filter for
  non-indexable development fixtures, and `robots.txt` exclusions.
- Updated the accepted M01 base layout without changing its accessible header
  navigation behavior.
- Added eleven M02 regression tests; the five existing M01 tests remain intact.

## Independent audit corrective pass

The first independent M02 audit rejected hardcoded development-fixture wording
in otherwise reusable rendering components. The focused correction:

- removed `Sample article` from the article layout;
- changed the review layout to `Editorial review`, `Verdict`, `Pros`, and
  `Cons`;
- changed the comparison layout to `Comparison` and `Compared items`;
- changed the shared draft notice to the generic `Draft · Noindex` and
  `This unpublished page is excluded from production indexing.`; and
- added regression coverage that keeps fixture wording out of reusable layouts
  while requiring all three fixture MDX entries to retain explicit SAMPLE and
  development labels.

Fixture identity remains in fixture content rather than reusable UI. No schema,
commerce, rating, affiliate, production, or M03 behavior was added.

## Content integrity

The three fixtures are explicitly presented as development samples. They are
draft and non-indexable, use fictional/example identifiers, and contain no
affiliate destinations, prices, numeric ratings, or real-product hands-on
claims. Review/Product commerce structured data is intentionally absent.

## Dependency compatibility correction

The first M02 build exposed an Astro 7.3.0 internal export incompatibility with
the current asset plugin. Astro was updated within the approved 7.3.x line to
7.3.2. The dependency and lockfile are pinned to that validated patch release,
and the complete local gate then passed.

## Validation state

The required local gate passes. Detailed command evidence is in
`milestones/M02/TEST_REPORT.md`. Pull request #2 is open from
`m02-content-engine` into `main`. Both GitHub workflow families passed on the
corrective implementation head for push and pull-request events. The
independent ChatGPT M02 re-audit result is ACCEPTED. The acceptance-state
documentation head must pass GitHub Actions before pull request #2 is merged.

Exact milestone state: `M02 — Content Engine & SEO: ACCEPTED`.

## Explicitly deferred

Pagefind/search, production content, data sets, calculators, affiliate systems,
prices, ratings, commercial Product/Review schema, analytics, Search Console,
CMS/database/accounts, Vercel/deployment, domain/DNS, and all M03+ work remain
out of scope and unimplemented.
