import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const axiosClient = axios.create({ baseURL: apiUrl });
