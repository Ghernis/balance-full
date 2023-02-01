/*
  Warnings:

  - You are about to drop the column `provincia` on the `Central` table. All the data in the column will be lost.
  - Added the required column `tipo` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'SUADMIN';
ALTER TYPE "Role" ADD VALUE 'CONSULTA';

-- AlterTable
ALTER TABLE "Central" DROP COLUMN "provincia";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "tipo" "TipoEmpresa" NOT NULL;
