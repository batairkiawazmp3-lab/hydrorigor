# Current Handoff

Updated: 2026-11-10

## State

- Live: https://hydrorigor.com, deployed automatically by Vercel from `main`.
- `vercel.json`: Git deployments enabled; `ignoreCommand: "exit 1"` (always build).
- Vercel project: Standard Protection; auto-assign production domains on; project resumed.
  www.hydrorigor.com redirects (308) to hydrorigor.com.
- Search Console: verified; sitemap submitted; indexing requested for home and strawberry guide.
- Local checks pass: lint, astro check, 99 unit tests, data/commerce/content validators,
  build, search, links, security, production audit, 39 browser tests, local launch rehearsal.

## Open items for the owner

- Email newsletter (Kit, form 10159921, set up by the owner 2026-11-08): the sign-up card on the
  home page and at the end of every guide posts straight to Kit (no Kit script; CSP
  `form-action` allows https://app.kit.com only). Owner: (1) once live, sign up once with your
  own address to confirm Kit receives it and the confirm email arrives; (2) to email subscribers
  when guides go up, point Kit's RSS-to-email feature at https://hydrorigor.com/rss.xml (rebuilt
  guides appear as new items); (3) optionally edit Kit's confirmation email and the form name.
  The privacy policy has an "Email newsletter" section; update it if Kit settings change.
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
  is in `src/components/seo/SEO.astro` (keep it). **To upload (owner):** Pinterest → Create →
  Bulk create Pins → upload `docs/marketing/pinterest/pins-2026-11-11.csv` (12 Pins, one a day
  Nov 11–22; boards are created automatically). Dates in the past are rejected, so if it is
  uploaded after Nov 11, ask Claude to regenerate it with a later `--start`. Short launch guides
  get a Pin when rebuilt (`node scripts/pinterest-csv.mjs --only <route>`).
- Bing Webmaster Tools (owner, about 5 minutes): sign in at bing.com/webmasters and choose
  "Import from Google Search Console" so the site and sitemap are verified without DNS changes.
  IndexNow submissions already run after every deploy (`.github/workflows/indexnow.yml`).
- Author profiles: send real LinkedIn / organisation URLs to add as `sameAs` in `src/data/authors.ts`.
- Search Console: Claude reads it in the owner's Chrome (Claude extension, Google account
  authuser=0, property `sc-domain:hydrorigor.com`). A daily scheduled check (13:55 PKT) logs figures in
  `docs/research/search-console/log.md` against `2026-11-05-baseline.md`; it only runs while
  the owner's computer and Chrome are on.
- OpenRush has no credits; the monthly SEO review uses Ubersuggest (10 live SERP refreshes/month).

## Awaiting owner review

Guides published by automated runs under `HydroRigor Editorial`. When Najeeb has read one
and approves, switch its byline to `Najeeb`.

None at the moment (all approved by the owner on 2026-11-10).

## Next agent instruction

Follow `CLAUDE.md`: take the first open item in `.agent/state/CURRENT_MILESTONE.md`,
one pull request per item.
