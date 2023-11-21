/*
  Warnings:

  - Made the column `typeId` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cityId` on table `Venue` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_cityId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "typeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Seat" ALTER COLUMN "number" SET DEFAULT floor(random() * 1000);

-- AlterTable
ALTER TABLE "Venue" ALTER COLUMN "cityId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TypeEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
