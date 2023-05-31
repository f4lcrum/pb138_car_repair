import { Result } from '@badrap/result';
import { genericError } from '../common/types';
import type { VehicleCreateData, VehicleCreateResult } from './types';
import client from '../client';

const create = async (data: VehicleCreateData): VehicleCreateResult => {
  try {
    const createdAt: Date = new Date();
    return await client.$transaction(async (tx) => {
      const result = await tx.vehicle.create({
        data: {
          ...data,
          createdAt,
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
