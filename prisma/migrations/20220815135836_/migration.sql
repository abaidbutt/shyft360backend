/*
  Warnings:

  - You are about to drop the column `address` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `birthdate` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `businessNumber` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `legalName` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Business` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_userId_fkey";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "address",
DROP COLUMN "birthdate",
DROP COLUMN "businessNumber",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "legalName",
DROP COLUMN "userId",
DROP COLUMN "website",
ADD COLUMN     "accountId" INTEGER;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
