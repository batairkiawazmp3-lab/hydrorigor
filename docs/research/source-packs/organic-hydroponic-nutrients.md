# Pack: organic hydroponic nutrients (launch guide rebuild)

- Route: `/nutrients-water/organic-hydroponic-nutrients/` (launch guide; keep the route and intent)
- Search: "organic hydroponic nutrients" 390 / 18 (Ubersuggest, US, 2026-11-06)
- Intent: can you grow hydroponically with organic nutrients, what goes wrong, and how to make
  it work at home. Recommend clearly: organic hydroponics works but yields less unless the
  solution is managed for microbes, oxygen, calcium and magnesium.

## Sources

| id | Status | Title | Publisher | URL | sourceType | Accessed |
| --- | --- | --- | --- | --- | --- | --- |
| `liu-organic-nft-lettuce-2025` | new | Intermittent Flow Alleviated Root Zone Stress and Increased Organic Lettuce Yield in Nutrient Film Technique | HortScience 60(7):1208–1217 (Liu, Masabni, Niu; Texas A&M AgriLife Research, 2025), doi 10.21273/HORTSCI18623-25 | https://journals.ashs.org/downloadpdf/view/journals/hortsci/60/7/article-p1208.pdf | university-research | 2026-11-07 |
| `wortman-vertical-strawberry-2016` | registered | Cultivar, growing media, and nutrient source influence strawberry yield in a vertical, hydroponic, high tunnel system | HortTechnology 26(4) | — | — | — |

Check the current launch guide's own sources too (`src/data/m06-content.ts`, ID for this
route) and keep any that still support the text.

## Figures and locators

**Liu, Masabni and Niu 2025 (HortScience)**
- Abstract: "Organic lettuce production often yields less than conventional hydroponics."
- Organic lettuce fresh weight rose 71% when the no-flow period increased from 0 to 105 minutes
  (intermittent flow in NFT).
- Best organic treatment (15 min on / 105 min off) reached 40.3% of the inorganic (Hoagland)
  shoot fresh weight; continuous organic flow reached 23.5%. (Inorganic reference: one NFT
  system, two replicates.)
- Organic solutions had high ammonium (91–214 mg/L) and nitrite (43–103 mg/L) versus about
  1 mg/L each in the inorganic solution; the authors cite nitrite as low as 5 mg/L as able to
  harm lettuce. High ammonium and nitrite likely contributed to the lower yield.
- Biofilm formed in organic reservoirs and channels and coated roots most under continuous
  flow; authors suggest it competes with roots for oxygen.
- Adding a commercial microbial inoculant (TerraBella, 3.13 mL/L) did not help and reduced
  growth versus non-inoculated intermittent flow.
- The organic fertilizer supplied only about 3.18 mg/L each of calcium and magnesium; authors
  cite literature recommending 200–300 mg/L Ca and 30–50 mg/L Mg and advise supplementing.
- Shoot calcium 0.29% organic versus 1.23% inorganic; magnesium 0.17% versus 0.35%.
- Recommendations: intermittent flow with longer off periods; aerate solutions; consider
  biofilters (as in aquaponics); supplement Ca and Mg. Weekly pH setpoint 6.5 in the study.
- Intermittent flow also saved pump energy.

**Wortman et al. 2016 (strawberries, vertical towers)**
- An organic nutrient source gave about 15% lower strawberry yield than synthetic fertilizer;
  the authors note organic hydroponic production appears feasible on nutrient source alone.

## Gaps (say so on the page)

- No pack source gives EC targets specific to organic solutions (the HortScience paper's EC
  values are only in a supplemental figure). Say EC reads differently in organic solutions and
  rises over the cycle in this study, without a number.
- No source here tests home DWC or Kratky with organic nutrients; do not claim results for them.
- Product names: none; no brand claims.

## Suggested visuals

1. Bar chart: organic lettuce yield as % of inorganic by flow scheme (23.5% continuous,
   32.0% 15/45, 40.3% 15/105) from Liu et al. 2025.
2. Diagram of why organic solutions struggle: microbes convert organic N, ammonium and nitrite
   build up, biofilm uses oxygen, Ca and Mg run short; fixes beside each.

## Internal links

`/nutrients-water/hydroponic-nutrients/`, `/nutrients-water/how-to-mix-hydroponic-nutrients/`,
`/nutrients-water/hydroponic-nutrient-solution/`, `/crops/hydroponic-lettuce/`,
`/systems/hydroponic-tower-garden/`, `/tools/ph-ec-targets/`.
