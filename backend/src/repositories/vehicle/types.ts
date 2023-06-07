import type { Prisma, Vehicle } from '@prisma/client';
import type { Result } from '@badrap/result';
import type DbResult from '../common/types';

export type VehicleReadMultipleData = {
  userId: string,
  brandName?: string,
  createdAt? : boolean,
  manufacturedAt?: boolean,
  sortOrder?: Prisma.SortOrder,
};

export type VehicleReadOneData = {
  ownerId: string,
  licensePlate?: string,
  vinCode?: string
};

export type VehicleDeleteData = {
  userId: string,
  vehicleId: string,
};

type DbVehicle = DbResult<Vehicle>;

export type VehicleReadMultipleResult = DbResult<{
  brandModel: string;
  brandName: string;
  id: string;
  ownerId: string;
  licensePlate: string;
  vinCode: string;
  manufacturedAt: Date;
  createdAt: Date;
  scrappedAt: Date | null;
  deletedAt: Date | null;
}[]>;

export type VehicleReadOneResult = DbVehicle;
export type VehicleDeleteResult = DbVehicle;
export type CheckUVehicleData = {
  ownerId: string;
  vehicleId: string;
};

export type TransactionCheckOperationResult = Promise<Result<{}>>;

export type VehicleCreateData = {
  ownerId: string,
  brandId: string,
  licensePlate: string,
  vinCode: string,
  manufacturedAt: Date,

};

export type VehicleCreateResult = DbVehicle;

export type OrderBy =
  ({ createdAt?: Prisma.SortOrder } &
  { manufacturedAt?: Prisma.SortOrder })[];
