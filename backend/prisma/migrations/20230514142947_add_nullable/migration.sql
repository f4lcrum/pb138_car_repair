-- AlterTable
ALTER TABLE "Repair" ALTER COLUMN "resolvedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "scrappedAt" DROP NOT NULL,
ALTER COLUMN "deletedAt" DROP NOT NULL;
