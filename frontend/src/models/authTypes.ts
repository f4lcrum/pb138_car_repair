export interface Credentials {
  email: string;
  password: string;
}

export interface LogInOutRequest {
  message: string;
}

export interface Registration {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
}

export interface RegistrationRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  isTechnician: boolean;
}

export interface RegistrationResponse {
  item: AuthUserRegistration;
  message: string;
}

export interface AuthInfo {
  item: AuthUser;
  message: string;
}

interface AuthUserRegistration {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

interface AuthUser extends AuthUserRegistration {
  id: string;
  phoneNumber: string;
  isVerified: boolean;
}

export enum Role {
  TECHNICIAN = "TECHNICIAN",
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
}
