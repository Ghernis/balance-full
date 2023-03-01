/*
  Warnings:

  - The primary key for the `Concepto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `anio` on the `Concepto` table. All the data in the column will be lost.
  - You are about to drop the column `departamentoId` on the `Concepto` table. All the data in the column will be lost.
  - You are about to drop the column `empresaId` on the `Concepto` table. All the data in the column will be lost.
  - You are about to drop the column `mes` on the `Concepto` table. All the data in the column will be lost.
  - The primary key for the `Intercambio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Facturado` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `facturadoId` to the `Concepto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Concepto" DROP CONSTRAINT "Concepto_empresaId_anio_mes_departamentoId_fkey";

-- AlterTable
ALTER TABLE "Combustible" ALTER COLUMN "claseProd" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Concepto" DROP CONSTRAINT "Concepto_pkey",
DROP COLUMN "anio",
DROP COLUMN "departamentoId",
DROP COLUMN "empresaId",
DROP COLUMN "mes",
ADD COLUMN     "facturadoId" INTEGER NOT NULL,
ADD CONSTRAINT "Concepto_pkey" PRIMARY KEY ("tipo", "facturadoId");

-- AlterTable
ALTER TABLE "Intercambio" DROP CONSTRAINT "Intercambio_pkey",
ADD CONSTRAINT "Intercambio_pkey" PRIMARY KEY ("anio", "mes", "tipo", "empresaId", "tension");

-- AlterTable
ALTER TABLE "Variable" ADD COLUMN     "completa" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Facturado_id_key" ON "Facturado"("id");

-- AddForeignKey
ALTER TABLE "Concepto" ADD CONSTRAINT "Concepto_facturadoId_fkey" FOREIGN KEY ("facturadoId") REFERENCES "Facturado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
