import { Result } from '@badrap/result';
import client from '../client';
import type { BrandReadResult } from './types';
import { NonexistentRecordError } from '../common/error';
import  { genericError } from '../common/types';

// export const readSpecific = async (data: BrandReadData): Promise<BrandReadResult> => {
//     try {
//         return Result.ok(
//             await client.$transaction(async (tx) => {
//                 const brands = await tx.vehicle.findMany({
//                     where: {
//                         ownerId: data.userId
//                     },
//                     select: {
//                         brand: {
//                             select: {
//                                 brand: {
//                                     select: {
//                                         name: true
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 })
//                 const brands = await tx.b
//             })
//         )
//     } catch (err) {
//         if (err instanceof)
//     }
// }



export const read = async (): BrandReadResult =>
{
    try {
       return Result.ok(
        await client.$transaction(async (tx) => {
        const result = await tx.brand.findMany({
        select: {
            name: true,
        }
        });
        if (result === null) {
            throw new NonexistentRecordError('No brand was found!');
        }
        return result;
    })
    )
} catch (err) {
    if (err instanceof NonexistentRecordError) {
        return Result.err(err);
    }
    return genericError;
}
}