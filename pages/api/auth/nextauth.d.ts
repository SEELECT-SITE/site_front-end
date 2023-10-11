import { UUID } from "crypto";
import { DefaultSession, DefaultUser } from "next-auth";

interface IUser extends DefaultUser {
  role: "user" | "admin" | "staff";
  ies?: string;
  age?: number;
  course?: string;
  semestre?: string;
  kit?: {
    name: "iniciante" | "medio" | "avançado" | undefined;
    n_palestras: number;
    n_workshop: number;
  };
}

export interface EventProps {
  title: string;
  hostedBy: string;
  date: number;
  location: { name: string; url: string };
  tipo: "workshop" | "palestra";
  description: string;
  max_inscriptions: number;
  inscriptions: number;
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
