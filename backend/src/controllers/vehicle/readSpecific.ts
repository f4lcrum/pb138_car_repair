import type { Request, Response } from 'express';
import { vehicleReadSpecificSchema } from '../validationSchemas/vehicle';
import { receivedRequestResponse, sendBadRequestResponse } from '../../repositories/common/responses';
import { read } from '../../repositories/vehicle/read';
import type { VehicleReadOneData } from '../../repositories/vehicle/types';
import { errorResponsesHandle } from '../../repositories/common/common';

const readSpecificVehicle = async (req: Request, res: Response) => {
  const parsedQueryParams = vehicleReadSpecificSchema.safeParse(req.query);
  if (!parsedQueryParams.success) {
    return sendBadRequestResponse(res, 'Invalid Query');
  }
  const inputData : VehicleReadOneData = {
    ownerId: req.session.user!.id,
    ...req.query,
  };
  const output = await read(inputData);
  if (output.isErr) {
    return errorResponsesHandle(res, output.error);
  }
  return receivedRequestResponse(res, output.value);
};

export default readSpecificVehicle;
