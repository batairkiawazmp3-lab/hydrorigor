# M02 Specification — Content Engine & SEO

Status: READY_FOR_AUDIT

## Authorization

M02 was explicitly authorized after acceptance and merge of M01. M03 and later
milestones are not authorized.

## Objective

Create HydroRigor's typed Astro Content Collections and static SEO foundation so
articles, editorial reviews, and comparisons can be authored as structured MDX
and rendered with consistent metadata, canonical URLs, breadcrumbs, sources,
publication details, draft controls, and matching JSON-LD.

## Authorized outputs

- strict `articles`, `reviews`, and `comparisons` content schemas
- one clearly labeled draft development fixture per collection
- reusable article, review, comparison, prose, source, publication, breadcrumb,
  disclosure, SEO, and JSON-LD foundations
- minimum landing routes for systems, crops, nutrients, equipment, best,
  reviews, compare, problems, and tools
- static fixture routes proving each content layout
- self-canonical metadata with explicit override support
- Open Graph, Twitter/X, robots, publication, and update metadata
- typed WebSite, BlogPosting, and BreadcrumbList JSON-LD helpers
- `@astrojs/mdx` and `@astrojs/sitemap` integrations
- sitemap filtering and `robots.txt` exclusions for development fixtures
- automated schema, SEO, structured-data, indexing, and fixture-integrity tests
- M02 reports, state, branch, pull request, and green CI handoff

## Explicitly out of scope

- Pagefind or search
- production editorial content or article batches
- crop targets, pH/EC datasets, calculators, or databases
- affiliate registries, affiliate links, product feeds, prices, or availability
- numeric ratings or Product/Review commercial rich-result schema
- full navigation/homepage redesign
- analytics, Search Console, external CMS, user accounts, or production services
- Vercel connection/deployment, production deployment, domain, or DNS actions
- M03, M04, M05, or later milestone implementation

## Required validation

1. `npm ci`
2. `npm run lint`
3. `npm run check`
4. `npm test`
5. `npm run build`
6. GitHub Actions on the M02 pull request
7. Independent ChatGPT M02 reality audit

## Acceptance criteria

- all three collections validate strict frontmatter and render through typed
  static routes
- visible metadata, breadcrumbs, sources, and JSON-LD agree
- canonical URLs default to self and support explicit override
- draft fixtures are `noindex`, excluded from sitemap, and disallowed in robots
- no affiliate destination, fake price, rating, or product-testing claim exists
- all nine route landings build with no client framework or hydration
- local and CI gates pass
- reports and handoff reflect repository reality
- M02 remains pending independent ChatGPT audit
