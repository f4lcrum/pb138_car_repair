export interface Vehicle {
  id: string;
  brandId: string;
  ownerId: string;
  licensePlate: string;
  winCode: string;
  manufacturedAt: Date;
  scrappedAt?: Date;
  deletedAt?: Date;
}

export interface VehicleCreate {
  brandId: string;
  licensePlate: string;
  winCode: string;
  manufacturedAt: Date;
}

export interface SingleVehicleQueryParams {
  licensePlate?: string;
  winCode?: string;
}

export interface ManyVehicleQueryParams {
  brandName?: string;
  createdAt?: boolean;
  manufacturedAt?: boolean;
  sortOrder?: "asc" | "desc";
}
