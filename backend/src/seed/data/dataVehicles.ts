import type {
  Vehicle,
} from '@prisma/client';

const seatIbiza: (Vehicle) = {
  id: '2be2a276-60f5-4583-8dc1-3c2be9aae841',
  ownerId: 'e62b71bd-c10b-41e6-aa26-6b7ba25c16b9',
  brandId: '875bc2f6-bd26-4f6a-ae29-1c3669021831',
  licensePlate: 'TO-123-XY',
  vinCode: '123456',
  manufacturedAt: new Date('2010-03-05T16:00:00.000Z'),
  scrappedAt: null,
  createdAt: new Date('2013-03-05T16:00:00.000Z'),
  deletedAt: null,
};

const porscheTaycan: (Vehicle) = {
  id: '5f66633f-1b1f-42f9-ae44-21328e263bff',
  ownerId: 'b13ec116-0392-4db3-8684-9edb61f3e7a9',
  brandId: '755a4280-f745-11ed-b67e-0242ac120002',
  licensePlate: 'BL-487-XA',
  vinCode: '123765',
  manufacturedAt: new Date('2013-03-05T16:00:00.000Z'),
  scrappedAt: null,
  createdAt: new Date(),
  deletedAt: null,
};

const porscheCarrera: (Vehicle) = {
  id: '6fbe873a-73e7-443a-b528-ead0d59ac747',
  ownerId: '31beee14-f744-11ed-b67e-0242ac120002',
  brandId: '6f439f5e-f745-11ed-b67e-0242ac120002',
  licensePlate: 'KE-487-KT',
  vinCode: '555765',
  manufacturedAt: new Date('2016-03-05T16:00:00.000Z'),
  scrappedAt: null,
  createdAt: new Date('2014-03-05T16:00:00.000Z'),
  deletedAt: null,
};

const bmwX6: (Vehicle
) = {
  id: 'fc986e3f-f341-417b-b180-a52aef37e049',
  ownerId: '38b610c6-f744-11ed-b67e-0242ac120002',
  brandId: '40fc1f92-dbc5-4595-ad7e-a61e677d2843',
  licensePlate: 'KE-222-TT',
  vinCode: '885765',
  manufacturedAt: new Date('2018-03-05T16:00:00.000Z'),
  scrappedAt: null,
  createdAt: new Date('2015-03-05T16:00:00.000Z'),
  deletedAt: null,
};

const porscheCarrera2 : (Vehicle) = {
  id: 'ef0aff69-2657-403f-96e7-4dbb8d5ebb00',
  ownerId: '38b610c6-f744-11ed-b67e-0242ac120002',
  brandId: '6f439f5e-f745-11ed-b67e-0242ac120002',
  licensePlate: 'KE-333-KE',
  vinCode: '111765',
  createdAt: new Date('2016-03-05T16:00:00.000Z'),
  manufacturedAt: new Date('2019-03-05T16:00:00.000Z'),
  scrappedAt: null,
  deletedAt: null,
};

const allVehicles: (Vehicle)[] = [
  seatIbiza,
  porscheTaycan,
  porscheCarrera,
  bmwX6,
  porscheCarrera2,

];

export default allVehicles;
