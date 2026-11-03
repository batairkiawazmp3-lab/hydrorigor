# HydroRigor

**Evidence-based hydroponics for home growers.**

This repository is the single HydroRigor website project.

## Authoritative locations

- Local working copy: `D:\hydrorigor`
- Remote: `batairkiawazmp3-lab/hydrorigor`
- Master strategy: `docs/reference/HydroRigor_Master_Strategy.xlsx`
- Current milestone: `.agent/state/CURRENT_MILESTONE.md`
- Current handoff: `.agent/state/CURRENT_HANDOFF.md`
- Agent rules: `AGENTS.md`
- Automation workflow: `docs/AUTOMATION_MODE.md`

## Build stack

- Astro 7.3.x
- Node.js 24 LTS
- TypeScript strict
- Tailwind CSS 4.3
- Static-first architecture
- Vercel target deployment

## Current status

**Live at https://hydrorigor.com** since 2026-11-02 (owner-approved). M01–M08 are
accepted; M09 (content upgrade and scale) is active. Merging a green pull request into
`main` deploys automatically through Vercel. See `AGENTS.md` for the rules every agent
follows and `.agent/state/CURRENT_MILESTONE.md` for current priorities.

## Local validation

```powershell
npm.cmd ci
npm.cmd run lint
npm.cmd run check
npm.cmd test
npm.cmd run test:data
npm.cmd run test:commerce
npm.cmd run test:content
npm.cmd run build
npm.cmd run test:search
npm.cmd run test:links
npm.cmd run test:security
npm.cmd run audit:prod
npx.cmd playwright install chromium
npm.cmd run test:e2e
npm.cmd run test:a11y
npm.cmd run test:lighthouse
```

M07 uses Chromium, axe WCAG A/AA scans and three default-mobile Lighthouse
samples per route. See `milestones/M07/TEST_REPORT.md` for actual results and
`docs/research/M07_QUALITY_BASELINE.md` for performance measurements. Generated
browser and Lighthouse reports are ignored. Analytics is prepared but disabled
by default; Search Console preparation is documented without connection.

`npm run test:launch` runs a local launch-smoke rehearsal. To check the live site, set
`PRODUCTION_BASE_URL=https://hydrorigor.com/` and run `npm run test:production`.
Vercel Git deployments are enabled: every merge to `main` deploys to production.
