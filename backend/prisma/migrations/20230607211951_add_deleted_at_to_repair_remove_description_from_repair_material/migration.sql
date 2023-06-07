/*
  Warnings:

  - You are about to drop the column `description` on the `RepairMaterial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Repair" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "RepairMaterial" DROP COLUMN "description";
