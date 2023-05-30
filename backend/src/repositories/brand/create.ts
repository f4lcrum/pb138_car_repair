import { Result } from '@badrap/result';
import { genericError } from '../common/types';
import client from '../client';
import type { BrandCreateData, BrandCreateResult } from './types';

const create = async (data: BrandCreateData): BrandCreateResult => {
  try {
    return await client.$transaction(async (tx) => {
      const result = await tx.brand.create({
        data,
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
