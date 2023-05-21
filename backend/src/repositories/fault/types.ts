import type { Repair } from '@prisma/client';
import type DbResult from '../common/types';

type DbRepair = DbResult<Repair>;

export type FaultCreateData = {
  description: string,
  userId: string,
  vehicleId: string,
};

export type FaultCreateResult = DbRepair;
