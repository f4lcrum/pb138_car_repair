import { Role } from '@prisma/client';
import { Result } from '@badrap/result';
import client from '../../client';
import { genericError } from '../common/types';
import type { ReadUnverifiedTechnicianResult } from './types';

const readUnverifiedTechnicians = async () : ReadUnverifiedTechnicianResult => {
  try {
    const result = await client.user.findMany({
      where: {
        role: Role.TECHNICIAN,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        isVerified: true,
      },
    });
    return Result.ok(result);
  } catch (e) {
    return genericError;
  }
};

export default readUnverifiedTechnicians;
