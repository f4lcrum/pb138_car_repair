import { z } from 'zod';

export const vehicleReadManySchema = z.object({
  brandName: z.string().optional(),
  createdAt: z.coerce.boolean().optional(),
  manufacturedAt: z.coerce.boolean().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
}).strict();

export const vehicleReadSpecificSchema = z.object({
  licensePlate: z.string().optional(),
  vinCode: z.string().optional(),
}).strict().refine(({ licensePlate, vinCode }) => licensePlate !== undefined || vinCode !== undefined, { message: 'One of the fields must be defined!' });

export const vehicleCreateSchema = z.object({
  brandId: z.string().uuid(),
  licensePlate: z.string().trim().min(4).max(10),
  vinCode: z.string().trim().min(4).max(17),
  manufacturedAt: z.coerce.date().max(new Date()),
}).strict();
