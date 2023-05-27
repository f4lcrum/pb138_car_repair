import type { Vehicle } from '@prisma/client';
import type { Result } from '@badrap/result';
import type DbResult from '../common/types';

export type VehicleReadMultipleData = {
  userId: string
};

// vehicle's id:
export type VehicleReadOneData = {
  id: string,
}

export type VehicleDeleteData = {
  userId: string;
  vehicleId: string;
};

type DbVehicles = DbResult<Vehicle[]>;
type DbVehicle = DbResult<Vehicle>;

export type VehicleReadMultipleResult = DbVehicles;
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
  winCode: string,
  manufacturedAt: Date,

};

export type VehicleCreateResult = DbVehicle;