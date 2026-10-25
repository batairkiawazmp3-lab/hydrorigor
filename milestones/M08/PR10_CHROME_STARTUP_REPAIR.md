# PR #10 Chrome startup investigation

## Preserved failure

Head `1f03f26fa8579ad3baf16d637839f254560be17c`: PR quality run 39890842330 and push quality run 39890798873 failed before Lighthouse collection. Chrome debugging endpoints did not open on ports 34777 and 44781. Prior PR CI stages passed, including audit, smoke, accessibility and 44-route rehearsal. No budget failure was measured. Original stderr was discarded, so the underlying cause cannot be recovered from those logs alone.

## Diagnostics first

The local/CI launcher now records executable/version, exact arguments, isolated profile, port, PID, readiness timestamps, exit code/signal, stdout/stderr and Linux port/process state. Startup failures fail closed, including immediate browser exit; endpoint requests have a bounded timeout. Chrome is cleaned up before removing its unique profile. A startup-only probe runs early in CI, and local-only diagnostic artifacts are retained on failure. No production credentials are used by this workflow.

Initial local syntax, lint and sentinel secret-safety checks passed. A real Windows Chrome 154.0.8037.93 startup probe passed. A deliberate wrong-executable probe exited 1 and preserved the child exit code 9 and stderr, validating the early-failure diagnostic path. The isolated Lighthouse probe is recorded separately in ignored scratch; no historical acceptance reports are overwritten.

No launch flags, budgets, mobile settings, route count, capture count, production browser guard or application files changed at this diagnostic stage. CI evidence is required before choosing a corrective flag or attributing a root cause. Production remains paused; no owner request edit or production trigger is authorized.

Isolated loopback collection completed with a valid LHR: Performance 99, Accessibility 100, SEO 100, LCP 1407.414 ms, TBT 107 ms. The initial scratch probe had Windows import/path setup errors before collection; corrected scratch setup did not alter project dependencies or acceptance configuration. Full-matrix validation is assigned to fresh Ubuntu CI because local available RAM was approximately 280 MB during diagnosis.
