import { z } from "zod";


export const vehicleReadManySchema = z.object({
  brandName: z.string().optional(),
  createdAt: z.coerce.boolean().optional(),
  manufacturedAt: z.coerce.boolean().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional()
}).strict();


export const vehicleReadSpecificSchema = z.object({
  licensePlate: z.string().optional(),
  winCode: z.string().optional(),
}).strict().refine(({licensePlate, winCode}) => licensePlate !== undefined || winCode !== undefined, { message: "One of the fields must be defined!" })