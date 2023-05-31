import type { Prisma, Vehicle } from '@prisma/client';
import { Result } from '@badrap/result';
import client from '../client';
import type {
  VehicleReadMultipleData, VehicleReadMultipleResult, VehicleReadOneData, VehicleReadOneResult,
} from './types';
import { genericError } from '../common/types';
import { NonexistentRecordError } from '../common/error';
// intial commit
// *** reads vehicle of given id ***
// TODO: CHANGE INPUT DATA
// TODO: CHECK IF WE CHECK THE PARAMS AND BODY
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
    const sortOrder: Prisma.SortOrder = data.sortOrder !== undefined ? data.sortOrder : 'asc';
    // FIXME: if you really want to suffer, try to change this bullshit:
    let orderBy: [] | {} = [];

    if (data.createdAt !== undefined) {
      orderBy = [{ createdAt: sortOrder }];
    }
    if (data.manufacturedAt !== undefined) {
      orderBy = [{ manufacturedAt: sortOrder }];
    }

    const result : Vehicle[] = await client.vehicle.findMany({
      where: vehicleFilter,
      // TODO: PROBS REMOVE THE REPAIRS AND MATERIAL:
      include: {
        repairs: {
          include: {
            material: true,
          },
        },
      },
      orderBy,
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
