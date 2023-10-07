/*
  Warnings:

  - You are about to drop the column `attendeeId` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `attendeeNationalID` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_attendeeId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "attendeeId",
ADD COLUMN     "attendeeNationalID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_attendeeNationalID_fkey" FOREIGN KEY ("attendeeNationalID") REFERENCES "Attendee"("nationalID") ON DELETE RESTRICT ON UPDATE CASCADE;
