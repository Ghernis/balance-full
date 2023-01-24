-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "TipoSistema" AS ENUM ('Conectado', 'Aislado');

-- CreateEnum
CREATE TYPE "TipoDestino" AS ENUM ('VentaUsuarios', 'Resguardo', 'ConsumoPropio');

-- CreateEnum
CREATE TYPE "TipoEmpresa" AS ENUM ('Distribuidora', 'Cooperativa', 'Autoproductor');

-- CreateEnum
CREATE TYPE "TipoTecnologia" AS ENUM ('TV', 'TG', 'CC', 'HID', 'EO', 'SOL', 'FV', 'BG', 'BM');

-- CreateEnum
CREATE TYPE "TipoIntercambio" AS ENUM ('Venta', 'Compra');

-- CreateEnum
CREATE TYPE "TipoConcepto" AS ENUM ('Residencial', 'Comercial', 'Industrial', 'ServicioSanitario', 'Alumbrado', 'Riego', 'Oficial', 'Rural', 'Otros', 'Traccion');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombreId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "mail" TEXT NOT NULL,
    "contacto" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "habilitado" BOOLEAN NOT NULL DEFAULT false,
    "informacion" BOOLEAN NOT NULL DEFAULT false,
    "verificada" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "nombre" TEXT NOT NULL,
    "nombreId" TEXT NOT NULL,
    "tipo" "TipoEmpresa" NOT NULL,
    "nemo" TEXT,
    "direccion" TEXT,
    "tel" TEXT,
    "localidad" TEXT,
    "departamentoLeg" TEXT,
    "provincia" TEXT,
    "cp" TEXT,
    "mail" TEXT,
    "contacto" TEXT,
    "sistema" "TipoSistema",
    "destino" "TipoDestino",
    "departamentoId" INTEGER
);

-- CreateTable
CREATE TABLE "Variable" (
    "anio" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "Variable_pkey" PRIMARY KEY ("anio","mes","empresaId")
);

-- CreateTable
CREATE TABLE "VariableCentral" (
    "anio" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "centralId" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "VariableCentral_pkey" PRIMARY KEY ("anio","mes","centralId","empresaId")
);

