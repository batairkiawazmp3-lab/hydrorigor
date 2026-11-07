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
Re-ordered on 2026-11-06 for traffic and buyer intent (plan: `docs/research/GROWTH_PLAN_2026-11.md`).
Figures are US monthly volume / SEO difficulty from Ubersuggest (2026-11-06) unless noted.
Rule: thin pages Google already shows come first, then the highest volume-to-difficulty topics,
mixing in one new guide for every two or three rebuilds.

4. [x] `/nutrients-water/hydroponic-nutrients-for-tomatoes/` — rebuilt 2026-11-06 ("Hydroponic Nutrients for Tomatoes: EC, pH & Feeding by Stage"). Search Console:
       "hydroponic fertilizer tomatoes" (position 62) and "best hydroponic nutrients for
       tomatoes" (position 66); "hydroponic nutrients tomatoes" 140 / 20.
5. [x] `/systems/diy-hydroponic-system-for-beginners/` — rebuilt 2026-11-06 ("DIY Hydroponic System for Beginners: 3 Builds, Step by Step"). Search Console:
       "diy hydroponics systems" (position 81) and "hydroponics diy system" (position 99).
6. [x] `/systems/deep-water-culture-hydroponics/` — rebuilt 2026-11-07 ("Deep Water Culture Hydroponics: DWC Setup, Oxygen & pH"). "hydroponic system deep water culture"
       4,400 / 25; "hydroponic system dwc" 2,900 / 28. Search Console: 4 impressions, position 54.
7. [ ] New guide, plan ID 59 (repurposed): hydroponic towers — "hydroponic tower" 6,600 / 33,
       "hydroponic tower diy" 1,300 / 32. How towers work, crops, light, DIY versus kits;
       research-based, no product picks until an affiliate programme is approved.
8. [ ] `/systems/indoor-hydroponic-systems-for-home/` — buyer-oriented rebuild. "hydroponic system
       indoor" 3,600 / 25; "indoor hydroponic system" 2,900 / 33; "indoor gardening hydroponic
       system" 2,400 / 16 (CPC $3.29). Results page is shopping-heavy (2026-11-03 note above).
9. [ ] `/crops/nft-hydroponic-strawberries/` — rebuild. "strawberry hydroponic system" 2,400 / 26.
10. [ ] New guide `/crops/hydroponic-basil/` (plan ID 41) — hydroponic basil (880, difficulty 11; Ubersuggest 2026-11-03).
11. [ ] `/crops/hydroponic-tomatoes/` — rebuild. hydroponic tomatoes (1,900, difficulty 29).
12. [ ] `/best/hydroponic-systems-for-sale/` — rebuild. "hydroponic system sale" 1,600 / 24;
        "hydroponic system for sale" 1,300 / 28.
13. [ ] `/best/hydroponic-systems-for-beginners/` — rebuild. Search Console: 6 impressions, position 46.5.
14. [ ] `/crops/hydroponic-lettuce-systems/` — rebuild. "nutrient film hydroponic system" 1,300 / 30;
        hydroponic lettuce systems (1,000, difficulty 28).
15. [ ] `/nutrients-water/hydroponic-nutrient-solution/` — rebuild. "hydroponic nutrients solution" 720 / 25.
16. [ ] New guide, plan ID 28: Kratky hydroponics (supports the Kratky sections of three rebuilt guides).
17. [ ] New guide, plan ID 66: pH meters for hydroponics — "ph meter hydroponics" 590 / 15,
        "digital ph meter hydroponics" 140 / 14. Publish as a how-to-choose guide; add named
        picks only after an affiliate programme is approved.
18. [ ] `/crops/hydroponic-tomato-seeds/` — rebuild. hydroponic tomatoes seeds (480, difficulty 16).
19. [ ] `/nutrients-water/organic-hydroponic-nutrients/` — rebuild. "organic hydroponic nutrients" 390 / 18.
20. [ ] `/systems/smart-indoor-hydroponic-systems/` — rebuild ("click and grow" 5,400 / 35 is the
        nearest brand demand). Move to the top of the queue if Click & Grow approves the owner.
21. [ ] Remaining launch-guide rebuilds, one per run: `/nutrients-water/how-to-mix-hydroponic-nutrients/`
        ("mixing hydroponic nutrients" 140 / 19), `/nutrients-water/powder-vs-liquid-hydroponic-nutrients/`
        ("hydroponic nutrients powder" 170 / 19), `/nutrients-water/hydroponic-nutrients-for-vegetables/`
        ("hydroponic nutrients vegetables" 140 / 15), `/best/indoor-hydroponic-system-kits/`,
        `/best/hydroponic-nutrients-for-home-growers/` ("best hydroponic nutrients" 260 / 20),
        `/reviews/masterblend-hydroponic-nutrients/` ("masterblend hydroponic nutrients" 210 / 22),
        `/reviews/general-hydroponics-nutrients/` (170 / 23).
22. [ ] New guides from the 100-article plan (IDs 26–55), in plan order, skipping IDs already done.

Any page that the daily Search Console check finds at positions 8–20 with 30+ impressions
goes to the top of this queue (ranking work); pages already in the top 10 with CTR below the
benchmark in the baseline file get a title and description review instead.

### Blocked on the owner
- [ ] Affiliate links: after the owner joins a programme, add merchants in
      `src/data/merchants/`, enable disclosures and link through `AffiliateLink`
