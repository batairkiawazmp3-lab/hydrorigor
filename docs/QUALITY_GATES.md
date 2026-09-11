# Quality Gates

## M01+ code gates

- lint: pass
- Astro/TypeScript diagnostics: pass
- tests: pass
- production build: pass
- no committed secrets

Astro's build step does not replace `astro check`; diagnostics are a separate required CI gate.

## Launch quality targets

- LCP < 2.5 s target
- INP < 200 ms target
- CLS < 0.1 target
- Lighthouse mobile performance >= 95 target
- Lighthouse accessibility = 100 target
- Lighthouse SEO = 100 target
- ordinary editorial pages: near-zero client JavaScript

## Editorial gates

- every factual/technical claim that needs sourcing has provenance
- affiliate material connection disclosed
- no copied merchant descriptions as article substance
- no unsupported medical/health claims
- no fabricated product-use experience
- no stale price presented as live
- visible content matches structured data

## Tool/calculator gates

- assumptions visible
- source data visible
- unit tests cover normal, boundary, and invalid inputs
- manual independent calculation spot-check completed
