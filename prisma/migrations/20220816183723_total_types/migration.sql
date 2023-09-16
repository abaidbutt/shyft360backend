/*
  Warnings:

  - You are about to drop the column `formsId` on the `Contacts` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `shipping` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Deals` table. All the data in the column will be lost.
  - You are about to drop the column `taskId` on the `Deals` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceitems` on the `Invoice` table. All the data in the column will be lost.
  - The `status` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `subscriptionId` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `remind` on the `TaskTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `repeat` on the `TaskTemplate` table. All the data in the column will be lost.
  - You are about to drop the `Forms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `List` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaymentAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contacts" DROP CONSTRAINT "Contacts_formsId_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "Deals" DROP CONSTRAINT "Deals_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_calenderId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_taskId_fkey";

-- AlterTable
ALTER TABLE "Contacts" DROP COLUMN "formsId",
ADD COLUMN     "sourceId" INTEGER;

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "invoiceId",
DROP COLUMN "shipping",
DROP COLUMN "subscriptionId",
ADD COLUMN     "shipasBill" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "Deals" DROP COLUMN "status",
DROP COLUMN "taskId";

-- AlterTable
ALTER TABLE "History" DROP COLUMN "title",
DROP COLUMN "type",
ADD COLUMN     "historyTypesId" INTEGER;

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "invoiceitems",
ADD COLUMN     "customerId" INTEGER,
ADD COLUMN     "items" JSONB,
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "subscriptionId",
ADD COLUMN     "status" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "customerId" INTEGER;

-- AlterTable
ALTER TABLE "TaskTemplate" DROP COLUMN "remind",
DROP COLUMN "repeat",
ALTER COLUMN "urgent" SET DEFAULT false,
ALTER COLUMN "allday" SET DEFAULT true,
ALTER COLUMN "private" SET DEFAULT false;

-- DropTable
DROP TABLE "Forms";

-- DropTable
DROP TABLE "List";

-- DropTable
DROP TABLE "PaymentAccount";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Task";

-- CreateTable
CREATE TABLE "LegalBusiness" (
    "id" SERIAL NOT NULL,
    "legalname" JSONB NOT NULL,
    "address" JSONB,
    "homeAddress" JSONB,
    "firstName" TEXT,
    "lastName" TEXT,
    "birthdate" TEXT,
    "type" TEXT,
    "picture" TEXT,
    "identityType" TEXT DEFAULT 'Passport',
    "website" TEXT,
    "supportwebsite" TEXT,
    "supportemail" TEXT,
    "supportphone" TEXT,
    "businessId" INTEGER,

    CONSTRAINT "LegalBusiness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryTypes" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "HistoryTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryFlags" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "HistoryFlags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DealStatus" (
    "id" SERIAL NOT NULL,
    "status" TEXT,
    "deals" INTEGER DEFAULT 0,
    "default" BOOLEAN DEFAULT false,
    "actions" TEXT,

    CONSTRAINT "DealStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "ProjectStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "details" TEXT,
    "link" TEXT,
    "value" TEXT,
    "frequency" TEXT,
    "completionDate" TEXT,
    "addcalender" BOOLEAN DEFAULT false,
    "commission" TEXT,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "urgent" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT,
    "details" TEXT,
    "link" TEXT,
    "color" TEXT,
    "attachment" JSONB,
    "startDate" TEXT,
    "endDate" TEXT,
    "allday" BOOLEAN DEFAULT true,
    "repeat" JSONB,
    "private" BOOLEAN DEFAULT false,
    "remind" TEXT,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lists" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "assignType" JSONB,
    "assignStatus" JSONB,
    "listsTagsId" INTEGER,
    "filters" JSONB,

    CONSTRAINT "Lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListsTags" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "ListsTags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactField" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "type" TEXT,
    "addContact" BOOLEAN NOT NULL DEFAULT false,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "keydata" JSONB,

    CONSTRAINT "ContactField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxRate" (
    "id" SERIAL NOT NULL,
    "type" TEXT,
    "region" TEXT,
    "rate" TEXT,
    "rateType" TEXT,
    "description" TEXT,
    "status" BOOLEAN DEFAULT true,

    CONSTRAINT "TaxRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoleToTasks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_StatusToTaskTemplate" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ContactsToHistory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ContactsToDeals" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ContactsToTasks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_HistoryToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_HistoryToHistoryFlags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DealsToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DealsToTasks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DealStatusToDeals" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectStatusToProjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectsToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectsToTasks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TaskTemplateToTypes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ListsToTypes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ListsToStatus" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ListsToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PlanToSubscription" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "LegalBusiness_businessId_key" ON "LegalBusiness"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToTasks_AB_unique" ON "_RoleToTasks"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToTasks_B_index" ON "_RoleToTasks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StatusToTaskTemplate_AB_unique" ON "_StatusToTaskTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_StatusToTaskTemplate_B_index" ON "_StatusToTaskTemplate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContactsToHistory_AB_unique" ON "_ContactsToHistory"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactsToHistory_B_index" ON "_ContactsToHistory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContactsToDeals_AB_unique" ON "_ContactsToDeals"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactsToDeals_B_index" ON "_ContactsToDeals"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContactsToTasks_AB_unique" ON "_ContactsToTasks"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactsToTasks_B_index" ON "_ContactsToTasks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_HistoryToRole_AB_unique" ON "_HistoryToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_HistoryToRole_B_index" ON "_HistoryToRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_HistoryToHistoryFlags_AB_unique" ON "_HistoryToHistoryFlags"("A", "B");

-- CreateIndex
CREATE INDEX "_HistoryToHistoryFlags_B_index" ON "_HistoryToHistoryFlags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DealsToRole_AB_unique" ON "_DealsToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_DealsToRole_B_index" ON "_DealsToRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DealsToTasks_AB_unique" ON "_DealsToTasks"("A", "B");

-- CreateIndex
CREATE INDEX "_DealsToTasks_B_index" ON "_DealsToTasks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DealStatusToDeals_AB_unique" ON "_DealStatusToDeals"("A", "B");

-- CreateIndex
CREATE INDEX "_DealStatusToDeals_B_index" ON "_DealStatusToDeals"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectStatusToProjects_AB_unique" ON "_ProjectStatusToProjects"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectStatusToProjects_B_index" ON "_ProjectStatusToProjects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectsToRole_AB_unique" ON "_ProjectsToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectsToRole_B_index" ON "_ProjectsToRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectsToTasks_AB_unique" ON "_ProjectsToTasks"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectsToTasks_B_index" ON "_ProjectsToTasks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TaskTemplateToTypes_AB_unique" ON "_TaskTemplateToTypes"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskTemplateToTypes_B_index" ON "_TaskTemplateToTypes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ListsToTypes_AB_unique" ON "_ListsToTypes"("A", "B");

-- CreateIndex
CREATE INDEX "_ListsToTypes_B_index" ON "_ListsToTypes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ListsToStatus_AB_unique" ON "_ListsToStatus"("A", "B");

-- CreateIndex
CREATE INDEX "_ListsToStatus_B_index" ON "_ListsToStatus"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ListsToRole_AB_unique" ON "_ListsToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_ListsToRole_B_index" ON "_ListsToRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PlanToSubscription_AB_unique" ON "_PlanToSubscription"("A", "B");

-- CreateIndex
CREATE INDEX "_PlanToSubscription_B_index" ON "_PlanToSubscription"("B");

-- AddForeignKey
ALTER TABLE "LegalBusiness" ADD CONSTRAINT "LegalBusiness_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_historyTypesId_fkey" FOREIGN KEY ("historyTypesId") REFERENCES "HistoryTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lists" ADD CONSTRAINT "Lists_listsTagsId_fkey" FOREIGN KEY ("listsTagsId") REFERENCES "ListsTags"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToTasks" ADD CONSTRAINT "_RoleToTasks_A_fkey" FOREIGN KEY ("A") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToTasks" ADD CONSTRAINT "_RoleToTasks_B_fkey" FOREIGN KEY ("B") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StatusToTaskTemplate" ADD CONSTRAINT "_StatusToTaskTemplate_A_fkey" FOREIGN KEY ("A") REFERENCES "Status"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StatusToTaskTemplate" ADD CONSTRAINT "_StatusToTaskTemplate_B_fkey" FOREIGN KEY ("B") REFERENCES "TaskTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactsToHistory" ADD CONSTRAINT "_ContactsToHistory_A_fkey" FOREIGN KEY ("A") REFERENCES "Contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactsToHistory" ADD CONSTRAINT "_ContactsToHistory_B_fkey" FOREIGN KEY ("B") REFERENCES "History"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactsToDeals" ADD CONSTRAINT "_ContactsToDeals_A_fkey" FOREIGN KEY ("A") REFERENCES "Contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactsToDeals" ADD CONSTRAINT "_ContactsToDeals_B_fkey" FOREIGN KEY ("B") REFERENCES "Deals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactsToTasks" ADD CONSTRAINT "_ContactsToTasks_A_fkey" FOREIGN KEY ("A") REFERENCES "Contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactsToTasks" ADD CONSTRAINT "_ContactsToTasks_B_fkey" FOREIGN KEY ("B") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HistoryToRole" ADD CONSTRAINT "_HistoryToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "History"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HistoryToRole" ADD CONSTRAINT "_HistoryToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HistoryToHistoryFlags" ADD CONSTRAINT "_HistoryToHistoryFlags_A_fkey" FOREIGN KEY ("A") REFERENCES "History"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HistoryToHistoryFlags" ADD CONSTRAINT "_HistoryToHistoryFlags_B_fkey" FOREIGN KEY ("B") REFERENCES "HistoryFlags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DealsToRole" ADD CONSTRAINT "_DealsToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Deals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DealsToRole" ADD CONSTRAINT "_DealsToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DealsToTasks" ADD CONSTRAINT "_DealsToTasks_A_fkey" FOREIGN KEY ("A") REFERENCES "Deals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DealsToTasks" ADD CONSTRAINT "_DealsToTasks_B_fkey" FOREIGN KEY ("B") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DealStatusToDeals" ADD CONSTRAINT "_DealStatusToDeals_A_fkey" FOREIGN KEY ("A") REFERENCES "DealStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DealStatusToDeals" ADD CONSTRAINT "_DealStatusToDeals_B_fkey" FOREIGN KEY ("B") REFERENCES "Deals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectStatusToProjects" ADD CONSTRAINT "_ProjectStatusToProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "ProjectStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectStatusToProjects" ADD CONSTRAINT "_ProjectStatusToProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectsToRole" ADD CONSTRAINT "_ProjectsToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectsToRole" ADD CONSTRAINT "_ProjectsToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectsToTasks" ADD CONSTRAINT "_ProjectsToTasks_A_fkey" FOREIGN KEY ("A") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectsToTasks" ADD CONSTRAINT "_ProjectsToTasks_B_fkey" FOREIGN KEY ("B") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskTemplateToTypes" ADD CONSTRAINT "_TaskTemplateToTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "TaskTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskTemplateToTypes" ADD CONSTRAINT "_TaskTemplateToTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "Types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListsToTypes" ADD CONSTRAINT "_ListsToTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "Lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListsToTypes" ADD CONSTRAINT "_ListsToTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "Types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListsToStatus" ADD CONSTRAINT "_ListsToStatus_A_fkey" FOREIGN KEY ("A") REFERENCES "Lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListsToStatus" ADD CONSTRAINT "_ListsToStatus_B_fkey" FOREIGN KEY ("B") REFERENCES "Status"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListsToRole" ADD CONSTRAINT "_ListsToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListsToRole" ADD CONSTRAINT "_ListsToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlanToSubscription" ADD CONSTRAINT "_PlanToSubscription_A_fkey" FOREIGN KEY ("A") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlanToSubscription" ADD CONSTRAINT "_PlanToSubscription_B_fkey" FOREIGN KEY ("B") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
