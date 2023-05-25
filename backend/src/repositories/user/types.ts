import type { User } from "@prisma/client";
import type DbResult from "../common/types";

type DbUser = DbResult<User>;

export type UserUpdateData = {
  id: string,
  firstName?: string | undefined,
  lastName?: string | undefined,
  phoneNumber?: string | undefined,
};
export type UserUpdateResult = DbUser;

export type CheckUserData = UserUpdateData;