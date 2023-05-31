import type { Request, Response } from 'express';
import { backendErrorRequestResponse, receivedRequestResponse } from '../../repositories/common/responses';
import readUnverifiedTechnicians from '../../repositories/admin/readUnverified';

const readUnverified = async (_req: Request, res: Response) => {
  const output = await readUnverifiedTechnicians();

  if (output.isErr) {
    return backendErrorRequestResponse(res);
  }
  const result = output.unwrap();
  return receivedRequestResponse(res, result);
};

export default readUnverified;
