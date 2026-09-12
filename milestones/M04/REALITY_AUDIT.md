# M04 Reality Audit

Status: CORRECTIVE_LOCAL_GATE_PASS_PENDING_GITHUB_CI_AND_REAUDIT

M04 is implemented and its complete local gate passes. The crop values are tied
to three live-verified university/extension sources through eight contextual
records; no value was added from memory, no conflicting ranges were averaged,
and no ppm/TDS conversion was performed.

The two authorized outputs exist at `/tools/ph-ec-targets/` and
`/tools/nutrient-mixing-calculator/`. Their source visibility, formula,
assumptions, accessibility, sitemap, and search behavior are covered by the
47-test suite plus dedicated data and search verification.

The independent ChatGPT audit rejected the first M04 handoff for two focused
provenance issues: the Virginia publication identifier required correction to
`SPES-466NP`, and the two EC statements inside UF/IFAS HS1422 required explicit
reconciliation notes. The numeric crop values, calculator arithmetic, CI,
search, and M04 scope boundaries otherwise passed audit. Pull request #4 remains
open and unmerged while the correction and full revalidation are completed.

Both corrections are now implemented and the complete local gate passes with
47/47 tests. The Virginia source ID and mature-plant values are unchanged. The
UF/IFAS record remains pH 6.0–7.0 and EC 1.4–1.8 mS/cm, with the later internal
1.2–1.8 mS/cm EC statement disclosed and no invented reconciliation. Corrective
GitHub CI and independent ChatGPT re-audit remain pending.

M05 remains NOT_STARTED and NOT_AUTHORIZED.
