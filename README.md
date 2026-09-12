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

M01 — Foundation, M02 — Content Engine & SEO, M03 — Core Information
Architecture, M04 — Data & Tools, and M05 — Affiliate & Reviews are accepted.
M05's accepted implementation is associated with pull request #5. M06 and
later milestones are not started and not authorized.

## Local validation

```powershell
npm.cmd ci
npm.cmd run lint
npm.cmd run check
npm.cmd test
npm.cmd run test:data
npm.cmd run test:commerce
npm.cmd run build
npm.cmd run test:search
```

No production deployment is authorized by setup alone.
