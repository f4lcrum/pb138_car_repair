import { Result } from '@badrap/result';
import type { Repair, RepairMaterial } from '@prisma/client';
import type { CheckUVehicleData, TransactionCheckOperationResult } from '../vehicle/types';
import {
  DeletedRecordError, NonexistentRecordError, UnauthorizedError, WrongOwnershipError,
} from './error';
import type { PrismaTransactionHandle } from './types';
import type { CheckUserData } from '../user/types';
import type { FaultUpdateData } from '../fault/types';

export const checkVehicle = async (
  data: CheckUVehicleData,
  tx: PrismaTransactionHandle,
): TransactionCheckOperationResult => {
  const result = await tx.vehicle.findUnique({
    where: {
      id: data.vehicleId,
    },
  });

  if (result === null) {
    throw new NonexistentRecordError('The vehicle does not exists!');
  }
  if (result.ownerId !== data.ownerId) {
    throw new WrongOwnershipError('Ownership vehicle error');
  }
  if (result.deletedAt !== null) {
    throw new DeletedRecordError('The specified vehicle has already been deleted!');
  }
  return Result.ok({});
};

export const checkUser = async (
  data: CheckUserData,
  tx: PrismaTransactionHandle,
): TransactionCheckOperationResult => {
  const result = await tx.user.findUnique({
    where: {
      id: data.id,
    },
  });

  if (result === null) {
    throw new NonexistentRecordError('The user does not exist!');
  }

  if (result.deletedAt !== null) {
    throw new DeletedRecordError('User has already been deleted!');
  }

  return Result.ok({});
};

export const checkFaultUpdate = async (
  data: FaultUpdateData,
  tx: PrismaTransactionHandle,
): Promise<Result<Repair & { material: RepairMaterial[] }>> => {
  const result = await tx.repair.findUnique({
    where: {
      id: data.id,
    },
    include: {
      material: true,
    },
  });

  if (result === null) {
    return Result.err(new NonexistentRecordError('The fault does not exist!'));
  }

  if (result.resolvedAt !== null) {
    return Result.err(new UnauthorizedError('The fault has already been resolved!'));
  }

  if (result.technicianId !== data.technicianId && result.technicianId !== null) {
    return Result.err(new WrongOwnershipError('The fault has already been assigned to different technician!'));
  }

  return Result.ok(result);
};
