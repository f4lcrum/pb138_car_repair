import type { Request, Response } from 'express';
import type { Vehicle } from '@prisma/client';
import {all} from '../../repositories/vehicle/read';
import { notFoundRequestResponse, receivedRequestResponse, sendBadRequestResponse } from '../../repositories/common/responses';
import { vehicleReadManySchema } from '../validationSchemas/vehicle';



const readVehicles = async (req: Request, res: Response) => {

  const parsedBodyParams = vehicleReadManySchema.safeParse(req.body);
  if (!parsedBodyParams.success) {
    return sendBadRequestResponse(res, 'Invalid Body');
  };
  const output = await all({ userId: req.session.user!.id, ...req.body});
  if (output.isErr) {
    return notFoundRequestResponse(res);
  }
  const result : Vehicle[] = output.unwrap();
  return receivedRequestResponse(res, result);
};

export default readVehicles;
