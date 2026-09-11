# M01 Specification — Foundation

Status: NOT_STARTED

## Objective

Create the real HydroRigor application foundation without yet building the content engine, affiliate layer, calculators, or production deployment.

## Authorized outputs

- Astro 7.3.x project
- Node 24 project pin
- strict TypeScript
- Tailwind CSS 4.3 integration
- HydroRigor design tokens
- font setup:
  - Manrope headings
  - Inter body/UI
  - IBM Plex Mono measurement/data usage
- base layout
- accessible header/navigation shell
- footer shell
- responsive container/grid primitives
- basic 404 page
- minimal homepage shell using approved brand identity
- package scripts for lint/check/test/build
- CI with current action majors and Node 24
- baseline unit/smoke test setup
- M01 implementation/test/audit reports

## Explicitly out of scope

- full homepage content
- article collections/templates
- review/comparison schemas
- Pagefind search
- calculators
- affiliate merchant registry
- product structured data
- analytics connection
- Search Console
- real article publishing
- production deployment
- domain registration

## Required CI

Use current 2026 action majors:
- `actions/checkout@v7`
- `actions/setup-node@v7`

Required gates:
1. `npm ci`
2. `npm run lint`
3. `npm run check` (`astro check`)
4. `npm test`
5. `npm run build`

## Acceptance criteria

- local and CI gates green
- design tokens match approved HydroRigor palette
- no unapproved client framework
- ordinary shell renders without unnecessary hydration
- mobile/desktop shell usable with keyboard
- no production deployment
- reports and handoff updated
