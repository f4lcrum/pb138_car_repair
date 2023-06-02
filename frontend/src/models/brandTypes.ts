export interface Brand {
  brand: string;
  models: BrandModel[];
}

export interface BrandModel {
  id: string;
  name: string;
}
