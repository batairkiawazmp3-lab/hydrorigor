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
- [x] US readers (2026-11-09): °F, gallons and inches beside metric, American spelling, IndexNow
      after each deploy, Pinterest bulk-upload CSV generator

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
7. [x] New guide, plan ID 59 (repurposed): hydroponic towers — published 2026-11-07 at `/systems/hydroponic-tower-garden/` — "hydroponic tower" 6,600 / 33,
       "hydroponic tower diy" 1,300 / 32. How towers work, crops, light, DIY versus kits;
       research-based, no product picks until an affiliate programme is approved.
8. [x] `/systems/indoor-hydroponic-systems-for-home/` — rebuilt 2026-11-08 ("Indoor Hydroponic Systems for Home: 6 Types Compared"); buyer-oriented, no product picks. "hydroponic system
       indoor" 3,600 / 25; "indoor hydroponic system" 2,900 / 33; "indoor gardening hydroponic
       system" 2,400 / 16 (CPC $3.29). Results page is shopping-heavy (2026-11-03 note above).
9. [x] `/crops/nft-hydroponic-strawberries/` — rebuilt 2026-11-09 ("NFT Hydroponic Strawberries: Slope, Flow, pH & EC Setup"). "strawberry hydroponic system" 2,400 / 26.
Moved to the top on 2026-11-09 by the daily Search Console check (rule: position 8–20 with 30+
impressions in 28 days).

