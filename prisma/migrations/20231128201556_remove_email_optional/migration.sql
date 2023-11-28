/*
  Warnings:

  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Seat" ALTER COLUMN "number" SET DEFAULT floor(random() * 1000);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;
