/*
  Warnings:

  - You are about to drop the column `periodId` on the `Entry` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Period` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_periodId_fkey";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "periodId",
ADD COLUMN     "periodName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Period_name_key" ON "Period"("name");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_periodName_fkey" FOREIGN KEY ("periodName") REFERENCES "Period"("name") ON DELETE SET NULL ON UPDATE CASCADE;
