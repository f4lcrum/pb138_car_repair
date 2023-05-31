import { Result } from '@badrap/result';
import { genericError } from '../common/types';
import client from '../client';
import type { BrandModelCreateResult, BrandModelCreatedata } from './types';
import { NonexistentRecordError } from '../common/error';

const create = async (data: BrandModelCreatedata): BrandModelCreateResult => {
  try {
    return await client.$transaction(async (tx) => {
      const brandCheck = await tx.brand.findUnique({
        where: {
          id: data.brandId,
        },
      });
      if (brandCheck === null) {
        return Result.err(new NonexistentRecordError('Given brand does not exist!'));
      }
      const result = await tx.brandModel.create({
        data,
        select: {
          id: true,
          brandId: true,
          name: true,
        },
      });
      return Result.ok(result);
    });
  } catch (err) {
    if (err instanceof Error) {
      return Result.err(err);
    }
    return genericError;
  }
};

export default create;
