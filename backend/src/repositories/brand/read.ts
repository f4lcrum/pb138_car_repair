import { Result } from '@badrap/result';
import client from '../client';
import type { BrandReadResult } from './types';
import { NonexistentRecordError } from '../common/error';
import { genericError } from '../common/types';

// export const readSpecific = async (data: BrandReadData): BrandReadSpecificResult => {
// try {
//         return Result.ok(
//              await client.$transaction(async (tx) => {
//                 const brandModels = await tx.vehicle.findMany({
//                     where: {
//                         ownerId: data.userId
//                     },
//                     select: {
//                         brand: {
//                             select: {
//                                 brand: true,
//                             }
//                         }
//                 }});

//                 const result = brandModels.map(model => (model.brand.brand.name));
//                 return { name: result };
//             })
//         )
//     } catch (err) {
//         if (err instanceof Error) {
//             return Result.err(err);
//         }
//         return genericError;
//     }
// }

const read = async (): BrandReadResult => {
  try {
    return Result.ok(
      await client.$transaction(async (tx) => {
        const brandModels = await tx.brandModel.findMany({
          select: {
            id: true,
            name: true,
            brand: {
              select: {
                name: true,
              },
            },
          },
        });
        const result = brandModels.map((model) => ({
          brand: model.brand.name,
          models: { id: model.id, name: model.name },
        }));
        if (result === null) {
          throw new NonexistentRecordError('No brand was found!');
        }
        return result;
      }),
    );
  } catch (err) {
    if (err instanceof NonexistentRecordError) {
      return Result.err(err);
    }
    return genericError;
  }
};

export default read;
