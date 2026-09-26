# usersrole-nx — retirement capture

"How it was set up and how it behaved" evidence for the Firebase app
**jdwillmsen/usersrole-nx** (GCP project `users-role-nx`), captured read-only from
the live app and consoles before the project is retired and billing is unlinked.

- **Hosted app:** https://users-role-nx.web.app (also users-role-nx.firebaseapp.com)
- **API function:** https://api-zm7bvbr4yq-uc.a.run.app (Cloud Run gen-2 `api`)
- **Captured:** 2026-09-25 — app flows headless via
  `scripts/retirement-capture/app/capture.cjs`; console tour + signed-in app
  walkthrough via the headed capture browser.
- **Live config snapshot:** [`cli-snapshot.md`](./cli-snapshot.md)
- **Redacted request log:** [`api-calls.har.json`](./api-calls.har.json)
  (Authorization headers and user records redacted)
- **Videos:** attached to the [`retired` release](https://github.com/jdwillmsen/usersrole-nx/releases/tag/retired)
  as mp4 assets, with a `SHA256SUMS` manifest (kept out of git to keep clones small).
- **Run your own copy:** [`REPLICATE.md`](../../REPLICATE.md) — Firebase Emulator
  Suite quick start, plus a hardened own-project deploy.

## Why this was retired

Decided 2026-09-23. The app has **no active user base to serve** but carried
standing risk and cost on a pay-as-you-go (Blaze) plan:

- Uncapped Blaze billing with no budget kill switch.
- Publicly reachable functions, and an unauthenticated `POST /users` sign-up.
- An API-layer privilege-escalation path (any signed-in user could self-grant
  admin — see Security findings).
- **App Check not enabled** (no client attestation), the weaker posture.
- 117 third-party accounts across the two apps (28 here, 89 in usersrole) with
  no ongoing purpose.

Options weighed:

| Option | Outcome | Verdict |
| --- | --- | --- |
| **A. Full retirement** | Capture everything, publish the record, delete the projects. | **Chosen** — removes the cost and risk while preserving the learning record. |
| B. Free-plan freeze | Downgrade to Spark. | Rejected — functions stop (broken demo) and the user PII stays live. |
| C. Keep and harden | Fix billing/auth/App Check and maintain it. | Rejected — permanent maintenance for an app with no users. |
| D. Keep only usersrole-nx | Retire one, keep the other. | Rejected — both carry the same risks and neither is in use. |

## Timeline

- **2026-09-23** — decision to retire; risk findings recorded; epic filed.
- **2026-09-24/25** — headed capture browser stood up; app walkthroughs, CLI
  snapshot, and the Firebase/GCP console tour recorded read-only.
- **2026-09-26** — emulator + REPLICATE work, the escalation fix, and the
  retirement banner deployed to the live project (new sign-up now closed);
  this record and the `retired` release published.
- **Next** — unlink billing, stop CI/Renovate, archive the repo; delete the GCP
  project (by 2026-10-09).

## Contents

- `screenshots/` — masked PNG/JPEG stills, one per surface / app step.
- `captions/` — one `.md` per console surface (and `unx-app.md` for the app run),
  each naming its video.
- `media/` — the `.webm` recordings (**gitignored**; uploaded as Release assets).
- `index.json` / `index.jsonl` — machine-readable capture log.
- `scripts/` — the console-tour capture harness.

## Test accounts

Throwaway accounts created through the app's own password sign-up. Both are plain
users (`roles: ['user']`); no roles were changed. Deleted in a later retirement
step.

| Email | UID | Notes |
| --- | --- | --- |
| urnx-retire-098b22da@example.com | Oil1JOsAllOpYlvY400kePWz4K93 | headless walkthrough |
| urnx-629-b877adc8@example.com | S15tSwi2uhcJc6cUf3HJJWbVsqT2 | headed app walkthrough |

## PII handling

Every Authentication/Users surface and Firestore user document was blurred before
navigation and again at screenshot time. On the live **Authentication → Users**
tab the column selectors covered the Identifier (email) and User UID columns in
both the masked stills and the blur-only video render — verified by eye. Blur does
**not** catch `<input>` values (only the throwaway account appears there), OAuth
client secrets, or human display names in GCP IAM. Secret-bearing surfaces
(per-provider OAuth config panes, function env/logs) were deliberately not
captured. See the review list below.

App Check is **not enabled** on this project, so headless password sign-in works
and most signed-in flows were captured directly (unlike usersrole, which enforces
App Check and required the headed browser).

## Flow checklist

| Flow | Status | Evidence |
| --- | --- | --- |
| Sign-up (password) | captured | `screenshots/flow-01-sign-up-*.jpg`, `unx-app-01..03` |
| Sign-in (password) | captured | `screenshots/flow-02-home-after-sign-in.jpg`, `unx-app-04..05` |
| Home | captured | `unx-app-06` |
| Profile | captured (headless) | `screenshots/flow-03-profile.jpg` |
| Theme switch (light/dark) | captured | `screenshots/flow-05-theme-*.jpg`, `unx-app-08..09`, `matrix-*` |
| Admin guard (`/admin` as plain user → 403) | captured | `screenshots/flow-04-admin-*-as-user.jpg`, `unx-app-10-admin-guard` |
| Sign-out | captured (headless) | `screenshots/flow-06-after-sign-out.jpg` |
| Admin: list users / change roles (privileged) | not captured | requires a real admin account; plain user is blocked at the client guard (403) |
| Self-promote to admin (privilege-escalation demo) | not reproducible UI-only | see security finding 1 — API-layer hole, not UI |
| OAuth: Google / GitHub | buttons + provider page only | completions not recorded (would require the owner's real IdP login) |
| PWA install prompt | not captured | `beforeinstallprompt` does not fire headless; skipped by decision |

This app exposes Google and GitHub sign-in only (no Twitter). A plain user never
reaches the users list (the route guard sends it to `/forbidden`), so no other
users' data was fetched or shown.

## Console tour — Firebase

| Surface | Screenshot | Notes |
| --- | --- | --- |
| Auth sign-in providers | `unx-fb-auth-providers` | Email/Password, Google, GitHub **Enabled** (no Twitter/Anonymous); SMS MFA disabled. |
| Auth settings | `unx-fb-auth-settings` | Settings pane. |
| Auth → Authorized domains | `unx-fb-auth-authorized-domains` | **Only the 3 defaults** — no stale preview or custom domains (contrast: usersrole). |
| Auth → Blocking functions | `unx-fb-auth-blocking-functions` | beforeCreate → **beforecreated(us-central1)**; beforeSignin → None. |
| Auth → User actions | `unx-fb-auth-user-actions` | User-actions pane. |
| Auth email templates | `unx-fb-auth-templates` | Template settings. |
| Auth → Users (BLURRED) | `unx-fb-auth-users` | 28 real users; email + UID columns masked. |
| App Check | `unx-fb-appcheck` | **DISABLED** — onboarding splash; "Configure App Check" banner on Auth. |
| Functions | `unx-fb-functions` | Functions list. |
| Hosting | `unx-fb-hosting` | Site `users-role-nx`. |
| Storage | `unx-fb-storage` | Storage view. |
| Firestore | `unx-fb-firestore` | `users` collection (doc id = Auth UID); UID doc-ids masked. |
| Realtime Database | `unx-fb-rtdb` | Presence check. |
| Project settings — general / service accounts / integrations | `unx-fb-settings-*` | Web app config, Admin SDK SA, integrations. |

## Console tour — Google Cloud

| Surface | Screenshot | Notes |
| --- | --- | --- |
| APIs & Services | `unx-gcp-apis` | Enabled APIs dashboard. |
| Billing — linked account | `unx-gcp-billing-linked` | Same billing account **"Firebase Payment"** (`01DF84-B8C2B6-98291D`) as usersrole. |
| IAM | `unx-gcp-iam` | Principals masked. Owner "Jacob Willmsen"; `firebase-adminsdk` (**no** App Check Admin role, consistent with App Check disabled); GitHub Actions `jdwillmsen/usersrole-nx`; compute + App Engine default SAs (Editor). Insight: 2 SAs with excess Owner/Editor. |
| Artifact Registry | `unx-gcp-artifacts` | `gcf-artifacts` repository. |
| Cloud Run (functions) | `unx-gcp-run` | gen2 Functions services. |
| Cloud Storage buckets | `unx-gcp-storage-bucket` | `gcf-v2-*` + **`staging.users-role-nx.appspot.com`** + **`users-role-nx.appspot.com`** (default app bucket present, unlike usersrole). |

## Security findings at retirement

1. **Privilege escalation: any user can make itself admin (API layer).** Identical
   codebase to usersrole: the `api` `PATCH /users/:id` is guarded by
   `isAuthorized({ hasRole: ['admin','manager'], allowSameUser: true })`, and the
   `patch` handler copies `req.body.roles` into custom claims — so a plain user can
   `PATCH /users/{ownUid}` with `roles:['admin']` and self-promote. The app's
   admin UI is hidden from plain users by the client `RoleGuard` (they get
   `/forbidden`, evidence `unx-app-10-admin-guard`), so it is **not reproducible
   through the UI**; exploiting it needs a direct authenticated API call (out of
   scope; no token scraping/replay done). Fixed for replicators in `REPLICATE.md`.
2. **App Check is not enabled** on this project (Identity Toolkit or Firestore) —
   no client attestation, the weaker posture. Contrast: usersrole enforces it.

Exact values (user counts, billing linkage, the authorized-domain list) are in
[`cli-snapshot.md`](./cli-snapshot.md).

## Media (not committed)

Videos live under `media/` and are **gitignored** — uploaded as GitHub Release
assets in a later step. Screenshots are committed (all well under 5 MB).

## Human PII/secret review required before publishing the videos

- `unx-fb-auth-users` (+ video) — confirm no unblurred email/UID across scroll.
- `unx-fb-firestore` (+ video) — confirm no user field exposed.
- `unx-gcp-iam` — shows the owner's own display name (no end-user PII).
- App-flow stills — show only the throwaway accounts.
