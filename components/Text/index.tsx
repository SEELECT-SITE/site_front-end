import { FunctionComponent, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ParagraphProps {
  children: ReactNode;
  className?: string;
}

const Paragraph: FunctionComponent<ParagraphProps> = ({
  children,
  className,
}) => {
  return <p className={twMerge("mb-3 tracking-wide", className)}>{children}</p>;
};

export default Paragraph;