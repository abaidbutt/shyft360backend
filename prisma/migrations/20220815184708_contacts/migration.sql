/*
  Warnings:

  - You are about to drop the column `dealsId` on the `Contacts` table. All the data in the column will be lost.
  - You are about to drop the column `historyId` on the `Contacts` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `Contacts` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Contacts` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Contacts` table. All the data in the column will be lost.
  - You are about to drop the column `taskId` on the `Contacts` table. All the data in the column will be lost.
  - You are about to drop the column `contactsId` on the `Forms` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contacts" DROP CONSTRAINT "Contacts_dealsId_fkey";

-- DropForeignKey
ALTER TABLE "Contacts" DROP CONSTRAINT "Contacts_historyId_fkey";

-- DropForeignKey
ALTER TABLE "Contacts" DROP CONSTRAINT "Contacts_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Contacts" DROP CONSTRAINT "Contacts_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Contacts" DROP CONSTRAINT "Contacts_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Forms" DROP CONSTRAINT "Forms_contactsId_fkey";

-- AlterTable
ALTER TABLE "Contacts" DROP COLUMN "dealsId",
DROP COLUMN "historyId",
DROP COLUMN "organizationId",
DROP COLUMN "projectId",
DROP COLUMN "status",
DROP COLUMN "taskId",
ADD COLUMN     "formsId" INTEGER;

-- AlterTable
ALTER TABLE "Forms" DROP COLUMN "contactsId";

-- CreateTable
CREATE TABLE "_ContactsToTypes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ContactsToStatus" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ContactsToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContactsToTypes_AB_unique" ON "_ContactsToTypes"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactsToTypes_B_index" ON "_ContactsToTypes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContactsToStatus_AB_unique" ON "_ContactsToStatus"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactsToStatus_B_index" ON "_ContactsToStatus"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContactsToRole_AB_unique" ON "_ContactsToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactsToRole_B_index" ON "_ContactsToRole"("B");

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_formsId_fkey" FOREIGN KEY ("formsId") REFERENCES "Forms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactsToTypes" ADD CONSTRAINT "_ContactsToTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "Contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactsToTypes" ADD CONSTRAINT "_ContactsToTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "Types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactsToStatus" ADD CONSTRAINT "_ContactsToStatus_A_fkey" FOREIGN KEY ("A") REFERENCES "Contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactsToStatus" ADD CONSTRAINT "_ContactsToStatus_B_fkey" FOREIGN KEY ("B") REFERENCES "Status"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactsToRole" ADD CONSTRAINT "_ContactsToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactsToRole" ADD CONSTRAINT "_ContactsToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
