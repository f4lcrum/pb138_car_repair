// TODO: update user's info based on provided data
// TODO: change updatedAt to current date

import { Result } from '@badrap/result';
import { genericError } from '../common/types';
import type { UserUpdateData, UserUpdateResult } from './types';
import client from '../client';
import { checkUser } from '../common/common';

const update = async (data: UserUpdateData): UserUpdateResult => {
  try {
      return await client.$transaction(async (tx) => {
        //  TODO: PARSE SCHEMA ZOD
        const userCheck = await checkUser(data, tx);
        if (userCheck.isErr) {
          return Result.err(userCheck.error);
        }
        
        const updatedUser = await tx.user.update({
          where: {
            id: data.id,
          },
          data: {
            ...(data.firstName !== undefined ? {firstName: data.firstName} : {}),
            ...(data.lastName !== undefined ? {lastName: data.lastName} : {}),
            ...(data.phoneNumber !== undefined ? {phoneNumber: data.phoneNumber} : {}),
            // firstName: data.firstName !== null ? data.firstName : undefined,
            // lastName: data.lastName !== null ? data.lastName : undefined,
            // phoneNumber: data.phoneNumber !== null ? data.phoneNumber : undefined, 
            updatedAt: new Date(),
          },
          //TODO: SELECT ONLY SOME 
          // select: {
          //   firstName: true,
          //   lastName: true,
          //   phoneNumber: true,
          //   updatedAt: true,

          // }
          
        });
        return Result.ok(updatedUser);
        
      })
  } catch (e) {
    return genericError;
  }
};

export default update;