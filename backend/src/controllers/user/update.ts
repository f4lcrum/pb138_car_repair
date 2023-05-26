import express, { Request, Response } from 'express';
import { uuidSchema } from '../validationSchemas/common';
import { backendErrorRequestResponse, receivedRequestResponse, sendBadRequestResponse } from '../../repositories/common/responses';
import update from '../../repositories/user/update';
import { updateUserSchema } from '../validationSchemas/user';

const app = express();

// not sure about this path:
const updateUser = app.patch('/user/:id', async (req: Request, res: Response) => {
  const parsedBodyData = updateUserSchema.safeParse(req.body);
  const parsedParamsData = uuidSchema.safeParse(req.params);

  if (!parsedBodyData.success) {
    return sendBadRequestResponse(res, "Invalid body");
  };
  if (!parsedParamsData.success) {
    return sendBadRequestResponse(res, 'Invalid Params');
  };
  const output = await update({
    ...parsedBodyData.data,
    ...parsedParamsData.data,
  });
  if (output.isErr) {
    return backendErrorRequestResponse(res);
  };

  const result = output.unwrap();
  return receivedRequestResponse(res, result);

});

export default updateUser;