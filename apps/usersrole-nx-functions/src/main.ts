import admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { routesConfig } from './users/routes-config';
import { beforeUserCreated } from 'firebase-functions/v2/identity';
import { onRequest } from 'firebase-functions/v2/https';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3002;

admin.initializeApp();
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));
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
