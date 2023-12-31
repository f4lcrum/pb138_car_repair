import { Result } from '@badrap/result';
import argon2 from 'argon2';
import { Role } from '@prisma/client';
import client from '../../client';
import { genericError } from '../common/types';
import type { RegisterData, RegisterResult } from './types';

const registerUser = async (data: RegisterData) : RegisterResult => {
  try {
    const { password, isTechnician, ...userData } = data;
    const hash = await argon2.hash(password);
    const user = await client.user.create({
      data: {
        ...userData,
        role: isTechnician ? Role.TECHNICIAN : Role.CLIENT,
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
  } catch (e) {
    if (e instanceof Error) {
      return Result.err(e);
    }
    return genericError;
  }
};

export default registerUser;
