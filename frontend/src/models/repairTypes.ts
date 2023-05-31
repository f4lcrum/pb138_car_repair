export interface Repair {
    id: string;
    createdAt: Date;
    name?: string;
    description: string;
    mileage?: number;
    technicianId?: string;
    vehicleId: string;
    resolvedAt?: Date;
    workPrice: number;
}

export interface RepairCreateRequest {
    description: string;
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
    description: string;
    name: string;
    price: number;
}