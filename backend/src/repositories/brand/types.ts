import type DbResult from '../common/types';

export type BrandReadData = {
  userId: string,
};

export type BrandReadResult = DbResult<{
  id: string,
  name: string,
  brand: string,
}[]>;
