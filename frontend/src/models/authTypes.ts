export interface Credentials {
    email: string;
    password: string;
}

export interface RegistrationRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role?: 'TECHNICIAN';
}

export interface AuthInfo {
    item: AuthUser;
    message: string;
}

interface AuthUser {
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
}

export enum Role {
    TECHNICIAN, ADMIN, CLIENT
}