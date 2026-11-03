# AGENTS.md — HydroRigor Agent Rules

## Current status (owner-approved, 2026-11-02)

HydroRigor is **live** at https://hydrorigor.com. M08 (launch) is accepted by the
owner; M09 (content upgrade and scale) is active. Merging a green pull request
into `main` deploys automatically through Vercel and is the normal way to ship.

The site is live, so do not do any of the following unless the owner explicitly
asks in the current task: pause the Vercel project, roll back production, remove a
production domain, set `git.deploymentEnabled: false` or remove `ignoreCommand`
in `vercel.json`, add `noindex` to published guides, or delete/rename published URLs.

The October 2026 M08 launch-validation process (production Lighthouse windows,
pinned-browser staged validation, request-file triggers) is retired; its history
is archived in `milestones/M08/`. Do not reopen it.

## Operating model

Claude is the only agent on HydroRigor (owner decision, 2026-11-03; Codex and the
ChatGPT supervisor stage are retired). Claude plans, researches, writes, builds, tests,
opens pull requests and merges them when CI is green. The step-by-step run procedure is
in `CLAUDE.md`.

Two scheduled tasks run Claude without the owner present:

- **Content run** (Monday and Thursday): ships the next item in
  `.agent/state/CURRENT_MILESTONE.md` as one pull request, merges it when every check is
  green, verifies it live and reports.
- **Monthly SEO review** (1st of the month): audits the live site, checks rankings and
  keyword data where a connected tool allows, and reorders the queue.

## Normal flow

`QUEUE ITEM -> BRANCH -> IMPLEMENT + LOCAL CHECKS -> PR -> GITHUB CI -> SQUASH MERGE -> VERIFY LIVE -> UPDATE STATE`

## Source of truth

Repository (authoritative): `batairkiawazmp3-lab/hydrorigor`, branch `main`.
The owner's local copy at `D:\hydrorigor` is optional; always branch from `origin/main`.

Strategy source:

`docs/reference/HydroRigor_Master_Strategy.xlsx`

## Scope discipline

Claude must:
1. read `.agent/state/CURRENT_MILESTONE.md`;
2. read the active milestone specification;
3. work only inside that milestone;
4. run required validation;
5. fix milestone-relevant failures automatically where safe;
6. update reports/handoff;
7. stop before an action that requires explicit user approval.

## Safe autonomous actions

Within an approved milestone, Claude may without repeated approval:
- create/edit/delete project files that are inside milestone scope;
- install declared project dependencies;
- run local development servers;
- run lint/typecheck/tests/build;
- fix implementation/test failures;
- create Git branches/commits, open pull requests and fix CI;
- squash-merge a pull request once every CI check is green (owner-approved, 2026-11-02);
- download free-license Unsplash photos for the site (owner-approved, 2026-11-03).

## Actions requiring explicit user approval

- domain purchase or registration;
- DNS modification;
- pausing, rolling back, or disabling deployment of production (merging a green PR to `main` does not need extra approval);
- paid service purchase;
- affiliate-account authorization/change;
- API keys, tokens, or secrets not already provisioned for the project;
- destructive deletion of important user data;
- major architecture change outside the approved specification.

## Content standard for new and rewritten guides

- Answer the searcher's question near the top, including the numbers they look for
  (pH, EC, temperature, light, spacing), each tied to a named source listed in the page
  and registered in `src/data/editorial-sources/`.
- Give clear, reasoned recommendations and say what each one is based on.
- Primary guides: roughly 1,800–2,500 words, with tables, at least one original SVG
  diagram in `public/images/guides/` (presentation attributes only, no inline `style`,
  because of the CSP), a troubleshooting section, and internal links.
- Use `author: "Najeeb"` only on pages Najeeb has reviewed; otherwise `HydroRigor Editorial`.
  The author profile and degree live in `src/data/authors.ts`.
- When a section's first guide is published, remove its path from
  `EMPTY_SECTION_PATHS` in `src/lib/indexing.ts`.

## Evidence and affiliate integrity

Never invent:
- product testing or personal-use experience;
- product prices presented as live;
- product ratings;
- affiliate terms;
- crop target values without provenance;
- search-volume or SEO metrics.

Structured data must match visible content.
