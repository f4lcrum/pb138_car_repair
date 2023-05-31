import { Result } from '@badrap/result';
import DbResult, { genericError } from '../common/types';
import type { UserUpdateData, UserUpdateResult } from './types';
import client from '../client';
import { checkUser } from '../common/common';

const update = async (data: UserUpdateData): DbResult<UserUpdateResult> => {
  try {
    return await client.$transaction(async (tx) => {
      const userCheck = await checkUser(data, tx);
      if (userCheck.isErr) {
        return Result.err(userCheck.error);
      }

      const updatedUser = await tx.user.update({
        where: {
          id: data.id,
        },
        data: {
          ...(data.firstName !== undefined ? { firstName: data.firstName } : {}),
          ...(data.lastName !== undefined ? { lastName: data.lastName } : {}),
          ...(data.phoneNumber !== undefined ? { phoneNumber: data.phoneNumber } : {}),
          updatedAt: new Date(),
        },
        select: {
          firstName: data.firstName !== undefined,
          lastName: data.lastName !== undefined,
          phoneNumber: data.phoneNumber !== undefined,
          updatedAt: true,
        },

      });
      return Result.ok(updatedUser);
    });
  } catch (e) {
    return genericError;
  }
};

export default update;
