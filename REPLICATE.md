# Replicating Users Role Nx

The hosted instance at `users-role-nx.web.app` is retired and its Google Cloud
project is being deleted. Everything it did still runs from this repository:

1. [Emulator quick start](#1-emulator-quick-start) -- the whole app on your
   machine, on the Firebase Emulator Suite. No Google account, no billing, no
   cloud project.
2. [Deploying to your own project](#2-deploying-to-your-own-project) -- a real
   Firebase project, with the three risks the original deployment carried
   closed off first: uncapped billing, storage rules open to any signed-in
   account, and open sign-up.

## 1. Emulator quick start

### Prerequisites

- Node.js 22 (the version in `.nvmrc`) with the npm it ships.
- Java 11 or newer on your `PATH`, for the Firestore and Storage emulators
  (`java -version` to check; on Debian or Ubuntu,
  `sudo apt-get install -y openjdk-21-jre-headless`).
- Free local ports: 4000, 4200, 4400, 4500, 5000, 5001, 8080, 9099, 9150, 9199.

You do not need `firebase login`. The emulators run against the project ID
`demo-usersrole-nx`; the `demo-` prefix tells the Firebase CLI and SDKs that no
real project exists, so nothing can reach Google Cloud even by mistake.

### Run it

Three terminals, all from the repository root:

```sh
# 1. Install
npm ci

# 2. Build the Cloud Functions and start the emulators (leave running).
#    The first run downloads the emulator binaries.
npm run emulators

# 3. In a second terminal, once "All emulators ready!" appears:
npm run emulators:seed

# 4. In a third terminal, serve the app against the emulators:
npm run serve:emulators
```

Open http://localhost:4200 and sign in with email:

| Account             | Password   | Role    | What you see                                   |
| ------------------- | ---------- | ------- | ---------------------------------------------- |
| `admin@example.com` | `password` | `admin` | Admin > Users and Admin > Roles, full editing  |
| `user@example.com`  | `password` | `user`  | Home, profile and themes; admin pages redirect |

The Emulator UI at http://127.0.0.1:4000 shows the accounts, their custom
claims and the Firestore documents as you use the app.

### What the pieces are

- `npm run emulators` builds `usersrole-nx-functions` into
  `dist/apps/usersrole-nx-functions` and runs `firebase emulators:start
--project demo-usersrole-nx`. The emulator ports are in the `emulators` block
  of `firebase.json`.
- `npm run emulators:seed` runs `tools/scripts/seed-emulators.mjs`, which
  creates both accounts in the Auth emulator and sets their `roles` custom
  claim. Roles live only in that claim: the `api` function reads it from the
  ID token, and the app asks `api` for it. Re-running the seed resets the two
  accounts; it never duplicates them. The emulators keep no data between runs,
  so seed again after every restart.
- `npm run serve:emulators` is `nx serve usersrole-nx --configuration=emulators`,
  which swaps in `apps/usersrole-nx/src/environments/environment.emulators.ts`.
  Its `useEmulators: true` makes `app.config.ts` connect Auth, Firestore and
  Functions to the local emulators.
- Sign-up works in the emulator for any `@example.com` address, set by
  `apps/usersrole-nx-functions/.env.demo-usersrole-nx`. Any other domain is
  refused, which is the same gate described in
  [Close sign-up](#close-sign-up) below.
- Google and GitHub sign-in open the Auth emulator's fake-account screen
  instead of a real provider, so they work offline too.
- The Hosting emulator on port 5000 serves `dist/apps/usersrole-nx`. To try
  the production-style build against the emulators, run
  `npx nx build usersrole-nx --configuration=emulators` and open
  http://localhost:5000.

## 2. Deploying to your own project

Everything below runs against a project **you** own. Read the whole section
before creating anything: the billing kill switch goes in before the first
deploy, not after the first surprise bill.

You need the [Firebase CLI](https://firebase.google.com/docs/cli) (it is
already a devDependency: `npx firebase`) and the
[gcloud CLI](https://cloud.google.com/sdk/docs/install), both logged in as
yourself. The examples use these shell variables; set them to your own values:

```sh
PROJECT_ID=my-usersrole          # globally unique
BILLING_ACCOUNT=XXXXXX-XXXXXX-XXXXXX   # gcloud billing accounts list
REGION=us-central1
```

### Create the project

```sh
gcloud projects create "$PROJECT_ID"
npx firebase projects:addfirebase "$PROJECT_ID"
npx firebase apps:create web usersrole-nx --project "$PROJECT_ID"
```

In the Firebase console for the project:

- **Authentication**: get started, enable the Email/Password provider (and
  Google or GitHub if you want them), then **upgrade to Firebase
  Authentication with Identity Platform**. The `beforecreated` blocking
  function that gates sign-up cannot be deployed without that upgrade.
- **Firestore**: create a database (any location).
- **Storage**: only if you plan to store files. This app does not use it.

### Blaze, with a budget and a billing kill switch

Cloud Functions need the pay-as-you-go Blaze plan, and Blaze has no spending
cap of its own: a budget alert only sends email. The kill switch below turns a
budget into a hard stop by **unlinking billing from the project** when spend
passes the budget. That shuts down every paid service in the project, which is
the point -- a hobby deployment going dark is cheaper than one going viral.

Caveats, straight from Google's documentation on this pattern: budget
notifications lag real spend by hours, so you can overshoot the budget before
the switch trips; unlinking billing stops all paid resources and some may be
deleted; and relinking is a manual step. Set the budget well under what you can
afford to lose.

1. Link billing and enable the APIs the switch uses:

   ```sh
   gcloud billing projects link "$PROJECT_ID" --billing-account="$BILLING_ACCOUNT"
   gcloud services enable --project "$PROJECT_ID" \
     cloudbilling.googleapis.com billingbudgets.googleapis.com \
     pubsub.googleapis.com cloudfunctions.googleapis.com run.googleapis.com \
     cloudbuild.googleapis.com eventarc.googleapis.com
   ```

2. Create the topic the budget publishes to, and a budget scoped to this one
   project that publishes to it:

   ```sh
   gcloud pubsub topics create billing-kill-switch --project "$PROJECT_ID"

   gcloud billing budgets create \
     --billing-account="$BILLING_ACCOUNT" \
     --display-name="$PROJECT_ID cap" \
     --budget-amount=10USD \
     --filter-projects="projects/$PROJECT_ID" \
     --threshold-rule=percent=0.5 \
     --threshold-rule=percent=0.9 \
     --threshold-rule=percent=1.0 \
     --notifications-rule-pubsub-topic="projects/$PROJECT_ID/topics/billing-kill-switch"
   ```

   The thresholds only drive the email alerts. The budget publishes its
   current spend to the topic several times a day regardless, and the function
   decides.

3. Give the switch its own service account, allowed to unlink billing from
   this project and nothing else. `roles/billing.projectManager` on the project
   is enough to remove its billing account; Google's own walkthrough grants
   Billing Account Administrator on the whole billing account instead, which
   also works but reaches every project on that account.

   ```sh
   gcloud iam service-accounts create billing-kill-switch --project "$PROJECT_ID"
   SA="billing-kill-switch@$PROJECT_ID.iam.gserviceaccount.com"
   gcloud projects add-iam-policy-binding "$PROJECT_ID" \
     --member="serviceAccount:$SA" --role=roles/billing.projectManager
   ```

4. Save the function outside this repository, in its own directory
   (`billing-kill-switch/`):

   `package.json`

   ```json
   {
     "name": "billing-kill-switch",
     "private": true,
     "main": "index.js",
     "dependencies": {
       "@google-cloud/billing": "^6.1.0",
       "@google-cloud/functions-framework": "^5.0.0"
     }
   }
   ```

   `index.js`

   ```js
   const functions = require('@google-cloud/functions-framework');
   const { CloudBillingClient } = require('@google-cloud/billing');

   const projectName = `projects/${process.env.TARGET_PROJECT_ID}`;
   const billing = new CloudBillingClient();

   functions.cloudEvent('stopBilling', async (event) => {
     const budget = JSON.parse(Buffer.from(event.data.message.data, 'base64').toString());
     if (budget.costAmount <= budget.budgetAmount) {
       console.log(`Under budget: ${budget.costAmount} of ${budget.budgetAmount}`);
       return;
     }
     const [info] = await billing.getProjectBillingInfo({ name: projectName });
     if (!info.billingEnabled) {
       console.log('Billing already disabled');
       return;
     }
     // An empty billing account name unlinks billing from the project.
     await billing.updateProjectBillingInfo({
       name: projectName,
       projectBillingInfo: { billingAccountName: '' },
     });
     console.log(`Billing disabled: spent ${budget.costAmount} of ${budget.budgetAmount}`);
   });
   ```

5. Deploy it, triggered by the topic and running as that service account:

   ```sh
   cd billing-kill-switch
   gcloud functions deploy billing-kill-switch \
     --project "$PROJECT_ID" --region "$REGION" --gen2 \
     --runtime nodejs22 --source . --entry-point stopBilling \
     --trigger-topic billing-kill-switch \
     --service-account "$SA" \
     --set-env-vars "TARGET_PROJECT_ID=$PROJECT_ID"
   ```

6. Prove it is wired without tripping it: publish an under-budget message and
   check the log says so.

   ```sh
   gcloud pubsub topics publish billing-kill-switch --project "$PROJECT_ID" \
     --message '{"costAmount": 0, "budgetAmount": 10}'
   gcloud functions logs read billing-kill-switch \
     --project "$PROJECT_ID" --region "$REGION" --limit 5
   ```

   Look for `Under budget: 0 of 10`. Publishing `costAmount` above
   `budgetAmount` would really unlink billing; do that only if you want to
   rehearse relinking it (`gcloud billing projects link` again).

A project locked to its billing account cannot have billing disabled; new
projects are not locked.

### Harden the security rules

The original project kept the console's default Storage rule,
`allow read, write: if request.auth != null`, which lets any account that can
sign in read, overwrite or fill every object in the bucket. This repository
ships replacements, wired into `firebase.json` and enforced by the emulators
too:

- `storage.rules` -- each user may read and write only under `users/{uid}/`,
  uploads are capped at 5 MB, and every other path is denied.
- `firestore.rules` -- each user may read and write only their own
  `users/{uid}` document (the app keeps theme preferences there), and every
  other path is denied.

Deploy them before anything else:

```sh
npx firebase deploy --only firestore:rules,storage --project "$PROJECT_ID"
```

If you did not set up Storage, use `--only firestore:rules`.

### Close sign-up

The original deployment let anyone create an account, both through the
sign-up page (which calls `POST /users` on the `api` function) and through a
first Google or GitHub sign-in. Both paths now check one allow-list, the
`SIGNUP_ALLOWED_EMAILS` parameter:

- `beforecreated` (the blocking function) rejects any new account whose email
  is not on the list -- this covers the client SDK and provider sign-ins.
- `POST /users` checks the same list, because the Admin SDK it uses skips
  blocking functions.
- Accounts an admin creates from Admin > Users (`POST /users/admin`) are not
  gated; admins can invite anyone.

The list is comma-separated full addresses or whole domains:

```sh
# apps/usersrole-nx-functions/.env.<your project id>
SIGNUP_ALLOWED_EMAILS=you@example.com,@your-company.example
```

Put that file next to `.env.demo-usersrole-nx`; the functions build copies
every `.env.*` file into the deployed bundle, and Firebase loads only the one
named after the project being deployed. Leaving the parameter empty -- its
default -- closes sign-up entirely: only the accounts an admin creates, or that
you create yourself in the console, can sign in.

Your own first account needs the `admin` role before anyone can manage roles
from the app. Create it in the console, then set the claim once with a
short Admin SDK script using your own credentials
(`gcloud auth application-default login`):

```js
// node set-admin.mjs <uid>
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

initializeApp({ projectId: process.env.PROJECT_ID });
await getAuth().setCustomUserClaims(process.argv[2], { roles: ['admin'] });
```

### Roles can only be changed by an admin

`PATCH /users/:id` lets a user edit their own record (the `allowSameUser`
rule), and the request body carries a `roles` field. Writing that field into
the account's claims for every caller would let any signed-in user promote
themselves to `admin`. The endpoint now applies a `roles` change only when the
**caller's** own token carries the `admin` claim; a non-admin self-edit still
updates profile fields but its `roles` field is ignored. Nothing to configure
-- it holds in the emulator and in your own deployment -- but keep it in mind
if you extend the user API: gate any privilege change on who is asking, never
on which record is being touched.

### Point the code at your project

Every reference to the retired project has to become yours:

1. **`.firebaserc`** -- set `projects.default` to `$PROJECT_ID`, and replace
   the `users-role-nx` hosting target with your own site (usually also
   `$PROJECT_ID`):

   ```sh
   npx firebase use "$PROJECT_ID"
   npx firebase target:apply hosting usersrole-nx "$PROJECT_ID"
   ```

   Then delete the old `users-role-nx` entry from `targets`. Keep the
   `demo-usersrole-nx` entries; the emulators use them.

2. **`apps/usersrole-nx/src/environments/environment.ts`** and
   **`environment.development.ts`** -- replace the `firebase` block with your
   web app's config:

   ```sh
   npx firebase apps:sdkconfig web --project "$PROJECT_ID"
   ```

   Leave `functionsBaseUrl` for step 4.

3. **`apps/usersrole-nx-functions/src/main.ts`** -- replace the two
   `users-role-nx` origins in `allowedOrigins` with your hosting domains
   (`https://$PROJECT_ID.web.app`, `https://$PROJECT_ID.firebaseapp.com`).

4. **Deploy the functions**, then copy the `api` URL from the output into
   `functionsBaseUrl` in both environment files:

   ```sh
   npx nx deploy usersrole-nx-functions
   ```

5. **Deploy hosting**:

   ```sh
   npx nx deploy usersrole-nx
   ```

6. **Lock down the browser API key**: in Google Cloud console > APIs &
   Services > Credentials, restrict the web API key to HTTP referrers
   `https://$PROJECT_ID.web.app/*` and `https://$PROJECT_ID.firebaseapp.com/*`.
   In Firebase console > Authentication > Settings, remove any authorized
   domain you do not serve from.

7. **CI**: `.github/workflows/release.yml` and `deploy-functions.yml` deploy
   to `users-role-nx` with the `FIREBASE_SERVICE_ACCOUNT_USERS_ROLE_NX`
   secret. Either delete them and deploy by hand as above, or change the
   project ID, hosting URL and secret name to yours.

### Checklist

- [ ] Budget scoped to the project, publishing to `billing-kill-switch`
- [ ] Kill-switch function deployed and its under-budget test logged
- [ ] `firestore.rules` and `storage.rules` deployed
- [ ] `SIGNUP_ALLOWED_EMAILS` set for your project, or deliberately empty
- [ ] `.firebaserc`, both environment files and `allowedOrigins` point at
      your project
- [ ] Browser API key restricted to your domains
