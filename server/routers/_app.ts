import { z } from 'zod';
import { procedure, router } from '../trpc'
//import { PrismaClient } from '@prisma/client'
import prisma from '../prisma-cliet';

//const prisma = new PrismaClient()
const SistemaEnums=['Conectado','Aislado'] as const;
const DestinoEnums=['VentaUsuarios','Resguardo','ConsumoPropio'] as const;
const ConceptoEnums=['Residencial','Comercial','Industrial','ServicioSanitario','Alumbrado','Riego','Oficial','Rural','Otros','Traccion'] as const;
const TipoEnums=['Distribuidora','Cooperativa','Autoproductor'] as const;
const TipoIntercambio=['Compra','Venta'] as const;
const TecnologiaEnums=['TV','TG','CC','HID','EO','SOL','FV','BG','BM'] as const;
export const appRouter = router({
    new_user: procedure
    .input(
        z.object({
            nombre:z.string(),
            contacto:z.string(),
            tel:z.string(),
            mail:z.string().email()
        })
    )
    .mutation(async({input})=>{
        const resp = await prisma.usuario.create({
            data:input
        })
        return resp
    }),
    usuarios_all: procedure
    .query(async()=>{
        const resp = await prisma.usuario.findMany({
        })
        return resp
    }),
    usuario: procedure
    .input(
        z.object({
            nombreId: z.string()
        })
    )
    .query(async({input})=>{
        const resp = await prisma.usuario.findFirst({
            where:{
                nombreId:input.nombreId
            }
        })
        return resp
    }),
    departamento_bulk: procedure
    .input(
        z.array(
            z.object({
                codigo_depto: z.number(),
                nombre: z.string(),
                provincia: z.string(),
                lon: z.number(),
                lat: z.number()
            })
        )
    )
    .mutation(async({input})=>{
        const resp = await prisma.departamento.createMany({
            data: input
        })
        return { resp }
    }),
    departamentos: procedure
    .query(async()=>{
        const resp = await prisma.departamento.findMany()
        return resp

    }),
    del_departamento: procedure
    .input(
        z.object({
            id:z.number()
        })
    )
    .mutation(async({input})=>{
        const resp = await prisma.departamento.delete({
            where:{
                id:input.id
            }
        })
        return { resp }
    }),
    empresas: procedure
    .query(async()=>{
        const empresa = await prisma.empresa.findMany({
        })
        return empresa
    }),
    empresa_id: procedure
    .input(
        z.object({
            nombreId: z.string()
        })
    )
    .query(async({input})=>{
        const resp = await prisma.empresa.findFirst({
            where:{
                nombreId: input.nombreId
            },
            select:{
                nombre: true,
                nombreId: true,
                direccion:true,
                cp:true,
                tel:true,
                mail:true,
                contacto:true,
                centrales: true,
                variable: true,
                sistema: true,
                destino: true,
                tipo: true,
                departamentoId:true
            }
        })
        return resp
    }),
    put_empresas: procedure
    .input(
        z.object({
            nombre: z.string(),
            nombreId: z.string(),
            tipo: z.enum(TipoEnums),
            nemo: z.string().optional(),
            direccion: z.string().optional(),
            tel: z.string().optional(),
            localidad: z.string().optional(),
            departamentoLeg: z.string().optional(),
            provincia: z.string().optional(),
            cp: z.string().optional(),
            mail: z.string().optional(),
            contacto: z.string().optional(),
            sistema: z.enum(SistemaEnums).optional(),
            destino: z.enum(DestinoEnums).optional(),
            departamentoId: z.number().optional(),
        })
    )
    .mutation(async({input})=>{
        const resp = await prisma.empresa.upsert({
            where:{
                nombreId:input.nombreId
            },
            update:input,
            create:input
        })
        return {
            resp
        }
    }),
    set_depto_empresa: procedure
    .input(
        z.object({
            nombreId: z.string(),
            codigo_depto: z.number().optional()
        })
    )
    .mutation(async({input})=>{
        const resp = await prisma.empresa.update({
            where:{
                nombreId:input.nombreId
            },
            data:{
                departamento:{
                    connect:{
                        codigo_depto:input.codigo_depto
                    }
                }
            }
        })
        return {
            resp
        }
    }),
    central: procedure
    .input(
        z.object({
            nombre: z.string(),
            nemo: z.string(),
            direccion: z.string(),
            localidad: z.string(),
            partido: z.string(),
            provincia: z.string(),
            notas: z.string(),
            sistema: z.enum(SistemaEnums),
            destino: z.enum(DestinoEnums),
            actividad: z.string(),
            empresaId: z.string(),
        })
    )
    .mutation(async({input})=>{
        const resp = await prisma.central.upsert({
            where:{
                nemo:input.nemo
            },
            update:input,
            create:{
                    nombre:input.nombre,
                    nemo:input.nemo,
                    direccion:input.direccion,
                    localidad:input.localidad,
                    partido:input.partido,
                    provincia:input.provincia,
                    notas:input.notas,
                    sistema:input.sistema,
                    destino:input.destino,
                    actividad:input.actividad,
                    empresaId: input.empresaId
            }
        })
        return {resp}
    }),
    central_id: procedure
    .input(
        z.object({
            nemo: z.string(),
            empresaId: z.string()
        })
    )
    .query(async({input})=>{
        const resp = await prisma.central.findFirst({
            where:{
                nemo: input.nemo,
                empresaId:input.empresaId
            },
            select:{
                nombre:true,
                nemo:true,
                direccion:true,
                localidad:true,
                partido:true,
                provincia:true,
                sistema:true,
                notas:true,
                destino:true,
                actividad:true,
                departamentoId:true
            }
        })
        return resp
    }),
    centrales: procedure
    .query(async()=>{
        const resp = await prisma.central.findMany({
            select:{
                nombre:true,
                nemo:true,
                sistema:true,
                maquinas:true
            }
        })
        return { resp }
    }),
    new_variable: procedure
    .input(
        z.object({
            anio:z.number(),
            mes: z.number(),
            empresaId: z.string()
        })
    )
    .mutation(async({input})=>{
        const resp = await prisma.variable.create({
            data: input
        })
        return { resp }

    }),
    variables: procedure
    .query(async()=>{
        const resp = await prisma.variable.findMany({
            select:{
                anio:true,
                mes: true,
                empresaId: true,
                enComprada:true,
                balEnergia:true,
                facturado:{
                    select:{
                        departamentos:true
                    }

                }

            }
        })
        return { resp }
    }),
    intercambio: procedure
    .input(
        z.object({
            anio:z.number(),
            mes:z.number(),
            ente:z.string(),
            quien:z.string(),
            energia:z.number(),
            tension:z.number(),
            empresaId:z.string(),
            tipo:z.enum(TipoIntercambio),
        })
    )
    .mutation(async({input}) =>{
        const resp = await prisma.intercambio.create({
            data: input
        })

        return { resp }
    }),
    balance: procedure
    .input(
        z.object({
            anio: z.number(),
            mes: z.number(),
            enProd: z.number(),
            comprada: z.number(),
            consumoPropio: z.number(),
            disp: z.number(),
            vendida: z.number(),
            red: z.number(),
            facturada: z.number(),
            perdidas: z.number(),
            empresaId: z.string()
        })
    )
    .mutation(async({input})=>{
        const resp = await prisma.balance.create({
            data: input
        })
        return { resp }
    }),
    facturado: procedure
    .input(
        z.object({
            empresaId: z.string(),
            anio:z.number(),
            mes:z.number(),
        })
    )
    .mutation(async({input})=>{
        const resp = await prisma.facturado.create({
            data: input
        })
        return { resp }
    }),
    facturadoDepto: procedure
    .input(
        z.object({
            empresaId:z.string(),
            anio:z.number(),
            mes:z.number(),
            departamentoId:z.number()
        })
    )
    .mutation(async({input})=>{
        const resp = await prisma.facturadoDepartamento.create({
            data:input
        })
        return { resp }
    }),
    concepto: procedure
    .input(
        z.object({
            cantUsr: z.number(),
            kwh: z.number(),
            facSin: z.number(),
            facCon: z.number(),
            precioMedCon: z.number(),
            tipo: z.enum(ConceptoEnums),
            empresaId: z.string(),
            anio: z.number(),
            mes: z.number()
        })
    )
    .mutation(async({input})=>{
        const resp = await prisma.concepto.create({
            data:input
        })
        return { resp }
    }),
    post_maquina: procedure
    .input(
        z.object({
            numero: z.string(),
            tecnologia: z.enum(TecnologiaEnums),
            marca: z.string(),
            tension: z.number(),
            kva: z.number(),
            fp: z.number(),
            kw: z.number(),
            potenciaEf: z.number(),
            potenciaHP: z.number(),
            fechaPS: z.string(),
            tipoCte: z.string(),
            centralId: z.string()
        })
    )
    .mutation(async({input})=>{
        const resp = await prisma.maquina.create({
            data: input
        })
        return { resp }
    }),
    variable_central: procedure
    .input(
        z.object({
            anio: z.number(),
            mes: z.number(),
            centralId: z.number()
        })
    )
    .mutation(async({input})=>{
        const resp = await prisma.variableCentral.create({
            data:input
        })
        return { resp }
    }),
    combustible: procedure
    .input(
        z.object({
            anio: z.number(),
            mes: z.number(),
            cmb: z.string(),
            unidad:z.string(),
            vol: z.number(),
            claseProd: z.string(),
            centralId: z.number()

        })
    )
    .mutation(async({input})=>{
        const resp = await prisma.combustible.create({
            data:input
        })
        return { resp }
    }),
    energia_bruto: procedure
    .input(
        z.object({
            anio: z.number(),
            mes: z.number(),
            centralId: z.number(),
            solar: z.number(),
            diesel: z.number(),
            hidro: z.number(),
            tv: z.number(),
            tg: z.number(),
            eolico: z.number()
        })
    )
    .mutation(async({input})=>{
        const resp = await prisma.energia.create({
            data: input
        })
        return { resp }
    }),
    get_variable_central: procedure
    .query(async()=>{
        const resp = await prisma.variableCentral.findMany({
            select:{
                anio: true,
                mes: true,
                combustible: true,
                energiaBruto: true
            }
        })
        return {resp}
    }),
    hello: procedure
    .input(
        z.object({
            text:z.string(),
        }),
    )
    .query(({input})=>{
        return {
            greeting: `hello ${input.text}`,
        };
    }),
});

export type AppRouter = typeof appRouter;
