import { defineString } from 'firebase-functions/params';

// Comma-separated entries, each a full address (`ada@example.com`) or a whole
// domain (`@example.com`). Empty -- the default -- closes sign-up, so a fresh
// deploy of this codebase never hands accounts to strangers: whoever deploys
// has to name who may join.
export const signupAllowedEmails = defineString('SIGNUP_ALLOWED_EMAILS', {
  default: '',
  description:
    'Comma-separated emails or @domains allowed to create an account; empty closes sign-up',
});

export function isSignupAllowed(
  email: string | undefined,
  allowList: string,
): boolean {
  if (!email) {
    return false;
  }
  const address = email.trim().toLowerCase();
  return allowList
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter((entry) => entry.length > 0)
    .some((entry) =>
      entry.startsWith('@') ? address.endsWith(entry) : address === entry,
    );
}
