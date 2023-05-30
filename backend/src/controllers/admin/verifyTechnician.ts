import type { Request, Response } from 'express';
import { backendErrorRequestResponse, receivedRequestResponse, sendBadRequestResponse } from '../../repositories/common/responses';
import verifyTechnicianSchema from '../validationSchemas/admin';
import verifyTechnician from '../../repositories/admin/verify';

const verify = async (req: Request, res : Response) => {
  const bodyData = verifyTechnicianSchema.safeParse(req.query);
  if (!bodyData.success) {
    return sendBadRequestResponse(res, 'Invalid Query');
  }
  const output = await verifyTechnician({ email: bodyData.data.email });
  if (output.isErr) {
    console.log(output.error.message);
    return backendErrorRequestResponse(res);
  }
  const user = output.unwrap();
  if (user === null) {
    return backendErrorRequestResponse(res);
  }
  return receivedRequestResponse(res, { item: user, message: `User ${user.email.toString()} is verified` });
};

export default verify;
