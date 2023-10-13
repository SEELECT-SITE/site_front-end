"use client";
import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
import { MdCheck, MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";

interface EventCloseProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function EventAdd({ className, id, ...props }: EventCloseProps) {
  return (
    <>
      <div className="relative z-10">
        <input
          type="checkbox"
          name="DeliveryOption"
          value={id}
          id={id}
          className="peer hidden group"
          {...props}
        />

        <label
          htmlFor={id}
          className="flex cursor-pointer items-center justify-between rounded-lg  text-sm p-1 text-transparent font-medium hover:border-gray-200 w-24"
        >
          <MdCheck size={20} />
        </label>
        <span className="peer-checked:hidden flex absolute top-0 right-0 p-1 text-green-500 rounded-md border border-slate-500 -z-10">
          Adicionar <MdCheck size={20} />
        </span>

        <span className="peer-checked:flex hidden absolute top-0 right-0 p-1 text-red-700 border border-slate-400 bg-slate-400 rounded-md -z-10 items-center">
          Remover
          <MdClose size={20} />
        </span>
      </div>
    </>
  );
}
