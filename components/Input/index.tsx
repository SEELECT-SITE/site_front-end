"use client";
import { FunctionComponent, InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MdErrorOutline } from "react-icons/md";
import { cafeFont } from "@/app/fonts";
import { UseFormRegisterReturn } from "react-hook-form";
import { IoMdEye } from "react-icons/io";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  valid?: boolean | undefined;
  errorMsg?: string | undefined;
  register?: UseFormRegisterReturn<string>;
  icon?: Element;
  type?: string;
}

const Input: FunctionComponent<InputProps> = ({
  type,
  valid,
  register,
  errorMsg,
  required,
  icon: Icon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <label
      htmlFor={props.name}
      className={twMerge(
        `${
          cafeFont.className
        } relative block border rounded-lg my-4 border-black shadow-sm border-b-2 bg-white min-w-[250px] ${
          valid === false && "border-b-red-500"
        }
        ${valid === true && "border-b-green-600"}
        `,
        props.className
      )}
    >
      <input
        type={showPassword ? "text" : type}
        {...props}
        {...register}
        className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none rounded-lg p-4 w-full text-dark focus:ring-2 focus:ring-dark-cian [type='password']"
      />

      {type === "password" && (
        <button
          type="button"
          onClick={(e) => setShowPassword((showPassword) => !showPassword)}
          className="absolute right-2 bg-cian-700 rounded-full text-white top-1/2 -translate-y-1/2 p-0.5"
        >
          <IoMdEye size={20} />
        </button>
      )}

      <span
        className={`w-2 left-0 peer-focus:w-2 peer-hover:w-2 peer-placeholder-shown:w-0 duration-100 h-full top-0 delay-75 absolute rounded-l-full ${
          errorMsg ? "bg-red-500" : "bg-cian-700"
        }`}
      ></span>

      <span className="pointer-events-none opacity-100 text-white -top-4 text-base absolute start-1 -translate-y-1/2 p-1 transition-all peer-placeholder-shown:start-2.5 peer-placeholder-shown:opacity-50 peer-placeholder-shown:top-1/2 peer-focus:-top-4 peer-focus:opacity-100 peer-focus:start-1 peer-focus:text-base mix-blend-difference flex">
        {props.placeholder}
      </span>

      {errorMsg && (
        <span className="pointer-events-none  absolute end-4 -bottom-7 text-sm text-red-500 flex gap-1 items-start line-clamp-1 whitespace-nowrap right-0 errorReqAnimated">
          {errorMsg}
          <MdErrorOutline size={16} className="mt-0.5" />
        </span>
      )}
    </label>
  );
};

export default Input;
