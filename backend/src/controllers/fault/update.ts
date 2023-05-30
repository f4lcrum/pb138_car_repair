import type { Request, Response } from 'express';
import uuidSchema from '../validationSchemas/common';
import { updateFaultSchema } from '../validationSchemas/fault';
import {
  backendErrorRequestResponse,
  receivedRequestResponse,
  sendBadRequestResponse,
  unauthorizedRequestResponse,
} from '../../repositories/common/responses';
import update from '../../repositories/fault/update';
import { NonexistentRecordError, UnauthorizedError, WrongOwnershipError } from '../../repositories/common/error';

const updateFault = async (req: Request, res: Response) => {
  const bodyData = updateFaultSchema.safeParse(req.body);
  const paramsData = uuidSchema.safeParse(req.params);

  if (!bodyData.success) {
    return sendBadRequestResponse(res, 'Invalid Body');
  }

  if (!paramsData.success) {
    return sendBadRequestResponse(res, 'Invalid Params');
  }

  const output = await update({
    technicianId: req.session.user!.id,
    ...paramsData.data,
    ...bodyData.data,
  });
  if (output.isErr) {
    if (output.error instanceof NonexistentRecordError) {
      return sendBadRequestResponse(res, output.error.message);
    }
    if (output.error instanceof UnauthorizedError || output.error instanceof WrongOwnershipError) {
      return unauthorizedRequestResponse(res, output.error.message);
    }

    return backendErrorRequestResponse(res);
  }

  const result = output.unwrap();
  return receivedRequestResponse(res, result);
};

export default updateFault;
