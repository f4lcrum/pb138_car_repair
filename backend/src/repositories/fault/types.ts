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
};

export type FaultReadOneResult = DbRepair;

export type FaultReadManyData = {
  userId: string,
};

export type FaultReadManyResult = DbRepairs;