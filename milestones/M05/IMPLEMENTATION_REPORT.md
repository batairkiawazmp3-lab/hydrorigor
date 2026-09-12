# M05 Implementation Report

Status: ACCEPTED

## Baseline and governance

M05 was implemented on `m05-affiliate-reviews`, created from clean,
synchronized `main` commit `1936b957796a3f69b0a7c3547dba264296883490`.
M04 was already accepted and squash-merged. M06 remains `NOT_STARTED` and
`NOT_AUTHORIZED`.

## Product and evidence model

- `src/lib/commercial/models.ts` defines strict records for products,
  commercial evidence sources, evidence claims, merchants, and destinations.
- Product editorial status is separate from market availability. Allowed
  statuses are `fixture`, `research-pending`, `editorial-ready`, and `retired`;
  none asserts that an item is in stock.
- Evidence basis is explicit: `fixture`, `manufacturer-spec-only`,
  `externally-researched`, or `hands-on-tested`.
- Claim type is explicit: manufacturer specification, third-party evidence,
  HydroRigor observation, or editorial interpretation.
- Manufacturer and third-party claims require compatible source records.
  Non-fixture products require source references and a verification date.
- The production product and product-evidence-source registries are empty.
  Three fictional product fixtures are isolated under
  `src/data/commercial/fixtures.ts` and cannot resolve on an indexable page.

## Review and comparison integrity

- The review collection now requires evidence basis, evidence claims, and an
  acquisition relationship. A hands-on review additionally requires a tester,
  methodology, dated test period, acquisition record, and HydroRigor
  observation claim.
- Non-hands-on reviews cannot carry testing metadata or HydroRigor observation
  claims. Supplied, loaned, and discounted items require a separate acquisition
  disclosure.
- Comparison items have one-to-one typed evidence records. Hands-on comparison
  evidence has the same per-item testing and acquisition requirements.
- Comparison conclusions reject unsupported `overall winner`, `universal
  winner`, `best overall`, and `wins for everyone` assertions.
- The existing review and comparison entries remain fictional, draft,
  noindex, unscored, destination-free development fixtures.

## Merchant links and disclosures

- Production merchant and commercial-destination registries are empty. No
  relationship, program, destination, or tracking ID was created.
- Registry validation rejects duplicate IDs, dangling merchant/source
  references, incompatible evidence sources, and affiliate destinations whose
  merchant is not explicitly recorded with an active affiliate program.
- Content stores destination IDs rather than raw compensated URLs. Build-time
  resolution fails on unknown IDs.
- `AffiliateLink.astro` derives behavior from typed relationship data.
  Affiliate links receive `sponsored nofollow noopener noreferrer`; editorial
  destinations receive only `noopener noreferrer`.
- Affiliate disclosure is required when an affiliate destination is present.
  A disclosure without a current affiliate destination requires a visible,
  explicit reason. Supplied/loaned/discounted acquisition disclosure is
  rendered separately.

## Focused independent-audit correction

The first independent M05 audit rejected two bypass paths while accepting the
rest of the implementation.

1. `src/lib/commercial/content-integrity.ts` now centralizes narrow detection
   of unmistakable first-person product testing/measurement claims such as
   “we tested,” “our testing showed,” “during our test,” and “HydroRigor
   measured.” It deliberately does not ban generic words such as `test` or
   `measurement`; manufacturer testing, third-party tests, and “our testing
   methodology requires…” remain valid.
2. Non-hands-on review schemas apply that guard to verdict, methodology, pros,
   and cons. Comparisons that are not fully hands-on apply it to criteria and
   use-case conclusions. `validate-commerce.mjs` applies the same helper to the
   MDX body of non-hands-on reviews and not-fully-hands-on comparisons, closing
   the prose bypass.
3. `AffiliateLink.astro` now exposes only `destinationId`. It resolves that ID
   internally through `resolveCommercialDestination`, which reads only the
   validated production destination registry and throws for unknown IDs.
   `MerchantDestinations.astro` likewise accepts IDs and passes only IDs to the
   link component. Test-only destinations exercise the lower-level resolver;
   no production record was added.

The independent re-audit accepted those corrections and identified one narrow
over-blocking boundary: comparison evidence lives under `itemEvidence`, while
the MDX helper recognized only a review's top-level `evidenceBasis`. The final
correction parses the comparison `itemEvidence` list without adding a YAML
dependency and permits comparison body claims only when every item is
`hands-on-tested`. Zero-hands-on and mixed-evidence comparisons remain blocked.
The comparison schema now applies the same all-items rule to criteria and
use-case conclusions; existing per-item completeness refinements are unchanged.

## Rendering and structured data

- Reusable components render product identity, evidence basis, individual
  evidence claims, acquisition/affiliate disclosures, destinations, and honest
  unavailable states.
- Review and comparison layouts resolve fixture records only for draft content
  and verify that page evidence matches the referenced product record.
- `/best/`, `/reviews/`, and `/compare/` show honest commercial empty states;
  no fake product cards or recommendations were added.
- The typed commercial Review JSON-LD helper returns `null` for drafts,
  fixtures, disabled records, and non-hands-on evidence. Its enabled path
  requires complete hands-on evidence and emits no rating, aggregate rating,
  offer, price, or availability.
- Existing WebSite, BlogPosting, BreadcrumbList, canonical, robots, sitemap,
  and Pagefind behavior remains intact.

## Public policy reconciliation

The affiliate disclosure, testing methodology, editorial policy, homepage,
About page, section availability text, and footer now describe M05 reality:
infrastructure exists, but no real affiliate relationship, destination,
product review, recommendation, rating, price, availability, or hands-on test
is published.

## Validation and CI

`scripts/validate-commerce.mjs` enforces empty M05 production registries,
fixture isolation, typed frontmatter architecture, the absence of raw tracking
destinations, and non-hands-on MDX prose integrity. The
`test:commerce` command is part of GitHub Actions between M04 data validation
and the production build.

The corrective full local gate is green; exact results are in `TEST_REPORT.md`.
Implementation commit `7aed764b3ffac9a674a312959c3d01843fdc3db0` was
pushed and opened as pull request #5:
`https://github.com/batairkiawazmp3-lab/hydrorigor/pull/5`. Both `ci / quality`
and `governance / m00-governance` passed on push and pull-request events for
that implementation head. Corrective commit
`de43b1c2ef69d0378c1c02ff2c3fcc548e2dc370` was pushed to the same open,
unmerged pull request and passed both checks on push and pull-request events.
Final corrective commit `73f7392d8e1241ae14c3e2b02c9339585e8446aa`
passed the full local gate and both `ci / quality` and
`governance / m00-governance` on push and pull-request events. Documentation
head `1ffd69322a77d593a0a1c36756c70d533bae5f0b` passed the same checks. The
independent ChatGPT final re-audit accepted M05, including its evidence
boundaries, prose guards, registry-backed link API, disclosure enforcement,
commercial-schema omissions, empty production registries, and fixture
isolation. No implementation boundary was weakened during acceptance
finalization.

## Scope and side effects

No affiliate program was joined or accessed. No merchant account, tracking ID,
credential, price feed, availability feed, real recommendation, real testing,
numeric rating, deployment, publishing, domain/DNS change, analytics, Search
Console connection, Vercel action, or M06 work occurred.
