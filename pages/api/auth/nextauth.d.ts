import { DefaultSession, DefaultUser } from "next-auth";
// Define a role enum

// common interface for JWT and Session
interface IUser extends DefaultUser {
  role?: "user" | "admin";
  eventos:string[]
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: IUser;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
