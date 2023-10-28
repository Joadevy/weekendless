-- AlterTable
ALTER TABLE "Seat" ALTER COLUMN "number" SET DEFAULT floor(random() * 1000);
