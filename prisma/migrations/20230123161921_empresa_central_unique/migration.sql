/*
  Warnings:

  - The primary key for the `Central` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Central` table. All the data in the column will be lost.
  - The primary key for the `Energia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Maquina` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `VariableCentral` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[nemo,empresaId]` on the table `Central` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numero,centralId,empresaId]` on the table `Maquina` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `empresaId` to the `Combustible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresaId` to the `Energia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresaId` to the `Maquina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresaId` to the `VariableCentral` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Combustible" DROP CONSTRAINT "Combustible_anio_mes_centralId_fkey";

-- DropForeignKey
ALTER TABLE "Energia" DROP CONSTRAINT "Energia_anio_mes_centralId_fkey";

-- DropForeignKey
ALTER TABLE "Maquina" DROP CONSTRAINT "Maquina_centralId_fkey";

-- DropForeignKey
ALTER TABLE "VariableCentral" DROP CONSTRAINT "VariableCentral_centralId_fkey";

-- DropIndex
DROP INDEX "Central_nemo_key";

-- DropIndex
DROP INDEX "Maquina_numero_key";

-- AlterTable
ALTER TABLE "Central" DROP CONSTRAINT "Central_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "Combustible" ADD COLUMN     "empresaId" TEXT NOT NULL,
ALTER COLUMN "centralId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Energia" DROP CONSTRAINT "Energia_pkey",
ADD COLUMN     "empresaId" TEXT NOT NULL,
ALTER COLUMN "centralId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Energia_pkey" PRIMARY KEY ("anio", "mes", "centralId", "empresaId");

-- AlterTable
ALTER TABLE "Maquina" DROP CONSTRAINT "Maquina_pkey",
ADD COLUMN     "empresaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VariableCentral" DROP CONSTRAINT "VariableCentral_pkey",
ADD COLUMN     "empresaId" TEXT NOT NULL,
ALTER COLUMN "centralId" SET DATA TYPE TEXT,
ADD CONSTRAINT "VariableCentral_pkey" PRIMARY KEY ("anio", "mes", "centralId", "empresaId");

-- CreateIndex
CREATE UNIQUE INDEX "Central_nemo_empresaId_key" ON "Central"("nemo", "empresaId");

-- CreateIndex
CREATE UNIQUE INDEX "Maquina_numero_centralId_empresaId_key" ON "Maquina"("numero", "centralId", "empresaId");

-- AddForeignKey
ALTER TABLE "VariableCentral" ADD CONSTRAINT "VariableCentral_centralId_empresaId_fkey" FOREIGN KEY ("centralId", "empresaId") REFERENCES "Central"("nemo", "empresaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Energia" ADD CONSTRAINT "Energia_anio_mes_centralId_empresaId_fkey" FOREIGN KEY ("anio", "mes", "centralId", "empresaId") REFERENCES "VariableCentral"("anio", "mes", "centralId", "empresaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Combustible" ADD CONSTRAINT "Combustible_anio_mes_centralId_empresaId_fkey" FOREIGN KEY ("anio", "mes", "centralId", "empresaId") REFERENCES "VariableCentral"("anio", "mes", "centralId", "empresaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maquina" ADD CONSTRAINT "Maquina_centralId_empresaId_fkey" FOREIGN KEY ("centralId", "empresaId") REFERENCES "Central"("nemo", "empresaId") ON DELETE RESTRICT ON UPDATE CASCADE;
