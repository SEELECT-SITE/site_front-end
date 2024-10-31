import { Kit, KitToTable } from "@/pages/api/auth/nextauth";
import momento from "@/utils/formatDate";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const urlApi = process.env.NEXT_PUBLIC_API_URL;

export const axiosClient = axios.create({
  baseURL: urlApi,
  headers: {
    "ngrok-skip-browser-warning": "true",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export function eventDatesToDB(dates: string[], setErrorReq: any): string {
  var eventDates = "{";
  for (var i = 0; i < dates.length; i += 2) {
    var wrongDate = momento(dates[i]).isAfter(dates[i + 1]);

    if (wrongDate) {
      setErrorReq("Horarios invertidos");
    }
    eventDates += `"${i / 2}": {"start": "${dates[i]}", "end": "${
      dates[i + 1]
    }"}${i + 2 >= dates.length ? "}" : ","} `;
  }
  return eventDates;
}
export function eventDatesFromDBToApp(dates: any): string[] {
  var eventDates = [];
  for (var date in dates) {
    eventDates.push(dates[date].start);
    eventDates.push(dates[date].end);
  }
  return eventDates;
}

export function transformKitsToTable(kits: Kit[]): KitToTable[] {
  return kits.map((kit) => ({
    userID: kit.user.toString(),
    is_payed: kit.is_payed,
    price: kit.model_detail.price,
    model_type: kit.model_detail.model,
    date_created: new Date(kit.date_created).getTime(),
    kitID: kit.id.toString(),
    discount: kit.discount,
  }));
}
