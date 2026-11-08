# CLAUDE.md — how Claude runs HydroRigor

HydroRigor (https://hydrorigor.com) is an evidence-based indoor hydroponics site owned by
Najeeb (MSc in Environmental Sciences). Claude is the only agent working on it. Read
`AGENTS.md` for the standing rules; this file is the run procedure. If the two ever
disagree, `AGENTS.md` wins.

## Every run, in order

1. **Sync.** `git fetch origin main` and branch from `origin/main`
   (`git checkout -B <topic> origin/main`). One topic per branch and pull request.
2. **Read state.** `.agent/state/CURRENT_MILESTONE.md` (the queue) and
   `.agent/state/CURRENT_HANDOFF.md` (open owner items). Take the first unchecked
   queue item that is not blocked on the owner.
3. **Do the work** to the content standard below.
4. **Check locally** (all must pass before you push):
   `npm run lint && npm run check && npm test && npm run test:data && npm run test:commerce && npm run test:content && npm run build && npm run test:search && npm run test:links && npm run test:security && npm run test:launch && npm run test:e2e && npm run test:a11y && npm run test:lighthouse`
   Lighthouse budgets are blocking (performance >= 0.95, accessibility 1, LCP <= 2.5 s,
   CLS <= 0.1, TBT <= 200 ms). Never loosen a budget, skip a test or mark a step
   `continue-on-error` to get green.
5. **Ship.** Commit, push, open a PR with `gh api repos/batairkiawazmp3-lab/hydrorigor/pulls -X POST ...`
   (GraphQL is blocked; use REST). Wait for CI (`commits/<sha>/check-runs`, about 9 minutes).
   If every check is green, squash-merge (`pulls/<n>/merge -X PUT -f merge_method=squash`).
   The owner has approved merging green PRs; Vercel deploys `main` automatically.
   If a CI-only Lighthouse step fails but the same budgets pass locally, re-run the job once;
   if it fails again, leave the PR open and report it.
6. **Verify live.** Fetch the changed URL on https://hydrorigor.com and confirm the new
   content is served.
7. **Update state.** Tick the queue item in `CURRENT_MILESTONE.md`, note anything the owner
   must do in `CURRENT_HANDOFF.md`, and include those edits in the same PR when possible.
8. **Report** in a few lines: what shipped (URL), checks, anything blocked, and the next item.

## Content standard (rewrites and new guides)

- **Research packs:** before researching a queue item, check `docs/research/source-packs/` for
  a pack on its route. A pack lists verified sources, figures and locators, so a run without
  web access can still write the page; every number must come from a pack, a registered
  source or new reading. When a run has web access and the next items lack packs, adding a
  pack for a later item is good use of spare time.
- **Beat the competitors' gaps** (`docs/research/COMPETITORS_2026-11.md`): give the numbers
  top-ranking pages skip (EC by stage, dissolved oxygen, spacing, pump timing, DLI), show
  source conflicts instead of printing two numbers without comment, and never claim testing.
- Lead with a direct answer and the numbers searchers want (pH, EC, temperature, light,
  spacing, days to harvest), each tied to a named university, extension or peer-reviewed
  source that is listed on the page and registered in `src/data/editorial-sources/m06.ts`
  (with a `locator` saying where in the source the figure is).
- 1,800–2,500 words for primary guides: quick-answer box, tables, an original SVG diagram in
  `public/images/guides/` (presentation attributes only, no inline `style`), step-by-step
  setup, troubleshooting table, FAQ, and 4+ internal links to related guides and tools.
- Right after the intro, show the key numbers with the `KeyTargets` component
  (`src/components/content/KeyTargets.astro`, usage in its header comment). Every value in it
  must appear in the page's quick-answer table with a listed source.
- Add a photo, diagram or table every two or three sections so no stretch reads as a wall of text.
- Titles: `<Topic>: <the specifics searchers want>`, 60 characters or fewer, e.g.
  "Hydroponic Basil: pH, EC, Light & Harvest Guide". Avoid generic "Complete Guide" titles.
  Change the title in both the MDX frontmatter and `src/data/m06-content.ts`.
- Descriptions: 155 characters or fewer, leading with the answer and its numbers.
- Write plainly for home growers. Recommend clearly and say what each recommendation rests on.
- Never invent testing, personal experience, prices, ratings, affiliate terms, search volumes
  or crop targets. If a source does not give a number, say so instead of guessing.
- Byline: `author: "Najeeb"` only on pages Najeeb has reviewed. Automated rewrites ship as
  `HydroRigor Editorial`; list them under "awaiting owner review" in the handoff so he can
  approve the byline change.
- Set `updatedDate` to the day you ship. Keep the route, title intent and canonical URL.
- The word "sample" trips the fixture check; avoid it.
- When a section's first guide is published, remove its path from `EMPTY_SECTION_PATHS`.

## Photos

- Every guide and section has a photo in `src/data/photos.ts` (`guidePhotoKeys`,
  `sectionPhotoKeys`); `tests/photos.test.mjs` enforces it.
- Only free-license Unsplash photos (never Unsplash+, never `plus.unsplash.com`), saved as
  1600x900 JPEG crops in `src/assets/photos/` and credited with photographer name and
  username. Alt text describes what is actually visible. Do not use photos of identifiable
  public figures or product packaging with brand names.
- Unsplash search pages are behind a bot check; do not bypass it. When a new photo is needed
  and no browser is available, reuse a suitable registry photo and note the gap.
- Share images and Pinterest pins (`public/og/`, `public/pins/`) carry each guide's title.
  After adding a guide, changing a title or changing a guide's photo, run
  `npm run images:share` and commit the regenerated files; `tests/share-images.test.mjs`
  fails when they are missing or stale.

### Images that earn their place (policy, 2026-11-05)

Stock photos set the mood; original visuals answer the search. Every rebuilt or new guide gets:
- **At least two original visuals made for that page's intent**, as SVG in
  `public/images/guides/` with a descriptive file name: a how-to gets a step diagram, a system
  guide a labelled cross-section, a numbers guide a chart or target card, a problem guide a
  symptom-identification illustration. Each sits next to the text it explains, has a caption,
  and alt text that states the information, not just "diagram". Every number in a visual must
  appear in the page's sourced text.
- **Draw for phones** (2026-11-08). A phone's article column is about 380 px wide, so a
  960-wide canvas shrinks 14-unit labels to about 5 px. Use a `viewBox` no wider than 720 with
  labels of 20 or more (at least 10.5 px on a phone; `tests/guide-media.test.mjs` enforces it for
  every diagram not on its legacy list), keep labels to a few words, put detail in the caption,
  and prefer tall layouts to wide ones. Write each diagram as `![alt](/images/guides/<file>.svg)`
  followed by an italic caption paragraph: the build (`src/lib/guide-media.ts`) turns it into a
  figure that opens full size on tap. Tables of three or more columns become cards on phones
  automatically, so keep header cells short (they become the card labels).
- **No AI-generated photorealistic images** of plants, roots, setups, products, harvests or
  symptoms, and never an illustration presented as a photo. Fake-looking images cost trust on an
  evidence site (John Mueller, Google, Dec 2023), and readers judge plant health from pictures.
- **Stock photos** (free Unsplash) only as hero and atmosphere. Prefer home-scale setups over
  commercial greenhouses when choosing or replacing one.
- **Owner photos** of real HydroRigor grows replace stock as soon as they exist (credit
  "Photo: Najeeb"); they are the strongest trust and experience signal the site can show.
- **Product images** in buyer guides only from a merchant's approved assets after its affiliate
  programme is approved (for Amazon, only images served through Amazon's own tools).

## Guardrails

- The site is live. Do not pause or roll back production, change domains or DNS, edit Vercel
  settings, add `noindex` to published guides, or rename/delete published URLs unless the
  owner asks in the current conversation.
- Do not add affiliate links or merchants until the owner confirms an approved programme.
- Do not touch `.github/workflows/ci.yml` budgets or gates.
- Never put credentials, tokens or the owner's personal email in the repo or in requests.
- The 25 launch guides in `src/data/m06-content.ts` stay at exactly 25 entries (their titles
  and sources may be updated).
  New guides (plan IDs 26–100, listed with proposed routes in
  `docs/research/PHASE2_CONTENT_PLAN.md`) go in `phase2ContentItems` in
  `src/data/content-manifest.ts`: add the entry, the MDX file in the matching collection, its
  photo key, and remove its section from `EMPTY_SECTION_PATHS` if it is the first guide there.
  `tests/content-manifest.test.mjs` and `npm run test:content` enforce this.
