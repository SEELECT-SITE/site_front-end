"use client";
import {
  ChangeEvent,
  FocusEventHandler,
  FunctionComponent,
  InputHTMLAttributes,
} from "react";
import { twMerge } from "tailwind-merge";
import { MdClose, MdCheck } from "react-icons/md";
import { cafeFont } from "@/app/fonts";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  valid?: boolean | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

const Input: FunctionComponent<InputProps> = ({
  onBlur,
  valid,
  onChange,
  value,
  ...restProps
}) => {
  return (
    <label
      htmlFor="email"
      className={twMerge(
        `${
          cafeFont.className
        } relative block border rounded-lg border-black shadow-sm border-b-2 ${
          valid === false && "border-b-red-400"
        }
        ${valid === true && "border-b-green-600"}
        `
      )}
    >
      <input
        {...restProps}
        type="email"
        id="email"
        onBlur={onBlur ?? (() => {})}
        onChange={onChange ?? (() => {})}
        className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-4 w-full"
        placeholder="email"
        value={value}
      />

      <span className="pointer-events-none absolute start-2.5 -translate-y-1/2 bg-white p-1 text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xs peer-focus:-top-0 peer-focus:text-xs">
        E-mail *
      </span>
      {valid === false && (
        <span className="pointer-events-none absolute start-2.5 -bottom-8 text-sm text-red-400">
          Insira um e-mail válido
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
