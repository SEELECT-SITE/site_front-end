import { DefaultSession, DefaultUser } from "next-auth";
// Define a role enum

// common interface for JWT and Session
interface IUser extends DefaultUser {
  role?: "user" | "admin";
}

export interface EventoProps {
  title: string;
  data: number;
  local: string;
  tipo: "workshop" | "palestra";
  description: string;
  vagas_livres: number;
}

declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: IUser;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {
    role: "user" | "admin";
  }
}
