/*
  Warnings:

  - You are about to drop the column `type` on the `Status` table. All the data in the column will be lost.
  - You are about to drop the column `taskTemplateId` on the `Types` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Types" DROP CONSTRAINT "Types_taskTemplateId_fkey";

-- AlterTable
ALTER TABLE "Status" DROP COLUMN "type",
ADD COLUMN     "position" INTEGER;

-- AlterTable
ALTER TABLE "Types" DROP COLUMN "taskTemplateId",
ADD COLUMN     "position" INTEGER;
