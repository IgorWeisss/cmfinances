/*
  Warnings:

  - Added the required column `entryType` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paid` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EntryType" AS ENUM ('IN', 'OUT');

-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "entryType" "EntryType" NOT NULL,
ADD COLUMN     "paid" BOOLEAN NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "client" DROP NOT NULL,
ALTER COLUMN "clientId" DROP NOT NULL,
ALTER COLUMN "payMethod" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
