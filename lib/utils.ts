import { Kit, KitToTable } from "@/pages/api/auth/nextauth";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const urlApi = process.env.NEXT_PUBLIC_API_URL;

export const axiosClient = axios.create({ baseURL: urlApi });

export function transformKitsToTable(kits: Kit[]): KitToTable[] {
  return kits.map((kit) => ({
    user: kit.user,
    is_payed: kit.is_payed ? "Pago" : "Pendente",
    price: kit.model_detail.price,
    model_type: kit.model_detail.model,
    date_created: new Date(kit.date_created).getTime(),
  }));
}
