import type { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import {
  backendErrorRequestResponse,
  createdSuccessRequestResponse,
  notFoundRequestResponse,
  sendBadRequestResponse,
} from '../../repositories/common/responses';
import uuidSchema from '../validationSchemas/common';
import { createBrandModelSchema } from '../validationSchemas/admin';
import create from '../../repositories/admin/createBrandModel';
import { NonexistentRecordError } from '../../repositories/common/error';

const createBrandModel = async (req: Request, res: Response) => {
  const paramsData = uuidSchema.safeParse(req.params);
  const bodyData = createBrandModelSchema.safeParse(req.body);
  if (!paramsData.success) {
    return sendBadRequestResponse(res, 'Invalid Params');
  }
  if (!bodyData.success) {
    return sendBadRequestResponse(res, 'Invalid Body');
  }
  const output = await create({
    brandId: req.params.id,
    ...req.body,
  });

  if (output.isErr) {
    if (output.error instanceof Prisma.PrismaClientKnownRequestError && output.error.code === 'P2002') {
      return sendBadRequestResponse(res, 'Brand model with given name already exists!');
    }
    if (output.error instanceof NonexistentRecordError) {
      return notFoundRequestResponse(res);
    }
    return backendErrorRequestResponse(res);
  }
  const result = output.unwrap();
  return createdSuccessRequestResponse(res, result);
};

export default createBrandModel;
