import { z } from 'zod';
import validator from 'validator';

export const updateUserSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  phoneNumber: z.string().refine(validator.isMobilePhone).optional(),
}).strict().refine(({ firstName, lastName, phoneNumber }) => firstName !== undefined || lastName !== undefined || phoneNumber !== undefined, { message: 'One of the fields must be defined!' });

export const userRegistrationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z.string().refine(validator.isMobilePhone),
  isTechnician: z.boolean(),
}).strict();

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
}).strict();
