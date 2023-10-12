"use client";
import { ButtonHTMLAttributes } from "react";
import { MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";

interface EventCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function EventClose({ className, ...props }: EventCloseProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "p-1 text-sm flex gap-2 items-center absolute top-2 right-2 border border-slate-400 hover:bg-slate-400 hover:text-red-600 rounded-full",
        className
      )}
    >
      <MdClose size={18} />
    </button>
  );
}
