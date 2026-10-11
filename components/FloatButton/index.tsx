"use client";
import {
  ButtonHTMLAttributes,
  FunctionComponent,
  MouseEventHandler,
  ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";

export interface baseComponent extends ButtonHTMLAttributes<Element> {
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  shadowClassname?: string;
}

const FloatButton: FunctionComponent<baseComponent> = ({
  className,
  children,
  shadowClassname,
  ...props
}) => {
  return (
    <button
      {...props}
      className={twMerge(
        "group focus:ring bg-[#3f6593] flex disabled:pointer-events-none disabled:opacity-50 rounded-md hover:opacity-90",
        shadowClassname
      )}
    >
      <span
        className={twMerge(
          " text-[#3f6593] bg-white -translate-x-0.5 group-disabled:translate-y-0 group-disabled:translate-x-0 -translate-y-0.5 p-3 group-active:translate-x-0 w-full rounded-md active:translate-y-0 duration-100 text-sm items-center gap-3 tracking-wider font-bold  justify-center",
          className
        )}
      >
        {children}
      </span>
    </button>
  );
};
export default FloatButton;
