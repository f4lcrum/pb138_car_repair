import { Result } from "@badrap/result";
import { genericError } from "../common/types";
import type { FaultReadManyData, FaultReadManyResult, FaultReadOneData, FaultReadOneResult } from "./types";
import client from '../client';
import { NonexistentRecordError } from "../common/error";

const read = async (data: FaultReadOneData): FaultReadOneResult => {
  try {
    return Result.ok(
      await client.$transaction(async (tx) => {
        const fault = await tx.repair.findFirst({
          where: {
            id: data.id,
          },
        })
        if (fault === null) {
          throw new NonexistentRecordError('The specified fault does not exist!');
        }
        return fault;
      })
    )
  } catch (e) {
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


const all = async (data: FaultReadManyData): FaultReadManyResult => {
  try {
    return Result.ok(
      await client.$transaction(async (tx) => {
        
        const faults = await tx.repair.findMany({
          where: {
            vehicle: {
              ownerId: data.userId,
            },
          },
          // get the newest ones first:
          orderBy: {
            createdAt: 'desc',
          },
        });
        return faults;

      })
    )

  } catch (e) {
    return genericError;
  }

};

export default { read, all};