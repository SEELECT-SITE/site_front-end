import { FunctionComponent, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TitleProps {
  children: ReactNode;
  className?: string;
}

const Title: FunctionComponent<TitleProps> = ({ children, className }) => {
  return (
    <h2 className={twMerge("text-3xl font-bold tracking-wide mb-2", className)}>
      {children}
    </h2>
  );
};

export default Title;
