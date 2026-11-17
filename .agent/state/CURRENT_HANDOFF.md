# Current Handoff

Updated: 2026-11-17

## State

- Live: https://hydrorigor.com, deployed automatically by Vercel from `main`.
- `vercel.json`: Git deployments enabled; `ignoreCommand: "exit 1"` (always build).
- Vercel project: Standard Protection; auto-assign production domains on; project resumed.
  www.hydrorigor.com redirects (308) to hydrorigor.com.
- Search Console: verified; sitemap submitted; indexing requested for home and strawberry guide.
- Local checks pass: lint, astro check, 99 unit tests, data/commerce/content validators,
  build, search, links, security, production audit, 39 browser tests, local launch rehearsal.

## Open items for the owner

- **GitHub Actions blocked (2026-11-13):** CI jobs on PR #66 were not started: "recent account
  payments have failed or your spending limit needs to be increased" (GitHub Billing & plans).
  Until billing is fixed no PR can go green, so Claude leaves PRs open instead of merging.
  PR #66 (Search Console log + 4 internal links) passed every local check and is waiting.
- Email newsletter (Kit, form 10159921, set up by the owner 2026-11-08): the sign-up card on the
  home page and at the end of every guide posts straight to Kit (no Kit script; CSP
  `form-action` allows https://app.kit.com only). Owner: (1) once live, sign up once with your
  own address to confirm Kit receives it and the confirm email arrives; (2) to email subscribers
  when guides go up, point Kit's RSS-to-email feature at https://hydrorigor.com/rss.xml (rebuilt
  guides appear as new items); (3) optionally edit Kit's confirmation email and the form name.
  The privacy policy has an "Email newsletter" section; update it if Kit settings change.
- Affiliate readiness (2026-11-12, `docs/research/AFFILIATE_READINESS_2026-11-12.md`): commercial
  plumbing, disclosure page and privacy policy are ready; content depth (14 of 40+ full guides),
  search history (until mid-January 2027), real grow photos and a Payoneer account are what remain.
  Owner: photos of a real grow, Payoneer, and the choice of showing the full name on About.
- Growth plan (2026-11-06, `docs/research/GROWTH_PLAN_2026-11.md`): the Ascend application for
  True Leaf Market was denied on 2026-11-06. Do not reapply to strict networks until the
  network-ready milestone in the plan is met (target mid-January 2027). Owner parts of it:
  real grow photos, credentials (and full name, if he chooses) on the About page, a Payoneer
  account in his own name for network payouts, and approval to run content on weekdays instead
  of twice a week. Programme order in the plan: Awin and FlexOffers at the milestone, Amazon
  Associates when Google clicks are steady, Impact/CJ later; skip Skimlinks and Ascend direct
  (PayPal-only for Pakistan-based publishers).
- Competitor analysis (2026-11-07, `docs/research/COMPETITORS_2026-11.md`): niche sites earn through
  Gardyn (Impact or FlexOffers; sign-up at mygardyn.com/affiliate-sign-up/), Amazon and brand
  programmes. A short video or photos of a real HydroRigor grow would add the experience signal no
  competitor page proves.
- Owner photos: a shot list of 10 home-setup photos and an author photo were requested; when
  they arrive, crop to 1600x900, add to `src/data/photos.ts`, and prefer them over stock.
  Best route (2026-11-05 plan): one real home grow (Kratky or small DWC with lettuce or basil),
  photographed weekly, gives the site genuine first-hand photos and the only honest basis for
  "we grew it" or product-review content.
- Earning plan (2026-11-05; owner decisions, nothing enabled yet):
  - Affiliate: owner applies to programmes that fit the guides, e.g. True Leaf Market (seeds,
    kits; reported 15%, 30-day cookie), Click & Grow (reported 10%, 30 days), GrowAce (reported
    10%, 60 days), Gardyn (Impact; rate not published), Amazon Associates (needs 3 qualifying
    sales within 180 days of joining; check Pakistan payout options in Associates Central).
    Rates are third-party reports; confirm in each programme's terms. Links stay off until the
    owner confirms an approved programme (guardrail).
  - Display ads: not before about 1,000 monthly sessions (Journey by Mediavine's reported entry
    point; Raptive 25,000 pageviews with 50% US/UK/CA/AU/NZ traffic; AdSense has no minimum but
    pays least). Any ad network needs a CSP change and will press on the Lighthouse budgets, so
    it needs an explicit owner decision on those budgets first; do not change them unasked.
