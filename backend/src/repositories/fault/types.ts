import type { Repair } from '@prisma/client';
import type DbResult from '../common/types';

type DbRepair = DbResult<Repair>;
export type FaultCreateData = {
  name: string,
  description: string,
  mileage: number,
  userId: string,
  vehicleId: string,
};

export type FaultCreateResult = DbRepair;

export type FaultReadOneData = {
  id: string,
  vehicleId: string,
};

export type FaultReadOneResult = DbResult<{
  technicianEmail: string | undefined;
  technicianName: string | undefined;
  id: string;
  createdAt: Date;
  description: string;
  mileage: number | null;
  name: string | null;
  vehicleId: string;
  resolvedAt: Date | null;
  workPrice: number;
}[]>;

export type FaultReadManyData = {
  technicianId: string,
  unresolved: boolean,
};

export type FaultReadManyResult = DbResult<{
  licensePlate: string;
  brandName: string;
  brandModel: string;
  id: string;
  createdAt: Date;
  description: string;
  mileage: number | null;
  name: string | null;
  technicianId: string | null;
  vehicleId: string;
  resolvedAt: Date | null;
  workPrice: number;
  ownerFirstName: string,
  ownerLastName: string,
}[]>;

export type IsVerifiedTechnicianData = {
  technicianId: string,
};

export type IsVerifiedTechnicianResult = DbResult<Boolean>;

export type CheckFaultData = AssignFaultData;

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

export type AssignFaultData = {
  technicianId : string,
  faultId: string
};

export type AssignFaultResult = DbRepair;
