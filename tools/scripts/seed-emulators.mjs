// Creates the two accounts the emulator quick start signs in with. Safe to
// re-run: existing accounts are updated in place rather than duplicated.
//
// The emulator host is set here, before firebase-admin initialises, so this
// script can only ever talk to the local Auth emulator -- and the demo-
// project ID means even a missing emulator cannot fall through to Google.
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const projectId = 'demo-usersrole-nx';
process.env.FIREBASE_AUTH_EMULATOR_HOST ??= '127.0.0.1:9099';
process.env.GCLOUD_PROJECT = projectId;

// Roles live only in the `roles` custom claim; the functions API reads it from
// the ID token and the app asks the API for it. There is no Firestore copy.
const accounts = [
  {
    email: 'admin@example.com',
    password: 'password',
    displayName: 'Emulator Admin',
    roles: ['admin'],
  },
  {
    email: 'user@example.com',
    password: 'password',
    displayName: 'Emulator User',
    roles: ['user'],
  },
];

const auth = getAuth(initializeApp({ projectId }));

async function upsert({ email, password, displayName, roles }) {
  let uid;
  try {
    ({ uid } = await auth.getUserByEmail(email));
    await auth.updateUser(uid, { password, displayName });
  } catch (err) {
    if (err.code !== 'auth/user-not-found') throw err;
    ({ uid } = await auth.createUser({ email, password, displayName }));
  }
  await auth.setCustomUserClaims(uid, { roles });
  return { email, uid, roles };
}

try {
  for (const account of accounts) {
    const { email, uid, roles } = await upsert(account);
    console.log(`seeded ${email} (${uid}) roles=${roles.join(',')}`);
  }
  console.log('password for both accounts: password');
} catch (err) {
  console.error(
    `Seeding failed -- is the Auth emulator running on ${process.env.FIREBASE_AUTH_EMULATOR_HOST}? (npm run emulators)`,
  );
  console.error(err.message);
  process.exitCode = 1;
}
