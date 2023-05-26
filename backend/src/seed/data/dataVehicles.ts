import type {
  Vehicle, Repair, RepairMaterial,
} from '@prisma/client';

// Vehicle & {brand: BrandModel}
const seatIbiza: (Vehicle  & { repairs:(Repair & { material: RepairMaterial[] })[] }) = {
  id: '2be2a276-60f5-4583-8dc1-3c2be9aae841',
  ownerId: 'e62b71bd-c10b-41e6-aa26-6b7ba25c16b9',
  brandId: '875bc2f6-bd26-4f6a-ae29-1c3669021831',
  //brand: seatModels[0]!,
  licensePlate: 'TO-123-XY',
  winCode: '123456',
  manufacturedAt: new Date('2010-03-05T16:00:00.000Z'),
  scrappedAt: null,
  deletedAt: null,
  repairs: [
  ],

};

const porscheTaycan: (Vehicle  & { repairs:(Repair & { material: RepairMaterial[] })[] }) = {
  id: '5f66633f-1b1f-42f9-ae44-21328e263bff',
  ownerId: 'b13ec116-0392-4db3-8684-9edb61f3e7a9',
  brandId: '755a4280-f745-11ed-b67e-0242ac120002',
  //brand: seatModels[0]!,
  licensePlate: 'BL-487-XA',
  winCode: '123765',
  manufacturedAt: new Date('2013-03-05T16:00:00.000Z'),
  scrappedAt: null,
  deletedAt: null,
  repairs: [
  ],

};

const porscheCarrera: (Vehicle  & { repairs:(Repair & { material: RepairMaterial[] })[] }) = {
  id: '6fbe873a-73e7-443a-b528-ead0d59ac747',
  ownerId: '31beee14-f744-11ed-b67e-0242ac120002',
  brandId: '6f439f5e-f745-11ed-b67e-0242ac120002',
  //brand: seatModels[0]!,
  licensePlate: 'KE-487-KT',
  winCode: '555765',
  manufacturedAt: new Date('2016-03-05T16:00:00.000Z'),
  scrappedAt: null,
  deletedAt: null,
  repairs: [
  ],

};

const bmwX6: (Vehicle  & { repairs:(Repair & { material: RepairMaterial[] })[] }) = {
  id: 'fc986e3f-f341-417b-b180-a52aef37e049',
  ownerId: '38b610c6-f744-11ed-b67e-0242ac120002',
  brandId: '40fc1f92-dbc5-4595-ad7e-a61e677d2843',
  //brand: seatModels[0]!,
  licensePlate: 'KE-222-TT',
  winCode: '885765',
  manufacturedAt: new Date('2018-03-05T16:00:00.000Z'),
  scrappedAt: null,
  deletedAt: null,
  repairs: [
  ],

};

export const allVehicles: (Vehicle & {
  repairs: (Repair & {
      material: RepairMaterial[],
  })[]})[] = [
  seatIbiza, 
  porscheTaycan,
  porscheCarrera,
  bmwX6,

]