-- CreateTable
CREATE TABLE "Personal" (
    "id" SERIAL NOT NULL,
    "profesionales" INTEGER NOT NULL,
    "tecnicos" INTEGER NOT NULL,
    "administrativos" INTEGER NOT NULL,
    "obreros" INTEGER NOT NULL,
    "profesionalesM" INTEGER NOT NULL,
    "tecnicosM" INTEGER NOT NULL,
    "administrativosM" INTEGER NOT NULL,
    "obrerosM" INTEGER NOT NULL,
    "profesionalesF" INTEGER NOT NULL,
    "tecnicosF" INTEGER NOT NULL,
    "administrativosF" INTEGER NOT NULL,
    "obrerosF" INTEGER NOT NULL,
    "obsProfesionales" TEXT NOT NULL,
    "obsTecnicos" TEXT NOT NULL,
    "obsAdministrativos" TEXT NOT NULL,
    "obsObreros" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "Personal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Central" (
    "nemo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "localidad" TEXT NOT NULL,
    "partido" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "sistema" "TipoSistema" NOT NULL,
    "notas" TEXT NOT NULL,
    "destino" "TipoDestino" NOT NULL,
    "actividad" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "departamentoId" INTEGER
);

-- CreateTable
CREATE TABLE "Energia" (
    "id" SERIAL NOT NULL,
    "solar" DOUBLE PRECISION NOT NULL,
    "diesel" DOUBLE PRECISION NOT NULL,
    "hidro" DOUBLE PRECISION NOT NULL,
    "tv" DOUBLE PRECISION NOT NULL,
    "tg" DOUBLE PRECISION NOT NULL,
    "eolico" DOUBLE PRECISION NOT NULL,
    "centralId" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,

    CONSTRAINT "Energia_pkey" PRIMARY KEY ("anio","mes","centralId","empresaId")
);

-- CreateTable
CREATE TABLE "Combustible" (
    "id" SERIAL NOT NULL,
    "anio" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "cmb" TEXT NOT NULL,
    "unidad" TEXT NOT NULL,
    "vol" DOUBLE PRECISION NOT NULL,
    "claseProd" TEXT NOT NULL,
    "centralId" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "Combustible_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Maquina" (
    "numero" TEXT NOT NULL,
    "tecnologia" "TipoTecnologia" NOT NULL,
    "marca" TEXT NOT NULL,
    "tension" DOUBLE PRECISION NOT NULL,
    "kva" DOUBLE PRECISION NOT NULL,
    "fp" DOUBLE PRECISION NOT NULL,
    "kw" DOUBLE PRECISION NOT NULL,
    "potenciaEf" DOUBLE PRECISION NOT NULL,
    "potenciaHP" DOUBLE PRECISION NOT NULL,
    "fechaPS" TEXT NOT NULL,
    "tipoCte" TEXT NOT NULL,
    "centralId" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Intercambio" (
    "id" SERIAL NOT NULL,
    "anio" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "ente" TEXT NOT NULL,
    "quien" TEXT NOT NULL,
    "energia" DOUBLE PRECISION NOT NULL,
    "tension" DOUBLE PRECISION NOT NULL,
    "tipo" "TipoIntercambio" NOT NULL,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "Intercambio_pkey" PRIMARY KEY ("id","anio","mes","tipo","empresaId")
);

-- CreateTable
CREATE TABLE "Balance" (
    "id" SERIAL NOT NULL,
    "anio" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "enProd" DOUBLE PRECISION NOT NULL,
    "comprada" DOUBLE PRECISION NOT NULL,
    "consumoPropio" DOUBLE PRECISION NOT NULL,
    "disp" DOUBLE PRECISION NOT NULL,
    "vendida" DOUBLE PRECISION NOT NULL,
    "red" DOUBLE PRECISION NOT NULL,
    "facturada" DOUBLE PRECISION NOT NULL,
    "perdidas" DOUBLE PRECISION NOT NULL,
    "empresaId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Facturado" (
    "id" SERIAL NOT NULL,
    "empresaId" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,

    CONSTRAINT "Facturado_pkey" PRIMARY KEY ("empresaId","anio","mes")
);

-- CreateTable
CREATE TABLE "Concepto" (
    "cantUsr" INTEGER NOT NULL,
    "kwh" DOUBLE PRECISION NOT NULL,
    "facSin" DOUBLE PRECISION NOT NULL,
    "facCon" DOUBLE PRECISION NOT NULL,
    "precioMedCon" DOUBLE PRECISION NOT NULL,
    "tipo" "TipoConcepto" NOT NULL,
    "empresaId" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,

    CONSTRAINT "Concepto_pkey" PRIMARY KEY ("tipo","anio","mes","empresaId")
);

-- CreateTable
CREATE TABLE "FacturadoDepartamento" (
    "empresaId" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "departamentoId" INTEGER NOT NULL,

    CONSTRAINT "FacturadoDepartamento_pkey" PRIMARY KEY ("empresaId","anio","mes","departamentoId")
);

-- CreateTable
CREATE TABLE "Departamento" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "codigo_depto" INTEGER NOT NULL,
    "lon" DOUBLE PRECISION,
    "lat" DOUBLE PRECISION,
    "provincia" TEXT NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nombreId_key" ON "Usuario"("nombreId");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_nombreId_key" ON "Empresa"("nombreId");

-- CreateIndex
CREATE UNIQUE INDEX "Personal_empresaId_key" ON "Personal"("empresaId");

-- CreateIndex
CREATE UNIQUE INDEX "Central_nemo_empresaId_key" ON "Central"("nemo", "empresaId");

-- CreateIndex
CREATE UNIQUE INDEX "Maquina_numero_centralId_empresaId_key" ON "Maquina"("numero", "centralId", "empresaId");

-- CreateIndex
CREATE UNIQUE INDEX "Balance_empresaId_anio_mes_key" ON "Balance"("empresaId", "anio", "mes");

-- CreateIndex
CREATE UNIQUE INDEX "Departamento_codigo_depto_key" ON "Departamento"("codigo_depto");

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_nombreId_fkey" FOREIGN KEY ("nombreId") REFERENCES "Usuario"("nombreId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variable" ADD CONSTRAINT "Variable_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("nombreId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariableCentral" ADD CONSTRAINT "VariableCentral_centralId_empresaId_fkey" FOREIGN KEY ("centralId", "empresaId") REFERENCES "Central"("nemo", "empresaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("nombreId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Central" ADD CONSTRAINT "Central_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("nombreId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Central" ADD CONSTRAINT "Central_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Energia" ADD CONSTRAINT "Energia_anio_mes_centralId_empresaId_fkey" FOREIGN KEY ("anio", "mes", "centralId", "empresaId") REFERENCES "VariableCentral"("anio", "mes", "centralId", "empresaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Combustible" ADD CONSTRAINT "Combustible_anio_mes_centralId_empresaId_fkey" FOREIGN KEY ("anio", "mes", "centralId", "empresaId") REFERENCES "VariableCentral"("anio", "mes", "centralId", "empresaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maquina" ADD CONSTRAINT "Maquina_centralId_empresaId_fkey" FOREIGN KEY ("centralId", "empresaId") REFERENCES "Central"("nemo", "empresaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intercambio" ADD CONSTRAINT "Intercambio_anio_mes_empresaId_fkey" FOREIGN KEY ("anio", "mes", "empresaId") REFERENCES "Variable"("anio", "mes", "empresaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_empresaId_anio_mes_fkey" FOREIGN KEY ("empresaId", "anio", "mes") REFERENCES "Variable"("empresaId", "anio", "mes") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facturado" ADD CONSTRAINT "Facturado_empresaId_anio_mes_fkey" FOREIGN KEY ("empresaId", "anio", "mes") REFERENCES "Variable"("empresaId", "anio", "mes") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Concepto" ADD CONSTRAINT "Concepto_empresaId_anio_mes_fkey" FOREIGN KEY ("empresaId", "anio", "mes") REFERENCES "Facturado"("empresaId", "anio", "mes") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacturadoDepartamento" ADD CONSTRAINT "FacturadoDepartamento_empresaId_anio_mes_fkey" FOREIGN KEY ("empresaId", "anio", "mes") REFERENCES "Facturado"("empresaId", "anio", "mes") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacturadoDepartamento" ADD CONSTRAINT "FacturadoDepartamento_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("codigo_depto") ON DELETE RESTRICT ON UPDATE CASCADE;
