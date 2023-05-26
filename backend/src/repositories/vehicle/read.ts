import type { User, Vehicle } from '@prisma/client';
import { Result } from '@badrap/result';
import client from '../client';
import type { VehicleReadMultipleData, VehicleReadMultipleResult, VehicleReadOneData, VehicleReadOneResult } from './types';
import { genericError } from '../common/types';
import { NonexistentRecordError } from '../common/error';

// *** reads vehicle of given id ***
export const read = async (data: VehicleReadOneData): VehicleReadOneResult => {
  try {
    // TODO: ADD CHECKVEHICLE
    return Result.ok(
      await client.$transaction(async (tx) => {
        const vehicle = await tx.vehicle.findFirst({
          where: {
            id: data.id,
          },
        });
        if (vehicle === null) {
          throw new NonexistentRecordError('The specified vehicle does not exist!');
        }
        return vehicle;
      })
    )
  } catch (e) {
    if (e instanceof NonexistentRecordError) {
      return Result.err(e);
    };

    return genericError;
  }
}

// TODO: ORDERING in params

// *** reads all vehicles of given user ***
export const all = async (
  data : VehicleReadMultipleData,
): VehicleReadMultipleResult => {
  try {
    // TODO: ADD CHECKVEHICLE
    const user : User | null = await client.user.findUnique({
      where: {
        id: data.userId,
      },
    });

    if (user === null) {
      throw new NonexistentRecordError('The user does not exists!');
    }

    // TODO: SORT BY NAME, MANUFACTURED_AT
    // TODO: FILTER BY BRAND
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
      orderBy: {
        brand: {
          name: 'asc',
        },
      },
    });
    if (result === null) {
      throw new NonexistentRecordError('The specified user does not have vehicles!');
    }
    return Result.ok(result);
  } catch (e) {
    if (e instanceof NonexistentRecordError) {
      return Result.err(e);
    };

    return genericError;
  }
};

