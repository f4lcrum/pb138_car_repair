import { Result } from '@badrap/result';
import { genericError } from '../common/types';
import type { FaultReadManyResult, FaultReadOneData, FaultReadOneResult } from './types';
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
              description: true,
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

export const all = async (): FaultReadManyResult => {
  try {
    return Result.ok(
      await client.$transaction(async (tx) => {
        const faults = await tx.repair.findMany({
          where: {
            resolvedAt: null,
            technicianId: null,
          },
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            vehicle: {
              include: {
                brandModel: {
                  include: {
                    brand: true,
                  },
                },
              },
            },
          },
        });

        const result = faults.map(({ vehicle, ...fault }) => ({
          ...fault,
          licensePlate: vehicle.licensePlate,
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
