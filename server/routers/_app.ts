import { z } from 'zod';
import { procedure, router } from '../trpc'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const SistemaEnums=['Conectado','Aislado'] as const;
const DestinoEnums=['VentaUsuarios','Resguardo','ConsumoPropio'] as const;
const TipoEnums=['Distribuidora','Cooperativa','Autoproductor'] as const;
export const appRouter = router({
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
        return { resp }

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
        return {
            empresa
        }
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
                centrales: true,
                variable: true
            }
        })
        return { resp }
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
            empresaId: z.number(),
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
    centrales: procedure
    .query(async()=>{
        const resp = await prisma.central.findMany()
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
        const resp = await prisma.variable.findMany()
        return { resp }
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
