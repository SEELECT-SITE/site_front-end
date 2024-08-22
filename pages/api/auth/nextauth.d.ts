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
  category: string;
  date: number;
  location: { name: string; url: string };
  description: string;
  id: number;
  host: string;
  number_of_inscriptions: number;
  max_number_of_inscriptions: number;
  date: { $date: { start: string; end: string } };
  description: "";
  place: any;
}

type Kit = {
  id: number;
  user?: number;
  discount: number;
  is_payed: boolean;
  model: number;
  model_detail: {
    id: number;
    model: string;
    price: number;
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
