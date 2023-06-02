import type { Request, Response } from 'express';
import uuidSchema from '../validationSchemas/common';
import {
  receivedRequestResponse,
  sendBadRequestResponse,
} from '../../repositories/common/responses';
import read from '../../repositories/fault/read';
import { errorResponsesHandle } from '../../repositories/common/common';

const readFault = async (req: Request, res: Response) => {
  const parsedParams = uuidSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return sendBadRequestResponse(res, 'Invalid params');
  }
  const output = await read({ id: req.session.user!.id, vehicleId: parsedParams.data.id });
  if (output.isErr) {
    return errorResponsesHandle(res, output.error);
  }
  const result = output.unwrap();
  return receivedRequestResponse(res, result);
};

export default readFault;
