import { Result } from '@badrap/result';
import { genericError } from '../common/types';
import client from '../client';
import type { BrandCreateData, BrandCreateResult } from '../brand/types';

const create = async (data: BrandCreateData): BrandCreateResult => {
  try {
    return await client.$transaction(async (tx) => {
      const result = await tx.brand.create({
        data,
      });
      return Result.ok(result);
    });
  } catch (e) {
    if (e instanceof Error) {
      return Result.err(e);
    }
    return genericError;
  }
};

export default create;
