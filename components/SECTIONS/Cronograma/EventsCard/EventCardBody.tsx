import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function EventCardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "relative w-full bg-dark p-4 lg:p-8 rounded-2xl max-w-md",
        className
      )}
    >
      {children}
    </div>
  );
}
