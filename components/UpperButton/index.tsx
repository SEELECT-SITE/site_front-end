import { ButtonHTMLAttributes, FunctionComponent } from "react";

interface ShadowBtnProps extends ButtonHTMLAttributes<Element> {
  shadowColor?: string;
}

const ShadowButton: FunctionComponent<ShadowBtnProps> = ({
  className,
  children,
  shadowColor,
  onClick,
  ...restProps
}) => {
  return (
    <button
      className={`rounded-md group relative ${shadowColor ?? "bg-gray-950"}`}
      onClick={onClick ?? (() => {})}
      {...restProps}
    >
      <div
        className={`duration-150 border gap-2 rounded-md px-5 py-3 text-sm font-medium text-white group-hover:-translate-x-1 group-hover:-translate-y-1 focus:outline-none focus:ring active:opacity-80 ${className}`}
      >
        {children}
      </div>
    </button>
  );
};

export default ShadowButton;
