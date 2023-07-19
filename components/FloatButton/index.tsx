"use client";
import { FunctionComponent, MouseEventHandler, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type baseComponent = {
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const FloatButton: FunctionComponent<baseComponent> = ({
  className,
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      className={twMerge(
        "ring-1 ring-inset group ring-black flex disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={onClick ?? (() => {})}
    >
      <span
        className={twMerge(
          " bg-black -translate-x-1 group-disabled:translate-y-0 group-disabled:translate-x-0 -translate-y-1 text-white p-3 active:translate-x-0 w-full active:translate-y-0 duration-150 text-sm flex items-center justify-between gap-3 tracking-wider font-bold hover:text-white/50"
        )}
      >
        {children}
      </span>
    </button>
  );
};
export default FloatButton;
