/*
  Warnings:

  - You are about to drop the column `email` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Seat` table. All the data in the column will be lost.
  - You are about to drop the column `reservationId` on the `Seat` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[seatId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `attendeeId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_reservationId_fkey";

-- DropIndex
DROP INDEX "Reservation_name_idx";

-- DropIndex
DROP INDEX "Seat_name_idx";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "attendeeId" INTEGER NOT NULL,
ADD COLUMN     "seatId" INTEGER NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "name",
DROP COLUMN "reservationId",
ADD COLUMN     "number" INTEGER NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "attendee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nationalID" TEXT NOT NULL,

    CONSTRAINT "attendee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "attendee_nationalID_key" ON "attendee"("nationalID");

-- CreateIndex
CREATE INDEX "attendee_nationalID_idx" ON "attendee"("nationalID");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_seatId_key" ON "Reservation"("seatId");

-- CreateIndex
CREATE INDEX "Reservation_userId_idx" ON "Reservation"("userId");

-- CreateIndex
CREATE INDEX "Seat_number_idx" ON "Seat"("number");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "attendee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
