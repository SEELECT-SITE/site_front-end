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
  return (
    <div
      className={twMerge(
        "px-3 xs:px-4 py-8 w-full lg:px-12 xl:px-16 2xl:px-24",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
