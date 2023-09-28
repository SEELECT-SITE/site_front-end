import SmallText from "@/components/SmallText";
import Text from "@/components/Text";
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
    <article className="hover:animate-background rounded-xl bg-gradient-to-tl from-dark-cian to-cian-700 hover:from-cian-700 hover:to-cian-400 p-1 shadow-xl duration-1000x max-w-md">
      <div className="rounded-[10px] bg-white p-4 pt-8 sm:p-6">
        <div className="flex justify-between">
          <time className="block text-xs text-gray-500">
            {`${data_evento.getUTCDate()} de ${numberToMonth(
              data_evento.getMonth()
            )} de ${data_evento.getFullYear()}`}
          </time>
          <span className="whitespace-nowrap rounded-full bg-cian-400 shadow-md px-2.5 py-0.5 text-xs text-dark">
            {tipo.toUpperCase()}
          </span>
        </div>

        <a href="#">
          <h3 className="mt-0.5 text-lg font-medium text-gray-900">{title}</h3>
        </a>

        <SmallText className="text-slate-500">{description}</SmallText>
        <div className="flex justify-between">
          <div className=" text-dark flex items-center gap-1">
            <SmallText>vagas</SmallText>
            <div className="w-6 text-center rounded-full bg-cian-700 aspect-square shadow-md">
              {vagas_livres}
            </div>
          </div>
          <Text className="text-slate-500 text-right">{local}</Text>
        </div>
      </div>
    </article>
  );
};

export default EventCardUser;
