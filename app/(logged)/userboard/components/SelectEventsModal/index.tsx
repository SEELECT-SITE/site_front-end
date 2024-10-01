"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { User } from "next-auth";
import EventCard from "@/components/SECTIONS/Cronograma/EventsCard";
import removeElem from "@/utils/removeElem";
import FloatButton from "@/components/FloatButton";
import Text from "@/components/Text";
import useSelectEventsState from "./selectEventsStore";
import Title from "@/components/Title";
import Container from "@/components/Container";
import { SvgCardLine } from "@/components/PriceCard";
import useUserboardState from "../userboardStore/PayKitModalStore";
import momento from "@/utils/formatDate";
import SkeletonCreator from "@/components/SkeletonCreator";
import { scrollToElement } from "@/utils/scrollToElement";
import isEventDisable from "./isEventDisable";
import AdviceKitChange from "./adviceKitChange";
import FilterDaysEvents from "./filterDaysEvents";
import SelectedKitAdvantages from "./selectedKitAdvantages";
import CloseModalButton from "./closeModalButton";
import { EventProps } from "@/pages/api/auth/nextauth";
import { axiosClient } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface SelectEventsModalProps {
  className?: string;
  children?: ReactNode;
  user: User;
  sessionUpdate: Function;
}
//Essa variavel escolhe a partir de qual data os eventos vão ser mostrados
const showEventsDate = process.env.NEXT_PUBLIC_OPEN_INSCRIPTIONS_DATE;

