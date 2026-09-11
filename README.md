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

M01 — Foundation and M02 — Content Engine & SEO are accepted and merged into
`main`. M03 — Core Information Architecture is implemented and CI-validated on
`m03-information-architecture`, pending independent ChatGPT audit. M04 and later
milestones are not authorized.

## Local validation

```powershell
npm.cmd ci
npm.cmd run lint
npm.cmd run check
npm.cmd test
npm.cmd run build
npm.cmd run test:search
```

No production deployment is authorized by setup alone.
