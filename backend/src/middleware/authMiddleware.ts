import type { Request, Response, NextFunction } from "express";
import type { Role } from "@prisma/client";

const auth = (...role: Role[]) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.user) {
    // TODO: REPLACE WITH ALREADY WRITTEN RESPONSE
    res.status(401).json({ message: 'Unauthorized'});
    return;
  }

  if (role.length > 0 && !role.includes(req.session.user.role)) {
    // TODO: REPLACE WITH ALREADY WRITTEN RESPONSE
    res.status(403).json({ message: 'Forbidden'});
    return;
  }
  next();
}

export default auth;