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
            update: input,
            create: input
        })
        return {
            resp
        }
    })
    ,
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
