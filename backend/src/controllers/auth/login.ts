import type { Request, Response } from 'express';
import argon2 from 'argon2';
import { userLoginSchema } from '../validationSchemas/user';
import {
  backendErrorRequestResponse,
  receivedRequestResponse,
  sendBadRequestResponse,
} from '../../repositories/common/responses';
import userInfo from '../../repositories/auth/login';
import { genericError } from '../../repositories/common/types';

const login = async (req : Request, res : Response) => {
  try {
    const result = await userLoginSchema.safeParseAsync(req.body);
    if (!result.success) {
      return sendBadRequestResponse(res, 'Invalid Body');
    }

    const { email, password } = result.data;
    const output = await userInfo({ email });
    if (output.isErr) {
      return backendErrorRequestResponse(res);
    }
    const user = output.unwrap();
    if (user === null) {
      return sendBadRequestResponse(res, 'Wrong mail or password');
    }
    const isVerified = await argon2.verify(user.password, password);
    if (!isVerified) {
      return sendBadRequestResponse(res, 'Wrong mail or password');
    }
    req.session.user = { id: user.id, role: user.role };
    return receivedRequestResponse(res, { message: 'Logged in' });
  } catch (e) {
    return genericError;
  }
};

export default login;
