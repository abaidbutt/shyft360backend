-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MANAGER');

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" JSONB,
    "website" TEXT,
    "image" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "tags" JSONB,
    "created" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shyft" (
    "id" SERIAL NOT NULL,
    "type" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,

    CONSTRAINT "Shyft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "password" TEXT NOT NULL,
    "mobilePhone" TEXT NOT NULL,
    "interested" TEXT NOT NULL,
    "permissions" JSONB,
    "role" "Role" DEFAULT 'USER',
    "organizationId" INTEGER,
    "contactsId" INTEGER,
    "contactsNoteId" INTEGER,
    "projectId" INTEGER,
    "dealsId" INTEGER,
    "historyId" INTEGER,
    "taskId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Business" (
    "id" SERIAL NOT NULL,
    "businessType" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "annualSales" TEXT NOT NULL,
    "businessTime" TEXT NOT NULL,
    "employees" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "userId" INTEGER,
    "businessNumber" TEXT,
    "legalName" TEXT,
    "address" JSONB,
    "firstName" TEXT,
    "lastName" TEXT,
    "birthdate" TEXT,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentAccount" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" JSONB,
    "businessName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "country" TEXT NOT NULL,
    "annualSales" TEXT NOT NULL,
    "businessTime" TEXT NOT NULL,
    "employees" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "userId" INTEGER,
    "businessNumber" TEXT,
    "legalName" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "birthdate" TEXT,

    CONSTRAINT "PaymentAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacts" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationId" INTEGER,
    "type" JSONB,
    "phone" TEXT,
    "mobilephone" TEXT,
    "bestway" TEXT,
    "color" TEXT,
    "status" TEXT,
    "historyId" INTEGER,
    "projectId" INTEGER,
    "dealsId" INTEGER,
    "taskId" INTEGER,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactsNote" (
    "id" SERIAL NOT NULL,
    "details" TEXT,

    CONSTRAINT "ContactsNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "details" TEXT,
    "type" TEXT,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deals" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "details" TEXT,
    "link" TEXT,
    "value" TEXT,
    "schedule" TEXT,
    "closingDate" TEXT,
    "status" JSONB,
    "taskId" INTEGER,

    CONSTRAINT "Deals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "details" TEXT,
    "link" TEXT,
    "value" TEXT,
    "frequency" TEXT,
    "completionDate" TEXT,
    "calender" BOOLEAN,
    "status" JSONB,
    "calenderId" INTEGER,
    "commission" TEXT,
    "taskId" INTEGER,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calender" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Calender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "details" TEXT,
    "link" TEXT,
    "color" TEXT,
    "attachment" JSONB,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "allday" BOOLEAN,
    "repeat" JSONB,
    "remind" TEXT,
    "private" BOOLEAN,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskTemplate" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "details" TEXT,
    "link" TEXT,
    "urgent" BOOLEAN,
    "color" TEXT,
    "attachment" JSONB,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "allday" BOOLEAN,
    "repeat" JSONB,
    "remind" TEXT,
    "private" BOOLEAN,

    CONSTRAINT "TaskTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "List" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "contactType" JSONB,
    "contactStatus" JSONB,
    "assignedTo" JSONB,
    "tags" JSONB,
    "filters" JSONB,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forms" (
    "id" SERIAL NOT NULL,
    "contactsId" INTEGER,

    CONSTRAINT "Forms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "taskTemplateId" INTEGER,

    CONSTRAINT "Types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "taskTemplateId" INTEGER,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "country" TEXT,
    "address" JSONB,
    "phone" TEXT,
    "shipping" TEXT,
    "invoicePrefix" TEXT,
    "taxIds" JSONB,
    "subscriptionId" INTEGER,
    "invoiceId" INTEGER,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "pricing" JSONB,
    "subscriptionId" INTEGER,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "schedule" JSONB,
    "billing" JSONB,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "billing" JSONB,
    "text" TEXT NOT NULL,
    "invoiceitems" JSONB,
    "status" TEXT,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" SERIAL NOT NULL,
    "amount" TEXT,
    "cardDetails" JSONB,
    "cardName" TEXT,
    "email" TEXT,
    "description" TEXT,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "country" TEXT,
    "address" JSONB,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_contactsId_fkey" FOREIGN KEY ("contactsId") REFERENCES "Contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_contactsNoteId_fkey" FOREIGN KEY ("contactsNoteId") REFERENCES "ContactsNote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_dealsId_fkey" FOREIGN KEY ("dealsId") REFERENCES "Deals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentAccount" ADD CONSTRAINT "PaymentAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_dealsId_fkey" FOREIGN KEY ("dealsId") REFERENCES "Deals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deals" ADD CONSTRAINT "Deals_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_calenderId_fkey" FOREIGN KEY ("calenderId") REFERENCES "Calender"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forms" ADD CONSTRAINT "Forms_contactsId_fkey" FOREIGN KEY ("contactsId") REFERENCES "Contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Types" ADD CONSTRAINT "Types_taskTemplateId_fkey" FOREIGN KEY ("taskTemplateId") REFERENCES "TaskTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_taskTemplateId_fkey" FOREIGN KEY ("taskTemplateId") REFERENCES "TaskTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
