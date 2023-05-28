import { z } from "zod";


export const vehicleReadManySchema = z.object({
  brandName: z.string().optional(),
  createdAt: z.coerce.boolean().optional(),
  manufacturedAt: z.coerce.boolean().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional()
}).strict();