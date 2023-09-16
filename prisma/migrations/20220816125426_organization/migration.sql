-- AlterTable
ALTER TABLE "Contacts" ADD COLUMN     "organizationsId" INTEGER;

-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "created" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "_OrganizationToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToRole_AB_unique" ON "_OrganizationToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToRole_B_index" ON "_OrganizationToRole"("B");

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToRole" ADD CONSTRAINT "_OrganizationToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToRole" ADD CONSTRAINT "_OrganizationToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
