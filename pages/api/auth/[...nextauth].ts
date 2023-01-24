import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialProvider from 'next-auth/providers/credentials'
import Credentials from 'next-auth/providers/credentials'

import prisma from '../../../server/prisma-cliet';


export const authOptions:NextAuthOptions = {
    // Configure one or more authentication providers
    session:{
        strategy:'jwt'
    },
    providers: [
        CredentialProvider({
            type: 'credentials',
            credentials:{},
            authorize: async (credentials,req)=>{
                const {nombre,password}=credentials as {
                    nombre: string;
                    password: string;
                    role: string;
                }
                //find user from db
                const resp = await prisma.usuario.findFirst({
                    where:{
                        nombreId:nombre
                    },
                    select:{
                        password:true,
                        mail:true,
                        nombreId:true,
                        role:true,
                        nombre:true
                    }

                })
                console.log(resp)
                if(nombre !== resp.nombreId || password !== resp.password){
                    return null;
                }
                return {
                    id:resp.nombreId,
                    name: resp.nombreId,
                    email: resp.mail,
                    role: resp.role
                }
            }
        })
    ],
    pages:{
        signIn: '/auth/signin',
        error: 'auth/error',
        //signOut:''
    },
    callbacks:{
        jwt(params){
            //update token
            //return final_token
            if(params.user?.role){
                params.token.role=params.user.role;
            }
            //return final_token
            return params.token
        }
    }

}


export default NextAuth(authOptions)
