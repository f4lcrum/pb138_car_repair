import { z } from "zod";
import validator from 'validator';
export const updateUserSchema = z.object({
  // id: z.string().uuid(),
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  phoneNumber: z.string().refine(validator.isMobilePhone).optional(),
})