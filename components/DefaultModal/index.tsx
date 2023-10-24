"use client";
import { ReactNode, useRef, useState } from "react";
import EventCard from "../SECTIONS/Cronograma/EventsCard";
import Link from "next/link";

export default function DefaultModal({
  children,
  externalModalIsOpen,
  setExternalModalIsOpen,
}: {
  children?: ReactNode;
  setExternalModalIsOpen?: Function;
  externalModalIsOpen?: boolean;
}) {
  const divModal = useRef<HTMLDivElement | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);

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
          className="fixed w-full h-full z-[9999] flex top-0 left-0 p-4 backdrop-blur-sm bg-dark/20 text-dark  items-center justify-center"
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
