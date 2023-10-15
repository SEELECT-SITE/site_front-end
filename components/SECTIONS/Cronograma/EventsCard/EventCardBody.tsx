import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import EventCard from ".";

export default function EventCardBody({
  children,
  className,
  onClick,
  id,
}: {
  children: ReactNode;
  className?: string;
  onClick?: Function;
  id?: string;
}) {
  const [isDestack, setIsDestack] = useState<boolean>();
  return (
    <div
      className={twMerge(
        `relative w-full bg-dark p-4 py-12 lg:p-8 ring-inset rounded-2xl max-w-md overflow-hidden ${
          isDestack ? "ring-2 ring-cian-400" : "ring-0 ring-slate-400"
        }`,
        className
      )}
    >
      <div className="absolute top-4 right-4">
        {onClick && (
          <EventCard.AddEvent
            id={id}
            onClick={(e) => {
              if (onClick) onClick();
            }}
            onChange={(e) => setIsDestack((update) => !update)}
          />
        )}
      </div>
      {onClick && (
        <>
          <span
            className={`absolute h-full left-0 bg-cian-400 top-0 duration-100 ${
              isDestack ? "w-2" : "w-0"
            }`}
          ></span>
          <span
            className={`absolute overflow-hidden whitespace-nowrap left-3 bg-slate-700 top-4 duration-200 text-center text-sm lg:text-md ${
              isDestack ? "lg:w-40 lg:36 p-1 rounded-md" : "w-0 p-0 rounded-3xl"
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
