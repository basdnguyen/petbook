-- AlterTable
ALTER TABLE "User" ADD COLUMN     "google_id" TEXT,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "salt" DROP NOT NULL;
