import { twMerge } from "tailwind-merge";
import "./decoration.css";

interface DecorationProps {
  className?: string;
  shadowClassname?: string;
  type?: "light";
  notAnimated?: boolean;
}

export default function Decoration({
  className,
  type,
  notAnimated,
  shadowClassname,
}: DecorationProps) {
  return (
    <div
      className={twMerge(
        `${type ? "decoration_crono-light" : "decoration_crono-2"}
        ${
          notAnimated
            ? ""
            : "hover:-translate-x-2 hover:-translate-y-1 duration-150"
        } rounded-lg shrink grow -translate-y-1`,
        shadowClassname
      )}
    >
      <div
        className={twMerge(
          `${
            notAnimated
              ? ""
              : "hover:-translate-x-2 hover:-translate-y-1 duration-150"
          } w-full h-full decoration_crono rounded-lg shrink grow `,
          className
        )}
      ></div>
    </div>
  );
}
