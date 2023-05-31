import type { Request, Response } from 'express';
import uuidSchema from '../validationSchemas/common';
import {
  backendErrorRequestResponse,
  forbiddenRequestResponse,
  notFoundRequestResponse,
  receivedRequestResponse,
  sendBadRequestResponse,
} from '../../repositories/common/responses';
import read from '../../repositories/fault/read';
import { DeletedRecordError, NonexistentRecordError, WrongOwnershipError } from '../../repositories/common/error';

const readFault = async (req: Request, res: Response) => {
  const parsedParams = uuidSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return sendBadRequestResponse(res, 'Invalid params');
  }
  const output = await read({ id: req.session.user!.id, vehicleId: parsedParams.data.id });
  if (output.isErr) {
    if (output.error instanceof DeletedRecordError
      || output.error instanceof NonexistentRecordError) {
      return notFoundRequestResponse(res);
    }
    if (output.error instanceof WrongOwnershipError) {
      return forbiddenRequestResponse(res, 'Forbidden');
    }
    return backendErrorRequestResponse(res);
  }
  const result = output.unwrap();
  return receivedRequestResponse(res, result);
};

export default readFault;
