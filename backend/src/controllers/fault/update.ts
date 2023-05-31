import type { Request, Response } from 'express';
import uuidSchema from '../validationSchemas/common';
import { updateFaultSchema } from '../validationSchemas/fault';
import {
  backendErrorRequestResponse,
  forbiddenRequestResponse,
  notFoundRequestResponse,
  receivedRequestResponse,
  sendBadRequestResponse,
  unauthorizedRequestResponse,
} from '../../repositories/common/responses';
import update from '../../repositories/fault/update';
import {
  NonexistentRecordError, TechnicianNotVerifiedError, UnauthorizedError, WrongOwnershipError,
} from '../../repositories/common/error';

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
      return notFoundRequestResponse(res);
    }
    if (output.error instanceof UnauthorizedError) {
      return unauthorizedRequestResponse(res, output.error.message);
    }
    if (output.error instanceof WrongOwnershipError
      || output.error instanceof TechnicianNotVerifiedError) {
      return forbiddenRequestResponse(res, 'Forbidden');
    }
    return backendErrorRequestResponse(res);
  }

  const result = output.unwrap();
  return receivedRequestResponse(res, result);
};

export default updateFault;