- CI Lighthouse steps have failed before when GitHub's Chrome version changed. If only those
  steps fail, re-run the job once and report it; do not weaken the budgets.
- Backlinks (the site has none yet, per Ubersuggest 2026-11-03): link to HydroRigor from the
  owner's foundation site bio; answer r/Hydroponics questions where a guide genuinely helps.
- Pinterest: business account "HydroRigor" (hydrorigor); website claim tag is in
  `src/components/seo/SEO.astro` (keep it). State on 2026-11-14: 25 launch-guide Pins published on
  four boards (Hydroponic Systems & DIY Builds, Hydroponic Nutrients & pH, Hydroponic Tomatoes,
  Hydroponic Lettuce & Greens). Claude uploaded `docs/marketing/pinterest/pins-2026-11-16.csv`
  through Bulk create Pins at the owner's request: 15 Pins, one a day 2026-11-16 to 2026-11-30
  (4 new guides and 11 rebuilt guides with new titles). Do not upload that file or the older
  per-guide files again. For later guides: `node scripts/pinterest-csv.mjs --only <route> --start <date after 2026-11-30>`
  and list the file here; dates in the past are rejected.
- Bing Webmaster Tools (owner, about 5 minutes): sign in at bing.com/webmasters and choose
  "Import from Google Search Console" so the site and sitemap are verified without DNS changes.
  IndexNow submissions already run after every deploy (`.github/workflows/indexnow.yml`).
- Author profiles: send real LinkedIn / organisation URLs to add as `sameAs` in `src/data/authors.ts`.
- Search Console: Claude reads it in the owner's Chrome (Claude extension, Google account
  authuser=0, property `sc-domain:hydrorigor.com`). A daily scheduled check (13:55 PKT) logs figures in
  `docs/research/search-console/log.md` against `2026-11-05-baseline.md`; it only runs while
  the owner's computer and Chrome are on.
- OpenRush has no credits; the monthly SEO review uses Ubersuggest (10 live SERP refreshes/month).

## Owner-approved bylines

