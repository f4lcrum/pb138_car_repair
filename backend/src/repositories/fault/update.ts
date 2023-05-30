import { Result } from '@badrap/result';
import type { Repair, RepairMaterial } from '@prisma/client';
import client from '../client';
import type { FaultUpdateData, FaultUpdateResult } from './types';
import DbResult, { genericError } from '../common/types';
import { checkFaultUpdate } from '../common/common';

const update = async (data: FaultUpdateData): DbResult<FaultUpdateResult> => {
  try {
    return await client.$transaction(async (tx) => {
      const faultCheck = await checkFaultUpdate(data, tx);
      if (faultCheck.isErr) {
        return Result.err(faultCheck.error);
      }
      const fault: Repair & { material: RepairMaterial[] } = faultCheck.unwrap();
      const updatedFault = await tx.repair.update({
        where: {
          id: data.id,
        },
        data: {
          ...(data.name !== undefined ? { name: data.name } : {}),
          ...(data.resolvedAt !== undefined ? { resolvedAt: data.resolvedAt } : {}),
          ...(data.workPrice !== undefined ? { workPrice: data.workPrice } : {}),
          ...(data.mileage !== undefined ? { mileage: data.mileage } : {}),
          // TODO: is this what we want? if the fault does not have assigned technician
          // and some technician is updating the fault, it will be automatically assigned.
          ...(fault.technicianId === null ? { technicianId: data.technicianId } : {}),
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
              description: true,
              name: true,
              price: true,
            },
          },
          // TODO: probs won't be send, only for testing purposes for now
          technicianId: true,
        },

      });
      return Result.ok(updatedFault);
    });
  } catch (e) {
    return genericError;
  }
};

export default update;
