import type { Request, Response } from 'express';
import uuidSchema from '../validationSchemas/common';
import { createFaultSchema } from '../validationSchemas/fault';
import {
  createdSuccessRequestResponse,
  sendBadRequestResponse,
} from '../../repositories/common/responses';
import create from '../../repositories/fault/create';
import { errorResponsesHandle } from '../../repositories/common/common';

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
    name: bodyData.data.name,
    mileage: bodyData.data.mileage,
    vehicleId: paramsData.data.id,
  });
  if (output.isErr) {
    return errorResponsesHandle(res, output.error);
  }
  return createdSuccessRequestResponse(res, output.unwrap());
};

export default createFault;
