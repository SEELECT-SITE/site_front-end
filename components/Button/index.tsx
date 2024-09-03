import { ButtonHTMLAttributes, FunctionComponent } from "react";
import { twMerge } from "tailwind-merge";

interface ShadowBtnProps extends ButtonHTMLAttributes<Element> {
  shadowColor?: string;
}

const Button: FunctionComponent<ShadowBtnProps> = ({
  className,
  children,
  disabled,
  ...restProps
}) => {
  return (
    <button
      className={twMerge(
        `rounded-md group relative lg:text-base ${
          disabled ? "pointer-events-none opacity-75 brightness-110" : ""
        } p-3 active:opacity-90 active:scale-95 duration-100`,
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
