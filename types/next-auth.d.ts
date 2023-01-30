import { JWT } from 'next-auth/jwt'
import NextAuth from "next-auth"
import { DefaultSession, DefaultUser } from "next-auth";

// Define a role enum
export enum Role {
  user = "USER",
  admin = "ADMIN",
  mod = "MOD",
}
// common interface for JWT and Session
interface IUser extends DefaultUser {
  role?: Role;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
