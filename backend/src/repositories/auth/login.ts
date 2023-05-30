import { Result } from '@badrap/result';
import client from '../../client';
import { genericError } from '../common/types';
import type { LoginData, LoginResult } from './types';

const userInfo = async (data: LoginData) : LoginResult => {
  try {
    const user = await client.user.findUnique({
      where: {
        email: data.email,
      },
    });
    return Result.ok(user);
  } catch (e) {
    return genericError;
  }
};

export default userInfo;
