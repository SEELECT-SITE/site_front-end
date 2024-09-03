"use client";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface EventCapacityProps extends HTMLAttributes<HTMLElement> {
  capacity: number;
  admin?: boolean;
  limit?: number;
}

export default function EventCapacity({
  className,
  admin,
  limit,
  id,
  capacity,
  ...props
}: EventCapacityProps) {
  const isUnderTen = capacity <= 10;
  const isFull = capacity <= 0;

  return (
    <span
      {...props}
      className={twMerge(
        `p-2  bg-white rounded-t-xl absolute bottom-0 right-4 ring-2 ring-inset ring-cian-400 text-sm lg:text-md ${
          isUnderTen ? "text-red-500 font-bold" : "text-slate-700"
        }`,
        className
      )}
    >
      {admin ? (
        `${capacity} inscritos de ${limit} vagas`
      ) : isFull ? (
        "Lotado"
      ) : (
        <>
          {isUnderTen
            ? `Restam apenas ${capacity} Vagas`
            : `Algumas vagas restantes`}
        </>
      )}
    </span>
  );
}
