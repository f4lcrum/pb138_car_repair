import { Result } from '@badrap/result';
import { Repair, RepairMaterial, Role } from '@prisma/client';
import type { Response } from 'express';
import type { CheckUVehicleData, TransactionCheckOperationResult } from '../vehicle/types';
import {
  AlreadyAssigned,
  AlreadyVerified,
  DeletedRecordError, NonexistentRecordError,
  RoleError, TechnicianNotVerifiedError,
  UnauthorizedError, WrongOwnershipError,
} from './error';
import { PrismaTransactionHandle, genericError } from './types';
import type { CheckUserData } from '../user/types';
import type { CheckFaultData } from '../fault/types';
import {
  backendErrorRequestResponse, forbiddenRequestResponse,
  notFoundRequestResponse, sendBadRequestResponse,
  unauthorizedRequestResponse,
} from './responses';
import client from '../../client';

export const isVehicleDeleted = async (
  data: { vehicleId: string },
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
  if (result.deletedAt !== null) {
    throw new DeletedRecordError('The specified vehicle has already been deleted!');
  }
  return Result.ok({});
};

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
  if (result.deletedAt !== null) {
    throw new DeletedRecordError('The specified vehicle has already been deleted!');
  }
  if (result.ownerId !== data.ownerId) {
    throw new WrongOwnershipError('Ownership vehicle error');
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
  data: CheckFaultData,
  tx: PrismaTransactionHandle,
): Promise<Result<Repair & { material: RepairMaterial[] }>> => {
  const result = await tx.repair.findUnique({
    where: {
      id: data.faultId,
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
//
export const errorResponsesHandle = async (
  res : Response,
  error: Error,
) : Promise<void> => {
  console.log(error.message);
  if (error instanceof DeletedRecordError || error instanceof NonexistentRecordError) {
    return notFoundRequestResponse(res);
  }
  if (error instanceof AlreadyVerified || error instanceof RoleError) {
    return sendBadRequestResponse(res, error.message);
  }

  if (error instanceof TechnicianNotVerifiedError || error instanceof AlreadyAssigned
    || WrongOwnershipError) { return forbiddenRequestResponse(res, 'Forbidden'); }

  if (error instanceof UnauthorizedError) {
    return unauthorizedRequestResponse(res, 'Unauthorized');
  }
  return backendErrorRequestResponse(res);
};

export const checkTechnician = async (id : string) : Promise<Result<Boolean>> => {
  try {
    const result = await client.user.findUnique({
      where: {
        id,
      },
      select: {
        isVerified: true,
        role: true,
      },
    });
    if (result === null) {
      return Result.err(new NonexistentRecordError('User with input email does not exists!'));
    }
    if (result.role !== Role.TECHNICIAN) {
      return Result.err(new RoleError('User is not a technician!'));
    }
    return Result.ok(result.isVerified);
  } catch (e) {
    return genericError;
  }
};
