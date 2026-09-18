# M07 Search Console preparation

Preparation only: no property, verification token, connection, sitemap
submission or indexing request exists as a result of M07.

The configured canonical origin is `https://hydrorigor.com/`. The static build
emits `/sitemap-index.xml`, referencing `/sitemap-0.xml`. There are 43 indexable
page URLs, including all 25 M06 production pages. The link validator also counts
the sitemap index's child-sitemap reference, for 44 sitemap locations total.

`robots.txt` allows ordinary pages, disallows the three development fixtures,
and advertises `https://hydrorigor.com/sitemap-index.xml`. Fixtures, search and
404 have `noindex, nofollow` and are excluded from the sitemap/Pagefind.
Robots exclusions alone are not access control. Fixtures remain directly
reachable for development checks, as accepted previously.

Indexable canonicals match their public routes. ID 24 remains
`/best/hydroponic-system-for-home-growers/`. `/best/best-hydroponic-system-for-home-growers/`
and `/nutrients/` return the real 404 with no canonical. Local serving checks
do not establish deployed edge behavior; recheck that after authorized launch.

## Future procedure, requiring M08 and service authorization

1. Verify the approved production site, HTTPS, redirects, canonical origin,
   robots and both sitemap files. Confirm previews cannot be indexed publicly.
2. The owner may choose a Domain property (`hydrorigor.com`, DNS verification)
   or URL-prefix property (`https://hydrorigor.com/`, with supported verification
   methods such as an HTML file or meta tag). Obtain separate DNS authorization
   before any DNS change. Use only the real owner-issued verification value.
3. Verify ownership in the approved property. Do not introduce analytics or
   another vendor just to verify ownership.
4. Open that property's Sitemaps report, enter the verified production
   `https://hydrorigor.com/sitemap-index.xml` URL and submit it.
5. Inspect processing results and representative URLs, including ID 24. Record
   excluded fixtures/search and any unexpected canonical/indexing findings.

Submission does not guarantee indexing. Sources reviewed 2026-09-16:
[property types](https://support.google.com/webmasters/answer/34592?hl=en),
[verification methods](https://support.google.com/webmasters/answer/9008080?hl=en),
[sitemap submission](https://support.google.com/webmasters/answer/7451001?hl=en).
