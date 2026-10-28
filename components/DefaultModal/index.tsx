"use client";
import { ReactNode, useRef } from "react";
import EventCard from "../SECTIONS/Cronograma/EventsCard";
import { twMerge } from "tailwind-merge";
{
  /* Para usar esse modal basta colocar o*/
}

export default function DefaultModal({
  children,
  isModalOpen,
  className,
  setIsModalOpen,
}: {
  setIsModalOpen: (state: boolean) => void;
  className?: string;
  children?: ReactNode;
  isModalOpen: boolean;
}) {
  const divModal = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {isModalOpen && (
        <div
          onClick={(e) => {
            if (divModal.current == e.target) {
              setIsModalOpen(false);
            }
          }}
                    ref={divModal}
          className={
            "fixed inset-0 z-[9999] overflow-y-auto p-4 backdrop-blur-sm bg-dark/20 text-dark"
          }
        >
          <div
            className={twMerge(
              "flex flex-col justify-between items-center relative bg-white rounded-md max-w-md z-10 m-auto",
              className
            )}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}
