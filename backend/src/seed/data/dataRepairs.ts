import type {
  Repair,
} from '@prisma/client';

const technicianJozefRepairs : (Repair)[] = [{
  id: '2653e9cd-ac59-4d85-bd88-4a6a2c5ae315',
  createdAt: new Date('2012-02-07T12:45:03.000Z'),
  vehicleId: '2be2a276-60f5-4583-8dc1-3c2be9aae841',
  workPrice: 30,
  description: 'Vymena oleja',
  mileage: 90000,
  name: 'Oprava c.1',
  technicianId: '72e4eda6-5bd0-466c-8c56-b5405cd12e2f',
  resolvedAt: new Date('2012-02-25T12:45:03.000Z'),
},
{
  id: 'b9ec9015-9edc-4e66-bc96-b1eca94d64ca',
  createdAt: new Date('2014-03-05T12:45:03.000Z'),
  description: 'Vymena turba',
  mileage: 150000,
  name: 'Oprava c.2',
  resolvedAt: null,
  vehicleId: '2be2a276-60f5-4583-8dc1-3c2be9aae841',
  technicianId: '72e4eda6-5bd0-466c-8c56-b5405cd12e2f',
  workPrice: 0,
},
{
  id: '08cd4aa8-3482-4cc9-a542-806ee641eff4',
  createdAt: new Date('2012-03-07T12:45:03.000Z'),
  vehicleId: '2be2a276-60f5-4583-8dc1-3c2be9aae841',
  workPrice: 120,
  description: 'vymena baterie',
  mileage: 100000,
  name: 'Oprava c.3',
  technicianId: '72e4eda6-5bd0-466c-8c56-b5405cd12e2f',
  resolvedAt: new Date('2012-03-25T12:45:03.000Z'),
},

{
  id: '89a81c0c-dd05-413e-ae86-b7053f9af85d',
  createdAt: new Date('2019-03-07T12:45:03.000Z'),
  vehicleId: '6fbe873a-73e7-443a-b528-ead0d59ac747',
  workPrice: 1200,
  description: 'esteticky tuning',
  mileage: 20000,
  name: 'Oprava c.4',
  technicianId: '72e4eda6-5bd0-466c-8c56-b5405cd12e2f',
  resolvedAt: new Date('2019-03-25T12:45:03.000Z'),
},
];

const allRepairs: (Repair)[] = [
  ...technicianJozefRepairs,
];

export default allRepairs;
