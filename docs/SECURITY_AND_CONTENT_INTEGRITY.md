# Security & Content Integrity

## Secrets

Use environment variables only.
Never commit:
- API keys
- affiliate private credentials
- tokens
- passwords
- private analytics credentials

## Content integrity

HydroRigor must distinguish:
- measured/tested by HydroRigor
- manufacturer specification
- third-party published evidence
- editorial inference/opinion

Do not blur these categories.

## Commerce integrity

- compensated links use appropriate `rel` values
- supplied/loaned/discounted products are disclosed
- no fake scarcity
- no fake review counts
- no scraped third-party ratings represented as HydroRigor ratings

## Security before production

Set/review:
- Content-Security-Policy
- Strict-Transport-Security
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

Third-party scripts require explicit justification.
