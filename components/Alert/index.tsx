import { twMerge } from "tailwind-merge";
import "./alert.css";
import SmallText from "../SmallText";
import { ReactNode, useEffect, useState } from "react";

interface AlertProps {
  className?: string;
  timeout?: number;
  children?: ReactNode;
}

export default function Alert({ className, children, timeout }: AlertProps) {
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowComponent(false);
    }, timeout ?? 2500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <>
      {showComponent && (
        <div
          style={{ animationDuration: `${timeout ?? 2500}ms` }}
          className={twMerge(
            `fixed top-4 left-0 -translate-x-2-full p-4 bg-dark text-white rounded-lg z-50 border  alert`,
            className
          )}
        >
          {children}
        </div>
      )}
    </>
  );
}
