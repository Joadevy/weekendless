-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "email" TEXT NOT NULL DEFAULT 'test@gmail.com',
ADD COLUMN     "phone" TEXT NOT NULL DEFAULT '0000000000';

-- AlterTable
ALTER TABLE "Seat" ALTER COLUMN "number" SET DEFAULT floor(random() * 1000);
