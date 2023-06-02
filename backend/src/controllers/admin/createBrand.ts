import type { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import {
  createdSuccessRequestResponse, notFoundRequestResponse, sendBadRequestResponse,
} from '../../repositories/common/responses';
import create from '../../repositories/admin/createBrand';
import { createBrandSchema } from '../validationSchemas/admin';

const createBrand = async (req: Request, res: Response) => {
  const bodyData = createBrandSchema.safeParse(req.body);

  if (!bodyData.success) {
    return sendBadRequestResponse(res, 'Invalid Body');
  }
  const output = await create({ ...req.body });
  if (output.isErr) {
    if (output.error instanceof Prisma.PrismaClientKnownRequestError && output.error.code === 'P2002') {
      return sendBadRequestResponse(res, 'Brand with given name already exists!');
    }
    return notFoundRequestResponse(res);
  }
  const result = output.unwrap();
  return createdSuccessRequestResponse(res, result);
};

export default createBrand;
