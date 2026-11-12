# Affiliate readiness audit, 2026-11-12

Owner request (2026-11-12): make HydroRigor final for an affiliate website. Measured against the
network-ready milestone in `GROWTH_PLAN_2026-11.md` and the reviewer criteria it records (network
help pages read 2026-11-06). Links stay off until the owner confirms an approved programme.

## Scorecard

| Area | Status | Notes |
| --- | --- | --- |
| Commercial plumbing | Ready | Merchant and destination registries, `AffiliateLink` (`rel="sponsored nofollow"`), page-level disclosure notice, validators that fail closed. Adding a programme is data entry, not new code. |
| Disclosure page | Ready (this change) | Rewritten in plain English: current status (no links), how links will be marked, what money never decides, Amazon's required statement ready to switch on. |
| Disclosure notice on pages | Ready (this change) | Plain FTC-style wording: commission, no extra cost, never changes the recommendation. |
| Privacy policy | Ready | States no affiliate links today and that it is updated before any start; covers Vercel Analytics, Kit, ImprovMX. Update the "Affiliate links" section when the first programme goes live. |
| About and identity | Mostly ready | Founder, credential and editorial process stated. Owner photo and full name are the owner's choice. |
| Contact | Ready | hello@hydrorigor.com forwards to the owner. |
| Content depth | Not yet | 14 full guides of 27. 13 short launch guides still to rebuild; 2 of 15 new Phase 2 guides published. Milestone: all 25 launch guides rebuilt and 15+ new guides (40+ full guides). |
| Buyer paths | Partly | 14 full guides link to a `/best/` page; 7 lack a "what to buy" parts list by specification (added next). |
| Search history | Building | Search Console from 2026-11-01: 6 clicks, 280 impressions (Nov 1–9). Networks want 2–3 months of growth: mid-January 2027. |
| First-hand evidence | Missing (owner) | No photos of a real HydroRigor grow yet. The strongest single signal for reviewers and readers. |
| Payment route | Owner | Payoneer in the owner's name (Awin pays through Payoneer; Amazon via a Payoneer USD account entered as US direct deposit). |

## Order of applications (unchanged from the growth plan)

1. Payoneer (owner, now).
2. Awin and FlexOffers or Impact for Gardyn at the milestone (target: content done second half of
   December 2026, apply mid-January 2027).
3. Amazon Associates US once Google clicks are steady: the account is closed unless it makes 3
   qualifying sales within 180 days, and a rejected application is not reassessed.

## Done in code (this change)

- Plain-English affiliate disclosure page and in-page notice.
- This audit; handoff updated.

## Next in code

- "What to buy" parts lists by specification on the 7 full guides that lack one, each item tied to a
  figure already sourced on that page, linking to the matching `/best/` page.
- Continue the queue: 13 launch-guide rebuilds, then new guides.

## When a programme approves HydroRigor

1. Owner shares the programme name and approved terms (never credentials).
2. Add the merchant to `src/data/merchants/index.ts` and destinations with `lastVerified` dates.
3. Set `affiliateDisclosure` and destinations on the pages that link; the notice appears automatically.
4. Name the programme on `/affiliate-disclosure/` (for Amazon, its required statement) and update the
   privacy policy's "Affiliate links" section first.
5. Start with the pages that already get clicks (Search Console).
