/*
  Warnings:

  - You are about to drop the column `taskTemplateId` on the `Status` table. All the data in the column will be lost.
  - Added the required column `type` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Status" DROP CONSTRAINT "Status_taskTemplateId_fkey";

-- AlterTable
ALTER TABLE "Status" DROP COLUMN "taskTemplateId",
ADD COLUMN     "type" TEXT NOT NULL;
