import type { Request, Response } from 'express';
import { backendErrorRequestResponse, receivedRequestResponse } from '../../repositories/common/responses';

const logout = async (req : Request, res : Response) => {
  try {
    req.session.destroy(() => {});
    return receivedRequestResponse(res, { message: 'Logged out' });
  } catch (e) {
    return backendErrorRequestResponse(res);
  }
};

export default logout;
