import type { Request, Response } from 'express';
import {
  createdSuccessRequestResponse,
  sendBadRequestResponse,
} from '../../repositories/common/responses';
import verifyTechnician from '../../repositories/admin/verify';
import { errorResponsesHandle } from '../../repositories/common/common';
import uuidSchema from '../validationSchemas/common';

const verify = async (req: Request, res : Response) => {
  const bodyData = uuidSchema.safeParse(req.params);
  if (!bodyData.success) {
    return sendBadRequestResponse(res, 'Invalid Params');
  }
  const output = await verifyTechnician({ id: bodyData.data.id });
  if (output.isErr) {
    return errorResponsesHandle(res, output.error);
  }
  const user = output.unwrap();
  return createdSuccessRequestResponse(res, { item: user, message: `User ${user.id.toString()} is verified` });
};

export default verify;
