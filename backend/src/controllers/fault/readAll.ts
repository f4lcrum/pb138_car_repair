import type { Request, Response } from 'express';
import { errorResponsesHandle } from '../../repositories/common/common';
import { receivedRequestResponse } from '../../repositories/common/responses';
import { all } from '../../repositories/fault/read';

const readAllFaults = async (_req: Request, res: Response) => {
  const output = await all();
  if (output.isErr) {
    return errorResponsesHandle(res, output.error);
  }
  const result = output.unwrap();
  return receivedRequestResponse(res, result);
};

export default readAllFaults;
