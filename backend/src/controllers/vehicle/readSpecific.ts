import type { Request, Response } from 'express';
import { vehicleReadSpecificSchema } from '../validationSchemas/vehicle';
import { backendErrorRequestResponse, receivedRequestResponse, sendBadRequestResponse } from '../../repositories/common/responses';
import { read } from '../../repositories/vehicle/read';
import type { VehicleReadOneData } from '../../repositories/vehicle/types';
import { NonexistentRecordError } from '../../repositories/common/error';

const readSpecificVehicle = async (req: Request, res: Response) => {
  const parsedQueryParams = vehicleReadSpecificSchema.safeParse(req.query);
  if (!parsedQueryParams.success) {
    return sendBadRequestResponse(res, 'Invalid Query');
  }
  const inputData : VehicleReadOneData = {};
  if (parsedQueryParams.data.licensePlate !== undefined) {
    inputData.licensePlate = parsedQueryParams.data.licensePlate;
  }
  if (parsedQueryParams.data.winCode !== undefined) {
    inputData.winCode = parsedQueryParams.data.winCode;
  }
  const output = await read(inputData);
  if (output.isErr) {
    if (output.error instanceof NonexistentRecordError) {
      return sendBadRequestResponse(res, output.error.message);
    }
    return backendErrorRequestResponse(res);
  }
  return receivedRequestResponse(res, output);
};

export default readSpecificVehicle;
