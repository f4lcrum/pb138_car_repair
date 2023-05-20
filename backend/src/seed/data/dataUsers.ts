import {
  Role, User, Vehicle, Repair, RepairMaterial,
} from '@prisma/client';



const user1 : (User & {
  vehicles: (Vehicle &{ repairs:(Repair & { material: RepairMaterial[] })[] })[]
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
    // seatIbiza,
  ],
};

export const allUsers : (User &
  { vehicles: (Vehicle  &
  { repairs:(Repair & { material: RepairMaterial[] })[] })[] })[] = [
    user1,
  ];

