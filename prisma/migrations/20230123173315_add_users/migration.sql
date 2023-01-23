-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Usuario" (
    "nombreId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "mail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "habilitado" BOOLEAN NOT NULL DEFAULT false,
    "informacion" BOOLEAN NOT NULL DEFAULT false,
    "verificada" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("nombreId")
);

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_nombreId_fkey" FOREIGN KEY ("nombreId") REFERENCES "Usuario"("nombreId") ON DELETE RESTRICT ON UPDATE CASCADE;
