# M07 security configuration

`vercel.json` prepares seven header policies without deployment:
Content-Security-Policy, X-Content-Type-Options (`nosniff`), X-Frame-Options
(`DENY`), Referrer-Policy (`strict-origin-when-cross-origin`), Permissions-Policy
(camera, microphone, location, payments, USB and browsing topics disabled),
Cross-Origin-Opener-Policy (`same-origin`) and Cross-Origin-Resource-Policy
(`same-site`). The local static server applies this configuration in browser tests.

CSP defaults to self, prohibits objects, frames, framing and script attributes,
limits base/form targets to self, and restricts styles/fonts/connections to self.
The only inline executable allowance is the exact SHA-256 hash of the built
calculator bundle. The validator recomputes the hash and fails on drift.
`wasm-unsafe-eval` permits Pagefind's local WebAssembly compilation; general
`unsafe-eval` and `unsafe-inline` remain prohibited. JSON-LD remains visible
non-executable structured data. Search uses an external same-origin module.
No speculative analytics origin is allowlisted. Fonts use system fallbacks,
eliminating external Google font requests.

HSTS is deferred to the explicit M08 HTTPS/domain review. The interrupted work
had added a one-year header; it was removed when reconciling the authorization.
No includeSubDomains/preload policy or production-domain assumption is made.

`test:security` checks configured policy requirements, source patterns for a
bounded set of credential formats, insecure HTTP references, unauthorized
verification tokens, iframes, unsafe new-window links, executable inline hashes,
disabled default analytics and zero executable scripts on all 25 M06 pages.
This is not a comprehensive secret scanner, penetration test, legal review or
guarantee of deployed headers. M04/M05/M06 validators separately protect
source values, commercial integrity and editorial provenance.
