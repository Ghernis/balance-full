/*
  Warnings:

  - The primary key for the `Concepto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Facturado` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `FacturadoDepartamento` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `departamentoId` to the `Concepto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamentoId` to the `Facturado` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Concepto" DROP CONSTRAINT "Concepto_empresaId_anio_mes_fkey";

-- DropForeignKey
ALTER TABLE "FacturadoDepartamento" DROP CONSTRAINT "FacturadoDepartamento_departamentoId_fkey";

-- DropForeignKey
ALTER TABLE "FacturadoDepartamento" DROP CONSTRAINT "FacturadoDepartamento_empresaId_anio_mes_fkey";

-- AlterTable
ALTER TABLE "Concepto" DROP CONSTRAINT "Concepto_pkey",
ADD COLUMN     "departamentoId" INTEGER NOT NULL,
ADD CONSTRAINT "Concepto_pkey" PRIMARY KEY ("tipo", "anio", "mes", "empresaId", "departamentoId");

-- AlterTable
ALTER TABLE "Facturado" DROP CONSTRAINT "Facturado_pkey",
ADD COLUMN     "departamentoId" INTEGER NOT NULL,
ADD CONSTRAINT "Facturado_pkey" PRIMARY KEY ("empresaId", "anio", "mes", "departamentoId");

-- DropTable
DROP TABLE "FacturadoDepartamento";

-- AddForeignKey
ALTER TABLE "Facturado" ADD CONSTRAINT "Facturado_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Concepto" ADD CONSTRAINT "Concepto_empresaId_anio_mes_departamentoId_fkey" FOREIGN KEY ("empresaId", "anio", "mes", "departamentoId") REFERENCES "Facturado"("empresaId", "anio", "mes", "departamentoId") ON DELETE RESTRICT ON UPDATE CASCADE;
