import { z } from 'zod';

export const readAllFaultSchema = z.object({
  unresolved: z.enum(['true', 'false']).transform((value) => value === 'true'),
}).strict();

export const createFaultSchema = z.object({
  name: z.string().trim().nonempty({ message: "Can't be empty" }),
  description: z.string().trim().nonempty({ message: "Can't be empty" }),
  mileage: z.coerce.number(),
}).strict();

const RepairMaterialZod = z.object({
  name: z.string().trim().nonempty(),
  price: z.coerce.number().min(1),
}).strict();
export const updateFaultSchema = z.object({
  description: z.string().min(2).optional(),
  name: z.string().min(4).optional(),
  resolvedAt: z.coerce.date().optional(),
  workPrice: z.coerce.number().min(0).optional(),
  material: z.array(RepairMaterialZod).optional(),
  mileage: z.coerce.number().min(0).optional(),
}).strict().refine(({
  workPrice, material, name, resolvedAt, mileage, description,
}) => workPrice !== undefined || description !== undefined || material !== undefined || name !== undefined || resolvedAt !== undefined || mileage !== undefined, { message: 'One of the fields must be defined!' });
