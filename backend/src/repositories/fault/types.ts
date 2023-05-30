import type { Repair } from '@prisma/client';
import type DbResult from '../common/types';

type DbRepair = DbResult<Repair>;
type DbRepairs = DbResult<Repair[]>;
export type FaultCreateData = {
  description: string,
  userId: string,
  vehicleId: string,
};

export type FaultCreateResult = DbRepair;

export type FaultReadOneData = {
  id: string,
  vehicleId: string,
};

export type FaultReadOneResult = DbRepairs;

export type FaultReadManyData = {
  userId: string,
};

export type FaultReadManyResult = DbRepairs;

export type FaultUpdateData = {
  // TODO: WHAT ABOUT THE ID
  id: string,
  technicianId: string,
  resolvedAt?: Date | undefined,
  workPrice?: number | undefined,
  name?: string | undefined,
  mileage?: number | undefined,
  material?: RepairMaterialWithoutSensitiveInfo[] | undefined,
};

type RepairMaterialWithoutSensitiveInfo = {
  description: string,
  name: string,
  price: number,
};
export type FaultUpdateResult = {
  technicianId: string | null,
  resolvedAt: Date | null,
  name: string | null | undefined,
  workPrice: number,
  material: RepairMaterialWithoutSensitiveInfo[] | undefined,
};
