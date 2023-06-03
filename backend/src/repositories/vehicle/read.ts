import type { Prisma } from '@prisma/client';
import { Result } from '@badrap/result';
import client from '../client';
import type {
  OrderBy,
  VehicleReadMultipleData, VehicleReadMultipleResult, VehicleReadOneData, VehicleReadOneResult,
} from './types';
import { genericError } from '../common/types';
import { NonexistentRecordError } from '../common/error';

export const read = async (data: VehicleReadOneData): VehicleReadOneResult => {
  try {
    return Result.ok(
      await client.$transaction(async (tx) => {
        const vehicle = await tx.vehicle.findFirst({
          where: {
            ...data,
            deletedAt: null,
          },
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
    const orderBy: OrderBy = [];

    if (data.createdAt !== undefined) {
      orderBy.push({ createdAt: sortOrder });
    }
    if (data.manufacturedAt !== undefined) {
      orderBy.push({ manufacturedAt: sortOrder });
    }

    const result = await client.vehicle.findMany({
      where: vehicleFilter,
      include: {
        brandModel: {
          include: {
            brand: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: orderBy !== undefined ? orderBy : [],
    });
    if (result === null) {
      throw new NonexistentRecordError('The specified user does not have vehicles!');
    }
    const vehicles = result.map(({ brandId, ...car }) => ({
      ...car,
      brandModel: car.brandModel.name,
      brandName: car.brandModel.brand.name,
    }));
    return Result.ok(vehicles);
  } catch (e) {
    if (e instanceof NonexistentRecordError) {
      return Result.err(e);
    }

    return genericError;
  }
};
