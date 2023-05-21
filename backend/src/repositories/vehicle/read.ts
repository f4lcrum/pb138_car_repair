import type { User, Vehicle } from '@prisma/client';
import { Result } from '@badrap/result';
import client from '../client';
import type { VehicleReadMultipleData, VehicleReadMultipleResult } from './types';
import { genericError } from '../common/types';
import { NonexistentRecordError } from '../common/error';

const all = async (
  data : VehicleReadMultipleData,
): VehicleReadMultipleResult => {
  try {
    const user : User | null = await client.user.findUnique({
      where: {
        id: data.userId,
      },
    });

    if (user === null) {
      throw new NonexistentRecordError('The user does not exists!');
    }

    const result : Vehicle[] = await client.vehicle.findMany({
      where: {
        ownerId: data.userId,
        deletedAt: null,
      },
      include: {
        repairs: {
          include: {
            material: true,
          },
        },
      },
    });
    if (result === null) {
      throw new NonexistentRecordError('The specified user does not have vehicles!');
    }
    return Result.ok(result);
  } catch (e) {
    // TODO: because we catch the thrown errors and return genericError, error messages of thrown errrors are ignored 
    // change so we keep the message
    return genericError;
  }
};

export default all;
