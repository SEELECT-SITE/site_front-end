import Text from "@/components/Text";
import { User } from "next-auth";
import useSelectEventsState from "../SelectEventsModal/selectEventsStore";
import Title from "@/components/Title";
import PriceCard from "@/components/PriceCard";
import { useQuery } from "react-query";
import { DJANGO_URL } from "@/utils/consts";
import axios from "axios";

export default function KitsAvaliable({ title }: { title?: boolean }) {
  const { setIsSelectEventOpen, setSelectedKit } = useSelectEventsState();
  const { data: kits, isLoading } = useQuery<any | undefined>(
    "kits",
    async () => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "ngrok-skip-browser-warning": "true",
      };
      try {
        const { data } = await axios.get(`${DJANGO_URL}api/kits/models/`, {
          headers,
        });
        return data.results;
      } catch (error) {
        console.log(error);
      }
    },
    { refetchOnWindowFocus: false }
  );
  return (
    <>
      {title ? (
        <>
          <Title className="border-l-2 pl-2 border-cian-400">
            Não tem kit ainda?{" "}
          </Title>
          <Text className="text-slate-300">Selecione um dos kit abaixo</Text>
        </>
      ) : (
        <></>
      )}

      <div className="flex flex-wrap gap-4 my-6 justify-around">
        {!isLoading &&
          kits.reverse().map((kit: any) => {
            console.log(kit);
            return (
              <PriceCard
                key={kit.title + kit.id}
                stars={kit.id - 1}
                onClick={() => {
                  setIsSelectEventOpen(true);
                  setSelectedKit(kit);
                }}
                price={kit.price}
                destack={kit.id == 4}
                destackText={kit.id == 4 ? "+ Custo Benéficio" : ""}
                title={kit.model}
                id={kit.id + kit.model}
                advantage={[
                  kit.all_speeches
                    ? "Todas as Palestras"
                    : "Palestra patrocinadas + 1 palestra",
                  kit.workshops ? `${kit.workshops} Minicursos/Workshop` : "",
                  kit.bucks_coup ? "Um copo Buck's Exclusivo" : "",
                ]}
              />
            );
          })}
      </div>
    </>
  );
}
