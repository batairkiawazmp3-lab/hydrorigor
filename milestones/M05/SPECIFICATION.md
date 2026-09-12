# M05 Specification — Affiliate & Reviews

Status: READY_FOR_CI

## Authorization and baseline

M05 was explicitly authorized after M04 acceptance and squash merge. Branch
`m05-affiliate-reviews` was created from clean, synchronized `main` commit
`1936b957796a3f69b0a7c3547dba264296883490`. M06 and later milestones are not
authorized.

## Objective

Build production-ready commercial editorial infrastructure without creating or
implying any real affiliate relationship, product test, price, availability,
rating, product recommendation, or merchant destination.

## Product and evidence integrity

- Product facts must live in strict structured records and cite explicit source
  references where applicable.
- Product status/evidence must distinguish fixtures, manufacturer
  specifications, external research, and hands-on testing.
- Claim provenance must distinguish manufacturer specification, third-party
  evidence, HydroRigor observation, and editorial interpretation.
- Hands-on status requires a tester, documented methodology, acquisition
  relationship, and dated test period/update.
- Supplied, loaned, or discounted acquisition requires an explicit visible
  disclosure. Researched reviews cannot render hands-on language.
- The production product registry may remain empty. Any development products
  must be fictional, draft/non-indexable, non-commercial, and isolated from
  public recommendation surfaces.

## Merchant and affiliate integrity

- Merchant and destination records must be typed, centralized, and reference
  each other by ID.
- Relationship state is explicit; URLs are never inspected to guess whether a
  link is compensated.
- Active affiliate destinations require an explicitly active merchant program
  and page-level affiliate disclosure.
- Affiliate links must include `sponsored nofollow`; new-tab external links must
  also include `noopener noreferrer`.
- Editorial links must not be mislabeled as compensated.
- No real merchant, active program, affiliate destination, tracking ID, account,
  credential, or network integration is permitted in M05.

## Review and comparison integrity

- Extend existing content schemas conservatively with typed evidence and
  commercial state.
- Preserve the fictional M02 fixtures as draft, noindex, unscored, and
  non-commercial.
- Review layouts expose evidence basis, methodology, qualitative verdict,
  sources, pros/cons, and truthful disclosures without fake testing language.
- Comparison conclusions remain use-case-specific; no absolute winner or score
  is inferred.
- Commercial landings use honest empty states until real content exists.

## Structured data

Implement typed Product/Review schema gating, while emitting no Product/Review
commercial rich-result markup for current development fixtures. Never emit
`aggregateRating`, `reviewRating`, `Offer`, price, or availability without
future separately verified data. Preserve accepted WebSite, BlogPosting, and
BreadcrumbList behavior.

## Validation

The commercial validator and tests must reject inconsistent products, evidence,
acquisition relationships, merchants, destinations, disclosures, raw
compensated destinations, fake ratings/prices/availability, and unsupported
structured data. CI must run:

1. `npm ci`
2. `npm run lint`
3. `npm run check`
4. `npm test`
5. `npm run test:data`
6. `npm run test:commerce`
7. `npm run build`
8. `npm run test:search`
9. independent ChatGPT M05 reality audit

## Explicitly out of scope

Affiliate enrollment/authentication, tracking IDs, merchant accounts/APIs,
prices, availability, feeds, scraping, discounts/coupons, paid placements,
sponsored posts, real rankings or recommendations, real product acquisition or
testing, numeric/star ratings, production article publishing, M06 content,
analytics, Search Console, Vercel/deployment, domain/DNS, CMS, database, and
accounts are not authorized.

## Completion boundary

M05 remains pending independent ChatGPT audit after implementation, full local
validation, pull request, and green CI. The M05 pull request must not be merged.
