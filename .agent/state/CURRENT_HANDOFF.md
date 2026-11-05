# Current Handoff

Updated: 2026-11-05

## State

- Live: https://hydrorigor.com, deployed automatically by Vercel from `main`.
- `vercel.json`: Git deployments enabled; `ignoreCommand: "exit 1"` (always build).
- Vercel project: Standard Protection; auto-assign production domains on; project resumed.
  www.hydrorigor.com redirects (308) to hydrorigor.com.
- Search Console: verified; sitemap submitted; indexing requested for home and strawberry guide.
- Local checks pass: lint, astro check, 99 unit tests, data/commerce/content validators,
  build, search, links, security, production audit, 39 browser tests, local launch rehearsal.

## Open items for the owner

- Owner photos: a shot list of 10 home-setup photos and an author photo were requested; when
  they arrive, crop to 1600x900, add to `src/data/photos.ts`, and prefer them over stock.
- CI Lighthouse steps have failed before when GitHub's Chrome version changed. If only those
  steps fail, re-run the job once and report it; do not weaken the budgets.
- Backlinks (the site has none yet, per Ubersuggest 2026-11-03): link to HydroRigor from the
  owner's foundation site bio; create a Pinterest business account and post the ready-made
  1000x1500 pins (one per guide at `https://hydrorigor.com/pins/<route>.jpg`, linking to the
  guide); answer r/Hydroponics questions where a guide genuinely helps.
- Author profiles: send real LinkedIn / organisation URLs to add as `sameAs` in `src/data/authors.ts`.
- Search Console: Claude needs Chrome with the Claude extension open to read indexing data.
- OpenRush has no credits; the monthly SEO review uses Ubersuggest (10 live SERP refreshes/month).

## Awaiting owner review

Guides published by automated runs under `HydroRigor Editorial`. When Najeeb has read one
and approves, switch its byline to `Najeeb`.

- `/crops/hydroponic-lettuce-seeds/` — "Hydroponic Lettuce Seeds: Varieties, Germination & Storage" (2026-11-05). Sources: Kentucky CCD-CP-63, UF/IFAS HS1258/HS1422 and thermodormancy, Ohio State e-GRO tipburn trial, Cornell CEA handbook, Nebraska G2090, Illinois and SDSU seed storage. Note: extension sources disagree on lettuce seed life (2, 5 and 6 years); the page shows all three.

## Next agent instruction

Follow `CLAUDE.md`: take the first open item in `.agent/state/CURRENT_MILESTONE.md`,
one pull request per item.
