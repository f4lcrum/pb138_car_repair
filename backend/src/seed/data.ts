import {
  Role, User, Vehicle, Brand, BrandModel, Repair, RepairMaterial,
} from '@prisma/client';

const technicianJozefRepairs : (Repair & { material: RepairMaterial[] })[] = [{
  id: '2653e9cd-ac59-4d85-bd88-4a6a2c5ae315',
  createdAt: new Date('2012-02-07T12:45:03.000Z'),
  vehicleId: '2be2a276-60f5-4583-8dc1-3c2be9aae841',
  workPrice: 30,
  description: 'Vymena oleja',
  mileage: 90000,
  name: 'Oprava c.1',
  technicianId: '72e4eda6-5bd0-466c-8c56-b5405cd12e2f',
  resolvedAt: new Date('2012-02-25T12:45:03.000Z'),
  material: [{
    id: '41221bf6-d3d6-407b-bba7-ffe50f0275be',
    name: '5V20 by Bosch',
    description: '5V20 motorovy olej',
    price: 20,
    repairId: '2653e9cd-ac59-4d85-bd88-4a6a2c5ae315',
  }],
}];


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

// Vehicle & {brand: BrandModel}
const seatIbiza: (Vehicle  & { repairs:(Repair & { material: RepairMaterial[] })[] }) = {
  id: '2be2a276-60f5-4583-8dc1-3c2be9aae841',
  ownerId: 'e62b71bd-c10b-41e6-aa26-6b7ba25c16b9',
  brandId: '903013aa-a819-4efe-b4fb-ca0e0269376d',
  //brand: seatModels[0]!,
  licensePlate: 'TO-123-XY',
  winCode: '123456',
  manufacturedAt: new Date('2010-03-05T16:00:00.000Z'),
  scrappedAt: null,
  deletedAt: null,
  repairs: [{
    id: 'b9ec9015-9edc-4e66-bc96-b1eca94d64ca',
    createdAt: new Date('2014-03-05T12:45:03.000Z'),
    description: 'Vymena turba',
    mileage: 150000,
    name: 'Oprava c.2',
    resolvedAt: null,
    vehicleId: '2be2a276-60f5-4583-8dc1-3c2be9aae841',
    technicianId: '',
    workPrice: 0,
    material: [],
  },
  ...technicianJozefRepairs,
  ],

};

const technicianJozef : (User & { repairs: (Repair & { material: RepairMaterial[] })[] }) = {
  id: '72e4eda6-5bd0-466c-8c56-b5405cd12e2f',
  email: 'jozino@azet.sk',
  firstName: 'Jozef',
  lastName: 'Novak',
  role: Role.TECHNICIAN,
  createdAt: new Date('2008-02-07T12:45:03.000Z'),
  updatedAt: null,
  deletedAt: null,
  password: '123456',
  isVerified: false,
  phoneNumber: '+421123456789',
  repairs: technicianJozefRepairs,
};



const seat : (Brand & { models: BrandModel[] }) = {
  id: '903013aa-a819-4efe-b4fb-ca0e0269376d',
  name: 'Seat',
  models: seatModels,
};

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

const skoda : (Brand & { models: BrandModel[] }) = {
  id: '94ffe037-385f-4466-ac31-ca1b5fcc50f6',
  name: 'Skoda',
  models: skodaModels,
};

// Vehicle & {brand: BrandModel}
const user1 : (User & {
  vehicles: (Vehicle  &{ repairs:(Repair & { material: RepairMaterial[] })[] })[]
}) = {
  id: 'e62b71bd-c10b-41e6-aa26-6b7ba25c16b9',
  email: 'alino@gmail.com',
  firstName: 'Alino',
  lastName: 'Krasnansky',
  password: 'ali123',
  role: Role.CLIENT,
  isVerified: false,
  phoneNumber: '0923342134',
  createdAt: new Date('2023-03-05T12:45:03.000Z'),
  updatedAt: null,
  deletedAt: null,
  vehicles: [
    seatIbiza,
  ],
};
//Vehicle & {brand: BrandModel}
const allUsers : (User &
{ vehicles: (Vehicle  &
{ repairs:(Repair & { material: RepairMaterial[] })[] })[] })[] = [user1];

export default allUsers;
