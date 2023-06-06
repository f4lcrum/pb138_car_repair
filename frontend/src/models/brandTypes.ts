export interface Brand {
  id: string;
  brand: string;
  models: BrandModel[];
}

export interface BrandModel {
  id: string;
  name: string;
}

export interface BrandCreateRequest {
  name: string;
}

export interface ModelCreateRequest extends BrandCreateRequest {}
