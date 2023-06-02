/*
  Warnings:

  - You are about to drop the column `winCode` on the `Vehicle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vinCode]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vinCode` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Vehicle_winCode_key";

-- AlterTable
ALTER TABLE "Vehicle" RENAME COLUMN "winCode" TO "vinCode";

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_vinCode_key" ON "Vehicle"("vinCode");
