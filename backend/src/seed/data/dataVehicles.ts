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
  //...technicianJozefRepairs,
  ],

};

export const allVehicles: (Vehicle & {
  repairs: (Repair & {
      material: RepairMaterial[],
  })[]})[] = [
  seatIbiza, 

]