# M04 Source Ledger — pH & EC Reference

Last verified: 2026-09-11

## Scope and method

M04 stores only pH and electrical-conductivity values that were checked against
live university sources. pH is dimensionless. EC is displayed in `mS/cm` and
every included source reports its values directly in that unit; no ppm/TDS
conversion is used. A single-value publication is stored with equal minimum and
maximum values rather than expanded into an invented range.

The reference intentionally keeps multiple records when source scope or values
differ. It does not average sources into a synthetic “best” target.

## Sources used

### `okstate-hla-6722`

[Electrical Conductivity and pH Guide for Hydroponics](https://extension.okstate.edu/fact-sheets/electrical-conductivity-and-ph-guide-for-hydroponics),
Oklahoma State University Extension, HLA-6722, Bruce Dunn and Hardeep Singh,
published April 2017.

- Locator: Table 2, “Optimum range of electrical conductivity (EC) and pH
  values for hydroponic crops.”
- Supports the general hydroponic records for lettuce, basil, strawberry,
  tomato, and pepper.
- Scope limit: the table does not give a cultivar, growth stage, climate, water
  source, or system for each row. HydroRigor labels these records “general
  hydroponic crop reference” and does not infer missing context.

### `uf-ifas-hs1422`

[Growing Lettuce in Small Hydroponic Systems](https://ask.ifas.ufl.edu/publication/HS1422),
University of Florida IFAS Extension, Germán V. Sandoya, Jonael Bosques,
Francisco P. Rivera Meléndez, and E. Vanessa Vassilaros.

- Locator: “Specific Considerations” → plant nutrition → EC/pH bullet.
- Supports one lettuce record for small residential or at-home hydroponic
  settings: pH 6.0–7.0 and EC 1.4–1.8 mS/cm.
- Scope limit: the publication discusses several small systems and does not tie
  the range to one cultivar or growth stage.

### `virginia-tech-spes-466`

[Hydroponic Production of Edible Crops: System and Crop Comparisons](https://www.pubs.ext.vt.edu/content/dam/pubs_ext_vt_edu/spes/spes-466/SPES-466.pdf),
Virginia Cooperative Extension, VCE-466NP (2023), Toni Sperry, Amber Vallotton,
Chris Mullins, Joyce Latimer, and Holly Scoggins.

- Locator: pages 5–6, “System Control Parameters” → “Nutrients.”
- Supports mature tomato and pepper trial-setting records: pH 6.5 and EC
  2.0–2.5 mS/cm after the seedling stage.
- Trial context: Dutch buckets, NFT used for comparison, and media bags in
  Virginia Tech/Virginia State work.
- Critical scope limit: the publication says it is not intended to provide exact
  crop/system parameters. HydroRigor therefore presents these as reported trial
  settings, never as universal recommendations.

## Differences preserved

- **Lettuce:** Oklahoma State reports EC 1.2–1.8 mS/cm; UF/IFAS reports
  1.4–1.8 mS/cm for small systems. Both report pH 6.0–7.0. HydroRigor keeps two
  records rather than selecting or averaging the lower bound.
- **Tomato:** Oklahoma State's general table reports EC 2.0–4.0 mS/cm and pH
  6.0–6.5. The Virginia mature-plant trials used EC 2.0–2.5 mS/cm and pH 6.5.
  Both records remain separately labeled.
- **Pepper:** Oklahoma State's general table reports EC 0.8–1.8 mS/cm and pH
  5.5–6.0. The Virginia mature-plant trials used EC 2.0–2.5 mS/cm and pH 6.5.
  This material difference is not averaged or hidden; context is required when
  reading either record.
- **Strawberry:** Oklahoma State reports EC 1.8–2.2 mS/cm and the single pH
  value 6.0. The data preserves pH 6.0 as a point, not an invented interval.

## Evidence reviewed but excluded

[University of Illinois Extension's 2023 day-neutral strawberry observations](https://extension.illinois.edu/blogs/commercial-fruit-and-vegetable-growers/2023-10-27-hydroponic-day-neutral-strawberry)
report operation around EC 1.8 mS/cm and pH 6.6, but explicitly say the shared
fertigation setup was observational and most crops were not under ideal
parameters. Those numbers are not included as a target record.

## Data decisions and limitations

- The dataset covers five crops in eight context-specific records.
- No scientific names, temperature, light, yield, fertilizer recipe, or dosing
  recommendation is added because M04 did not source those fields for this tool.
- These are published reference values, not guarantees. Cultivar, stage,
  climate, production system, source-water EC/alkalinity, meter calibration, and
  methodology can change appropriate operating decisions.
- Source access is recorded in `src/data/sources/`; every target resolves to at
  least one source ID and automated validation rejects orphan references.
