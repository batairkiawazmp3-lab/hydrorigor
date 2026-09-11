# Git Workflow

## Branching

Recommended:
- `main` = releasable baseline
- one milestone branch at a time: `m01-foundation`, `m02-content-engine`, etc.

## Commit conventions

Examples:
- `chore(m00): establish governance baseline`
- `feat(m01): add HydroRigor layout shell`
- `test(m04): cover nutrient calculator boundaries`
- `fix(m05): qualify affiliate links as sponsored`

## Prohibited

- force-push to main
- merge with failing required checks
- secrets in commits
- generated dependency folders
- production deployment from an unreviewed working tree

## Review gate

Before merging:
- working tree understood
- diff limited to milestone scope
- CI green
- reports current
- reality audit accepted