10. [x] `/best/hydroponic-system-for-home-growers/` — strengthening pass done 2026-11-09 (crop-by-crop answer in the first sentence, trial yields in the "most effective" FAQ, equipment table by system, kit and equipment FAQs, links from the strawberries and nutrients guides). Was: strengthening pass (already rebuilt 2026-11-06, #30):
        clearer direct answer, intent match for "most effective hydroponic system" (position 14.0),
        more internal links. Search Console (Nov 1–7): 32 impressions, position 15.5,
        0 clicks; previous check 29 impressions, position 10.9. Keep the title (changed 2026-11-06).
11. [x] New guide `/crops/hydroponic-basil/` (plan ID 41) — published 2026-11-09 ("Hydroponic Basil: pH, EC, Light & Harvest Guide"). hydroponic basil (880, difficulty 11; Ubersuggest 2026-11-03).
12. [x] `/crops/hydroponic-tomatoes/` — rebuilt 2026-11-10 ("Hydroponic Tomatoes: pH, EC, Light, Spacing & Pruning"). hydroponic tomatoes (1,900, difficulty 29).
13. [x] `/best/hydroponic-systems-for-sale/` — rebuilt 2026-11-11 ("Hydroponic Systems for Sale: 9 Checks Before You Buy"). "hydroponic system sale" 1,600 / 24;
        "hydroponic system for sale" 1,300 / 28.
14. [x] `/best/hydroponic-systems-for-beginners/` — rebuilt 2026-11-12 ("Best Hydroponic System for Beginners: What to Start With"). Search Console: 6 impressions, position 46.5.
15. [x] `/crops/hydroponic-lettuce-systems/` — rebuilt 2026-11-12 ("Hydroponic Lettuce Systems: NFT vs DWC vs Kratky Compared"). "nutrient film hydroponic system" 1,300 / 30;
        hydroponic lettuce systems (1,000, difficulty 28).
16. [x] `/nutrients-water/hydroponic-nutrient-solution/` — rebuilt 2026-11-13 ("Hydroponic Nutrient Solution: ppm, EC, pH & When to Change"). "hydroponic nutrients solution" 720 / 25.
17. [x] New guide `/systems/kratky-hydroponics/` (plan ID 28) — published 2026-11-13 ("Kratky Hydroponics: No-Pump Setup, Air Gap & Crops"); linked from five guides.
18. [x] New guide `/best/hydroponic-ph-meter/` (plan ID 66) — published 2026-11-14 ("pH Meter for
        Hydroponics: How to Choose & Calibrate"). "ph meter hydroponics" 590 / 15. No named picks;
        add them only after an affiliate programme is approved.
19. [x] `/crops/hydroponic-tomato-seeds/` — rebuilt 2026-11-14 ("Hydroponic Tomato Seeds: Best Varieties & How to Start Them"). hydroponic tomatoes seeds (480, difficulty 16).
20. [x] `/nutrients-water/organic-hydroponic-nutrients/` — rebuilt 2026-11-15 ("Organic Hydroponic Nutrients: Yields, Problems & Fixes"). "organic hydroponic nutrients" 390 / 18.
21. [x] `/systems/smart-indoor-hydroponic-systems/` — rebuilt 2026-11-15 ("Smart Indoor Hydroponic Systems: Light, Crops & Upkeep"); no brands or product picks
        ("click and grow" 5,400 / 35 is the nearest brand demand; add named units only if Click & Grow approves the owner).
22. [x] Remaining launch-guide rebuilds (all done 2026-11-17), one per run: ~~`/nutrients-water/how-to-mix-hydroponic-nutrients/`~~
        (rebuilt 2026-11-15, "How to Mix Hydroponic Nutrients: Order, Rates & EC Check"; "mixing hydroponic nutrients" 140 / 19), ~~`/nutrients-water/powder-vs-liquid-hydroponic-nutrients/`~~
        (rebuilt 2026-11-16, "Powder vs Liquid Hydroponic Nutrients: Mixing, Storage & EC"; "hydroponic nutrients powder" 170 / 19), ~~`/nutrients-water/hydroponic-nutrients-for-vegetables/`~~
        (rebuilt 2026-11-16, "Hydroponic Nutrients for Vegetables: EC & pH by Crop"; "hydroponic nutrients vegetables" 140 / 15), ~~`/best/indoor-hydroponic-system-kits/`~~
        (rebuilt 2026-11-16, "Indoor Hydroponic System Kits: What's Included & What to Add"),
        ~~`/best/hydroponic-nutrients-for-home-growers/`~~ (rebuilt 2026-11-17, "Best Hydroponic Nutrients: How to Choose by Crop & Type"; "best hydroponic nutrients" 260 / 20),
        ~~`/reviews/masterblend-hydroponic-nutrients/`~~ (rebuilt 2026-11-17, "Masterblend Hydroponic Nutrients: Rates per Gallon & Mixing"; "masterblend hydroponic nutrients" 210 / 22),
        ~~`/reviews/general-hydroponics-nutrients/`~~ (rebuilt 2026-11-17, "General Hydroponics Nutrients: Flora Feed Chart, EC & pH"; 170 / 23).
Moved to the top on 2026-11-22 by the daily Search Console check (rule: position 8–20 with 30+
impressions in 28 days).

23. [x] `/best/hydroponic-system-for-home-growers/` — second strengthening pass done 2026-11-22 (answer leads with yield by crop, "what most effective means" section with Missouri water/fertilizer and plant-loss ranking, trial-yield bar chart, links to 12 system and equipment guides, US/metric units, tightened to about 2,450 words). Was: second strengthening pass (rebuilt 2026-11-06, #30;
        first pass 2026-11-09): clearer direct answer, intent match for the queries it shows for
        ("most effective hydroponic system" position 14.0), more internal links. Search Console
        (Nov 1–20, checked 2026-11-22): 37 impressions, position 19.8, 0 clicks; previous check
        36 impressions, position 20.1. Keep the title (changed 2026-11-06).
24. [ ] New guides from the 100-article plan (IDs 26–55), in plan order, skipping IDs already done.
        Done: ~~ID 26 `/systems/what-is-hydroponics/`~~ (published 2026-11-18, "What Is Hydroponics? How It Works, Systems & Key Numbers").
        ~~ID 27 `/systems/types-of-hydroponic-systems/`~~ (published 2026-11-18, "Types of Hydroponic Systems: DWC, NFT, Drip & 5 More").
        ~~ID 29 `/systems/nft-hydroponic-system/`~~ (published 2026-11-19, "NFT Hydroponic System: Slope, Flow, Spacing & Setup").
        ~~ID 30 `/systems/ebb-and-flow-hydroponics/`~~ (published 2026-11-19, "Ebb and Flow Hydroponics: Flood Timing, Media & Setup").
        ~~ID 31 `/systems/dutch-bucket-hydroponics/`~~ (published 2026-11-20, "Dutch Bucket Hydroponics: Setup, Drip Rates & Best Crops").
        ~~ID 32 `/systems/drip-hydroponic-system/`~~ (published 2026-11-20, "Drip Hydroponic System: Emitters, Timing, Drain & Setup").
        ~~ID 33 `/systems/aeroponics-vs-hydroponics/`~~ (published 2026-11-21, "Aeroponics vs Hydroponics: Yields, Mist Timing & Risks").
        ~~ID 34 `/equipment/hydroponic-reservoir-size/`~~ (published 2026-11-21, "Hydroponic Reservoir Size: Gallons per Plant by System"; first equipment guide, `/equipment/` removed from `EMPTY_SECTION_PATHS`).
        ~~ID 35 `/equipment/hydroponic-water-pumps/`~~ (published 2026-11-21, "Hydroponic Water Pumps: GPH, Head Height & Sizing").
        ~~ID 36 `/equipment/air-pump-for-dwc-hydroponics/`~~ (published 2026-11-21, "Air Pump for DWC Hydroponics: Sizing, Stones & Oxygen").
        ~~ID 38 `/equipment/hydroponic-growing-media/`~~ (published 2026-11-22, "Hydroponic Growing Media: Rockwool, Coir, Clay & Perlite"; taken out of order by an owner-started run so it would not clash with the morning run on ID 37).
        ~~ID 37 `/equipment/hydroponic-net-pots/`~~ (published 2026-11-22, "Hydroponic Net Pots: Sizes, Hole Saws, Depth & Reuse").
        ~~ID 39 `/equipment/rockwool-vs-coco-coir/`~~ (published 2026-11-23, "Rockwool vs Coco Coir: pH, Water, Yield & Which to Use").
        ~~ID 40 `/equipment/leca-hydroponics/`~~ (published 2026-11-23, "LECA for Hydroponics: pH, Best Systems, Rinsing & Reuse"; shipped by a run whose ID 39 draft was overtaken by #117).
        ~~ID 42 `/crops/hydroponic-peppers/`~~ (published 2026-11-23, "Hydroponic Peppers: pH, EC, Temperature & Harvest Guide").
        ~~ID 43 `/crops/hydroponic-cucumbers/`~~ (published 2026-11-23, "Hydroponic Cucumbers: pH, EC, Temperature & Pruning Guide").
        ~~ID 44 `/crops/hydroponic-microgreens/`~~ (published 2026-11-24, "Hydroponic Microgreens: Seed Rates, Light, EC & Harvest Days").
        ~~ID 45 `/crops/best-herbs-for-hydroponics/`~~ (published 2026-11-24, "Best Herbs for Hydroponics: pH, EC, Light & Easiest Picks").
        ~~ID 47 `/crops/hydroponic-kale/`~~ (published 2026-11-25, "Hydroponic Kale: pH, EC, Light & Harvest Guide"; taken by an owner-started session while the morning run took ID 46).
        ~~ID 46 `/crops/hydroponic-spinach/`~~ (published 2026-11-25, "Hydroponic Spinach: pH, EC, Temperature & Bolting Guide").
        ~~ID 48 `/crops/hydroponic-green-onions/`~~ (published 2026-11-25, "Hydroponic Green Onions: pH, Spacing, Regrowth & Harvest").
        ~~ID 49 `/crops/hydroponic-cilantro/`~~ (published 2026-11-25, "Hydroponic Cilantro: pH, EC, Light & Bolting Guide").
        Next: ID 50 (hydroponic mint).

Any page that the daily Search Console check finds at positions 8–20 with 30+ impressions
goes to the top of this queue (ranking work); pages already in the top 10 with CTR below the
benchmark in the baseline file get a title and description review instead.

### Blocked on the owner
- [ ] Affiliate links: after the owner joins a programme, add merchants in
      `src/data/merchants/`, enable disclosures and link through `AffiliateLink`
