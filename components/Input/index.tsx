"use client";
import { FunctionComponent, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { MdClose, MdCheck, MdErrorOutline } from "react-icons/md";
import { cafeFont } from "@/app/fonts";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  valid?: boolean | undefined;
  errorMsg?: string | undefined;
  register?: UseFormRegisterReturn<string>;
  icon?: Element;
}

const Input: FunctionComponent<InputProps> = ({
  valid,
  register,
  errorMsg,
  icon: Icon,
  ...props
}) => {
  return (
    <label
      htmlFor={props.name}
      className={twMerge(
        `${
          cafeFont.className
        } relative block border rounded-lg my-2 border-black shadow-sm border-b-2 bg-white ${
          valid === false && "border-b-red-400"
        }
        ${valid === true && "border-b-green-600"}
        `,
        props.className
      )}
    >
      <input
        {...props}
        {...register}
        className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none rounded-lg p-4 w-full text-dark focus:ring-2 focus:ring-dark-cian"
      />

      <span
        className={`w-2 left-0 peer-focus:w-2 peer-hover:w-2 peer-placeholder-shown:w-0 duration-100 h-full top-0 absolute rounded-l-full ${
          errorMsg ? "bg-red-400" : "bg-cian-700"
        }`}
      ></span>

      <span className="pointer-events-none opacity-100 text-white -top-4 text-base absolute start-1 -translate-y-1/2 p-1 transition-all peer-placeholder-shown:start-2.5 peer-placeholder-shown:opacity-50 peer-placeholder-shown:top-1/2 peer-focus:-top-4 peer-focus:opacity-100 peer-focus:start-1 peer-focus:text-base mix-blend-difference">
        {props.placeholder}
      </span>
      {errorMsg && (
        <span className="pointer-events-none absolute end-4 -bottom-6 text-sm text-red-400 flex gap-1 items-center">
          <MdErrorOutline size={16} />
          {errorMsg}
        </span>
      )}
      {valid === false && (
        <span className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 text-sm text-red-400">
          <MdClose size={22} />
        </span>
      )}
      {valid === true && (
        <span className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 text-sm text-green-600">
          <MdCheck size={22} />
        </span>
      )}
    </label>
  );
};

export default Input;
