import type {
  Repair, RepairMaterial,
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
  material: [
  //   {
  //   id: '41221bf6-d3d6-407b-bba7-ffe50f0275be',
  //   name: '5V20 by Bosch',
  //   description: '5V20 motorovy olej',
  //   price: 20,
  //   repairId: '2653e9cd-ac59-4d85-bd88-4a6a2c5ae315',
  // }
],
}];

export const allRepairs: (Repair & {material: RepairMaterial[]})[] = [
  ...technicianJozefRepairs,
]