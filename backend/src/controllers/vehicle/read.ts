import express, { Request, Response } from 'express';
import { Role, Vehicle } from '@prisma/client';
 // import { uuidSchema } from '../validationSchemas/common';
import {all} from '../../repositories/vehicle/read';
import { notFoundRequestResponse, receivedRequestResponse, sendBadRequestResponse } from '../../repositories/common/responses';
import auth from '../../middleware/authMiddleware';
import { vehicleReadManySchema } from '../validationSchemas/vehicle';


const app = express();


const readVehicles = app.get('/auth/vehicle', auth(Role.CLIENT, Role.ADMIN), async (req: Request, res: Response) => {

  const parsedBodyParams = vehicleReadManySchema.safeParse(req.body);
  if (!parsedBodyParams.success) {
    return sendBadRequestResponse(res, 'Invalid Body');
  };
  const output = await all({ userId: req.session.user!.id, ...req.body});
  if (output.isErr) {
    return notFoundRequestResponse(res);
  }
  const result : Vehicle[] = output.unwrap();
  console.log(result);
  return receivedRequestResponse(res, result);
});

export default readVehicles;
