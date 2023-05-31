import type { Request, Response } from 'express';
import uuidSchema from '../validationSchemas/common';
import { createFaultSchema } from '../validationSchemas/fault';
import {
  backendErrorRequestResponse,
  createdSuccessRequestResponse,
  forbiddenRequestResponse,
  notFoundRequestResponse,
  sendBadRequestResponse,
} from '../../repositories/common/responses';
import create from '../../repositories/fault/create';
import { DeletedRecordError, NonexistentRecordError, WrongOwnershipError } from '../../repositories/common/error';

const createFault = async (req : Request, res : Response) => {
  const bodyData = createFaultSchema.safeParse(req.body);
  const paramsData = uuidSchema.safeParse(req.params);
  if (!bodyData.success) {
    return sendBadRequestResponse(res, 'Invalid Body');
  }
  if (!paramsData.success) {
    return sendBadRequestResponse(res, 'Invalid Params');
  }

  const output = await create({
    userId: req.session.user!.id,
    description: bodyData.data.description,
    vehicleId: paramsData.data.id,
  });
  if (output.isErr) {
    if (output.error instanceof NonexistentRecordError
      || output.error instanceof DeletedRecordError) {
      return notFoundRequestResponse(res);
    }
    if (output.error instanceof WrongOwnershipError) {
      return forbiddenRequestResponse(res, 'Forbidden');
    }
    return backendErrorRequestResponse(res);
  }
  return createdSuccessRequestResponse(res, output.unwrap());
};

export default createFault;
