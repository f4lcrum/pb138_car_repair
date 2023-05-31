import type { Request, Response } from 'express';
import {
  createdSuccessRequestResponse,
  sendBadRequestResponse,
} from '../../repositories/common/responses';
import { verifyTechnicianSchema } from '../validationSchemas/admin';
import verifyTechnician from '../../repositories/admin/verify';
import { errorResponsesHandle } from '../../repositories/common/common';

const verify = async (req: Request, res : Response) => {
  const bodyData = verifyTechnicianSchema.safeParse(req.query);
  if (!bodyData.success) {
    return sendBadRequestResponse(res, 'Invalid Query');
  }
  const output = await verifyTechnician({ email: bodyData.data.email });
  if (output.isErr) {
    return errorResponsesHandle(res, output.error);
  }
  const user = output.unwrap();
  return createdSuccessRequestResponse(res, { item: user, message: `User ${user.email.toString()} is verified` });
};

export default verify;
