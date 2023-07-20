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
        "group bg-cian-700 flex disabled:pointer-events-none disabled:opacity-50 rounded-md w-full",
        className
      )}
      onClick={onClick ?? (() => {})}
    >
      <span
        className={twMerge(
          " text-cian-700 bg-white -translate-x-1 group-disabled:translate-y-0 group-disabled:translate-x-0 -translate-y-1 p-3 active:translate-x-0 w-full rounded-md active:translate-y-0 duration-150 text-sm flex items-center gap-3 tracking-wider font-bold hover:text-white/50 justify-center"
        )}
      >
        {children}
      </span>
    </button>
  );
};
export default FloatButton;
