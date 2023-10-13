import { UUID } from "crypto";
import { DefaultSession, DefaultUser } from "next-auth";

interface IUser extends DefaultUser {
  role: "user" | "admin" | "staff";
  ies?: string;
  age?: number;
  course?: string;
  semestre?: string;
  token: string;
  id: string;
  kit?: Kit;
  descont?: number;
}

export interface EventProps {
  title: string;
  hostedBy: string;
  date: number;
  location: { name: string; url: string };
  tipo: string;
  description: string;
  max_inscriptions: number;
  inscriptions: number;
}

type Kit = {
  id: number;
  is_payded: boolean;
  model: string;
  events: any[];
};

declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: IUser;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
