import SmallText from "@/components/SmallText";
import { EventoProps } from "@/pages/api/auth/nextauth";
import { numberToMonth } from "@/utils/formatData";
import { FunctionComponent } from "react";

const EventCardUser: FunctionComponent<EventoProps> = ({
  title,
  local,
  tipo,
  data,
  description,
  vagas_livres,
}) => {
  const data_evento = new Date(data);
  return (
    <article className="hover:animate-background rounded-xl bg-gradient-to-r p-0.5 shadow-xl transition max-w-md">
      <div className="rounded-[10px] bg-white p-4 !pt-8 sm:p-6">
        <div className="flex justify-between">
          <time className="block text-xs text-gray-500">
            {`${data_evento.getUTCDate()} de ${numberToMonth(
              data_evento.getMonth()
            )} de ${data_evento.getFullYear()}`}
          </time>
          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
            {tipo.toUpperCase()}
          </span>
        </div>

        <a href="#">
          <h3 className="mt-0.5 text-lg font-medium text-gray-900">{title}</h3>
        </a>

        <div className="text-slate-500">{local}</div>
        <SmallText className="text-slate-500">{description}</SmallText>
        <div className="text-dark">vagas restantes {vagas_livres}</div>
      </div>
    </article>
  );
};

export default EventCardUser;
