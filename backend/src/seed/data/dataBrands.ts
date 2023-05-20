import type {
  Brand, BrandModel,
} from '@prisma/client';

const seat : (Brand & { models: BrandModel[] }) = {
  id: '903013aa-a819-4efe-b4fb-ca0e0269376d',
  name: 'Seat',
  models: [],//seatModels,
};

const skoda : (Brand & { models: BrandModel[] }) = {
  id: '94ffe037-385f-4466-ac31-ca1b5fcc50f6',
  name: 'Skoda',
  models: [],//skodaModels,
};

export const allBrands: (Brand & { models: BrandModel[] })[] = [
  skoda,
  seat,
]