import type { Request, Response } from 'express';
import { notFoundRequestResponse, receivedRequestResponse } from '../../repositories/common/responses';
import read from '../../repositories/brand/read';

const readBrands = async (_req: Request, res: Response) => {
  const output = await read();
  if (output.isErr) {
    return notFoundRequestResponse(res);
  }
  const result = output.unwrap();

  return receivedRequestResponse(res, result);
};

export default readBrands;
