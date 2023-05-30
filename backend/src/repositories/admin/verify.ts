import { Result } from '@badrap/result';
import { Role } from '@prisma/client';
import client from '../../client';
import { genericError } from '../common/types';
import type { VerifyData, VerifyDataResult } from './types';
import { AlreadyVerified, NonexistentRecordError, RoleError } from '../common/error';

const checkTechnician = async (email : string) : Promise<Result<Boolean>> => {
  try {
    const result = await client.user.findUnique({
      where: {
        email,
      },
      select: {
        isVerified: true,
        role: true,
      },
    });
    if (result === null) {
      return Result.err(new NonexistentRecordError('User with input email does not exists!'));
    }
    if (result.role !== Role.TECHNICIAN) {
      return Result.err(new RoleError('User is not a technician!'));
    }
    return Result.ok(result.isVerified);
  } catch (e) {
    return genericError;
  }
};

const verifyTechnician = async (data: VerifyData) : VerifyDataResult => {
  try {
    return await client.$transaction(async (tx) => {
      const output = await checkTechnician(data.email);
      if (output.isErr) {
        return Result.err(output.error);
      }
      if (output.unwrap()) {
        return Result.err(new AlreadyVerified('Technician is already verified!'));
      }
      const result = await tx.user.update({
        where: {
          email: data.email,
        },
        data: {
          isVerified: true,
        },
        select: {
          email: true,
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
