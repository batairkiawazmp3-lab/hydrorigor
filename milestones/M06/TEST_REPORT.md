# M06 — Test Report

Status: READY_FOR_CHATGPT_AUDIT
Validation date: 2026-09-13

## Required ordered local gate

| Command | Result | Evidence |
| --- | --- | --- |
| `npm ci` | PASS | 287 packages installed, 288 audited, 0 vulnerabilities |
| `npm run lint` | PASS | HydroRigor source lint checks passed |
| `npm run check` | PASS | 79 files; 0 errors, 0 warnings, 0 hints |
| `npm test` | PASS | 86/86 tests passed |
| `npm run test:data` | PASS | 3 M04 sources, 8 records, 5 crops; no ppm/TDS conversion |
| `npm run test:commerce` | PASS | 2 source-backed product identities, 4 evidence sources, 0 merchants, 0 destinations; no raw tracking or unsupported hands-on prose |
| `npm run test:content` | PASS | 25 production pages and 22 source records; routes/titles/descriptions unique, links resolved, fixture and commercial leakage absent |
| `npm run build` | PASS | 48 static pages built; sitemap generated; Pagefind indexed 43 pages / 2,002 words |
| `npm run test:search` | PASS | 44 public routes checked, including all 25 M06 pages; representative cluster queries passed; drafts, 404, and search excluded |

The informational `npm ci` allow-scripts notice identified esbuild's expected
install script; dependency installation succeeded and reported no
vulnerabilities.

## M06 regression coverage

Ten M06-focused unit tests cover:

- exact strategy IDs and category distribution;
- unique canonical routes, titles, and primary intents;
- authorized versus `METRIC_NOT_REVERIFIED` keyword state;
- complete HTTPS source metadata and resolved source references;
- typed external-research schema acceptance and unresolved-source rejection;
- manufacturer-only review evidence and disabled Review JSON-LD;
- accepted M04 target/calculator link boundaries;
- static section-landing discovery;
- fixture, tracking, rating, price, and hands-on-claim exclusion; and
- pending independent audit plus M07 authorization boundaries.

All 76 pre-M06 tests also remained green, for 86 total tests.

## Built-output inspection

Representative output was inspected for:

| Surface | Result | Checks |
| --- | --- | --- |
| `/` | PASS | unique title, self-canonical, H1, indexable, Pagefind opt-in |
| `/systems/indoor-hydroponic-systems-for-home/` | PASS | metadata, canonical, H1, breadcrumbs/JSON-LD, visible evidence boundary and sources, indexable |
| `/crops/hydroponic-strawberries/` | PASS | metadata, canonical, H1, breadcrumbs/JSON-LD, visible sources, indexable |
| `/nutrients-water/hydroponic-nutrients/` | PASS | metadata, canonical route, H1, breadcrumbs/JSON-LD, visible sources, indexable |
| `/problems/` | PASS | honest landing state, metadata, canonical, H1, indexable |
| `/reviews/masterblend-hydroponic-nutrients/` | PASS | manufacturer-only evidence label, metadata, canonical, H1, breadcrumbs, sources, no sponsored link or Review rich-result claims |

The authoritative first-25 workbook set contains no Troubleshooting article,
so `/problems/` was inspected instead of inventing an M06 page. None of the
representative outputs contained a fixture notice, accidental `noindex`, or
affiliate qualification.

A static crawl across generated HTML resolved 1,630 internal href references.
The sitemap contains 43 URLs and excludes the three development fixtures,
404, `/search/`, and retired `/nutrients/`. Pagefind indexed those same 43
eligible pages and excludes the same non-indexable surfaces.

## Artifact and scope checks

- `dist/`, `.astro/`, Pagefind output, and `node_modules/` remain ignored and
  untracked.
- `package-lock.json` remained committed and was used by `npm ci`.
- No affiliate destination, tracking ID, price, availability, rating, score,
  Offer, fake testing identity, M07 content, or production-service
  configuration was detected.

M06 awaits independent ChatGPT content and evidence audit; this report does not
claim milestone acceptance.
