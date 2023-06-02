import type { Request, Response } from 'express';
import type { Vehicle } from '@prisma/client';
import uuidSchema from '../validationSchemas/common';
import { receivedRequestResponse, sendBadRequestResponse } from '../../repositories/common/responses';
import deleteVehicle from '../../repositories/vehicle/delete';
import { errorResponsesHandle } from '../../repositories/common/common';

const deleteSpecificVehicle = async (req: Request, res: Response) => {
  // a ID of vehicle
  const params = uuidSchema.safeParse(req.params);
  if (!params.success) {
    return sendBadRequestResponse(res, params.error.message);
  }
  const output = await deleteVehicle({ userId: req.session.user!.id, vehicleId: params.data.id });
  if (output.isErr) {
    return errorResponsesHandle(res, output.error);
  }
  const result: Vehicle = output.unwrap();
  return receivedRequestResponse(res, result);
};

export default deleteSpecificVehicle;
