// modify when needed

export type User = {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  createdAt?: Date;
  password?: string;
  deletedAt?: Date;
  isVerified?: boolean;
  vehicles?: Vehicle[];
};

export enum UserRole {
  Admin = "admin",
  Technician = "technician",
  Customer = "customer",
}

export type Vehicle = {
  id?: string;
  owner?: User;
  model?: Model;
  licensePlate?: string;
  winCode?: string;
  manufacturedAt?: Date;
  scrappedAt?: Date;
  repairs?: Repair[];
};

export type Brand = {
  id?: string;
  name?: string;
};

export type Model = {
  id?: string;
  name?: string;
  brand?: Brand;
  type?: VehicleType;
};

export enum VehicleType {
  Car = "car",
  Motorbike = "motorbike",
  Van = "van",
}

export type Repair = {
  id?: string;
  technician?: User;
  mileage?: number;
  name?: string;
  workPrice?: double;
  createdAt?: Date;
  resolvedAt?: Date;
  description?: string;
};
