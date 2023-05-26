import client from '../client';
import { allBrandModels, allBrands, allUsers, allTechnicians, allVehicles, allRepairs, allMaterials} from './data/data';


const seed = async () => {
  await client.$transaction([
    // create all brands
    ...allBrands.map((brand) => client.brand.create({ data: { id: brand.id, name: brand.name } })),

    // create all brand models
    ...allBrandModels.map((model) => client.brandModel.create({ data: { ...model } })),

    // create all technicians
    ...allTechnicians.map((user) =>
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
    ),

    // create all users
    ...allUsers.map((user) =>
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
    ),

    // create all vehicles
    ...allVehicles.map((vehicle) =>
      client.vehicle.create({
        data: {
          id: vehicle.id,
          brandId: vehicle.brandId,
          ownerId: vehicle.ownerId,
          licensePlate: vehicle.licensePlate,
          winCode: vehicle.winCode,
          manufacturedAt: vehicle.manufacturedAt,
          scrappedAt: vehicle.scrappedAt,
          deletedAt: vehicle.deletedAt,
        },
      })
    ),

    // create all repairs:
    ...allRepairs.map((repair) => 
    client.repair.create({
      data: {
        id: repair.id,
        createdAt: repair.createdAt,
        description: repair.description,
        mileage: repair.mileage,
        name: repair.name,
        technicianId: repair.technicianId,
        vehicleId: repair.vehicleId,
        resolvedAt: repair.resolvedAt,
        workPrice: repair.workPrice,
        
        }    
        }
    ),
    ),

    // create all repairmaterial:
    ...allMaterials.map((material) => 
    client.repairMaterial.create({
      data: {
        id: material.id,
        description: material.description,
        name: material.name,
        price: material.price,
        repairId: material.repairId,
      }
    })
    )
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
