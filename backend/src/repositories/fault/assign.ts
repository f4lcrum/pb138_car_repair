import { Result } from '@badrap/result';
import client from '../../client';
import { checkFaultUpdate, checkTechnician } from '../common/common';
import type { AssignFaultData, AssignFaultResult } from './types';
import { TechnicianNotVerifiedError } from '../common/error';
import { genericError } from '../common/types';

const assign = async (data: AssignFaultData) : AssignFaultResult => {
  try {
    return await client.$transaction(async (tx) => {
      const technicianCheck = await checkTechnician(data.technicianId);
      const faultCheck = await checkFaultUpdate(data, tx);
      if (faultCheck.isErr) {
        console.log(faultCheck.error.message);
        return Result.err(faultCheck.error);
      }
      if (technicianCheck.isErr) {
        console.log(technicianCheck.error.message);
        return Result.err(technicianCheck.error);
      }
      if (!technicianCheck.unwrap()) {
        return Result.err(new TechnicianNotVerifiedError('Technician is not verified!'));
      }

      const checkRepair = await tx.repair.findUnique({
        where: {
          id: data.faultId,
        },
        select: {
          technicianId: true,
        },
      });

      const technicianId = checkRepair!.technicianId === null ? data.technicianId : null;
      const result = await tx.repair.update({
        where: {
          id: data.faultId,
        },
        data: {
          technicianId,
        },
      });
      return Result.ok(result);
    });
  } catch (e) {
    if (e instanceof Error) {
      return Result.err(e);
    }
    return genericError;
  }
};

export default assign;
