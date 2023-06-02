import { Result } from '@badrap/result';
import { genericError } from '../common/types';
import type { FaultReadOneData, FaultReadOneResult } from './types';
import client from '../client';
import { checkVehicle } from '../common/common';

const read = async (data: FaultReadOneData): FaultReadOneResult => {
  try {
    return await client.$transaction(async (tx) => {
      const vehicleCheck = await checkVehicle(
        { ownerId: data.id, vehicleId: data.vehicleId },
        tx,
      );
      if (vehicleCheck.isErr) {
        return Result.err(vehicleCheck.error);
      }
      const fault = await tx.repair.findMany({
        where: {
          vehicleId: data.vehicleId,
        },
      });
      return Result.ok(fault);
    });
  } catch (e) {
    if (e instanceof Error) {
      return Result.err(e);
    }
    return genericError;
  }
};

// TODO: readMany repairs:
// --filter:
// --- get repairs of one specific user - DONE
// --- get user's resolved/unresolved repairs
// --- get all unresolved repairs
// --sorting:
// --- default by createdAt in desc order - DONE
// --- can be specified in params

// const all = async (data: FaultReadManyData): FaultReadManyResult => {
//   try {
//     return Result.ok(
//       await client.$transaction(async (tx) => {

//         const faults = await tx.repair.findMany({
//           where: {
//             vehicle: {
//               ownerId: data.userId,
//             },
//           },
//           // get the newest ones first:
//           orderBy: {
//             createdAt: 'desc',
//           },
//         });
//         return faults;

//       })
//     )

//   } catch (e) {
//     return genericError;
//   }

// };

export default read;
