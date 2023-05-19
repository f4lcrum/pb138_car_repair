import { Role, User } from '@prisma/client';

const user1 : User = {
  id: 'e62b71bd-c10b-41e6-aa26-6b7ba25c16b9',
  email: 'alino@gmail.com',
  firstName: 'Alino',
  lastName: 'Krasnansky',
  password: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
  role: Role.CLIENT,
  isVerified: false,
  phoneNumber: '0923342134',
  createdAt: new Date('2023-03-05T12:45:03.000Z'),
  deletedAt: null,
};
