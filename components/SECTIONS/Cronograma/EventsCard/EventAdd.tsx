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
          className="flex cursor-pointer items-center justify-between rounded-lg text-sm p-1 text-transparent font-medium hover:border-gray-200 w-20 lg:w-24 z-10"
        >
          <MdCheck size={18} />
        </label>
        <span className="peer-checked:hidden flex absolute top-0 right-0 p-0.5 text-green-500 rounded-md text-sm lg:text-md border border-slate-500 -z-10 items-center w-22 lg:w-24 justify-center">
          Adicionar <MdCheck size={18} />
        </span>

        <span className="peer-checked:flex hidden absolute top-0 right-0 p-0.5 text-red-700 border border-slate-400 bg-slate-400 text-sm lg:text-md rounded-md -z-10 items-center w-22 lg:w-24 justify-center">
          Remover
          <MdClose size={18} />
        </span>
      </div>
    </>
  );
}