export default function SelectEventsModal({
  user,
  sessionUpdate,
}: SelectEventsModalProps) {
  if (!showEventsDate) return <></>;
  const { setIsSelectEventOpen, selectedKit, adviceReaded, dayOfWeek } =
    useSelectEventsState();
  const [selectEvents, setSelectEvents] = useState<number[]>(
    user.kit?.events.map((elem: any) => {
      return elem.id;
    }) || []
  );
  const { toast } = useToast();
  const concernAlertDiv = useRef<HTMLDivElement | null>(null);
  const [eventsTimePicked, setEventsTimePicked] = useState<any[]>([]);
  const { kitsValues } = useUserboardState();
  //Conta o numero de workshops/minicursos do usuario
  const [numberOfSelectWorkshops, setNumberOfSelectWorkshops] =
    useState<number>(
      user.kit?.events.reduce((acc: number, elem: any) => {
        if (["workshop", "minicurso"].includes(elem.category)) {
          return acc + 1;
        }
        return acc;
      }, 0) || 0
    );
  //Conta o numero de palestras inscritas do usuario
  const [numberOfSelectedSpeeches, setNumberOfSelectedSpeeches] =
    useState<number>(
      user.kit?.events.reduce((acc: number, elem: any) => {
        if ("palestra" == elem.category) {
          return acc + 1;
        }
        return acc;
      }, 0) || 0
    );

  const { data: events, isLoading } = useQuery<any | undefined>(
    "allEvents",
    async () => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "ngrok-skip-browser-warning": "true",
      };
      try {
        const { data } = await axiosClient.get<{ results: EventProps[] }>(
          `api/events/`,
          {
            headers,
          }
        );
        var events = data.results;
        events = events.filter((elem) => {
          //@ts-ignore
          if (momento(showEventsDate).isBefore(elem.date["0"].start))
            return elem;
        });
        events.sort(
          (a: any, b: any) =>
            new Date(a.date["0"].start).getTime() -
            new Date(b.date["0"].start).getTime()
        );
        return events;
      } catch (error) {
        toast({
          title: "Algo deu errado",
          description: "Tente novamente em breve",
        });
      }
    },
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    setNumberOfSelectWorkshops(0);
  }, []);

  function toogleElements(id: number, dates: any[]) {
    // Verifica se o evento com o id fornecido já está na lista de eventos selecionados
    if (selectEvents.includes(id)) {
      // Se o evento já estiver selecionado, cria uma cópia do vetor de horários dos eventos selecionados
      var newVector: any[] = eventsTimePicked;

      // Para cada data associada ao evento, remove-a do vetor de horários
      dates.forEach((date) => {
        // Filtra as datas do vetor, removendo a data que corresponde ao evento atual
        newVector = newVector.filter((currentDate) => {
          return currentDate[0] != date[0] || currentDate[1] != date[1];
        });
      });

      // Atualiza o vetor de horários dos eventos com o novo vetor, sem as datas removidas
      setEventsTimePicked(newVector);

      // Remove o evento da lista de eventos selecionados
      setSelectEvents(removeElem(selectEvents, id));
    } else {
      // Se o evento não estiver selecionado, cria uma cópia do vetor de horários dos eventos
      var newVector: any[] = eventsTimePicked;

      // Para cada data associada ao evento, adiciona-a ao vetor de horários
      dates.forEach((date) => {
        newVector.push(date);
      });

      // Atualiza o vetor de horários com as novas datas do evento
      setEventsTimePicked(newVector);

      // Adiciona o evento à lista de eventos selecionados
      selectEvents.push(id);

      // Remove o elemento com id 0 da lista de eventos selecionados, se houver
      setSelectEvents(removeElem(selectEvents, 0));
    }
  }

  const kitModelId = selectedKit ? selectedKit - 1 : user.kit!.model - 1;

  async function updateEvents() {
    if (!adviceReaded) {
      scrollToElement(concernAlertDiv);
      toast({
        title: "Alerta",
        description: "Marque a opção de que leu o aviso no topo da página",
      });
      return;
    }
    if (numberOfSelectedSpeeches + numberOfSelectWorkshops < 1) {
      toast({
        description:
          "Você não está selecionando nenhum dos eventos antes de salvar o kit. Selecione pelo menos um evento antes de continuar.",
      });
      return;
    }
    const model = kitModelId + 1;
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Token: user.token,
    };
    const formData = new URLSearchParams();
    selectEvents?.forEach((elem) => {
      formData.append("events", elem.toString());
    });
    try {
      if (user.kit?.id) {
        formData.append("model", model!.toString());
        await axiosClient.put(
          `api/kits/${user.kit?.id}/`,
          formData.toString(),
          { headers }
        );
      } else {
        formData.append("user", user.id as string);
        formData.append("model", (kitModelId + 1).toString());
        await axiosClient.post(`api/kits/`, formData.toString(), {
          headers,
        });
      }
      sessionUpdate();
    } catch (e) {
      toast({
        title: "Algo deu errado",
        description: "Tente novamente em breve",
      });
    } finally {
      setIsSelectEventOpen(false);
    }
  }

  return (
    <div className="fixed w-full h-screen overflow-y-scroll top-0 left-0 p-4 bg-white text-dark z-10">
      <div className=" overflow-hidden relative pb-20">
        <Container>
          <CloseModalButton />
          <Title className="border-l-2 pl-2 border-cian-700">
            Eventos disponiveis
          </Title>
          <Text className="underline inline-flex bg-dark rounded-md shadow-md text-white px-2 py-1 my-2">
            {kitsValues[kitModelId].model} está selecionado
          </Text>

          <div className="flex flex-wrap gap-4">
            <SelectedKitAdvantages kit={kitsValues[kitModelId]} />

            <div
              ref={concernAlertDiv}
              className="flex focus:bg-red-900 flex-col gap-2 max-w-md rounded-md my-2 p-2 bg-slate-900 text-yellow-200"
            >
              <AdviceKitChange />
            </div>
          </div>

          <FilterDaysEvents />
        </Container>

        <div className="fixed z-20 left-0 bottom-0 w-full">
          <Container className="flex justify-end">
            <FloatButton
              onClick={updateEvents}
              className="border border-slate-400"
              shadowClassname="w-full lg:w-auto"
            >
              Atualizar Eventos
            </FloatButton>
          </Container>
        </div>

        <Container className="w-full">
          <div className=" flex-wrap gap-y-3 lg:gap-4 flex text-white relative justify-around">
            {events?.map((event: any) => {
              const eventDates = Object.values(event.date).map((date) => {
                //@ts-ignore
                return [date?.start, date?.end];
              });
              const daysOfWeekEvent = eventDates.map((elem) => {
                return momento(elem[0]).format("dddd");
              });

              const handleClick = () => {
                if (["workshop", "minicurso"].includes(event.category)) {
                  if (selectEvents.includes(event.id)) {
                    setNumberOfSelectWorkshops((value) => value - 1);
                  } else {
                    setNumberOfSelectWorkshops((value) => value + 1);
                  }
                }
                if (
                  "palestra" == event.category &&
                  !kitsValues[kitModelId].all_speeches &&
                  event.title.split("$")[1] != "patrocinador"
                ) {
                  if (selectEvents.includes(event.id)) {
                    setNumberOfSelectedSpeeches((value) => value - 1);
                  } else {
                    setNumberOfSelectedSpeeches((value) => value + 1);
                  }
                }
                toogleElements(event.id, eventDates);
              };

              return (
                <EventCard.Body
                  defaultChecked={selectEvents.includes(event.id)}
                  disable={isEventDisable(
                    event,
                    eventDates,
                    selectEvents,
                    eventsTimePicked,
                    kitsValues[kitModelId],
                    numberOfSelectedSpeeches,
                    numberOfSelectWorkshops
                  )}
                  key={"eventoid" + event.id}
                  id={"eventoid" + event.id}
                  onClick={handleClick}
                  capacity={
                    event.max_number_of_inscriptions -
                    event.number_of_inscriptions
                  }
                  className={`lg:py-12 duration-200 relative justify-between flex flex-col ${
                    daysOfWeekEvent.includes(dayOfWeek) ||
                    dayOfWeek == "allDays"
                      ? ""
                      : "hidden"
                  }
                  } `}
                >
                  <div>
                    <EventCard.Title title={event.title.split("$")[0]} />
                    <EventCard.Hoster hoster={event.host} />

                    <EventCard.Location
                      location={event.place[0].location}
                      url_location={event.place[0].url_location}
                    />
                    <div className="animate-pulse bg-dark">
                      <SvgCardLine color="#ffffff" opacity="1" />
                    </div>

                    <EventCard.Description
                      className="line-clamp-2 text-ellipsis  hover:line-clamp-none"
                      description={event.description}
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                      <EventCard.Category category={event.category} />
                      <div>
                        {Object.values(event.date).map((date) => {
                          return (
                            <EventCard.Date
                              //@ts-ignore
                              key={date?.start + date?.end}
                              //@ts-ignore
                              dateStart={date?.start}
                              //@ts-ignore
                              dateEnd={date?.end}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <p className="w-full text-right">
                      {event.title.split("$")[1] == "patrocinador" &&
                        "Patrocinado"}
                    </p>
                    <EventCard.Capacity
                      capacity={
                        event.max_number_of_inscriptions -
                        event.number_of_inscriptions
                      }
                    />
                  </div>
                </EventCard.Body>
              );
            })}
            {isLoading && (
              <SkeletonCreator
                quantity={6}
                className="w-full max-w-md h-72 rounded-xl bg-dark"
              />
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
