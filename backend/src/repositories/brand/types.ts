import type { Brand } from '@prisma/client';
import type DbResult from '../common/types';

export type BrandReadData = {
  userId: string,
};

export type BrandReadResult = DbResult<{
  id: string,
  name: string,
  brand: string,
}[]>;

export type BrandCreateData = {
  name: string,
};

export type BrandCreateResult = DbResult<Brand>;
