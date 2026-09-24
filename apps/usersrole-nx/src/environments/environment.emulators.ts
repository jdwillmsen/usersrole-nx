import { Environment } from '@usersrole-nx/core';

// A `demo-` project ID is one the emulators recognise as having no real
// backing project, so nothing in this configuration can reach Google Cloud
// even if an emulator is not running.
const projectId = 'demo-usersrole-nx';

export const environment: Environment = {
  production: false,
  useEmulators: true,
  firebase: {
    projectId,
    apiKey: 'demo-api-key',
    authDomain: `${projectId}.firebaseapp.com`,
    storageBucket: `${projectId}.appspot.com`,
    appId: 'demo-app-id',
  },
  functionsBaseUrl: `http://127.0.0.1:5001/${projectId}/us-central1/api`,
};
