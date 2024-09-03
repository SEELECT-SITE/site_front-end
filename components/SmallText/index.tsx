import { FunctionComponent, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps {
  children: ReactNode;
  className?: string;
}

const SmallText: FunctionComponent<TextProps> = ({ children, className }) => {
  return (
    <small
      className={twMerge(
        "lg:font-thin m-0 p-0 tracking-wide",
        className
      )}
    >
      {children}
    </small>
  );
};

export default SmallText;
