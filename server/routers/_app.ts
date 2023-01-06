import { z } from 'zod';
import { procedure, router } from '../trpc'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const appRouter = router({
    empresas: procedure
    .query(async()=>{
        const empresa = await prisma.empresa.findMany({
            where: { tipo: 'Distribuidora'}
        })
        return {
            empresa
        }
    }),
    put_empresas: procedure
    .input(
        z.object({
            nombre: z.string()
        })
    )
    .mutation(({input})=>{
        return {
            empresa: {
                nombre:input.nombre
            }
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
