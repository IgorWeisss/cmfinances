/*
  Warnings:

  - Made the column `periodName` on table `Entry` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_periodName_fkey";

-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "periodName" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_periodName_fkey" FOREIGN KEY ("periodName") REFERENCES "Period"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
