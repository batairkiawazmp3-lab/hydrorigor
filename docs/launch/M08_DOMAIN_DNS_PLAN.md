# M08 domain and DNS plan

## Current reconciliation — 2026-10-11

HOSTING_DECISION = VERCEL_PRO_FINAL
DOMAIN_OWNERSHIP = COMPLETE
DOMAIN = hydrorigor.com
DOMAIN_PURCHASE_PRICE = USD 11.25
AUTO_RENEW = ON
DOMAIN_ATTACHED_TO_PROJECT = YES
PRODUCTION_DEPLOYMENT = NOT_YET_AUTHORIZED
ANALYTICS = DISABLED
SEARCH_CONSOLE = NOT_CONNECTED
CUSTOM_HSTS = NOT_AUTHORIZED
M09 = NOT_STARTED / NOT_AUTHORIZED

Owner completed the Pro upgrade, domain purchase and Production attachment.
Purchase price USD 11.25, renewal shown USD 11.25/year and estimated checkout tax
USD 0.00 are owner-reported purchase facts, not a newly retrieved invoice.
No external mutation was performed by Codex during this reconciliation.

Authenticated read-only API verifies Pro on team_1vAKWbbo2FshNGErHHmrMzBM
(batairkiawazmp3-9310s-projects); project hydrorigor,
prj_Lbm21h2zFAWCHMMwaRsh7KsHD9ee. GitHub batairkiawazmp3-lab/hydrorigor,
main, Astro, Node 24.x, npm ci, npm run build, dist all match.
PUBLIC_ENABLE_VERCEL_ANALYTICS=false covers production/preview/development;
webAnalytics and analytics are null. Deployment count = 0.

Domain API verifies correct team, boughtAt 2026-10-11T12:58:06Z, renew=true,
and verified=true. Project domains are hydrorigor.com and hydrorigor.vercel.app;
no www, no redirect. Apex has gitBranch=null/customEnvironmentId=null (default
Production binding), corroborating the owner's Production-screen observation.
Nameservers and intended nameservers both ns1.vercel-dns.com/ns2.vercel-dns.com;
nsVerifiedAt 2026-10-11T13:22:16.930Z. Domain config: misconfigured=false,
conflicts=[], configuredBy=A, observed A values 216.150.16.1/216.150.16.193.
These are observations, not instructions to alter DNS. Global propagation is not
proven by one provider observation. Certificate cert_SBYwhW1HuxtDUrI2VoLXJ7QG
covers hydrorigor.com, autoRenew=true, created 2026-10-11T13:04:08.500Z,
expires 2027-01-09T12:05:35Z. Actual served chain/HTTPS remains post-deploy evidence.

Canonical remains https://hydrorigor.com/. Adding www and a permanent apex redirect
is recommended as a separate Gate B/C approval, not implemented or needed for an
apex-only first launch. No Search Console connection/submission or custom HSTS.
Provider default HSTS max-age=63072000 is expected and is not itself a failure
or custom-policy approval. Record real headers after deployment; do not configure
includeSubDomains/preload. M08 remains IN_PROGRESS and not independently accepted.

## Remaining domain gate

Owner purchase/attachment is complete. No additional DNS change is proposed.
Do not add www automatically. Optional separate approval: add www.hydrorigor.com
to this project as a permanent 308 redirect to https://hydrorigor.com, preserving
path/query; obtain the provider-specific DNS requirement before changing any record.
Keep apex attached to Production, with no apex-to-www redirect. Preserve ownership,
auto-renew, MX/TXT/CAA/NS and verification records. Existing M08-prefixed runbooks
are retained rather than creating duplicate unprefixed files.

## Historical pre-purchase planning (superseded where noted above)

# M08 domain and DNS plan

State: HUMAN_GATE_DOMAIN_PURCHASE_REQUIRED /
AWAITING_OWNER_APPROVAL_GATE_B_DOMAIN_DNS. Nothing executed.

