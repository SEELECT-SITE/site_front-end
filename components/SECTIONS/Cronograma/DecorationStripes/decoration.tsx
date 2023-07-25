import { twMerge } from "tailwind-merge";
import "./decoration.css";

interface DecorationProps {
  className?: string;
  shadowClassname?: string;
}

export default function Decoration({
  className,
  shadowClassname,
}: DecorationProps) {
  return (
    <div
      className={twMerge(
        `decoration_crono-2 rounded-lg shrink grow -translate-y-1 hover:translate-y-0 duration-150`,
        shadowClassname
      )}
    >
      <div
        className={twMerge(
          "w-full h-full decoration_crono rounded-lg shrink grow hover:-translate-x-2 hover:-translate-y-1 duration-150",
          className
        )}
      ></div>
    </div>
  );
}
