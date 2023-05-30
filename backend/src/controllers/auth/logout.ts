import type { Request, Response } from 'express';
import { receivedRequestResponse } from '../../repositories/common/responses';
import { genericError } from '../../repositories/common/types';

const logout = async (req : Request, res : Response) => {
  try {
    req.session.destroy(() => {});
    return receivedRequestResponse(res, { message: 'Logged out' });
  } catch (e) {
    return genericError;
  }
};

export default logout;
