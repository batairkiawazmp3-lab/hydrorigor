# AGENTS.md — HydroRigor Agent Rules

## Operating model

HydroRigor uses a deliberately simple two-agent workflow:

- **ChatGPT** — supervisor, planner, researcher, and reality auditor.
- **Codex** — primary local implementation and test agent working in `D:\hydrorigor`.

No mandatory Claude stage exists.

## Normal milestone flow

`SPEC -> CODEX IMPLEMENT + TEST/FIX LOOP -> GITHUB CI -> CHATGPT AUDIT -> ACCEPT/REJECT`

Codex may plan its own implementation details inside an already-approved milestone and may automatically fix test/build failures that are within scope.

## Source of truth

Local authoritative working copy:

`D:\hydrorigor`

Remote repository:

`batairkiawazmp3-lab/hydrorigor`

Strategy source:

`docs/reference/HydroRigor_Master_Strategy.xlsx`

## Scope discipline

Codex must:
1. read `.agent/state/CURRENT_MILESTONE.md`;
2. read the active milestone specification;
3. work only inside that milestone;
4. run required validation;
5. fix milestone-relevant failures automatically where safe;
6. update reports/handoff;
7. stop before an action that requires explicit user approval.

## Safe autonomous actions

Within an approved milestone, Codex may without repeated approval:
- create/edit/delete project files that are inside milestone scope;
- install declared project dependencies;
- run local development servers;
- run lint/typecheck/tests/build;
- fix implementation/test failures;
- create local Git branches/commits;
- prepare pull requests and CI fixes after GitHub access is connected.

## Actions requiring explicit user approval

- domain purchase or registration;
- DNS modification;
- production deployment/publishing;
- paid service purchase;
- affiliate-account authorization/change;
- API keys, tokens, or secrets not already provisioned for the project;
- destructive deletion of important user data;
- major architecture change outside the approved specification.

## Evidence and affiliate integrity

Never invent:
- product testing or personal-use experience;
- product prices presented as live;
- product ratings;
- affiliate terms;
- crop target values without provenance;
- search-volume or SEO metrics.

Structured data must match visible content.
