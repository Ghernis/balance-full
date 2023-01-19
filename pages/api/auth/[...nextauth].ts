import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialProvider from 'next-auth/providers/credentials'

export const authOptions:NextAuthOptions = {
    // Configure one or more authentication providers
    session:{
        strategy:'jwt'
    },
    providers: [
        CredentialProvider({
            type: 'credentials',
            credentials:{},
            authorize(credentials,req){
                const {email,password}=credentials as {
                    email: string;
                    password: string;
                }
                //login logic
                //find user from db
                if(email !== 'herni' || password !== '123'){
                    return null;
                }
                return {id: '123', name: 'hernan',email: 'herni'}
            }
        })
    ],
    pages:{
        signIn: '/auth/signin',
        error: 'auth/error',
        //signOut:''
    }
}


export default NextAuth(authOptions)
