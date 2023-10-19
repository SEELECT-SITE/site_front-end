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
  description: string;

  id: number;
  host: string;
  number_of_inscriptions: number;
  max_number_of_inscriptions: number;
  date: any;
  description: "";
  place: any;
}

type Kit = {
  id: number;
  is_payed: boolean;
  model: number;
  model_detail: {
    id: number;
    model: string;
    price: 25;
    all_speeches: boolean;
    workshops: number;
    bucks_coup: boolean;
    description: string;
  };
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
