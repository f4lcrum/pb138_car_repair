import type { Request, Response } from 'express';
import { errorResponsesHandle } from '../../repositories/common/common';
import { receivedRequestResponse, sendBadRequestResponse } from '../../repositories/common/responses';
import { all } from '../../repositories/fault/read';
import { readAllFaultSchema } from '../validationSchemas/fault';

const readAllFaults = async (req: Request, res: Response) => {
  const parseBodyResult = readAllFaultSchema.safeParse(req.query);
  if (!parseBodyResult.success) {
    return sendBadRequestResponse(res, 'Invalid body');
  }
  const output = await all(
    { technicianId: req.session.user!.id, unresolved: parseBodyResult.data.unresolved },
  );
  if (output.isErr) {
    return errorResponsesHandle(res, output.error);
  }
  const result = output.unwrap();
  return receivedRequestResponse(res, result);
};

export default readAllFaults;
