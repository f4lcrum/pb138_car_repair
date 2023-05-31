import { Result } from '@badrap/result';
import type { Repair, RepairMaterial } from '@prisma/client';
import client from '../client';
import type {
  FaultUpdateData, FaultUpdateResult, IsVerifiedTechnicianData, IsVerifiedTechnicianResult,
} from './types';
import DbResult, { genericError } from '../common/types';
import { checkFaultUpdate } from '../common/common';
import { NonexistentRecordError, TechnicianNotVerifiedError } from '../common/error';

const isVerifiedTechnician = async (data : IsVerifiedTechnicianData):
IsVerifiedTechnicianResult => {
  try {
    const result = await client.user.findUnique({
      where: {
        id: data.technicianId,
      },
      select: {
        isVerified: true,
      },
    });
    if (result === null) {
      return Result.err(new NonexistentRecordError('Technician does not exists!'));
    }
    return Result.ok(result.isVerified);
  } catch (e) {
    return genericError;
  }
};

const update = async (data: FaultUpdateData): DbResult<FaultUpdateResult> => {
  try {
    return await client.$transaction(async (tx) => {
      const faultCheck = await checkFaultUpdate(data, tx);
      const technicianCheck = await isVerifiedTechnician({ technicianId: data.technicianId });
      if (faultCheck.isErr) {
        return Result.err(faultCheck.error);
      }
      if (technicianCheck.isErr) {
        return Result.err(technicianCheck.error);
      }
      if (!technicianCheck) {
        return Result.err(new TechnicianNotVerifiedError('Technician is not verified!'));
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
          // TODO: REMOVE ONCE THE ASSIGN/UNASSIGN IS DONE
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
