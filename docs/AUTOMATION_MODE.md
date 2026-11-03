# HydroRigor Automation Mode

## Goal

Minimize manual copy/paste while preserving approval gates for sensitive/external actions.

## Working model

Claude is the only agent (owner decision, 2026-11-03). Two scheduled tasks run it:

1. **Content run**, Monday and Thursday: takes the next open item in
   `.agent/state/CURRENT_MILESTONE.md`, ships it as one pull request following `CLAUDE.md`,
   merges when CI is green, verifies the live page and reports to the owner.
2. **Monthly SEO review**, 1st of the month: audits the live site and reorders the queue.

The owner can also ask Claude directly at any time; the same procedure applies.

## User involvement

The user should normally be needed only for:
- connecting apps/accounts;
- authorizing secrets;
- domain/DNS decisions;
- affiliate account actions;
- production launch approval;
- choices that materially change scope or budget.

## Deployment path

`origin/main -> branch -> GitHub pull request -> CI green -> squash merge to main -> Vercel deploys hydrorigor.com automatically`

The site is live (owner-approved, 2026-11-02). Do not pause production or disable Git deployments; see `AGENTS.md`.
