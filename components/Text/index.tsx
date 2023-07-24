import { FunctionComponent, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps {
  children: ReactNode;
  className?: string;
}

const Text: FunctionComponent<TextProps> = ({ children, className }) => {
  return (
    <p className={twMerge("text-sm lg:text-base tracking-wide", className)}>
      {children}
    </p>
  );
};

export default Text;
