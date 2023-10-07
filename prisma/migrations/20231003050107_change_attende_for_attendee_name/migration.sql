/*
  Warnings:

  - You are about to drop the `attendee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_attendeeId_fkey";

-- DropTable
DROP TABLE "attendee";

-- CreateTable
CREATE TABLE "Attendee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nationalID" TEXT NOT NULL,

    CONSTRAINT "Attendee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attendee_nationalID_key" ON "Attendee"("nationalID");

-- CreateIndex
CREATE INDEX "Attendee_nationalID_idx" ON "Attendee"("nationalID");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "Attendee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
