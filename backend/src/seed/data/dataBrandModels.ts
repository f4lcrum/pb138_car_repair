import type {
  BrandModel,
} from '@prisma/client';

const seatModels : BrandModel[] = [{
  id: '875bc2f6-bd26-4f6a-ae29-1c3669021831',
  brandId: '903013aa-a819-4efe-b4fb-ca0e0269376d',
  name: 'Seat Ibiza 2000',
},
{
  id: '848c8f6a-80e5-4266-8cb0-002eb1aa64e1',
  brandId: '903013aa-a819-4efe-b4fb-ca0e0269376d',
  name: 'Seat Leon 1998',
},
{
  id: '2abfbf29-5729-4b86-944f-dcadfaf7cf09',
  brandId: '903013aa-a819-4efe-b4fb-ca0e0269376d',
  name: 'Seat Arona 2020',
},
];

const skodaModels : BrandModel[] = [{
  id: '7dab8964-cfed-4dc4-bedd-19c4a92f3271',
  brandId: '94ffe037-385f-4466-ac31-ca1b5fcc50f6',
  name: 'Skoda Octavia 1',
},
{
  id: '0d4ecaa8-efa5-49f7-9470-1033f9435ee9',
  brandId: '94ffe037-385f-4466-ac31-ca1b5fcc50f6',
  name: 'Skoda Superb 2',
},
{
  id: 'd663949f-27aa-4404-a43f-80e064143ceb',
  brandId: '94ffe037-385f-4466-ac31-ca1b5fcc50f6',
  name: 'Skoda Fabia 2',
},
];

export const allBrandModels: BrandModel[] = [
  ...skodaModels,
  ...seatModels,
]