## Verified read-only

2026-09-19 Asia/Karachi: Vercel Domains availability check reports hydrorigor.com
available at USD 11.25 for one year. Registry RDAP endpoint
https://rdap.verisign.com/com/v1/domain/hydrorigor.com returned HTTP 404. Apex NS/A
queries returned NXDOMAIN. Accessible Vercel account has zero domains.
This supports availability at observation time, not future availability or user
ownership. Provider: Vercel Domains; no existing registrar ownership established.

Authenticated read-only GET /v1/registrar/domains/hydrorigor.com/price returned
years=1, purchasePrice=11.25, renewalPrice=11.25, transferPrice=11.25. Combined
with the availability tool's currency, the current first-year and renewal quote
is USD 11.25 each. This is not a permanent price guarantee. Taxes/checkout fees
were not returned, so the all-in total is unknown. Vercel's .com table marks
WHOIS privacy supported; whether it is enabled/included at no extra charge in
this exact checkout remains unverified. Domains auto-renew by default and need
a valid payment method; owner must approve the renewal setting and review the
renewal/expiry date. Privately provide registration/billing information, confirm
provider/account/final total. No purchase attempted or refund assumed.

## Planned records — values not yet available

Canonical origin: https://hydrorigor.com/. If approved/connected, www permanently
redirects to apex preserving path/query. No wildcard or retired-path redirects.

| Name | Type | Exact value source | Gate |
| --- | --- | --- | --- |
| @ | A | Approved project's current Domain Settings | B |
| www (optional) | CNAME | Project-specific Vercel target | B plus C alias/redirect |
| Provider-specified verification name | TXT | Actual Vercel ownership challenge if needed | B |
| @ | TXT | Actual Google Domain-property verification token | E plus B for exact record |
| @ | NS | No delegation change proposed | Separate B approval if needed |
| @ | AAAA | None proposed | Only if current provider explicitly requires it |

Do not substitute historical generic IP/CNAME values. After approved setup,
present exact names/values/TTLs and before/after diff for DNS approval. Preserve
MX/SPF/DKIM/DMARC, unrelated TXT, CAA and ownership verification. If CAA blocks
certificates, request a narrow change, not deletion. Purchasing via Vercel may
bundle DNS/delegation; inspect bundled effects and obtain approval before checkout.

Snapshot registrar/authoritative NS/affected records/TTLs. After approved edits,
read authoritative and recursive DNS, record propagation/certificate state and
verify HTTPS. Roll back only authorized affected values from snapshot; do not
blindly remove verification TXT, transfer ownership, or redirect to a guessed
baseline URL. First launch has no existing production fallback.

Sources: [quote](https://vercel.com/domains/search?q=hydrorigor.com),
[project DNS](https://vercel.com/docs/domains/working-with-domains/add-a-domain),
[A record guidance](https://vercel.com/kb/guide/a-record-and-caa-with-vercel),
[renewals](https://vercel.com/docs/domains/working-with-domains/renew-a-domain),
[privacy support](https://vercel.com/docs/domains/supported-domains).

## Owner purchase handoff — refreshed 2026-09-24

Authenticated Vercel registrar GET availability returned available=true; price
returned years=1, purchasePrice=11.25, renewalPrice=11.25 (USD). Availability
and quote are time-sensitive. Taxes/checkout fees and exact privacy inclusion
remain unverified; no checkout or purchase attempted. Owner will purchase personally.
No automated purchase, domain connection or DNS action is approved.

Vercel uses sponsoring registrars Name.com/Tucows; exact registrar is not yet
identified. For team registrations, the Team Owner is the designated registrant.
Accurate contact details and timely verification are required. Auto-renewal charges
and future renewal prices apply; failed renewal can lose the registration and
redemption may cost extra. Owner must review final checkout and renewal terms.
[Registration terms](https://vercel.com/legal/domain-name-registration-and-services-terms).
