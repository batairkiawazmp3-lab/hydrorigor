# Research packs

Scheduled content runs cannot always open web pages, so each pack holds what a run needs to
write a guide without browsing: the sources, the exact figures, and where in each source the
figure appears (the `locator`). Figures were read from the source on the date shown; quotes are
short and marked. A run may still browse to add more, but every number on a page must come
from a pack, a registered source in `src/data/editorial-sources/m06.ts`, or new reading.

How to use a pack:

1. Register each "new" source in `src/data/editorial-sources/m06.ts` with the id, title,
   publisher, URL and locator given here, `accessedDate` as listed, and
   the `sourceType` given (`university-extension` for extension publications,
   `university-research` for journal papers and theses).
2. Use only the figures listed. Where a pack says a source does not give a number, say so on
   the page instead of guessing.
3. New guides also need a `phase2ContentItems` entry in `src/data/content-manifest.ts`, the MDX
   file, a photo key in `src/data/photos.ts` and `npm run images:share` (see CLAUDE.md).

| Pack | Queue item | Route |
| --- | --- | --- |
| [hydroponic-tower-garden.md](hydroponic-tower-garden.md) | 7 (plan ID 59; published 2026-11-07) | `/systems/hydroponic-tower-garden/` |
| [hydroponic-basil.md](hydroponic-basil.md) | 10 (plan ID 41, new) | `/crops/hydroponic-basil/` |
| [kratky-hydroponics.md](kratky-hydroponics.md) | 17 (plan ID 28; published 2026-11-13) | `/systems/kratky-hydroponics/` |
| [hydroponic-ph-meter.md](hydroponic-ph-meter.md) | 18 (plan ID 66; published 2026-11-14) | `/best/hydroponic-ph-meter/` |
| [organic-hydroponic-nutrients.md](organic-hydroponic-nutrients.md) | 19 (rebuild) | `/nutrients-water/organic-hydroponic-nutrients/` |

Rebuilds of launch guides (indoor systems, NFT strawberries, lettuce systems, nutrient
solution) are covered by sources already registered; their packs are not needed.
