export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface UserUpdateResponse extends UserUpdateRequest {
  id: string;
}
