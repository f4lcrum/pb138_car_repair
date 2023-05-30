import argon2 from 'argon2';
import client from '../client';
import {
  allBrandModels,
  allBrands,
  allUsers,
  allTechnicians,
  allVehicles,
  allRepairs,
  allMaterials,
  allAdmins,
} from './data/data';

const seed = async () => {
  // password hashing process
  const hashedUsers = allUsers.map(async (user) => {
    const hashedPassword = await argon2.hash(user.password);
    return { ...user, password: hashedPassword };
  });

  const hashedTechnicians = allTechnicians.map(async (technician) => {
    const hashedPassword = await argon2.hash(technician.password);
    return { ...technician, password: hashedPassword };
  });

  const hashedAdmins = allAdmins.map(async (admin) => {
    const hashedPassword = await argon2.hash(admin.password);
    return { ...admin, password: hashedPassword };
  });

  await client.$transaction([
    client.brand.createMany({
      data: allBrands.map((brand) => ({ id: brand.id, name: brand.name })),
    }),

    client.brandModel.createMany({
      data: allBrandModels.map((model) => ({ ...model })),
    }),

    client.user.createMany({
      data: await Promise.all(hashedTechnicians)
        .then((result) => result.map((technician) => ({ ...technician }))),
    }),
    client.user.createMany({
      data: await Promise.all(hashedAdmins).then((result) => result.map((admin) => ({ ...admin }))),
    }),
    client.user.createMany({
      data: await Promise.all(hashedUsers).then((result) => result.map((user) => ({ ...user }))),
    }),

    client.vehicle.createMany({
      data: allVehicles.map((vehicle) => ({ ...vehicle })),
    }),

    client.repair.createMany({
      data: allRepairs.map((repair) => ({ ...repair })),
    }),

    client.repairMaterial.createMany({
      data: allMaterials.map((material) => ({ ...material })),
    }),
  ]);
};

seed().then(() => {
  console.log(`[${new Date().toISOString()}] Seed succeeded`);
}).catch((e) => {
  console.log(`[${new Date().toISOString()}] Seed failed`);
  console.log(e);
}).finally(async () => {
  await client.$disconnect();
});
