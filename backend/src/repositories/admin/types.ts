import type { Role } from '@prisma/client';
import type DbResult from '../common/types';

export type ReadUnverifiedTechnicianResult = DbResult<{
  firstName: string,
  lastName: string,
  email: string,
  role: Role,
  isVerified: Boolean,
}[]>;

export type VerifyData = {
  email: string,
};

export type VerifyDataResult = DbResult<{
  email: string,
  isVerified: boolean,
}>;
