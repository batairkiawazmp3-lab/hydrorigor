# M07 accessibility evidence

2026-09-16: `npm run test:a11y` passed 17/17 tests using pinned
`@axe-core/playwright` 4.13.0 with Playwright 1.63.0 Chromium. Scans select
WCAG 2 A/AA, 2.1 A/AA and 2.2 AA tags. No rule exclusions or violations were waived.

## Route coverage

- `/`
- `/start/`
- `/systems/`
- `/systems/indoor-hydroponic-systems-for-home/`
- `/nutrients-water/hydroponic-nutrients/`
- `/best/hydroponic-system-for-home-growers/`
- `/crops/hydroponic-strawberries/`
- `/reviews/masterblend-hydroponic-nutrients/`
- `/tools/ph-ec-targets/`
- `/tools/nutrient-mixing-calculator/`
- `/search/`
- `/testing-methodology/`
- `/affiliate-disclosure/`

Four additional scenarios cover expanded mobile navigation, populated and
empty search results, calculator error/success states, and skip-link focus.
The skip link must be visible after Tab, have an outline at least 3px wide,
and move actual keyboard focus to `main-content` on Enter. Main has tabindex -1
so it accepts this focus without adding a normal tab stop. Functional tests
also open native navigation with Enter and verify labeled calculator inputs
and announced status, including the independent 10 L × 2 mL/L = 20 mL answer.

Earlier M07 scans exposed real contrast failures: an unlayered anchor rule
overrode Tailwind colors, and the dark hero needed a lighter accent token.
The anchor override was removed and white/leaf-bright tokens made explicit.
Accepted article prose and data were not rewritten.

These are automated browser/axe findings, not a complete accessibility
certification or a screen-reader user study. Lighthouse accessibility results
are separately recorded with the performance matrix.
