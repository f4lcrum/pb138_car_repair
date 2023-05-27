import express, { Request, Response } from 'express';
import { uuidSchema } from '../validationSchemas/common';
import { createFaultSchema } from '../validationSchemas/fault';
import { backendErrorRequestResponse, createdSuccessRequestResponse, sendBadRequestResponse } from '../../repositories/common/responses';
import create from '../../repositories/fault/create';

const app = express();

const createFault = app.post('/fault/:id', async (req : Request, res : Response) => {
  const bodyData = createFaultSchema.safeParse(req.body);
  const paramsData = uuidSchema.safeParse(req.params);
  if (!bodyData.success) {
    return sendBadRequestResponse(res, 'Invalid Body');
  }
  if (!paramsData.success) {
    return sendBadRequestResponse(res, 'Invalid Params');
  }

  const output = await create({
    userId: bodyData.data.userId,
    description: bodyData.data.description,
    vehicleId: paramsData.data.id,
  });
  if (output.isErr) {
    return backendErrorRequestResponse(res);
  }
  return createdSuccessRequestResponse(res, output.unwrap());
});

export default createFault;