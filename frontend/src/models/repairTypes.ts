interface Repair {
  id: string;
  createdAt: Date;
  name?: string;
  description: string;
  mileage?: number;
  vehicleId: string;
  resolvedAt?: Date;
  workPrice: number;
  material: RepairMaterial[];
}

export interface RepairWithDetails extends Repair {
  licensePlate: string;
  brandName: string;
  brandModel: string;
  ownerFirstName: string;
  ownerLastName: string;
  technicianId?: string;
}

export interface SingleRepair extends Repair {
  technicianId?: string;
}

export interface RepairWithTechnician extends Repair {
  technicianEmail?: string;
  technicianName?: string;
}

export interface RepairCreateRequest {
  name: string;
  description: string;
  mileage: number;
}

export interface RepairUpdateRequest {
  name?: string;
  resolvedAt?: Date;
  workPrice?: number;
  mileage?: number;
  description?: string;
  material?: RepairMaterial[];
}

export interface RepairUpdateResponse {
  name?: string;
  resolvedAt?: Date;
  technicianId?: string;
  workPrice: number;
  description?: string;
  material?: RepairMaterial[];
}

export interface RepairMaterial {
  id?: string;
  name: string;
  price: number;
}
