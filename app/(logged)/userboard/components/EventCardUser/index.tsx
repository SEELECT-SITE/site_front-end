import { SvgCardLine } from "@/components/PriceCard";
import SmallText from "@/components/SmallText";
import Text from "@/components/Text";
import { EventProps } from "@/pages/api/auth/nextauth";
import { numberToMonth } from "@/utils/formatDate";
import Link from "next/link";
import { FunctionComponent } from "react";
import { MdLocationPin } from "react-icons/md";

const EventCardUser: FunctionComponent<EventProps> = ({
  title,
  location,
  tipo,
  date,
  description,
  max_inscriptions,
  inscriptions,
}) => {
  const date_evento = new Date(date);
  return (
    <article className="hover:animate-background w-full rounded-xl bg-gradient-to-tl from-dark-cian to-cian-700 hover:from-cian-700 hover:to-cian-400 p-1 pb-3 shadow-xl lg:basis-96">
      <div className="rounded-[10px] bg-white p-4 pt-8 sm:p-6 flex flex-col h-full justify-between gap-1">
        <div>
          <div className="flex justify-between">
            <time className="block text-xs text-gray-500">
              {`${date_evento.getUTCDate()} de ${numberToMonth(
                date_evento.getMonth()
              )} de ${date_evento.getFullYear()} - ${date_evento.getHours()}:${date_evento.getMinutes()}`}
            </time>
            <span className="whitespace-nowrap rounded-full bg-cian-400 shadow-md px-2.5 py-0.5 text-xs text-dark">
              {tipo.toUpperCase()}
            </span>
          </div>

          <h3 className="mt-0.5 text-lg font-medium text-gray-900">{title}</h3>
          <div className="text-justify">
            <SmallText className="text-slate-500 text-justify line-h">
              {description}
            </SmallText>
          </div>
        </div>
        <div className="pt-1">
          <div className="py-2 rotate-180">
            <SvgCardLine color="#000" opacity=".4" />
          </div>
          <div className="flex justify-between">
            <div className=" text-dark flex items-center gap-1">
              <SmallText>vagas</SmallText>
              <div className="text-sm text-slate-700 text-center rounded-md bg-cian-700 p-1 py-0.5 shadow-md">
                {max_inscriptions - inscriptions}
              </div>
            </div>
            <Link
              title="Ir para localização"
              target="_blank"
              href={location.url}
              className="text-slate-500 bg-white border border-slate-500 p-1 py-0.5 rounded text-right flex items hover:text-slate-800 hover:shadow-md"
            >
              <MdLocationPin size={20} /> {location.name}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default EventCardUser;
