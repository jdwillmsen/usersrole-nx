import type { Request, Response } from 'express';

const updateUser = jest.fn();
const setCustomUserClaims = jest.fn();
const getUser = jest.fn();

jest.mock('firebase-admin/auth', () => ({
  getAuth: () => ({ updateUser, setCustomUserClaims, getUser }),
}));

import { patch } from './controller';

const TARGET_UID = 'target-uid';

function targetRecord(roles: string[]) {
  return {
    uid: TARGET_UID,
    email: 'target@example.com',
    displayName: 'Target',
    customClaims: { roles },
    metadata: { lastSignInTime: '', creationTime: '' },
  };
}

function requestPromoting(): Request<{ id: string }> {
  return {
    params: { id: TARGET_UID },
    body: {
      displayName: 'Target',
      password: 'password',
      email: 'target@example.com',
      roles: ['admin'],
    },
  } as unknown as Request<{ id: string }>;
}

function responseFor(callerRoles: unknown): Response {
  const res = {
    locals: { uid: 'caller-uid', roles: callerRoles },
  } as unknown as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}

describe('patch role gate', () => {
  beforeEach(() => jest.clearAllMocks());

  it('does not change claims when a non-admin edits and sends roles', async () => {
    getUser.mockResolvedValue(targetRecord(['user']));

    await patch(requestPromoting(), responseFor(['user']));

    expect(updateUser).toHaveBeenCalledWith(TARGET_UID, {
      displayName: 'Target',
      password: 'password',
      email: 'target@example.com',
    });
    expect(setCustomUserClaims).not.toHaveBeenCalled();
  });

  it('applies the roles when an admin edits', async () => {
    getUser.mockResolvedValue(targetRecord(['manager']));

    await patch(requestPromoting(), responseFor(['admin']));

    expect(setCustomUserClaims).toHaveBeenCalledWith(TARGET_UID, {
      roles: ['admin'],
    });
  });
});
