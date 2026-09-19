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

M01 through M07 are accepted and merged. M07 — Quality & Observability was
squash-merged through PR #7 at `53e80f5db2633d06d08ec4e3684820465bca7f8c`;
post-merge quality and governance passed. M08 — Production Launch is IN_PROGRESS,
authorized with human launch gates. Repository preparation is permitted;
production mutations require separate owner approval. M09 remains NOT_STARTED /
NOT_AUTHORIZED. See [M08 production runbook](docs/launch/M08_PRODUCTION_RUNBOOK.md).

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

No production deployment is authorized by setup alone.

M08 adds `npm run test:launch` for a local launch-smoke rehearsal. After approved
deployment, set `PRODUCTION_BASE_URL=https://hydrorigor.com/` and run
`npm run test:production` and `npm run test:lighthouse:production`. Local results
are not production evidence. Automatic Vercel Git deployments are disabled in
repository configuration; project linking and manual deployment remain gated.
