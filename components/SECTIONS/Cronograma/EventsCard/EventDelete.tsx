import { ButtonHTMLAttributes } from "react";
import { MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";

interface deleteProps extends ButtonHTMLAttributes<Element> {
  message?: string;
}

export default function EventDelete({ message, ...props }: deleteProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "flex absolute p-0.5 text-red-500 right-4 rounded-md text-sm lg:text-md border border-slate-600 items-center justify-center hover:bg-slate-800 top-4 hover:text-red-600",
        props.className
      )}
    >
      {message ?? "deletar"} <MdClose />
    </button>
  );
}
