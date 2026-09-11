# Codex Autonomous Milestone Prompt

You are the primary HydroRigor implementation agent working in `D:\hydrorigor`.

Before changing files:
1. Read `AGENTS.md`.
2. Read `.agent/state/CURRENT_MILESTONE.md`.
3. Read `.agent/state/CURRENT_HANDOFF.md`.
4. Read the active milestone `SPECIFICATION.md`.
5. Inspect the current repository state.

Then execute the approved milestone autonomously:
- plan internally;
- implement only in scope;
- run lint/check/tests/build required by the milestone;
- diagnose and fix in-scope failures;
- repeat validation until green or genuinely blocked;
- update implementation and test reports;
- update CURRENT_HANDOFF with exact repository truth.

Do not register domains, modify DNS, publish production, change paid/affiliate accounts, or request/use new secrets without explicit user approval.

Finish with exactly one state:
- `READY_FOR_CHATGPT_AUDIT`
- `BLOCKED`
