# Handoff Protocol

Every milestone uses a written handoff.

## Handoff fields

- Active milestone
- Source commit / working-tree state
- Authorized scope
- Files created/changed
- Commands run
- Passed checks
- Failed checks
- Known limitations
- Deferred work
- External side effects
- Secrets accessed
- Deployment status
- Exact next-agent instruction

## Truth rules

Use only these statuses:

- `NOT_STARTED`
- `READY_FOR_PLAN`
- `READY_FOR_IMPLEMENTATION`
- `READY_FOR_TEST`
- `READY_FOR_AUDIT`
- `ACCEPTED`
- `BLOCKED`

Do not use vague statuses such as "basically done."

## Failure protocol

When a test fails:
1. record the exact failing command;
2. diagnose within milestone scope;
3. fix only milestone-relevant causes;
4. rerun the narrow failed check;
5. rerun the full milestone gate;
6. update the report.

## End-of-milestone rule

The next milestone is not active until the current milestone is explicitly accepted.
