# Users Role Nx — retirement walkthrough

Behavioural record of the live app captured while it still runs, before billing
is unlinked and the Firebase project is retired. It exists so the app's
user-facing behaviour and its live cloud configuration survive the shutdown.

- **Hosted app:** https://users-role-nx.web.app (also users-role-nx.firebaseapp.com)
- **API function:** https://api-zm7bvbr4yq-uc.a.run.app (Cloud Run gen-2 `api`)
- **Captured:** 2026-09-25, headless Chromium via `scripts/retirement-capture/app/capture.cjs`
- **Live config snapshot:** [`cli-snapshot.md`](./cli-snapshot.md)
- **Redacted request log:** [`api-calls.har.json`](./api-calls.har.json) (Authorization headers and user records redacted)

## Test account

Throwaway account created through the app's own password sign-up. It is a plain
user (`roles: ['user']`); no roles were changed. Deleted in a later retirement
step.

| Email                            | UID                          | Notes      |
| -------------------------------- | ---------------------------- | ---------- |
| urnx-retire-098b22da@example.com | Oil1JOsAllOpYlvY400kePWz4K93 | plain user |

App Check is **not enabled** on this project, so headless password sign-in works
and the signed-in flows were captured directly.

## Flow checklist

| Flow                                                                                             | Status                               | Evidence                                                                                    |
| ------------------------------------------------------------------------------------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------- |
| Sign-up (password)                                                                               | captured                             | `media/usersrole-nx-01-sign-up.webm`, `screenshots/flow-01-sign-up-*.jpg`                   |
| Sign-in (password)                                                                               | captured                             | `media/usersrole-nx-02-sign-in-password.webm`, `screenshots/flow-02-home-after-sign-in.jpg` |
| Profile                                                                                          | captured                             | `media/usersrole-nx-03-profile.webm`, `screenshots/flow-03-profile.jpg`                     |
| Admin: list users (viewed as plain user)                                                         | captured — redirects to `/forbidden` | `screenshots/flow-04-admin-users-as-user.jpg`                                               |
| Admin: change roles (viewed as plain user)                                                       | captured — redirects to `/forbidden` | `screenshots/flow-04-admin-roles-as-user.jpg`                                               |
| Admin: list users / change roles (privileged view)                                               | needs headed session                 | requires an admin account; headed only                                                      |
| Self-promote to admin (privilege-escalation demo)                                                | needs headed session                 | see security finding 1; **not automated here**                                              |
| Theme switch (light/dark)                                                                        | captured                             | `media/usersrole-nx-05-theme-switch.webm`, `screenshots/flow-05-theme-*.jpg`                |
| Sign-out                                                                                         | captured                             | `media/usersrole-nx-06-sign-out.webm`, `screenshots/flow-06-after-sign-out.jpg`             |
| PWA install prompt                                                                               | needs headed session                 | `beforeinstallprompt` does not fire in headless Chromium                                    |
| OAuth: Google                                                                                    | needs headed session                 | reached `accounts.google.com`; `media/usersrole-nx-07-oauth-google*.webm`                   |
| OAuth: GitHub                                                                                    | needs headed session                 | reached `github.com`; `media/usersrole-nx-07-oauth-github*.webm`                            |
| Screenshot matrix (home, profile, about, previews, sign-in, sign-up; desktop+mobile; light+dark) | captured                             | `screenshots/matrix-*.jpg` (32)                                                             |

This app exposes Google and GitHub sign-in only (no Twitter). Its admin screens
were exercised as a plain user, which the route guard sends to `/forbidden`; the
privileged content behind them needs an admin account and belongs to the headed
session. Users-table rows would be masked (all but the test account blurred), but
a plain user never reaches the list, so no other users' data was fetched or shown.

## Media (videos, not committed)

Videos live under `media/` and are **gitignored** — a later step uploads them as
GitHub Release assets. Screenshots are committed (all JPEG, largest ~164 KB).

| File                                                  | Size      |
| ----------------------------------------------------- | --------- |
| usersrole-nx-05-theme-switch.webm                     | 2.7 MB    |
| usersrole-nx-06-sign-out.webm                         | 1.2 MB    |
| usersrole-nx-08-pwa.webm                              | 1.1 MB    |
| usersrole-nx-02-sign-in-password.webm                 | 717 KB    |
| usersrole-nx-03-profile.webm                          | 420 KB    |
| usersrole-nx-04-admin-blocked-as-user.webm            | 362 KB    |
| usersrole-nx-01-sign-up.webm                          | 283 KB    |
| usersrole-nx-07-oauth-{google,github}.webm (+ popup1) | 41–260 KB |

## Security findings at retirement

Read-only observations of the live app and its code. Recorded here because they
are worth carrying forward; none were exploited.

1. **Privilege escalation: any user can make itself admin.** `PATCH /users/:id`
   runs `isAuthorized({ hasRole: ['admin','manager'], allowSameUser: true })`,
   so a signed-in user passes the guard for its **own** record. The `patch`
   handler then copies `req.body.roles` straight into the account's custom
   claims. A plain user can therefore send its own ID and
   `roles: ['user','admin']` and become admin, after which admin screens expose
   every user's email and display name. The self-promotion demonstration and the
   privileged admin views are left for the headed session; the hole is inherent
   to the `allowSameUser` branch plus the unfiltered role copy.
2. **Unauthenticated account creation.** `POST /users` has no authentication
   (intentional, to allow sign-up); it is throttled to 15/hour per IP. Anyone can
   create `role: ['user']` accounts.
3. **No App Check.** The Firebase App Check API is disabled on this project, so
   Identity Toolkit and Firestore accept requests from any client with the
   public web API key — no client attestation. `usersrole` enforces App Check on
   both services; this project does not.

Exact values (user counts, billing linkage, the App Check API state, authorized
domains) are in [`cli-snapshot.md`](./cli-snapshot.md).

## Reproducing

```bash
export PATH=$HOME/.nvm/versions/node/v24.19.0/bin:$PATH
RETIREMENT_KEEP='<test-email>,<test-uid>' \
  scripts/retirement-capture/app/cli-snapshot.sh users-role-nx docs/retirement/cli-snapshot.md
NODE_PATH=<dir with playwright-core 1.63.x> TEST_EMAIL=<fresh> TEST_PASSWORD=<pw> \
  node scripts/retirement-capture/app/capture.cjs usersrole-nx docs/retirement
```
