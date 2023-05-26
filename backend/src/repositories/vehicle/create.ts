import { Result } from '@badrap/result';
import { genericError } from '../common/types';
import type { VehicleCreateData, VehicleCreateResult } from './types';
import client from '../client';

const deleteVehicle = async (data: VehicleCreateData): VehicleCreateResult => {
  try {
    // TODO: think if we need any other fields included, probs not
    return await client.$transaction(async (tx) => {
      const result = await tx.vehicle.create({
        data,
      });
      return Result.ok(result);
    })
  } catch (e) {
    return genericError;
  }
}

export default deleteVehicle;