import type {
  RepairMaterial,
} from '@prisma/client';

const allMaterials: (RepairMaterial[]) = [
  {
    id: '41221bf6-d3d6-407b-bba7-ffe50f0275be',
    name: '5V20 by Bosch',
    price: 20,
    repairId: '2653e9cd-ac59-4d85-bd88-4a6a2c5ae315',
  },
  {
    id: '27c350c4-e2a0-4663-8129-f219909bacf6',
    name: 'Baterie AAAA',
    price: 80,
    repairId: '08cd4aa8-3482-4cc9-a542-806ee641eff4',
  },
  {
    id: 'b2f07581-d841-49f8-8c67-5eecc070e1fb',
    name: 'kozusina',
    price: 800,
    repairId: '89a81c0c-dd05-413e-ae86-b7053f9af85d',
  },
  {
    id: 'b57f0c8e-c872-459a-936b-7bddadbf9e48',
    name: 'konare na stromceku',
    price: 5,
    repairId: '89a81c0c-dd05-413e-ae86-b7053f9af85d',
  },
];

export default allMaterials;
