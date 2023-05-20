import client from '../client';
import allUsers from "./data";
//import { allUsers, skoda } from './data';

const seed = async () => {
  console.log(`[${new Date().toISOString()}] Seed started`);
  await client.$transaction([
    ...allUsers.map((user) => (
      client.user.create({
        data: {
          id: user.id,
          email: user.email,
          phoneNumber: user.phoneNumber,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          deletedAt: user.deletedAt,
          password: user.password,
          isVerified: user.isVerified,
        },
      })
    ))
  ]);
};
