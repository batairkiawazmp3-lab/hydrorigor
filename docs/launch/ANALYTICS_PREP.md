# M07 analytics preparation

The official `@vercel/analytics` 2.0.1 Astro component is installed in
`src/components/observability/WebAnalytics.astro`. Collection is disabled:
only the exact build-time value `PUBLIC_ENABLE_VERCEL_ANALYTICS=true` renders
the component. `.env.example` defaults to false. No service was activated.
Default built HTML and browser tests must contain/send no analytics requests.
This is prepared infrastructure, not active production measurement.

## Future activation, only after separate M08 authorization

1. Review the privacy disclosure, deployment environment and owner approval.
2. In the authorized Vercel project, enable Web Analytics in the Analytics tab.
3. Set `PUBLIC_ENABLE_VERCEL_ANALYTICS=true` for the approved production build
   only; keep local, CI and preview settings disabled.
4. Build and inspect the rendered official integration. Review its actual
   script and request destinations against CSP; the disabled M07 policy grants
   no speculative third-party analytics origins. Do not add broad unsafe CSP
   exceptions. Revalidate the editorial JavaScript budget for this intentional
   production instrumentation change; the M07 zero-script gate is for the
   default disabled build and will deliberately reject an enabled build.
5. Deploy only with deployment authorization, confirm the intended page-view
   request and dashboard data, and verify that sensitive URLs are not collected.
6. To disable, set the flag false and rebuild/redeploy the authorized environment.

No secret is required for this client integration. Web Analytics is not proof
of field INP. Production field measurement of INP <200 ms remains deferred;
no Speed Insights or other telemetry product has been added.

Reference: [official Vercel quickstart](https://vercel.com/docs/analytics/quickstart),
reviewed 2026-09-16. No account/project settings were changed.
