import type { Request, Response } from 'express';
import { backendErrorRequestResponse, notFoundRequestResponse, receivedRequestResponse } from '../../repositories/common/responses';
import read from '../../repositories/auth/read';

// info about current authentication
const readAuth = async (req : Request, res : Response) => {
  const output = await read({ req });
  if (output.isErr) {
    return backendErrorRequestResponse(res);
  }
  const user = output.unwrap();
  if (user === null) {
    return notFoundRequestResponse(res);
  }

  return receivedRequestResponse(res, { item: user, message: `User ${user.firstName.toString()} is authorized` });
};

export default readAuth;
