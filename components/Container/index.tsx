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
  return <div className={twMerge('px-2 xs:px-3 py-1',className)}>{children}</div>;
};

export default Container;
