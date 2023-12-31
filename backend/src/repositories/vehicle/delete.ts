import { Result } from '@badrap/result';
import client from '../client';
import type { VehicleDeleteData, VehicleDeleteResult } from './types';
import { genericError } from '../common/types';
import { checkVehicle } from '../common/common';

const deleteVehicle = async (
  data: VehicleDeleteData,
): VehicleDeleteResult => {
  try {
    return await client.$transaction(async (tx) => {
      const vehicleCheck = await checkVehicle(
        { ownerId: data.userId, vehicleId: data.vehicleId },
        tx,
      );
      if (vehicleCheck.isErr) {
        return Result.err(vehicleCheck.error);
      }
      const deletedAt = new Date();
      const result = await tx.vehicle.update({
        where: {
          id: data.vehicleId,
        },
        data: {
          deletedAt,
        },
      });
      await tx.repair.updateMany({
        where: {
          vehicleId: data.vehicleId,
        },
        data: {
          deletedAt,
        },
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

export default deleteVehicle;
