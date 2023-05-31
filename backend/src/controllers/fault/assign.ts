import type { Request, Response } from 'express';
import uuidSchema from '../validationSchemas/common';
import {
  AlreadyAssigned,
  DeletedRecordError,
  NonexistentRecordError,
  TechnicianNotVerifiedError,
} from '../../repositories/common/error';
import {
  backendErrorRequestResponse,
  forbiddenRequestResponse,
  notFoundRequestResponse,
  receivedRequestResponse,
  sendBadRequestResponse,
} from '../../repositories/common/responses';
import { errorResponsesHandle } from '../../repositories/common/common';

const assignFault = async (req: Request, res: Response) => {
  const parsedParams = uuidSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return sendBadRequestResponse(res, 'Invalid params');
  }
  const output = await assign(
    { technicianId: req.session.user!.id, faultId: parsedParams.data.id },
  );
  if (output.isErr) {
    return errorResponsesHandle(res, output.error);
  }
  const result = output.unwrap();
  return receivedRequestResponse(res, result);
};

export default assignFault;
