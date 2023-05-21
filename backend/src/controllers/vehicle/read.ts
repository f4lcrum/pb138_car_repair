import express, { Request, Response } from 'express';
import type { Vehicle } from '@prisma/client';
import { uuidSchema } from '../validationSchemas/common';
import all from '../../repositories/vehicle/read';
import { notFoundRequestResponse, receivedRequestResponse, sendBadRequestResponse } from '../../repositories/common/responses';

const app = express();

const readVehicles = app.get('/vehicle', async (req: Request, res: Response) => {
  const parsedData = uuidSchema.safeParse(req.body);
  if (!parsedData.success) {
    return sendBadRequestResponse(res, 'Invalid input data');
  }
  const output = await all({ userId: parsedData.data.id });
  if (output.isErr) {
    return notFoundRequestResponse(res);
  }
  const result : Vehicle[] = output.unwrap();
  return receivedRequestResponse(res, result);
});

export default readVehicles;
