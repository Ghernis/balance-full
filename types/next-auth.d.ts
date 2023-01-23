import { JWT } from 'next-auth/jwt'
import NextAuth from "next-auth"

declare module "next-auth/jwt" {
    /**
    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
    */
    interface JWT {
        /** The user's role . */
        role?: string
    }
}
declare module "next-auth" {
  interface Session {
    role: string;
  }

  interface User {
    role: string;
  }
}
