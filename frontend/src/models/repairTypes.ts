interface Repair {
  id: string;
  createdAt: Date;
  name?: string;
  description: string;
  mileage?: number;
  vehicleId: string;
  resolvedAt?: Date;
  workPrice: number;
  materials: RepairMaterial[];
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
  material?: RepairMaterial[];
}

export interface RepairUpdateResponse {
  name?: string;
  resolvedAt?: Date;
  technicianId?: string;
  workPrice: number;
  material?: RepairMaterial[];
}

export interface RepairMaterial {
  id?: string;
  description: string;
  name: string;
  price: number;
}
