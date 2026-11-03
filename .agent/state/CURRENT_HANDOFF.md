# Current Handoff

Updated: 2026-11-03

## State

- Live: https://hydrorigor.com, deployed automatically by Vercel from `main`.
- `vercel.json`: Git deployments enabled; `ignoreCommand: "exit 1"` (always build).
- Vercel project: Standard Protection; auto-assign production domains on; project resumed.
  www.hydrorigor.com redirects (308) to hydrorigor.com.
- Search Console: verified; sitemap submitted; indexing requested for home and strawberry guide.
- Local checks pass: lint, astro check, 99 unit tests, data/commerce/content validators,
  build, search, links, security, production audit, 39 browser tests, local launch rehearsal.

## Open items for the owner

- Contact email: Vercel manages DNS but does not host mailboxes. Owner to pick a provider
  (free forwarding such as ImprovMX, or a mailbox such as Zoho Mail Lite) and create the
  account; Claude then adds the DNS records in Vercel (with approval) and turns on `/contact/`.
- Turn on Vercel Web Analytics and set `PUBLIC_ENABLE_VERCEL_ANALYTICS=true` (Production) in Vercel.
- CI Lighthouse steps have failed before when GitHub's Chrome version changed. If only those
  steps fail, re-run the job once and report it; do not weaken the budgets.

## Awaiting owner review

Guides published by automated runs under `HydroRigor Editorial`. When Najeeb has read one
and approves, switch its byline to `Najeeb`.

- (none yet)

## Next agent instruction

Follow `CLAUDE.md`: take the first open item in `.agent/state/CURRENT_MILESTONE.md`,
one pull request per item.
