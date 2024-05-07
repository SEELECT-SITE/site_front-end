"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { User } from "next-auth";
import axios from "axios";
import EventCard from "@/components/SECTIONS/Cronograma/EventsCard";
import removeElem from "@/utils/removeElem";
import FloatButton from "@/components/FloatButton";
import Text from "@/components/Text";
import useSelectEventsState from "./selectEventsStore";
import Title from "@/components/Title";
import Container from "@/components/Container";
import { SvgCardLine } from "@/components/PriceCard";
import { DJANGO_URL } from "@/utils/consts";
import useUserboardState from "../userboardStore/PayKitModalStore";
import momento from "@/utils/formatDate";
import SkeletonCreator from "@/components/SkeletonCreator";
import Alert from "@/components/Alert";
import { scrollToElement } from "@/utils/scrollToElement";
import isEventDisable from "./isEventDisable";
import AdviceKitChange from "./adviceKitChange";
import FilterDaysEvents from "./filterDaysEvents";
import SelectedKitAdvantages from "./selectedKitAdvantages";
import CloseModalButton from "./closeModalButton";

interface SelectEventsModalProps {
  className?: string;
  children?: ReactNode;
  user: User;
  sessionUpdate: Function;
}

export default function SelectEventsModal({
  user,
  sessionUpdate,
}: SelectEventsModalProps) {
  const { setIsSelectEventOpen, selectedKit, adviceReaded, dayOfWeek } =
    useSelectEventsState();
  const [selectEvents, setSelectEvents] = useState<number[]>(
    user.kit?.events.map((elem: any) => {
      return elem.id;
    }) || []
  );

  const concernAlertDiv = useRef<HTMLDivElement | null>(null);
  const [eventsTimePicked, setEventsTimePicked] = useState<any[]>([]);
  const [adviceReadedMsg, setAdviceReadedMsg] = useState<string>("");
  const { kitsValues } = useUserboardState();
  const [numberOfSelectWorkshops, setNumberOfSelectWorkshops] =
    useState<number>(0);
  const [numberOfSelectedSpeeches, setNumberOfSelectedSpeeches] =
    useState<number>(0);
  const { data: events, isLoading } = useQuery<any | undefined>(
    "userEvents",
    async () => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "ngrok-skip-browser-warning": "true",
      };
      try {
        const { data } = await axios.get(`${DJANGO_URL}api/events/`, {
          headers,
        });
        var aux = data.results;

        aux.sort(
          (a: any, b: any) =>
            //@ts-ignore
            new Date(a.date["0"].start) - new Date(b.date["0"].start)
        );
        return aux;
      } catch (error) {
        console.log(error);
      }
    },
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    setNumberOfSelectWorkshops(0);
  }, []);

  function toogleElements(id: number, dates: any[]) {
    if (selectEvents.includes(id)) {
      var newVector: any[] = eventsTimePicked;
      dates.forEach((date) => {
        newVector = newVector.filter((currentDate) => {
          return currentDate[0] != date[0] || currentDate[1] != date[1];
        });
      });
      setEventsTimePicked(newVector);
      setSelectEvents(removeElem(selectEvents, id));
    } else {
      var newVector: any[] = eventsTimePicked;

      dates.forEach((date) => {
        newVector.push(date);
      });
      setEventsTimePicked(newVector);
      selectEvents.push(id);
      setSelectEvents(removeElem(selectEvents, 0));
    }
  }

  const kitModelId = selectedKit ? selectedKit - 1 : user.kit!.model - 1;

  async function updateEvents() {
    if (!adviceReaded) {
      scrollToElement(concernAlertDiv);
      setAdviceReadedMsg(
        "Marque a opção no topo da pagina, confirmando que entendeu o aviso."
      );
      setTimeout(() => {
        setAdviceReadedMsg("");
      }, 4000);
      return;
    }
    if (
      numberOfSelectedSpeeches + numberOfSelectWorkshops < 1 &&
      adviceReadedMsg !=
        "Você não está selecionando nenhum dos eventos pagos antes de salvar o kit. Se deseja continuar clique novamente em Atualizar Eventos"
    ) {
      setAdviceReadedMsg(
        "Você não está selecionando nenhum dos eventos pagos antes de salvar o kit. Se deseja continuar clique novamente em Atualizar Eventos"
      );
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
        await axios.put(
          `${DJANGO_URL}api/kits/${user.kit?.id}/`,
          formData.toString(),
          { headers }
        );
      } else {
        formData.append("user", user.id as string);
        formData.append("model", (kitModelId + 1).toString());
        await axios.post(`${DJANGO_URL}api/kits/`, formData.toString(), {
          headers,
        });
      }
      sessionUpdate();
    } catch (e) {
    } finally {
      setIsSelectEventOpen(false);
    }
  }

  return (
    <div className="fixed w-full h-screen overflow-y-scroll  top-0 left-0 p-4 bg-white text-dark z-10">
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
          {adviceReadedMsg !== "" && (
            <Alert
              timeout={6000}
              className="border-green-400 bottom-8 max-w-full bg-slate-950 text-red-300"
            >
              {adviceReadedMsg}
            </Alert>
          )}
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
                    <div className="flex flex-wrap justify-between mb-2 items-start gap-2">
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
