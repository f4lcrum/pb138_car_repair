import { Result } from '@badrap/result';
import client from '../client';
import type { BrandReadData, BrandReadResult } from './types';


export const read = async (data: BrandReadData): Promise<BrandReadResult> => {
    try {
        return Result.ok(
            await client.$transaction(async (tx) => {
                return Result.ok({brands: ["skoda"]});
            })
        )
    }
}