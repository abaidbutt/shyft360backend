/*
  Warnings:

  - You are about to drop the column `mobilephone` on the `Contacts` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Contacts` table. All the data in the column will be lost.
  - You are about to drop the `Business` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_accountId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentAccount" DROP CONSTRAINT "PaymentAccount_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_contactsId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_contactsNoteId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_dealsId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_historyId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_projectId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_taskId_fkey";

-- AlterTable
ALTER TABLE "Contacts" DROP COLUMN "mobilephone",
DROP COLUMN "type",
ADD COLUMN     "sourceId" TEXT;

-- DropTable
DROP TABLE "Business";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "business" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "employees" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "sales" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Paid',
    "emailSend" BOOLEAN NOT NULL DEFAULT false,
    "accountId" INTEGER,

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "password" TEXT,
    "permissions" JSONB,
    "type" TEXT,
    "accountId" INTEGER,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_email_key" ON "roles"("email");

-- AddForeignKey
ALTER TABLE "business" ADD CONSTRAINT "business_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
