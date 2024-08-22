"use client";
import { ReactNode, useRef } from "react";
import EventCard from "../SECTIONS/Cronograma/EventsCard";
import { twMerge } from "tailwind-merge";
{
  /* Para usar esse modal basta colocar o*/
}

export default function DefaultModal({
  children,
  modalIsOpen,
  className,
  setModalIsOpen,
}: {
  setModalIsOpen: (state: boolean) => void;
  className?: string;
  children?: ReactNode;
  modalIsOpen: boolean;
}) {
  const divModal = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {modalIsOpen && (
        <div
          onClick={(e) => {
            if (divModal.current == e.target) {
              setModalIsOpen(false);
            }
          }}
          ref={divModal}
          className={twMerge(
            "fixed w-full h-full z-[9999] flex top-0 left-0 p-4 backdrop-blur-sm bg-dark/20 text-dark  items-center justify-center",
            className
          )}
        >
          <div className="flex flex-col justify-between items-center relative overflow-hidden bg-white rounded-md max-w-md z-10 border-4 border-white">
            <EventCard.Delete
              className="top-1"
              message="Fechar"
              onClick={(e) => setModalIsOpen(false)}
            />
            {children}
          </div>
        </div>
      )}
    </>
  );
}
