import { Result } from '@badrap/result';
import client from '../../client';
import { genericError } from '../common/types';
import type { VerifyData, VerifyDataResult } from './types';
import { AlreadyVerified } from '../common/error';
import { checkTechnician } from '../common/common';

const verifyTechnician = async (data: VerifyData) : VerifyDataResult => {
  try {
    return await client.$transaction(async (tx) => {
      const output = await checkTechnician(data.id);
      if (output.isErr) {
        return Result.err(output.error);
      }
      if (output.unwrap()) {
        return Result.err(new AlreadyVerified('Technician is already verified!'));
      }
      const result = await tx.user.update({
        where: {
          id: data.id,
        },
        data: {
          isVerified: true,
        },
        select: {
          id: true,
          isVerified: true,
        },
      });
      return Result.ok(result);
    });
  } catch (e) {
    return genericError;
  }
};

export default verifyTechnician;
