import type { Request, Response, NextFunction } from 'express';
import type { Role } from '@prisma/client';
import { forbiddenRequestResponse, unauthorizedRequestResponse } from '../repositories/common/responses';

const auth = (...role: Role[]) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.user) {
    return unauthorizedRequestResponse(res, 'Unauthorized');
  }

  if (role.length > 0 && !role.includes(req.session.user.role)) {
    return forbiddenRequestResponse(res, 'Forbidden');
  }
  return next();
};

export default auth;
