interface Vehicle {
  id: string;
  ownerId: string;
  licensePlate: string;
  vinCode: string;
  manufacturedAt: Date;
  scrappedAt?: Date;
  deletedAt?: Date;
}

export interface SingleVehicle extends Vehicle {
  brandId: string;
}

export interface VehicleWithBrand extends Vehicle {
  brandName: string;
  brandModel: string;
}

export interface VehicleCreateRequest {
  brandId: string;
  licensePlate: string;
  vinCode: string;
  manufacturedAt: Date;
}

export interface SingleVehicleQueryParams {
  licensePlate?: string;
  vinCode?: string;
}
