import { Request, Response } from 'express';
import { getAuth, UserRecord } from 'firebase-admin/auth';
import { isSignupAllowed, signupAllowedEmails } from '../auth/signup-allowlist';
import { isAdmin } from '../auth/roles';

// Express 5 types a route parameter as string | string[], because a parameter
// can legitimately repeat in a query-style route. These routes declare :id
// once, so naming the shape here is what tells the compiler that -- rather
// than casting at each use and asserting something the route already
// guarantees.
type IdParam = { id: string };

export async function create(req: Request, res: Response) {
  try {
    const { displayName, password, email } = req.body;

    if (!displayName || !password || !email) {
      return res.status(400).send({ message: 'Missing fields' });
    }

    // The Admin SDK bypasses blocking functions, so the allow-list that
    // beforecreated enforces has to be checked here too.
    if (!isSignupAllowed(email, signupAllowedEmails.value())) {
      return res.status(403).send({ message: 'Sign-up is closed' });
    }

    const { uid } = await getAuth().createUser({
      displayName,
      password,
      email,
    });
    await getAuth().setCustomUserClaims(uid, { roles: ['user'] });

    return res.status(201).send({ uid });
  } catch (err) {
    return handleError(res, err);
  }
}

function handleError(res: Response, err: { code: never; message: never }) {
  return res.status(500).send({ message: `${err.code} - ${err.message}` });
}

export async function all(req: Request, res: Response) {
  try {
    const listUsers = await getAuth().listUsers();
    const users = listUsers.users.map(mapUser);
    return res.status(200).send({ users });
  } catch (err) {
    return handleError(res, err);
  }
}

function mapUser(user: UserRecord) {
  const customClaims = (user.customClaims || { roles: [] }) as {
    roles?: string[];
  };
  const roles = customClaims.roles ? customClaims.roles : [];
  return {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    roles,
    lastSignInTime: user.metadata.lastSignInTime,
    creationTime: user.metadata.creationTime,
  };
}

export async function get(req: Request<IdParam>, res: Response) {
  try {
    const { id } = req.params;
    const user = await getAuth().getUser(id);
    return res.status(200).send({ user: mapUser(user) });
  } catch (err) {
    return handleError(res, err);
  }
}

export async function patch(req: Request<IdParam>, res: Response) {
  try {
    const { id } = req.params;
    const { displayName, password, email, roles } = req.body;

    if (!id || !displayName || !password || !email || !roles) {
      return res.status(400).send({ message: 'Missing fields' });
    }

    await getAuth().updateUser(id, { displayName, password, email });
    // allowSameUser lets a user PATCH their own record here, so writing the
    // request's roles into their claims unconditionally would let anyone make
    // themselves admin. Only an admin caller may change roles; a self-edit
    // still updates profile fields, it just cannot touch privilege.
    if (isAdmin(res.locals.roles)) {
      await getAuth().setCustomUserClaims(id, { roles });
    }
    const user = await getAuth().getUser(id);

    return res.status(204).send({ user: mapUser(user) });
  } catch (err) {
    return handleError(res, err);
  }
}

export async function remove(req: Request<IdParam>, res: Response) {
  try {
    const { id } = req.params;
    await getAuth().deleteUser(id);
    return res.status(204).send({});
  } catch (err) {
    return handleError(res, err);
  }
}

export async function roles(req: Request<IdParam>, res: Response) {
  try {
    const { id } = req.params;
    const { roles } = req.body;
    if (!roles) {
      return res.status(400).send({ message: 'Missing fields' });
    }

    await getAuth().setCustomUserClaims(id, { roles });
    const user = await getAuth().getUser(id);

    return res.status(204).send({ user: mapUser(user) });
  } catch (err) {
    return handleError(res, err);
  }
}

export async function adminCreate(req: Request, res: Response) {
  try {
    const { displayName, password, email, roles } = req.body;

    if (!displayName || !password || !email || !roles) {
      return res.status(400).send({ message: 'Missing fields' });
    }

    const { uid } = await getAuth().createUser({
      displayName,
      password,
      email,
    });
    await getAuth().setCustomUserClaims(uid, { roles });

    return res.status(201).send({ uid });
  } catch (err) {
    return handleError(res, err);
  }
}
