import type { Role, User } from '@prisma/client';
import type { Request } from 'express';
import type DbResult from '../common/types';

export type UserResult = DbResult<{
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  role: Role,
} | null>;

export type AuthReadResult = DbResult<{
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  role: Role,
  phoneNumber: string,
} | null>;
export type RegisterResult = UserResult;
export type LoginResult = DbResult<User | null>;

export type AuthReadData = {
  req: Request,
};

export type RegisterData = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phoneNumber: string,
  role: Role,
};

export type LoginData = {
  email: string,
};
