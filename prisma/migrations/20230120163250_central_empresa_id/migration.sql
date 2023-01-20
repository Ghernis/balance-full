-- DropForeignKey
ALTER TABLE "Central" DROP CONSTRAINT "Central_empresaId_fkey";

-- AlterTable
ALTER TABLE "Central" ALTER COLUMN "empresaId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Central" ADD CONSTRAINT "Central_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("nombreId") ON DELETE RESTRICT ON UPDATE CASCADE;
