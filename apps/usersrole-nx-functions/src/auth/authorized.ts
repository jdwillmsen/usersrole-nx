/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from 'express';
import { Role } from '@usersrole-nx/shared';

export function isAuthorized(opts: {
  hasRole: Array<Role>;
  allowSameUser?: boolean;
}) {
  return (req: Request, res: Response, next: Function) => {
    const { roles, uid } = res.locals;
    const { id } = req.params;

    // Only for testing purposes
    // return next();

    if (opts.allowSameUser && id && uid === id) {
      return next();
    }

    if (!roles) {
      return res.status(403).send();
    }

    if (opts.hasRole.some((role) => roles.includes(role))) {
      return next();
    }

    return res.status(403).send();
  };
}
