import { Result } from '@badrap/result';
import argon2 from 'argon2';
import client from '../../client';
import { genericError } from '../common/types';
import type { RegisterData, RegisterResult } from './types';

const registerUser = async (data: RegisterData) : RegisterResult => {
  try {
    const { password, ...userData } = data;
    const hash = await argon2.hash(password);
    const user = await client.user.create({
      data: {
        ...userData,
        password: hash,
        createdAt: new Date(),
        isVerified: false,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });
    return Result.ok(user);
  } catch (err) {
    if (err instanceof Error) {
      return Result.err(err);
    }
    return genericError;
  }
};

export default registerUser;
