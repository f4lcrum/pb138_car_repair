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
  id: string,
};

export type VerifyDataResult = DbResult<{
  id: string,
  isVerified: boolean,
}>;

export type BrandModelCreatedata = {
  brandId: string,
  name: string,
};

export type BrandModelCreateResult = DbResult<{
  id: string,
  brandId: string,
  name: string,
}>;
