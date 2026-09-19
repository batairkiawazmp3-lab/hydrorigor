# M08 implementation report

IN_PROGRESS — repository preparation only; external human gates pending.
Baseline 53e80f5db2633d06d08ec4e3684820465bca7f8c verified before branching.
M07 history preserved; current state reconciled. Strategy read-only at
Build Milestones!A12:H12; no workbook modification.

Updated the M06 governance test's active-milestone assertions to the M08 transition
while retaining checks of M06's independent acceptance document. The original
M06/M07 acceptance files were not edited. Target validation has negative cases and
production Lighthouse has a regression test proving unchanged M07 budgets/matrix.

Created four milestone artifacts and five launch runbooks. Explicit Astro build
configuration and git.deploymentEnabled=false added without changing seven M07
headers. .vercel ignored to avoid future linkage metadata in Git.

test:production uses explicit canonical HTTPS target; test:launch starts its own
loopback preview and is labeled local rehearsal. Coverage: public routes/all 25
pages, canonical/OG/indexability, sitemap/robots, seven headers, zero editorial
JS, fixtures/404, calculator/search, console and tracker absence. Production
Lighthouse reuses M07 thresholds/routes. CI exercises local launch smoke.

Read-only authenticated Vercel context has no HydroRigor project/domain. Domain
quoted available at USD 11.25 for year one; RDAP 404 and DNS NXDOMAIN. Project
and purchase human gates pending. Provider default HSTS is documented as a
launch prerequisite conflict. No production request or deployment performed.

Current renewal quote also USD 11.25/year; taxes/checkout fees unknown. .com privacy
is supported but exact checkout inclusion unverified. Accessible team is Hobby;
owner must settle eligible hosting account/plan before launch. No paid upgrade.

No article/data/source/merchant changes, dependency migration, lower thresholds,
production env mutation, analytics/Search Console/HSTS activation, DNS, purchase,
deployment or final release tag. M09 remains unauthorized. See TEST_REPORT for
actual results; M08 independent audit has not occurred.
