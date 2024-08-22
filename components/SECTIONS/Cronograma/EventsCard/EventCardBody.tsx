import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import EventCard from ".";

export default function EventCardBody({
  children,
  className,
  onClick,
  id,
  capacity,
  disable,
  defaultChecked,
}: {
  children: ReactNode;
  className?: string;
  onClick?: Function;
  id?: string;
  capacity?: number;
  disable?: boolean;
  defaultChecked?: boolean;
}) {
  const [isSelected, setIsSelected] = useState<boolean>(
    defaultChecked || false
  );
  return (
    <div
      className={twMerge(
        `relative w-full p-4 py-12 lg:p-8 ring-inset rounded-2xl max-w-md overflow-hidden ${
          isSelected ? "ring-2 ring-cian-400" : "ring-0 ring-slate-400"
        } ${
          capacity! <= 0 || disable
            ? "bg-dark-cian grayscale pointer-events-none"
            : "bg-dark "
        }`,
        className
      )}
    >
      <div className="absolute top-4 right-4">
        {onClick && (
          <EventCard.AddEvent
            defaultChecked={defaultChecked}
            id={id}
            onClick={(e) => {
              if (onClick) onClick();
            }}
            onChange={(e) => setIsSelected((update) => !update)}
          />
        )}
      </div>
      {onClick && (
        <>
          <span
            className={`absolute h-full left-0 bg-cian-400 top-0 duration-100 ${
              isSelected ? "w-2" : "w-0"
            }`}
          ></span>
          <span
            className={`absolute overflow-hidden whitespace-nowrap left-3 bg-slate-700 top-4 duration-200 text-center text-sm lg:text-md ${
              isSelected
                ? "lg:w-40 lg:36 p-1 rounded-md"
                : "w-0 p-0 rounded-3xl"
            }`}
          >
            Evento Selecionado
          </span>
        </>
      )}

      {children}
    </div>
  );
}
