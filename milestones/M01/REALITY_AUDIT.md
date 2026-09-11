# M01 Reality Audit

Status: PENDING_CHATGPT_REAUDIT

The first independent ChatGPT audit rejected M01 because the primary navigation
was hidden on mobile, CI could generate a missing lockfile, and the M01
specification still said `NOT_STARTED`.

The corrective pass keeps the navigation visible and wrapping on mobile without
JavaScript, removes CI lockfile generation, and sets the specification to
`READY_FOR_AUDIT`. Local validation on Node v24.18.0 passes, including `npm ci`,
lint, Astro diagnostics, 5/5 tests, and the production build.

The corrective `ci / quality` and `governance / m00-governance` checks now pass
for both push and pull-request events. Only the independent ChatGPT re-audit
remains required.

M02 remains unauthorized.
