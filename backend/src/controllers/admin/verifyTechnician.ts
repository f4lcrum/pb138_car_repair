import type { Request, Response } from 'express';
import {
  backendErrorRequestResponse,
  createdSuccessRequestResponse,
  notFoundRequestResponse,
  sendBadRequestResponse,
} from '../../repositories/common/responses';
import { verifyTechnicianSchema } from '../validationSchemas/admin';
import verifyTechnician from '../../repositories/admin/verify';
import { AlreadyVerified, NonexistentRecordError, RoleError } from '../../repositories/common/error';

const verify = async (req: Request, res : Response) => {
  const bodyData = verifyTechnicianSchema.safeParse(req.query);
  if (!bodyData.success) {
    return sendBadRequestResponse(res, 'Invalid Query');
  }
  const output = await verifyTechnician({ email: bodyData.data.email });
  if (output.isErr) {
    if (output.error instanceof NonexistentRecordError) {
      return notFoundRequestResponse(res);
    }
    if (output.error instanceof AlreadyVerified || output.error instanceof RoleError) {
      return sendBadRequestResponse(res, output.error.message);
    }
    return backendErrorRequestResponse(res);
  }
  const user = output.unwrap();
  return createdSuccessRequestResponse(res, { item: user, message: `User ${user.email.toString()} is verified` });
};

export default verify;
