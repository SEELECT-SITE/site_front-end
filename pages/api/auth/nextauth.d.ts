import { UUID } from "crypto";
import { DefaultSession, DefaultUser } from "next-auth";

interface IUser extends DefaultUser {
  role: "user" | "admin" | "staff";
  universidade?: string;
  idade?: number;
  curso?: string;
  semestre?: string;
  eventos: EventoProps[];
  kit?: "iniciante" | "medio" | "avançado";
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
  interface JWT extends IUser {}
}
