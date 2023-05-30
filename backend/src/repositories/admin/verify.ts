import { Result } from '@badrap/result';
import client from '../../client';
import { genericError } from '../common/types';
import type { VerifyData, VerifyDataResult } from './types';

const verifyTechnician = async (data: VerifyData) : VerifyDataResult => {
  try {
    const result = await client.user.update({
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
  } catch (e) {
    console.log(e);
    return genericError;
  }
};

export default verifyTechnician;
