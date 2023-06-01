import type { Request, Response } from 'express';
import { Prisma, Vehicle } from '@prisma/client';
import { vehicleCreateSchema } from '../validationSchemas/vehicle';
import { backendErrorRequestResponse, createdSuccessRequestResponse, sendBadRequestResponse } from '../../repositories/common/responses';
import create from '../../repositories/vehicle/create';

const createVehicle = async (req: Request, res: Response) => {
  const parsedBody = vehicleCreateSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return sendBadRequestResponse(res, 'Invalid body');
  }

  const output = await create({ ownerId: req.session.user!.id, ...parsedBody.data });

  if (output.isErr) {
    if (output.error instanceof Prisma.PrismaClientKnownRequestError) {
      if (output.error.code === 'P2002') {
        return sendBadRequestResponse(res, 'Vehicle with given license plate or win code is already registered');
      }
      if (output.error.code === 'P2003') {
        return sendBadRequestResponse(res, 'Brand model does not exist!');
      }
    }
    return backendErrorRequestResponse(res);
  }
  const result: Vehicle = output.unwrap();
  return createdSuccessRequestResponse(res, result);
};

export default createVehicle;
