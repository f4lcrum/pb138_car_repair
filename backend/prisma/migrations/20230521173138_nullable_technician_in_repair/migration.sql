-- DropForeignKey
ALTER TABLE "Repair" DROP CONSTRAINT "Repair_technicianId_fkey";

-- AlterTable
ALTER TABLE "Repair" ALTER COLUMN "technicianId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Repair" ADD CONSTRAINT "Repair_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
