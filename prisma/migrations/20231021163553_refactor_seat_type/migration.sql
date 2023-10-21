/*
  Warnings:

  - You are about to drop the column `description` on the `Seat` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Seat` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "description",
DROP COLUMN "price",
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TypeSeat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TypeSeat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TypeSeat_name_idx" ON "TypeSeat"("name");

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TypeSeat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
