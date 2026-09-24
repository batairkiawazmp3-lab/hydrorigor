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
