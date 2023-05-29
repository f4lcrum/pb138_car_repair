import client from '../client';
import { allBrandModels, allBrands, allUsers, allTechnicians, allVehicles, allRepairs, allMaterials, allAdmins} from './data/data';
import argon2 from 'argon2';


const seed = async () => {
  // password hashing process
  for (let user of allUsers) {
    user.password = await argon2.hash(user.password);
  }
  for (let technician of allTechnicians) {
    technician.password = await argon2.hash(technician.password);
  }
  for (let admin of allAdmins) {
    admin.password = await argon2.hash(admin.password);
  }

  await client.$transaction([
    // create all brands
    client.brand.createMany({
      data: allBrands.map((brand) => ({id: brand.id, name: brand.name})),
    }),

    client.brandModel.createMany({
      data: allBrandModels.map((model) => ({...model})),
    }),

    client.user.createMany({
      data: allTechnicians.map((technician) => ({...technician})),
    }),

    client.user.createMany({
      data: allAdmins.map((admin) => ({...admin})),
    }),

    client.user.createMany({
      data: allUsers.map((user) => ({...user})),
    }),

    client.vehicle.createMany({
      data: allVehicles.map((vehicle) => ({...vehicle})),
    }),

    client.repair.createMany({
      data: allRepairs.map((repair) => ({...repair})),
    }),

    client.repairMaterial.createMany({
      data: allMaterials.map((material) => ({...material})),
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
