import type { Vehicle } from '@prisma/client';
import { Result } from '@badrap/result';
import client from '../client';
import type {
  VehicleReadMultipleData, VehicleReadMultipleResult, VehicleReadOneData, VehicleReadOneResult,
} from './types';
import { genericError } from '../common/types';
import { NonexistentRecordError } from '../common/error';
// intial commit
// *** reads vehicle of given id ***
export const read = async (data: VehicleReadOneData): VehicleReadOneResult => {
  try {
    return Result.ok(
      await client.$transaction(async (tx) => {
        const vehicle = await tx.vehicle.findFirst({
          where: data,
        });
        if (vehicle === null) {
          throw new NonexistentRecordError('The specified vehicle does not exist!');
        }
        return vehicle;
      }),
    );
  } catch (e) {
    if (e instanceof NonexistentRecordError) {
      return Result.err(e);
    }

    return genericError;
  }
};

// *** reads all vehicles of given user ***
export const all = async (
  data : VehicleReadMultipleData,
): VehicleReadMultipleResult => {
  try {
    const vehicleFilter = data.brandName ? {
      ownerId: data.userId,
      deletedAt: null,
      brand: {
        brand: {
          name: data.brandName,
        },
      },
    } : {
      ownerId: data.userId,
      deletedAt: null,
    };

    let sortOrder: [] | {} = [];

    if (data.createdAt !== undefined) {
      sortOrder = [{ createdAt: data.sortOrder ? data.sortOrder : 'asc' }];
    }
    if (data.manufacturedAt !== undefined) {
      sortOrder = [{ manufacturedAt: data.sortOrder ? data.sortOrder : 'asc' }];
    }

    const result : Vehicle[] = await client.vehicle.findMany({
      where: vehicleFilter,
      include: {
        repairs: {
          include: {
            material: true,
          },
        },
      },
      orderBy: sortOrder,
    });
    if (result === null) {
      throw new NonexistentRecordError('The specified user does not have vehicles!');
    }
    return Result.ok(result);
  } catch (e) {
    if (e instanceof NonexistentRecordError) {
      return Result.err(e);
    }

    return genericError;
  }
};
