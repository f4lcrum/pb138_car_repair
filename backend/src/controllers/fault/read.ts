import type { Request, Response } from 'express';
import uuidSchema from '../validationSchemas/common';
import { backendErrorRequestResponse, receivedRequestResponse, sendBadRequestResponse } from '../../repositories/common/responses';
import read from '../../repositories/fault/read';

const readFault = async (req: Request, res: Response) => {
  const parsedParams = uuidSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return sendBadRequestResponse(res, 'Invalid params');
  }
  const output = await read({ id: req.session.user!.id, vehicleId: parsedParams.data.id });
  if (output.isErr) {
    return backendErrorRequestResponse(res);
  }
  const result = output.unwrap();
  return receivedRequestResponse(res, result);
};

export default readFault;
