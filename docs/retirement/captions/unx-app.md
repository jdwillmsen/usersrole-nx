# unx-app — usersrole-nx live app walkthrough (headed)

Single recorded session driving https://users-role-nx.web.app as a freshly
minted throwaway password account. (usersrole-nx has App Check disabled, but the
flow is captured headed for parity and to complete the deferred OAuth items.)

Throwaway account used (add to the deletion list):
`urnx-629-b877adc8@example.com`, role `user`.

Steps (screenshots `unx-app-01` … `unx-app-10`, one video):

- `01-signup-empty` / `02-signup-filled` / `03-signup-result` — password sign-up
  via the app's own form; create succeeds and redirects to sign-in.
- `04-signin-filled` / `05-after-signin` — password sign-in; lands on `/home`.
- `06-home` — home, signed in.
- `07-profile-before` — profile navigation (this build resolved the profile view
  to `/home`; the equivalent Roles: User profile view is captured on usersrole).
- `08-theme-menu` / `09-theme-changed` — theme switch.
- `10-admin-guard` — navigating to `/admin/users` as a plain user is **blocked
  by the client `RoleGuard` and redirects to `/forbidden`** (matches usersrole).

Minor gaps this run (captured on usersrole, which shares the codebase): the
`/profile` view and the sign-out button interaction.

Not captured here (require the owner's real IdP login — hand to the human in
VNC): Google / GitHub OAuth sign-in completion, and the PWA install prompt.
These are the specific items the earlier headless walkthrough deferred for
usersrole-nx.
