import type { Request, Response } from 'express';
import { backendErrorRequestResponse, receivedRequestResponse, sendBadRequestResponse } from '../../repositories/common/responses';
import update from '../../repositories/user/update';
import { updateUserSchema } from '../validationSchemas/user';

const updateUser = async (req: Request, res: Response) => {
  const parsedBodyData = updateUserSchema.safeParse(req.body);

  if (!parsedBodyData.success) {
    return sendBadRequestResponse(res, 'Invalid body');
  }

  const output = await update({
    ...parsedBodyData.data,
    id: req.session.user!.id,
  });
  if (output.isErr) {
    return backendErrorRequestResponse(res);
  }

  const result = output.unwrap();
  return receivedRequestResponse(res, result);
};

export default updateUser;
