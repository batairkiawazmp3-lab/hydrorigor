# Current Handoff

Updated: 2026-11-07

## State

- Live: https://hydrorigor.com, deployed automatically by Vercel from `main`.
- `vercel.json`: Git deployments enabled; `ignoreCommand: "exit 1"` (always build).
- Vercel project: Standard Protection; auto-assign production domains on; project resumed.
  www.hydrorigor.com redirects (308) to hydrorigor.com.
- Search Console: verified; sitemap submitted; indexing requested for home and strawberry guide.
- Local checks pass: lint, astro check, 99 unit tests, data/commerce/content validators,
  build, search, links, security, production audit, 39 browser tests, local launch rehearsal.

## Open items for the owner

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
- Pinterest: business account "HydroRigor" created by the owner (2026-11-05); website claim tag
  is in `src/components/seo/SEO.astro` (keep it). Owner uploads pins with Settings → Bulk
  create Pins using a CSV (Title, Media URL `https://hydrorigor.com/pins/<route>.jpg`,
  Pinterest board, Thumbnail, Description, Link, Publish date YYYY-MM-DD, Keywords). New guides
  need a pin row too; dates in the past are rejected.
- Author profiles: send real LinkedIn / organisation URLs to add as `sameAs` in `src/data/authors.ts`.
- Search Console: Claude reads it in the owner's Chrome (Claude extension, Google account
  authuser=0, property `sc-domain:hydrorigor.com`). A daily scheduled check (13:55 PKT) logs figures in
  `docs/research/search-console/log.md` against `2026-11-05-baseline.md`; it only runs while
  the owner's computer and Chrome are on.
- OpenRush has no credits; the monthly SEO review uses Ubersuggest (10 live SERP refreshes/month).

## Awaiting owner review

Guides published by automated runs under `HydroRigor Editorial`. When Najeeb has read one
and approves, switch its byline to `Najeeb`.

- `/systems/hydroponic-tower-garden/` — "Hydroponic Tower Garden: How It Works, Crops & DIY Build" (new guide, 2026-11-07). Sources: Oklahoma State HLA-6724 and HLA-6722, UF/IFAS St. Lucie County, Touliatos et al. 2016, Wortman et al. 2016, Kentucky CCD-CP-63, Arizona strawberry irrigation, Oregon State EM 9455/9457, UF/IFAS HS1488. Photo reuses the registry tower photo; an owner photo of a real tower would be better.
- `/systems/deep-water-culture-hydroponics/` — "Deep Water Culture Hydroponics: DWC Setup, Oxygen & pH" (2026-11-07). Sources: Oregon State EM 9455, Virginia Tech SPES-466, UF/IFAS HS1422 and Volusia DWC bucket, University of Kentucky CCD-CP-63, University of Illinois Extension, Cornell CEA lettuce handbook, Oklahoma State HLA-6722, Kratky Acta Hort 843, Missouri G6986. Note: the sources give three dissolved oxygen targets (5, 6–8 and 7–10 ppm); the page shows all three and recommends Virginia Tech's 7–10 ppm. Web fetching was unavailable in this unattended run, so every figure comes from sources already registered and used on other guides; no new sources were added.
- `/nutrients-water/hydroponic-nutrients-for-tomatoes/` — "Hydroponic Nutrients for Tomatoes: EC, pH & Feeding by Stage" (2026-11-06). Sources: UF/IFAS HS796 (Hochmuth), University of Tennessee W 844-C, Ohio State HYG-1437, Penn State nutrient programs, Oklahoma State HLA-6722, Kentucky CCD-TA-01, Mississippi State tomato FAQs (pH, fertilizer, blossom-end rot), UF/IFAS Volusia DWC bucket. Note: the sources give different EC and pH ranges; the page shows them all and recommends the Tennessee EC (2.0–3.0 mS/cm) and UF/IFAS pH (5.8–6.2).
- `/systems/diy-hydroponic-system-for-beginners/` — "DIY Hydroponic System for Beginners: 3 Builds, Step by Step" (2026-11-06). Sources: UF/IFAS HS1488 and Volusia County DWC bucket, Kratky Acta Hort 843, University of Illinois Extension "Hydroponics at Home", Oregon State EM 9455/9456/9457, Virginia Tech SPES-466, Oklahoma State HLA-6442. Note: no source gives a home timer schedule for Dutch buckets; the page says so.
- `/best/hydroponic-system-for-home-growers/` — "Best Hydroponic System for Home Growers: DWC, NFT or Drip?" (2026-11-06). Sources: UF/IFAS HS1488 (Kratky) and HS1422, Kratky Acta Hort 843, Virginia Tech SPES-466 trial, Oregon State Hydro hints EM 9453/9455/9456/9457/9458, Oklahoma State HLA-6442. Note: Virginia Tech yields are one trial at one site; the page says so.
- `/crops/hydroponic-lettuce-seeds/` — "Hydroponic Lettuce Seeds: Varieties, Germination & Storage" (2026-11-05). Sources: Kentucky CCD-CP-63, UF/IFAS HS1258/HS1422 and thermodormancy, Ohio State e-GRO tipburn trial, Cornell CEA handbook, Nebraska G2090, Illinois and SDSU seed storage. Note: extension sources disagree on lettuce seed life (2, 5 and 6 years); the page shows all three.

## Next agent instruction

Follow `CLAUDE.md`: take the first open item in `.agent/state/CURRENT_MILESTONE.md`,
one pull request per item.
