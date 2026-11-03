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

### Queue (work top to bottom; one item per run)
Ordered on 2026-11-03 by opportunity: informational topics with low difficulty first.
`indoor hydroponic system` was moved down because its results page is dominated by shopping
listings and "best, tested" product roundups (Ubersuggest SERP, 2026-11-03); it needs a
buyer-oriented rewrite with named system types, done after the informational guides.

1. [ ] `/crops/hydroponic-lettuce-seeds/` — hydroponic lettuce seed (2,400, difficulty 20)
2. [ ] Phase 2 manifest (plan IDs 26+) with tests, in its own PR, so new guides can be added
3. [ ] New guide `/crops/hydroponic-basil/` — hydroponic basil (880, difficulty 11; Ubersuggest 2026-11-03)
4. [ ] `/crops/hydroponic-tomatoes/` — hydroponic tomatoes (1,900, difficulty 29)
5. [ ] `/crops/nft-hydroponic-strawberries/` — nft hydroponic strawberries (390, difficulty 15)
6. [ ] `/crops/hydroponic-lettuce-systems/` — hydroponic lettuce systems (1,000, difficulty 28)
7. [ ] `/nutrients-water/organic-hydroponic-nutrients/` — organic hydroponic nutrients (590 + 390, difficulty 18–20)
8. [ ] `/nutrients-water/hydroponic-nutrient-solution/` — hydroponic nutrients solution (720, difficulty 25)
9. [ ] `/crops/hydroponic-tomato-seeds/` — hydroponic tomatoes seeds (480, difficulty 16)
10. [ ] `/systems/deep-water-culture-hydroponics/` — deep water culture
11. [ ] `/systems/diy-hydroponic-system-for-beginners/` — DIY hydroponic system
12. [ ] `/systems/indoor-hydroponic-systems-for-home/` — indoor hydroponic system (2,900, difficulty 33; buyer-oriented rewrite)
13. [ ] `/systems/smart-indoor-hydroponic-systems/` — smart indoor systems
14. [ ] `/nutrients-water/how-to-mix-hydroponic-nutrients/`
15. [ ] `/nutrients-water/powder-vs-liquid-hydroponic-nutrients/`
16. [ ] `/nutrients-water/hydroponic-nutrients-for-vegetables/`
17. [ ] `/nutrients-water/hydroponic-nutrients-for-tomatoes/` — tomatoes nutrient solution (170)
18. [ ] Buyer guides with research-based named picks (no invented testing, ratings or prices):
       `/best/hydroponic-system-for-home-growers/`, `/best/hydroponic-systems-for-beginners/`,
       `/best/indoor-hydroponic-system-kits/`, `/best/hydroponic-systems-for-sale/`,
       `/best/hydroponic-nutrients-for-home-growers/` — one per run
19. [ ] Reviews: `/reviews/masterblend-hydroponic-nutrients/`, `/reviews/general-hydroponics-nutrients/`
20. [ ] New guides from the 100-article plan (IDs 26–55), in plan order, after item 3

### Blocked on the owner
- [ ] Contact email: `/contact/` goes live once a domain address works (see handoff)
- [ ] Affiliate links: after the owner joins a programme, add merchants in
      `src/data/merchants/`, enable disclosures and link through `AffiliateLink`
