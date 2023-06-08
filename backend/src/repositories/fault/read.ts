import { Result } from '@badrap/result';
import { genericError } from '../common/types';
import type {
  FaultReadManyData, FaultReadManyResult, FaultReadOneData, FaultReadOneResult,
} from './types';
import client from '../client';
import { checkVehicle } from '../common/common';

export const read = async (data: FaultReadOneData): FaultReadOneResult => {
  try {
    return await client.$transaction(async (tx) => {
      const vehicleCheck = await checkVehicle(
        { ownerId: data.id, vehicleId: data.vehicleId },
        tx,
      );
      if (vehicleCheck.isErr) {
        return Result.err(vehicleCheck.error);
      }
      const fault = await tx.repair.findMany({
        where: {
          vehicleId: data.vehicleId,
        },
        include: {
          technician: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
            },
          },
          material: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      });
      const result = fault.map(({ technicianId, technician, ...rest }) => ({
        ...rest,
        technicianEmail: technician?.email,
        technicianName: [technician?.firstName, technician?.lastName].join(' '),
      }));
      return Result.ok(result);
    });
  } catch (e) {
    if (e instanceof Error) {
      return Result.err(e);
    }
    return genericError;
  }
};

export const all = async (data: FaultReadManyData): FaultReadManyResult => {
  try {
    return Result.ok(
      await client.$transaction(async (tx) => {
        let where;
        if (data.unresolved) {
          where = {
            resolvedAt: null,
            technicianId: null,
            deletedAt: null,
          };
        } else {
          where = {
            technicianId: data.technicianId,
            deletedAt: null,
          };
        }
        const faults = await tx.repair.findMany({
          where,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            material: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
            vehicle: {
              include: {
                brandModel: {
                  include: {
                    brand: true,
                  },
                },
                owner: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        });

        const result = faults.map(({ vehicle, ...fault }) => ({
          ...fault,
          licensePlate: vehicle.licensePlate,
          ownerFirstName: vehicle.owner.firstName,
          ownerLastName: vehicle.owner.lastName,
          brandName: vehicle.brandModel.brand.name,
          brandModel: vehicle.brandModel.name,
        }));
        return result;
      }),
    );
  } catch (e) {
    return genericError;
  }
};
