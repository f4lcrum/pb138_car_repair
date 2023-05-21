import { Schema, z } from 'zod';

export const createFaultSchema = z.object({
  userId: z.string().uuid(),
  description: z.string().nonempty({ message: "Can't be empty" }),
}).strict();
