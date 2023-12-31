import type { Request, Response } from 'express';
import { all } from '../../repositories/vehicle/read';
import { notFoundRequestResponse, receivedRequestResponse, sendBadRequestResponse } from '../../repositories/common/responses';
import { vehicleReadManySchema } from '../validationSchemas/vehicle';

const readVehicles = async (req: Request, res: Response) => {
  const parsedQueryParams = vehicleReadManySchema.safeParse(req.query);
  if (!parsedQueryParams.success) {
    return sendBadRequestResponse(res, 'Invalid Query');
  }
  const output = await all({ userId: req.session.user!.id, ...req.query });
  if (output.isErr) {
    return notFoundRequestResponse(res, output.error.message);
  }
  const result = output.unwrap();
  return receivedRequestResponse(res, result);
};

export default readVehicles;
