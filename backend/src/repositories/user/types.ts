export type UserUpdateResult = {
  firstName: string | undefined,
  lastName: string | undefined,
  phoneNumber: string | undefined,
  updatedAt: Date | null
};

export type UserUpdateData = {
  id: string,
  firstName?: string | undefined,
  lastName?: string | undefined,
  phoneNumber?: string | undefined,
};

export type CheckUserData = UserUpdateData;
