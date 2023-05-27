import { z } from 'zod';
export const createFaultSchema = z.object({
  userId: z.string().uuid(),
  description: z.string().nonempty({ message: "Can't be empty" }),
}).strict();

const RepairMaterialZod = z.object({
  description: z.string().min(5), 
  name: z.string(),
  price: z.coerce.number().min(1),
})
export const updateFaultSchema = z.object({
  name: z.string().min(4).optional(),
  technicianId: z.string().uuid(),
  resolvedAt: z.coerce.date().optional(),
  workPrice: z.coerce.number().min(1).optional(),
  material: z.array(RepairMaterialZod).optional(),
  mileage: z.coerce.number().min(1).optional(),
}).refine(({workPrice, material, name, resolvedAt, mileage}) => workPrice !== undefined || material !== undefined  || name !== undefined || resolvedAt !== undefined || mileage !== undefined, { message: "One of the fields must be defined!"});