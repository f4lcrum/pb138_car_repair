import {
  Role, User,
} from '@prisma/client';

const technicianJozef : (User) = {
  id: '72e4eda6-5bd0-466c-8c56-b5405cd12e2f',
  email: 'jozino@azet.sk',
  firstName: 'Jozef',
  lastName: 'Novak',
  role: Role.TECHNICIAN,
  createdAt: new Date('2008-02-07T12:45:03.000Z'),
  updatedAt: null,
  deletedAt: null,
  password: '12345678',
  isVerified: true,
  phoneNumber: '+421123456789',
};

const allTechnicians = [
  technicianJozef,
];

export default allTechnicians;
