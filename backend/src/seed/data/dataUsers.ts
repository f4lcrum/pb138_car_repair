import {
  Role, User,
} from '@prisma/client';

const user1 : (User) = {
  id: 'e62b71bd-c10b-41e6-aa26-6b7ba25c16b9',
  email: 'alino@gmail.com',
  firstName: 'Alino',
  lastName: 'Krasnansky',
  password: 'alinko123',
  role: Role.CLIENT,
  isVerified: false,
  phoneNumber: '0923342134',
  createdAt: new Date('2023-03-05T12:45:03.000Z'),
  updatedAt: null,
  deletedAt: null,
};

const oldJohny : (User) = {
  id: 'b13ec116-0392-4db3-8684-9edb61f3e7a9',
  email: 'johny_big_boy@gmail.com',
  firstName: 'Stary',
  lastName: 'Jano',
  password: 'danko_moj_krasny123',
  role: Role.CLIENT,
  isVerified: false,
  phoneNumber: '0923696934',
  createdAt: new Date('2023-03-20T12:45:03.000Z'),
  updatedAt: null,
  deletedAt: null,
};

const gombi : (User) = {
  id: '31beee14-f744-11ed-b67e-0242ac120002',
  email: 'top_spravodajstvo_gombitova@gmail.com',
  firstName: 'Vajcomira',
  lastName: 'Gombitova',
  password: 'koloseum',
  role: Role.CLIENT,
  isVerified: false,
  phoneNumber: '0923698765',
  createdAt: new Date('2023-03-22T12:45:03.000Z'),
  updatedAt: null,
  deletedAt: null,
};

const slota : (User) = {
  id: '38b610c6-f744-11ed-b67e-0242ac120002',
  email: 'za_aj_pred_slovenskom@gmail.com',
  firstName: 'Jozef',
  lastName: 'Slota',
  password: 'madarovMamTajneRad',
  role: Role.CLIENT,
  isVerified: false,
  phoneNumber: '0923698444',
  createdAt: new Date('2023-04-22T12:45:03.000Z'),
  updatedAt: null,
  deletedAt: null,
};

const allUsers : (User[]) = [
  user1,
  oldJohny,
  gombi,
  slota,
];

export default allUsers;
