import type { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { userRegistrationSchema } from '../validationSchemas/user';
import { backendErrorRequestResponse, createdSuccessRequestResponse, sendBadRequestResponse } from '../../repositories/common/responses';
import registerUser from '../../repositories/auth/register';

const register = async (req : Request, res : Response) => {
  const result = await userRegistrationSchema.safeParseAsync(req.body);
  if (!result.success) {
    return sendBadRequestResponse(res, 'Invalid body data');
  }
  const output = await registerUser({ ...result.data });
  if (output.isErr) {
    if (output.error instanceof Prisma.PrismaClientKnownRequestError && output.error.code === 'P2002') {
      return sendBadRequestResponse(res, 'Email is already in use!');
    }
    return backendErrorRequestResponse(res);
  }
  const user = output.unwrap();
  if (user === null) {
    return backendErrorRequestResponse(res);
  }
  req.session.user = { id: user.id, role: user.role };
  const userInfo = {
    firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role,
  };
  return createdSuccessRequestResponse(res, { item: userInfo, message: `User ${userInfo.email.toString()} is authorized` });
};

export default register;
