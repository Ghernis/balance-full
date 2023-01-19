import type {NextRequest} from 'next/server'
import { NextResponse } from 'next/server'
//export { default } from 'next-auth/middleware';
//
//export const config = {matcher:['/','/admin']}
//
import {withAuth} from 'next-auth/middleware'

export default withAuth(
    function middleware(req:NextRequest){
        //return NextResponse
        return NextResponse.rewrite(new URL('/admin',req.url))
    },
    {
    callbacks:{
            authorized:({token})=>{
                return token?.role === 'admin'
            }
        }
    }
);

export const config = {matcher:['/admin']}
