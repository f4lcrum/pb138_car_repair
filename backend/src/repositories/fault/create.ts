import { Result } from '@badrap/result';
import {checkVehicle} from '../common/common';
import { genericError } from '../common/types';
import type { FaultCreateData, FaultCreateResult } from './types';
import client from '../client';

const create = async (data: FaultCreateData) : FaultCreateResult => {
  try {
    return await client.$transaction(async (tx) => {
      const vehicleCheck = await checkVehicle(
        { ownerId: data.userId, vehicleId: data.vehicleId },
        tx,
      );
      if (vehicleCheck.isErr) {
        return Result.err(vehicleCheck.error);
      }
      // TODO: regarding milage - either we make it nullable (since technician sets this value) or we set it to zero from the start and technician will edit it
      // TODO: regarding name - nullable or add it to argument data (if nullable - technician is the one who creates the name, user otherwise) 

      const createdAt = new Date();
      const result = await tx.repair.create({
        data: {
          vehicleId: data.vehicleId,
          description: data.description,
          mileage: 0,
          createdAt,
          name: 'Oprava c.X',
          workPrice: 0,
        },
      });
      return Result.ok(result);
    });
  } catch (e) {
    return genericError;
  }
};

export default create;
