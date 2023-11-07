"use client";
import { MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";

export default function EventAlert({ className }: { className: string }) {
  return (
    <div
      className={twMerge(
        "p-1 text-sm flex gap-2 items-center absolute top-2 right-2 border border-slate-400 hover:bg-slate-400 hover:text-red-600 rounded-full",
        className
      )}
    >
      Deseja retirar esse evento?
    </div>
  );
}
