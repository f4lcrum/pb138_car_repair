import type { Request, Response } from 'express';
import uuidSchema from '../validationSchemas/common';
import { updateFaultSchema } from '../validationSchemas/fault';
import {
  receivedRequestResponse,
  sendBadRequestResponse,
} from '../../repositories/common/responses';
import update from '../../repositories/fault/update';
import { errorResponsesHandle } from '../../repositories/common/common';

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
    return errorResponsesHandle(res, output.error);
  }

  const result = output.unwrap();
  return receivedRequestResponse(res, result);
};

export default updateFault;
