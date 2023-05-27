import express, { Request, Response } from 'express';
import type { Vehicle } from '@prisma/client';
import { uuidSchema } from '../validationSchemas/common';
import { receivedRequestResponse, sendBadRequestResponse } from '../../repositories/common/responses';
import deleteVehicle from '../../repositories/vehicle/delete';

const app = express();

const deleteSpecificVehicle = app.delete('/vehicle/:id', async (req: Request, res: Response) => {
  // a ID of vehicle
  const params = uuidSchema.safeParse(req.params);
  // contains a UUID of user (in future a cookie of user, basically a UUID again :))
  const body = uuidSchema.safeParse(req.body);
  if (!params.success) {
    return sendBadRequestResponse(res, params.error.message);
  }
  if (!body.success) {
    return sendBadRequestResponse(res, body.error.message);
  }
  const output = await deleteVehicle({ userId: body.data.id, vehicleId: params.data.id });
  if (output.isErr) {
    return sendBadRequestResponse(res, output.error.message);
  }
  const result: Vehicle = output.unwrap();
  return receivedRequestResponse(res, result);
});

export default deleteSpecificVehicle;