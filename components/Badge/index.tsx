import { FunctionComponent, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  value?: string | number;
}

const Badge: FunctionComponent<BadgeProps> = ({
  children,
  className,
  value,
}) => {
  return (
    <div className="relative">
      {children}
      {value && (
        <div
          style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          className={twMerge(
            " absolute rounded-full border flex items-center justify-center text-dark bg-white font-bold",
            className
          )}
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default Badge;
