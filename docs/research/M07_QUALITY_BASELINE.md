# M07 quality baseline and recovery evidence

Recovered 2026-09-16 from the interrupted task. Existing reports were preserved,
not rerun. The first collection is the pre-font-removal M07 working build,
not a proven untouched M06 checkout. It already contained M07 accessibility
and security changes. A strict accepted-M06 before-optimization baseline was
not found. That evidence gap must not be described as completed acceptance.

## Preserved 2026-09-14 measurements

Each row selects LHCI’s representative run from three captures. Both historical
collections used 4x CPU / slow-4G but a custom 360px viewport. The 08 UTC
collection predates font removal; the 13 UTC collection follows font removal.
They are diagnostic history, not the corrected default-profile final gate.
All rows had accessibility 100 and CLS 0; SEO was 100 except noindex search (66).

| UTC collection | Route | Performance | LCP ms | TBT ms |
|---|---|---:|---:|---:|
| 2026-09-14T08 | / | 93 | 1628 | 284 |
| 2026-09-14T08 | /crops/hydroponic-strawberries/ | 96 | 1536 | 219 |
| 2026-09-14T08 | /reviews/masterblend-hydroponic-nutrients/ | 98 | 1526 | 144 |
| 2026-09-14T08 | /search/ | 100 | 1534 | 0 |
| 2026-09-14T08 | /start/ | 93 | 1537 | 306 |
| 2026-09-14T08 | /systems/ | 98 | 1533 | 159 |
| 2026-09-14T08 | /testing-methodology/ | 100 | 1527 | 0 |
| 2026-09-14T08 | /tools/nutrient-mixing-calculator/ | 98 | 1527 | 130 |
| 2026-09-14T08 | /tools/ph-ec-targets/ | 91 | 1528 | 370 |
| 2026-09-14T13 | / | 86 | 1043 | 563 |
| 2026-09-14T13 | /crops/hydroponic-strawberries/ | 83 | 999 | 696 |
| 2026-09-14T13 | /reviews/masterblend-hydroponic-nutrients/ | 90 | 1044 | 426 |
| 2026-09-14T13 | /search/ | 93 | 1141 | 319 |
| 2026-09-14T13 | /start/ | 93 | 928 | 320 |
| 2026-09-14T13 | /systems/ | 75 | 1083 | 717 |
| 2026-09-14T13 | /testing-methodology/ | 94 | 880 | 289 |
| 2026-09-14T13 | /tools/nutrient-mixing-calculator/ | 98 | 1098 | 156 |
| 2026-09-14T13 | /tools/ph-ec-targets/ | 85 | 1029 | 582 |

Font removal reduced measured LCP but did not resolve TBT. No causal claim
that host scheduling alone explains the failures is established. The proposed
1.2x CPU edit was reverted before collecting acceptance results because the
authorization requires default mobile. The restored default profile is slow-4G,
4x CPU and the bundled Lighthouse mobile viewport (412 × 823, DPR 1.75).

## Responsiveness scope

TBT <=200 ms is the lab proxy. Real-user INP <200 ms remains the production
field target, is not measured preproduction and is not proven by these reports.
No production deployment or field instrumentation was enabled.

## Corrected matrix

The final configuration tests 12 routes × 3 samples, adding the required systems,
nutrients and ID 24 buyer articles that the earlier nine-route matrix omitted.
Assertions use per-metric medians consistently; this avoids the bundled LHCI
category handling falling back to a best-sample result for `median-run`.
Thresholds remain Performance >=95, Accessibility/SEO 100, LCP <=2500 ms,
CLS <=0.1 and TBT <=200 ms. Search intentionally excludes only SEO.

## Launcher correction

The previous custom Windows launcher bypassed the `chrome-launcher` defaults
used by Lighthouse. Those defaults disable background renderer/timer
throttling, occlusion handling and unrelated Chrome background activity.
Recovery now imports `Launcher.defaultFlags()` from the launcher's pinned
Lighthouse dependency. The manually managed temporary profile remains, to
avoid the observed Windows cleanup error, and its browser is closed after
all reports land so LHCI's local server can finish. No page content, CPU
multiplier, mobile viewport or budget was changed by this correction.

A partial default-profile run without those flags is preserved separately.
Its homepage median was Performance 86 / TBT 560 ms. It is not used as final
acceptance evidence. The corrected matrix will be appended after collection.

## Final M07 matrix — PASS

Collected 2026-09-16 after the launcher correction. All 36 reports / 12 routes
completed; LHCI assertion-results is empty (no failures). The table uses the
same per-metric medians as the configured assertions. Lighthouse 12.6.1,
Chrome 152, default mobile slow-4G / 4x CPU / 412 × 823 viewport.

| Route | Samples | Performance | Accessibility | SEO | LCP ms | CLS | TBT ms |
|---|---:|---:|---:|---:|---:|---:|---:|
| / | 3 | 100 | 100 | 100 | 1212 | 0.0000 | 26.0 |
| /start/ | 3 | 100 | 100 | 100 | 1118 | 0.0000 | 23.0 |
| /systems/ | 3 | 100 | 100 | 100 | 1132 | 0.0000 | 14.0 |
| /systems/indoor-hydroponic-systems-for-home/ | 3 | 100 | 100 | 100 | 1152 | 0.0000 | 26.5 |
| /nutrients-water/hydroponic-nutrients/ | 3 | 100 | 100 | 100 | 1104 | 0.0000 | 39.0 |
| /best/hydroponic-system-for-home-growers/ | 3 | 100 | 100 | 100 | 1172 | 0.0000 | 27.5 |
| /crops/hydroponic-strawberries/ | 3 | 100 | 100 | 100 | 1060 | 0.0000 | 29.0 |
| /reviews/masterblend-hydroponic-nutrients/ | 3 | 100 | 100 | 100 | 1232 | 0.0000 | 36.5 |
| /tools/ph-ec-targets/ | 3 | 100 | 100 | 100 | 1150 | 0.0000 | 29.5 |
| /tools/nutrient-mixing-calculator/ | 3 | 100 | 100 | 100 | 1148 | 0.0000 | 37.0 |
| /search/ | 3 | 100 | 100 | 66 | 1165 | 0.0000 | 0.0 |
| /testing-methodology/ | 3 | 100 | 100 | 100 | 1077 | 0.0000 | 15.0 |

Search SEO 66 is expected for its intentional noindex state and is not asserted.
All 11 indexable routes meet SEO 100. All 12 routes meet every other locked
budget. This is local lab evidence only, not deployed CWV or field INP.
