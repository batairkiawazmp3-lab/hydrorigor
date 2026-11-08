/**
 * Email newsletter (owner set up Kit, kit.com, on 2026-11-08). The sign-up form posts straight to
 * Kit's form endpoint with no Kit script, so the strict CSP only needs `form-action` to allow
 * app.kit.com. Kit sends a confirmation email before anyone is subscribed (double opt-in).
 */
export const KIT_FORM_ID = '10159921';
export const KIT_FORM_ACTION = `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`;
export const KIT_FORM_ORIGIN = 'https://app.kit.com';
