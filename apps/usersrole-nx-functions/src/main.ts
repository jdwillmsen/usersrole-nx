import { initializeApp } from 'firebase-admin/app';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { routesConfig } from './users/routes-config';
import { beforeUserCreated } from 'firebase-functions/v2/identity';
import { onRequest } from 'firebase-functions/v2/https';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3002;

initializeApp();
const app = express();
app.use(bodyParser.json());
// The API authenticates with a Bearer ID token, not cookies, so CORS is not
// the access control here -- it only stops arbitrary sites from calling the
// API from a visitor's browser. Any localhost port stays allowed because the
// development build and the Cypress e2e suite both call the deployed API
// (the dev server, file server and e2e runner use different ports).
const allowedOrigins: (string | RegExp)[] = [
  'https://users-role-nx.web.app',
  'https://users-role-nx.firebaseapp.com',
  /^http:\/\/localhost:\d+$/,
];
app.use(cors({ origin: allowedOrigins }));
app.set('trust proxy', 1);
routesConfig(app);

export const api = onRequest(app);
export const beforecreated = beforeUserCreated(() => {
  return {
    customClaims: {
      roles: ['user'],
    },
  };
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
