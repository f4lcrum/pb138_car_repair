import express, { Request, Response } from 'express';
import { Role, Vehicle } from '@prisma/client';
 // import { uuidSchema } from '../validationSchemas/common';
import {all} from '../../repositories/vehicle/read';
import { notFoundRequestResponse, receivedRequestResponse } from '../../repositories/common/responses';
import auth from '../../middleware/authMiddleware';


const app = express();

const readVehicles = app.get('/vehicle', auth(Role.CLIENT, Role.ADMIN), async (req: Request, res: Response) => {
  //const parsedData = uuidSchema.safeParse(req.body);
  //if (!parsedData.success) {
  //  return sendBadRequestResponse(res, 'Invalid input data');
  //}
  const output = await all({ userId: req.session.user!.id});
  if (output.isErr) {
    return notFoundRequestResponse(res);
  }
  const result : Vehicle[] = output.unwrap();
  return receivedRequestResponse(res, result);
});

export default readVehicles;
