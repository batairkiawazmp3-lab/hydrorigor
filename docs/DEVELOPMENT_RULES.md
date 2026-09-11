# Development Rules

## Locked launch stack

- Astro 7.3.x
- Node.js 24 LTS
- TypeScript strict
- Tailwind CSS 4.3
- Astro Content Collections + MDX
- Vercel
- Static-first rendering

Any change requires an Architecture Decision Record (ADR) and explicit approval.

## Engineering rules

1. Prefer static HTML.
2. Hydrate only an interaction that cannot reasonably be static.
3. No global client framework by default.
4. No database at launch.
5. No external CMS at launch.
6. All reusable product facts live in structured product data.
7. All affiliate links go through one affiliate-link abstraction.
8. All calculator formulas live in testable TypeScript functions.
9. Content schemas fail builds on invalid frontmatter/references.
10. Images require alt text and explicit dimensions.
11. Accessible keyboard/focus behavior is required.
12. Security headers are mandatory before production.
13. No secrets in repository files or examples.

## Required commands from M01 onward

The actual scripts are created in M01/M02, but CI must converge on:

- `npm ci`
- `npm run lint`
- `npm run check`
- `npm test`
- `npm run build`

`npm run check` must execute `astro check`.

## Definition of done

A milestone is not done because files exist. It is done only when:
- scope matches the specification;
- required tests pass;
- implementation report exists;
- test report exists;
- reality audit accepts the result;
- handoff state is updated.
