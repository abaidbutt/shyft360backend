/*
  Warnings:

  - You are about to drop the column `annualSales` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `businessName` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `businessTime` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `businessType` on the `Business` table. All the data in the column will be lost.
  - Added the required column `name` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_accountId_fkey";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "annualSales",
DROP COLUMN "businessName",
DROP COLUMN "businessTime",
DROP COLUMN "businessType",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "sales" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
