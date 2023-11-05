import Text from "@/components/Text";
import { User } from "next-auth";
import useSelectEventsState from "../SelectEventsModal/selectEventsStore";
import Title from "@/components/Title";
import PriceCard from "@/components/PriceCard";
import { useQuery } from "react-query";
import { DJANGO_URL } from "@/utils/consts";
import axios from "axios";
import useUserboardState from "../userboardStore/PayKitModalStore";
import SkeletonCreator from "@/components/SkeletonCreator";
import SmallText from "@/components/SmallText";
import { LuAlertCircle } from "react-icons/lu";
import momento from "@/utils/formatDate";

export default function KitsAvaliable({
  title,
  onClick,
}: {
  title?: boolean;
  onClick?: Function;
}) {
  const { setIsSelectEventOpen, setSelectedKit } = useSelectEventsState();
  const { kitsValues, setKitsValues } = useUserboardState();
  const { data: kits, isLoading } = useQuery<any | undefined>(
    "kits",
    async () => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "ngrok-skip-browser-warning": "true",
      };
      if (kitsValues != "") {
        return kitsValues;
      }
      try {
        const { data } = await axios.get(`${DJANGO_URL}api/kits/models/`, {
          headers,
        });
        setKitsValues(data.results);
        return data.results;
      } catch (error) {
        console.log(error);
      }
    },
    { refetchOnWindowFocus: false }
  );
  if (momento().isAfter("11/06/2023")) {
    return (
      <div className="h-[5vh]">
        <Title className="border-l-2 pl-2 border-cian-400">
          Inscrições encerradas
        </Title>
      </div>
    );
  }
  return (
    <>
      {title && (
        <>
          <Title className="border-l-2 pl-2 border-cian-400">
            Não tem kit ainda?
          </Title>
          <Text className="text-slate-300">Selecione um dos kit abaixo</Text>
          {/*  <SmallText className="inline-flex text-center my-2 p-2 rounded-lg m-auto items-start gap-1 text-yellow-200 bg-slate-900">
            <span>
              <LuAlertCircle size={18} />
            </span>
            1º Lote disponível valído até dia 30/10/2023
          </SmallText> */}
        </>
      )}

      <div className="flex flex-wrap gap-4 my-6 justify-around">
        {!isLoading &&
          kits
            .map((kit: any) => {
              return (
                <PriceCard
                  key={kit.title + kit.id}
                  stars={kit.id - 1}
                  onClick={() => {
                    {
                      onClick && onClick();
                    }
                    setIsSelectEventOpen(true);
                    setSelectedKit(kit.id);
                  }}
                  price={kit.price}
                  destack={kit.id == 4}
                  destackText={kit.id == 4 ? "+ Custo Benéficio" : ""}
                  title={kit.model}
                  id={kit.id + kit.model}
                  advantage={[
                    kit.all_speeches
                      ? "Todas as Palestras"
                      : "Palestra patrocinadas + 1 palestra a sua escolha",
                    kit.workshops ? `${kit.workshops} Minicursos/Workshop` : "",
                    kit.bucks_coup ? "Um copo Buck's Exclusivo" : "",
                  ]}
                />
              );
            })
            .reverse()}
        {isLoading && (
          <SkeletonCreator
            quantity={4}
            className="w-full max-w-md h-60 rounded-xl bg-dark"
          />
        )}
      </div>
    </>
  );
}
