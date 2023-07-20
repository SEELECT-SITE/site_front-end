import { FunctionComponent, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: FunctionComponent<ContainerProps> = ({
  children,
  className,
}) => {
  return <div className={twMerge('px-3 xs:px-4 py-8 w-full',className)}>{children}</div>;
};

export default Container;
