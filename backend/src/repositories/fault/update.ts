import { Result } from '@badrap/result';
import client from '../client';
import type {
  FaultUpdateData, FaultUpdateResult,
} from './types';
import DbResult, { genericError } from '../common/types';
import {
  checkFaultUpdate, checkTechnician, isVehicleDeleted,
} from '../common/common';
import { TechnicianNotVerifiedError, WrongOwnershipError } from '../common/error';

const update = async (data: FaultUpdateData): DbResult<FaultUpdateResult> => {
  try {
    return await client.$transaction(async (tx) => {
      const faultCheck = await checkFaultUpdate({
        faultId: data.id,
        technicianId:
        data.technicianId,
      }, tx);
      if (faultCheck.isErr) {
        return Result.err(faultCheck.error);
      }
      if (faultCheck.unwrap().technicianId === null) {
        return Result.err(new WrongOwnershipError('The fault is not assigned to you!'));
      }
      const technicianCheck = await checkTechnician(data.technicianId);
      if (technicianCheck.isErr) {
        return Result.err(technicianCheck.error);
      }
      if (!technicianCheck.unwrap()) {
        return Result.err(new TechnicianNotVerifiedError('Technician is not verified!'));
      }
      const vehicleCheck = await isVehicleDeleted({ vehicleId: faultCheck.unwrap().vehicleId }, tx);
      if (vehicleCheck.isErr) {
        return Result.err(vehicleCheck.error);
      }
      const updatedFault = await tx.repair.update({
        where: {
          id: data.id,
        },
        data: {
          ...(data.description !== undefined ? { description: data.description } : {}),
          ...(data.name !== undefined ? { name: data.name } : {}),
          ...(data.resolvedAt !== undefined ? { resolvedAt: data.resolvedAt } : {}),
          ...(data.workPrice !== undefined ? { workPrice: data.workPrice } : {}),
          ...(data.mileage !== undefined ? { mileage: data.mileage } : {}),
          material: {
            create: data.material || [],
          },
        },
        select: {
          resolvedAt: true,
          name: data.name !== undefined,
          workPrice: data.workPrice !== undefined,
          mileage: data.mileage !== undefined,
          material: {
            select: {
              name: true,
              price: true,
            },
          },
          technicianId: true,
        },

      });
      return Result.ok(updatedFault);
    });
  } catch (e) {
    if (e instanceof Error) {
      return Result.err(e);
    }
    return genericError;
  }
};

export default update;
