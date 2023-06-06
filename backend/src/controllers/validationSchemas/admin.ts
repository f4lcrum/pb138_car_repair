import { z } from 'zod';

export const verifyTechnicianSchema = z.object({
  email: z.string().email(),
});

export const createBrandSchema = z.object({
  name: z.string().trim().nonempty(),
}).strict();

export const createBrandModelSchema = z.object({
  name: z.string().trim().nonempty(),
}).strict();
