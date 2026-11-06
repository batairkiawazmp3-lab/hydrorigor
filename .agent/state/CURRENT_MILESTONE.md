# Current Milestone

## M08 — Production Launch: ACCEPTED (owner, 2026-11-02)

hydrorigor.com is live from `main`; www.hydrorigor.com 308-redirects to the apex.
Search Console (domain property) is verified, `sitemap-index.xml` is submitted, and
indexing was requested for `/` and `/crops/hydroponic-strawberries/`.
Earlier milestone and handoff files are archived as `milestones/M08/ARCHIVED_*_2026-11-02.md`.

## M09 — Content upgrade and scale: ACTIVE

Claude works this queue top to bottom, one item per branch and pull request, following
`CLAUDE.md` and the content standard in `AGENTS.md`. Tick an item (`[x]`) in the same PR
that ships it. Volumes are US monthly searches from `docs/research/M06_KEYWORD_RESEARCH.md`
(verified 2026-09-12); the monthly SEO review may reorder the open items.

### Done
- [x] Strawberry guide rebuilt (hydroponic strawberries, 8,100/mo)
- [x] Lettuce guide rebuilt (hydroponic lettuce, 4,400/mo)
- [x] Nutrients guide rebuilt (hydroponic nutrients, 3,600/mo)
- [x] Lab Garden rebrand, self-hosted fonts, guide template with contents and related reads
- [x] Real photos on every guide, section, the homepage and Start Here (PR #17)
- [x] Technical SEO: favicon and app icons, titles within 60 characters, default share image,
      privacy policy, author credential in structured data, internal milestone wording removed
- [x] Vercel Web Analytics enabled in production (owner, 2026-11-03)
- [x] Design update: one-row phone header, phone hero photos, compact guide meta, KeyTargets
      card, photo "Keep reading" cards, schema images, large image previews (PR #20)
- [x] Specific search titles for the strawberry, lettuce and nutrients guides
- [x] Email: ImprovMX forwarding live (DNS 2026-11-04); /contact/ shows hello@hydrorigor.com (2026-11-05)
- [x] Branded share images (public/og/) and Pinterest pins (public/pins/) for every guide;
      regenerate with `npm run images:share` after a title or photo change

### Queue (work top to bottom; one item per run)
Ordered on 2026-11-03 by opportunity: informational topics with low difficulty first.
`indoor hydroponic system` was moved down because its results page is dominated by shopping
listings and "best, tested" product roundups (Ubersuggest SERP, 2026-11-03); it needs a
buyer-oriented rewrite with named system types, done after the informational guides.

Re-ordered on 2026-11-05 from Search Console (first data, Nov 1–3; baseline in
`docs/research/search-console/2026-11-05-baseline.md`): items 3–5 are thin launch guides
(about 420–550 words) that Google is already showing for real searches, so rebuilding them
first is the fastest route to page 1. Keep each page's route and title intent.

1. [x] `/crops/hydroponic-lettuce-seeds/` — hydroponic lettuce seed (2,400, difficulty 20); rebuilt 2026-11-05
2. [x] Phase 2 manifest (plan IDs 26+) with tests, in its own PR, so new guides can be added (PR #23)
3. [x] `/best/hydroponic-system-for-home-growers/` — rebuilt 2026-11-06 ("Best Hydroponic System for Home Growers: DWC, NFT or Drip?"). Search
       Console: position 14 for "most effective hydroponic system", 3 impressions, page average 30.
       Answer "which system is most effective / best for a home" directly by crop, with sources.
4. [ ] `/nutrients-water/hydroponic-nutrients-for-tomatoes/` — rebuild. Search Console:
       "hydroponic fertilizer tomatoes" (position 62) and "best hydroponic nutrients for
       tomatoes" (position 66).
5. [ ] `/systems/diy-hydroponic-system-for-beginners/` — rebuild. Search Console:
       "diy hydroponics systems" (position 81) and "hydroponics diy system" (position 99).
6. [ ] New guide `/crops/hydroponic-basil/` — hydroponic basil (880, difficulty 11; Ubersuggest 2026-11-03)
7. [ ] `/crops/hydroponic-tomatoes/` — hydroponic tomatoes (1,900, difficulty 29)
8. [ ] `/crops/nft-hydroponic-strawberries/` — nft hydroponic strawberries (390, difficulty 15)
9. [ ] `/crops/hydroponic-lettuce-systems/` — hydroponic lettuce systems (1,000, difficulty 28)
10. [ ] `/nutrients-water/organic-hydroponic-nutrients/` — organic hydroponic nutrients (590 + 390, difficulty 18–20)
11. [ ] `/nutrients-water/hydroponic-nutrient-solution/` — hydroponic nutrients solution (720, difficulty 25)
12. [ ] `/crops/hydroponic-tomato-seeds/` — hydroponic tomatoes seeds (480, difficulty 16)
13. [ ] `/systems/deep-water-culture-hydroponics/` — deep water culture
14. [ ] `/systems/indoor-hydroponic-systems-for-home/` — indoor hydroponic system (2,900, difficulty 33; buyer-oriented rewrite)
15. [ ] `/systems/smart-indoor-hydroponic-systems/` — smart indoor systems
16. [ ] `/nutrients-water/how-to-mix-hydroponic-nutrients/`
17. [ ] `/nutrients-water/powder-vs-liquid-hydroponic-nutrients/`
18. [ ] `/nutrients-water/hydroponic-nutrients-for-vegetables/`
19. [ ] Buyer guides with research-based named picks (no invented testing, ratings or prices):
       `/best/hydroponic-systems-for-beginners/`, `/best/indoor-hydroponic-system-kits/`,
       `/best/hydroponic-systems-for-sale/`, `/best/hydroponic-nutrients-for-home-growers/` — one per run
20. [ ] Reviews: `/reviews/masterblend-hydroponic-nutrients/`, `/reviews/general-hydroponics-nutrients/`
21. [ ] New guides from the 100-article plan (IDs 26–55), in plan order, after item 6

Any page that the daily Search Console check finds at positions 8–20 with 30+ impressions
goes to the top of this queue (ranking work); pages already in the top 10 with CTR below the
benchmark in the baseline file get a title and description review instead.

### Blocked on the owner
- [ ] Affiliate links: after the owner joins a programme, add merchants in
      `src/data/merchants/`, enable disclosures and link through `AffiliateLink`
