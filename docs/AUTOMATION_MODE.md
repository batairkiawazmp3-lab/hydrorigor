# HydroRigor Automation Mode

## Goal

Minimize manual copy/paste while preserving approval gates for sensitive/external actions.

## Working model

1. ChatGPT approves a milestone.
2. Codex opens `D:\hydrorigor` and runs the instructions in `.agent/prompts/codex-auto.md`.
3. Codex implements, tests, fixes, and records the milestone.
4. GitHub CI confirms the branch when GitHub access is connected.
5. ChatGPT audits repository + CI reality.
6. The next milestone is activated only after acceptance.

## User involvement

The user should normally be needed only for:
- connecting apps/accounts;
- authorizing secrets;
- domain/DNS decisions;
- affiliate account actions;
- production launch approval;
- choices that materially change scope or budget.

## Deployment path

`D:\hydrorigor -> branch -> GitHub pull request -> CI green -> squash merge to main -> Vercel deploys hydrorigor.com automatically`

The site is live (owner-approved, 2026-11-02). Do not pause production or disable Git deployments; see `AGENTS.md`.
