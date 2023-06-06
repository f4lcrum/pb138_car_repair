import { Role } from "./authTypes";

export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface UserUpdateResponse extends UserUpdateRequest {
  id: string;
}

export interface Technician {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  isVerified: boolean;
}

export interface TechnicianVerifyResponse {
  id: string;
  isVerified: boolean;
}