- `/systems/smart-indoor-hydroponic-systems/` — byline switched to Najeeb on 2026-11-15 at the owner's request (Pinterest row `docs/marketing/pinterest/pins-smart-indoor-systems-2026-12-03.csv` still to upload by Dec 3).
- `/best/indoor-hydroponic-system-kits/` — "Indoor Hydroponic System Kits: What's Included & What to Add" (rebuild, 2026-11-16, PR #85); byline switched to Najeeb on 2026-11-16 after the owner approved it (Pinterest row `docs/marketing/pinterest/pins-indoor-kits-2026-12-07.csv` still to upload by Dec 7).
- `/best/hydroponic-nutrients-for-home-growers/` — "Best Hydroponic Nutrients: How to Choose by Crop & Type" (rebuild, 2026-11-17, PR #87); byline switched to Najeeb on 2026-11-17 after the owner approved it (Pinterest row `docs/marketing/pinterest/pins-best-nutrients-2026-12-08.csv` still to upload by Dec 8).

## Awaiting owner review

Guides published by automated runs under `HydroRigor Editorial`. When Najeeb has read one
and approves, switch its byline to `Najeeb`.

- `/reviews/general-hydroponics-nutrients/` — "General Hydroponics Nutrients: Flora Feed Chart, EC & pH" (rebuild, 2026-11-17; Pinterest row `docs/marketing/pinterest/pins-gh-flora-2026-12-09.csv`, upload by Dec 9). Direct answer (Micro first, then Gro, then Bloom; Light feed 1.8 mL/gal each for seedlings; pH 5.5–6.5; change every 7–10 days; below 75 °F), KeyTargets card, what is in each bottle (5-0-1, 2-1-6, 0-5-4; FloraBloom has no nitrogen), a mixing-order conflict between two GH pages shown and resolved, a which-chart-row-for-your-crop table (rows matched by HydroRigor to Oklahoma State EC ranges, labelled as such), the University of Nevada, Reno Flora float-culture study (300–500 ppm similar; 1200 vs 400 ppm bigger heads), a 5-gallon lettuce batch with labelled arithmetic, source conflicts (solution change, cucumber pH, tomato EC, hardwater trigger), format comparison with Masterblend, troubleshooting and FAQ; two new diagrams (mixing order; EC by week). New sources read 2026-11-17: GH basic feedcharts PDF, GH feedchart usage guide, FloraMicro, FloraGro and FloraBloom product pages, UNR study (Ferguson, Saliga and Omaye 2014). Evidence basis stays manufacturer-spec-only (no hands-on use). No price, rating or shop link. Photo kept (cutting in water).
- `/nutrients-water/hydroponic-nutrients-for-vegetables/` — "Hydroponic Nutrients for Vegetables: EC & pH by Crop" (rebuild, 2026-11-16; Pinterest row `docs/marketing/pinterest/pins-nutrients-vegetables-2026-12-06.csv`, upload by Dec 6). Direct answer (complete nutrient, EC by crop, pH 6.0 sits inside every Oklahoma State crop range), crop EC/pH table, leafy versus fruiting crops, what "complete" means, a which-crops-can-share-a-tank table (overlaps worked out from HLA-6722 Table 2, labelled as HydroRigor's), feeding by stage (Tennessee, Kentucky), source-water limits (Missouri), mixing and management steps, troubleshooting, source conflicts (pepper, strawberry, lettuce pH, tomato EC) and FAQ; two new charts (EC by crop; pH by crop). Written from registered sources only: web fetches were not approved in this run, so no new sources were added; kale and Swiss chard have no figure because no source gives one.
- `/nutrients-water/powder-vs-liquid-hydroponic-nutrients/` — "Powder vs Liquid Hydroponic Nutrients: Mixing, Storage & EC" (rebuild, 2026-11-16; Pinterest row `docs/marketing/pinterest/pins-powder-vs-liquid-2026-12-05.csv`, upload by Dec 5). Direct answer (same plant response at the same nutrient rate, Mississippi State P1466; liquid for one small reservoir, powder for 5 gal+ with a 0.1 g scale), KeyTargets card, quick-answer table, format comparison table, why liquids hold less nutrient (potash about 11% in solution; Penn State solubility), weighing-error table and chart (labelled arithmetic from Masterblend's 1.5 g/gal Epsom rate), dissolving (Purdue warm water versus Oklahoma State/UF/IFAS root-zone temperature shown as a conflict), separate parts for both formats, making your own two-tank stocks (Penn State, Purdue, Ohio State), ten steps, troubleshooting and FAQ; two new diagrams (decision card; scale error). New sources read 2026-11-16: Mississippi State Extension P1466 Fluid Fertilizers (a field-crop publication; the page says so) and Purdue Vegetable Crops Hotline mixing tips (Langenhoven, 2017). The General Hydroponics, Masterblend, Kentucky jar-test and Yara pages could not be opened in this run (fetch permission timed out), so liquid label rates in mL, guaranteed analyses and dry-storage humidity figures are not on the page; no shelf life or cost-per-gallon figure is given because no source states one. Photo kept (water pouring into a glass).
- `/nutrients-water/how-to-mix-hydroponic-nutrients/` — "How to Mix Hydroponic Nutrients: Order, Rates & EC Check" (rebuild, 2026-11-15; Pinterest row `docs/marketing/pinterest/pins-how-to-mix-2026-12-04.csv`, upload by Dec 4). Direct answer (water first, one part at a time, calcium last or in its own tank, EC then pH), quick-answer table, six-step order, three ways to make a solution (Penn State), Masterblend per-gallon rate table with liters and labelled 5-gallon arithmetic, two-tank 100X stock example (Ohio State HYG-1437 Table 4), source-water limits, Oklahoma State EC and pH correction steps, ten-step batch, troubleshooting and FAQ; three new diagrams (mixing order; two stock tanks; EC by crop). Sources re-read 2026-11-15 and locators extended: Penn State programs page (verbatim check), Oklahoma State HLA-6722, Ohio State HYG-1437, Masterblend instructions, General Hydroponics FloraSeries mixing notes (order only; its stage feed charts were not used). Conflicts shown: lettuce pH (Oklahoma State 6.0–7.0 vs Kentucky 5.5–6.0), lettuce EC (UF/IFAS 1.2–1.8 vs Purdue 1.3), tomato EC (Oklahoma State 2.0–4.0 vs Tennessee 2.0–3.0), solution temperature, replacement interval. No ppm-scale conversion is given because no registered source states one. Photo kept (measuring beaker).


- `/nutrients-water/organic-hydroponic-nutrients/` — "Organic Hydroponic Nutrients: Yields, Problems & Fixes" (rebuild, 2026-11-15; Pinterest row `docs/marketing/pinterest/pins-organic-nutrients-2026-12-02.csv`, upload by Dec 2). Direct answer with yields versus mineral nutrients from three trials (Dutch bucket lettuce about 90–91%, tower strawberries about 15% less, NFT lettuce 23.5–40.3%), the four causes (ammonium and nitrite, biofilm and oxygen, calcium and magnesium shortfall, inoculant did not help) and fixes, comparison table, nine-step setup, troubleshooting and FAQ; two new diagrams (yield chart; problems and fixes). New sources: Alneyadi et al. 2024 (the Penn State-listed study, now with figures read from the open-access PDF on 2026-11-15; the 91%/90% are labelled arithmetic), Liu et al. 2025 HortScience (from the research pack), Purdue HO-309-W. Gaps stated on the page: no organic-specific EC target, no trial of organic nutrients in DWC or Kratky, no brand comparison. A 2022 Ninth Circuit ruling upholding USDA organic certification of hydroponic operations was found (Food Dive, 2022-09-23) but left out because it is not a university source; add it if Najeeb wants a news citation. Photo kept (seedling roots in hand).
- `/crops/hydroponic-tomato-seeds/` — "Hydroponic Tomato Seeds: Best Varieties & How to Start Them" (rebuild, 2026-11-14; Pinterest row `docs/marketing/pinterest/pins-tomato-seeds-2026-12-01.csv`, upload by Dec 1). Seed chosen by mature size (micro-dwarf, compact, determinate, indeterminate), University of Florida micro-dwarf trial table, packet codes, seed-starting steps and timeline; two new sources (UF/IFAS HS987, HortScience 2000).
- `/best/hydroponic-ph-meter/` — "pH Meter for Hydroponics: How to Choose & Calibrate" (new guide, plan ID 66, 2026-11-14). Written from the research pack only (web fetches were not available in this run): feature checklist, two-point calibration with pH 7.01 and 4.01, calibration frequency, storage, troubleshooting; no products or current prices; gaps stated (no accuracy or probe-life figures in the sources). Reuses the measuring-beaker photo until a pH meter photo exists.
- `/systems/kratky-hydroponics/` — "Kratky Hydroponics: No-Pump Setup, Air Gap & Crops" (new guide, plan ID 28, 2026-11-13). Written from the research pack: no pump, 1–2 gal of solution per lettuce plant (UF/IFAS 1–1.5; Kratky VC-1 1.5–2), EC 1.5 and pH 5.5–6.5, pot bottom ½–1 in in the solution, no topping up (emergency ½–1 in only), harvest 4–6 weeks after transplanting; a "where the sources differ" table; two new diagrams (air gap over time; solution per plant). Two new sources registered (Kratky VC-1, 2010; Kratky, Acta Hort. 648, 2004), figures taken from the pack (read 2026-11-07), not re-read in this run. Gaps stated on the page: no Kratky figures for basil or herbs, no tomato volumes. Photo: registry lettuce in net pots (no Kratky bucket photo yet). Linked from five guides. Opened while GitHub Actions was blocked by the account billing problem, so it is unmerged until CI can run.
- `/nutrients-water/hydroponic-nutrient-solution/` — "Hydroponic Nutrient Solution: ppm, EC, pH & When to Change" (rebuild, 2026-11-13). Direct answer with pH, EC by crop, solution temperature, dissolved oxygen and replacement interval; KeyTargets card; tables for the UF/IFAS tomato formula in ppm by stage, three ways to make a solution (Penn State), EC and pH by crop and stage, source water, temperature and oxygen, top-up versus replace; step-by-step batch, troubleshooting and FAQ; two new diagrams (upkeep cycle; reservoir temperature and oxygen). Source conflicts shown and resolved: strawberry EC (Oklahoma State 1.8–2.2 vs Arizona 1.0 or less; page follows Arizona), lettuce pH (Kentucky 5.5–6.0 vs Oklahoma State 6.0–7.0; page suggests 5.5–6.0), solution temperature (Oklahoma State 72–75 °F, UF/IFAS 65–80 °F, Sato's cited 13–18 °C), replacement interval (Tennessee 1–2 weeks, Oklahoma State about 2, Kentucky 3–4 for lettuce; UF basil trial found topping up matched replacing). Web pages could not be opened in this run (fetch permission timed out), so every figure comes from 16 registered sources; the Missouri, Oklahoma State, Penn State locators were extended with figures already used on the live nutrients guide. Photo kept (lab glassware).

- `/crops/hydroponic-lettuce-systems/` — "Hydroponic Lettuce Systems: NFT vs DWC vs Kratky Compared" (rebuild, 2026-11-12). Answer by number of plants (Kratky 1–3, DWC raft for a tray, NFT for rows), system comparison table, NFT numbers (slope, flow, length, heat and oxygen along the run) for "nutrient film hydroponic system", DLI-versus-yield table, step-by-step, troubleshooting and FAQ; two new diagrams (three-system cross-section; NFT channel numbers). Source conflicts shown and resolved on the page: NFT slope (Purdue 1:100 vs Oregon State 2% minimum; page suggests 2%), DWC oxygen (VT 7–10, Kentucky 6–8, UF/IFAS 5), lettuce DLI (Kentucky 12–17, Purdue 15–20, VT 17+), root-zone temperature (Sato's cited 13–18 °C vs UF/IFAS 65–80 °F). No source gives a home NFT plant spacing; the page says so. Web pages could not be opened in this run (fetch permission timed out), so every figure comes from 17 registered sources. Photo kept.

- `/best/hydroponic-systems-for-beginners/` (rebuilt 2026-11-12): Kratky-first answer, systems ranked by
  what happens when something goes wrong, buy-or-build table, first-grow timeline, 10 sources.

- `/best/hydroponic-systems-for-sale/` — "Hydroponic Systems for Sale: 9 Checks Before You Buy" (rebuild, 2026-11-11). Nine buyer checks (system type by crop, power-cut behavior, light as DLI from PPFD, real capacity, reservoir size, extras not in the box, electricity from watts, convenience claims, buying used), a step-by-step, troubleshooting and FAQ, with two new diagrams (three listing checks; in the box versus extras). No products, sellers or current prices. New sources, taken from the pH-meter research pack (read 2026-11-07): UMass Extension pH/EC pens (Cox, 2016), Michigan State Extension meter calibration (Wollaeger, 2016) and Purdue OFA Bulletin 917 (Camberato and Lopez, 2009). Reused: Oregon State EM 9453/9455–9458, UF/IFAS HS1488 and HS1422, Kentucky CCD-CP-63, Purdue HO-283-W, Oklahoma State HLA-6722/6724, Tennessee W 844-C, Illinois, Virginia Tech SPES-466, Touliatos et al. 2016, Missouri, UGA, UNH. Notes: (1) web pages could not be opened in this run (fetch permission timed out), so every figure comes from registered sources or the pack; (2) the only prices are dated and labelled (UMass 2016 meter pens $50–60, combo about $80; Oklahoma State 2021 tower around $500 or more); (3) no source here gives a disinfectant strength for cleaning a used system or a meter accuracy figure, and the page says so; (4) the electricity and capacity examples are labelled arithmetic. Photo kept (registry tower under pink LEDs).

## Next agent instruction

Follow `CLAUDE.md`: take the first open item in `.agent/state/CURRENT_MILESTONE.md`,
one pull request per item.
