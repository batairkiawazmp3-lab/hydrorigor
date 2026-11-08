import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { KIT_FORM_ACTION, KIT_FORM_ORIGIN } from '../src/data/newsletter.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('the sign-up form posts to Kit with no third-party script', async () => {
  assert.match(KIT_FORM_ACTION, /^https:\/\/app\.kit\.com\/forms\/\d+\/subscriptions$/u);
  const card = await read('src/components/newsletter/EmailSignup.astro');
  assert.match(card, /action=\{KIT_FORM_ACTION\} method="post"/u);
  assert.match(card, /name="email_address" type="email" required autocomplete="email"/u);
  assert.match(card, /<label [^>]*for=\{`\$\{id\}-email`\}/u, 'the email field has a visible label');
  assert.doesNotMatch(card, /<script|convertkit\.com|ck\.5\.js|style=/u, 'no Kit script or inline styles');
  assert.match(await read('src/pages/index.astro'), /<EmailSignup id="home-signup" \/>/u);
  assert.match(await read('src/layouts/content/ArticleLayout.astro'), /<EmailSignup id="guide-signup"/u);
});

test('the CSP lets forms post only to the site and Kit', async () => {
  const config = JSON.parse(await read('vercel.json'));
  const csp = config.headers.flatMap((rule) => rule.headers).find((header) => header.key.toLowerCase() === 'content-security-policy').value;
  const formAction = csp.split(';').map((part) => part.trim()).find((part) => part.startsWith('form-action'));
  assert.equal(formAction, `form-action 'self' ${KIT_FORM_ORIGIN}`);
  assert.doesNotMatch(csp, /script-src[^;]*kit\.com/u, 'Kit is never allowed to run scripts');
});

test('the privacy policy describes the newsletter honestly', async () => {
  const privacy = await read('src/pages/privacy.astro');
  assert.match(privacy, /<h2>Email newsletter<\/h2>/u);
  assert.match(privacy, /straight to <a href="https:\/\/kit\.com\/privacy"/u);
  assert.match(privacy, /you are not subscribed until you do/u);
  assert.match(privacy, /unsubscribe link/u);
  assert.doesNotMatch(privacy, /no accounts, sign-up forms, comments or newsletter/u, 'the old "no newsletter" line is gone');
});

test('the RSS feed is linked from every page', async () => {
  assert.match(await read('src/components/seo/SEO.astro'), /rel="alternate" type="application\/rss\+xml" title="HydroRigor guides" href="\/rss\.xml"/u);
  assert.match(await read('src/pages/rss.xml.ts'), /isPermaLink="false">\$\{url\}#updated-\$\{day\}/u);
});
