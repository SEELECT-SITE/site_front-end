import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const urlApi = process.env.NEXT_PUBLIC_API_URL;

export const axiosClient = axios.create({ baseURL: urlApi });
