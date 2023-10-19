"use client";
import { ReactNode, useEffect, useState } from "react";
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
import { MdClose } from "react-icons/md";
import { DJANGO_URL } from "@/utils/consts";
import useUserboardState from "../userboardStore/PayKitModalStore";
import isEventOverlap from "@/utils/isEventOverlap";
import SkeletonCreator from "@/components/SkeletonCreator";

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
  const { setIsSelectEventOpen, selectedKit } = useSelectEventsState();
  const [selectEvents, setSelectEvents] = useState<number[]>([]);
  const [eventTimes, setEventTimes] = useState<any[]>([]);
  const { kitsValues } = useUserboardState();
  const [numberOfSelectWorkshops, setNumberOfSelectWorkshops] =
    useState<number>(0);
  //@ts-ignore

  const kitModelId = user?.kit?.model ? user.kit.model - 1 : selectedKit - 1;
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
    setSelectEvents([]);
    setNumberOfSelectWorkshops(0);
  }, []);

  function toogleElements(id: number, dates: any[]) {
    if (selectEvents.includes(id)) {
      var newVector = eventTimes.filter((date) => {
        return date.toString() !== dates.toString();
      });
      setEventTimes(newVector);
      setSelectEvents(removeElem(selectEvents, id));
    } else if (!isEventOverlap(eventTimes, dates)) {
      eventTimes.push(dates);
      setEventTimes(eventTimes);
      selectEvents.push(id);
      setSelectEvents(selectEvents);
    }
  }

  async function updateEvents() {
    const model = user.kit?.model;
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
          `${DJANGO_URL}api/kits/${user.kit.id}/`,
          formData.toString(),
          { headers }
        );
      } else {
        formData.append("user", user.id as string);
        formData.append("model", kitsValues[kitModelId].id.toString());
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
          <button
            onClick={(e) => setIsSelectEventOpen(false)}
            className="rounded-lg border border-slate-900 p-1 text-red-600 hover:bg-slate-900 hover:text-red-400 shadow-md items-center flex gap-1 float-right"
          >
            Voltar
            <MdClose size={20} />
          </button>
          <Title className="border-l-2 pl-2 border-cian-700">
            Eventos disponiveis
          </Title>
          <Text className="underline inline-flex bg-dark rounded-md shadow-md text-white p-1">
            {kitsValues[kitModelId].model} está selecionado
          </Text>
          <div>
            <Text className="Font-bold">Você tem direito a:</Text>
            <ul>
              {[
                kitsValues[kitModelId].all_speeches
                  ? "Todas as Palestras"
                  : "Palestra patrocinadas + 1 palestra",
                kitsValues[kitModelId].workshops
                  ? `${kitsValues[kitModelId].workshops} Minicursos/Workshop`
                  : "",
                kitsValues[kitModelId].bucks_coup
                  ? "Um copo Buck's Exclusivo"
                  : "",
              ].map((elem) => {
                return <li className="flex">{elem}</li>;
              })}
            </ul>
          </div>
        </Container>
        <div className="fixed z-20 left-0 bottom-0 w-full">
          <Container className="flex justify-end">
            <FloatButton
              disabled={
                numberOfSelectWorkshops != kitsValues[kitModelId].workshops
              }
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
            {events?.map((event: any, index: number) => {
              console.log(event.title.split("$")[1]);
              const eventDates = Object.values(event.date).map((date) => {
                //@ts-ignore

                return [date?.start, date?.end];
              });

              function isDisable() {
                if (!selectEvents.includes(event.id)) {
                  if (isEventOverlap(eventTimes, eventDates)) {
                    return true;
                  }
                  if (event.title.split("$")[1] == "patrocinado") {
                    return false;
                  }
                  if (
                    numberOfSelectWorkshops >=
                      kitsValues[kitModelId].workshops &&
                    ["workshop", "minicurso"].includes(event.category)
                  ) {
                    return true;
                  }
                  return false;
                }
              }

              return (
                <EventCard.Body
                  disable={isDisable()}
                  key={"eventoid" + event.id + index}
                  id={"eventoid" + event.id + index}
                  onClick={() => {
                    if (["workshop", "minicurso"].includes(event.category)) {
                      if (selectEvents.includes(event.id)) {
                        setNumberOfSelectWorkshops((value) => value - 1);
                      } else {
                        setNumberOfSelectWorkshops((value) => value + 1);
                      }
                    }
                    toogleElements(event.id, eventDates);
                  }}
                  capacity={
                    event.max_number_of_inscriptions -
                    event.number_of_inscriptions
                  }
                  className="lg:py-12 relative justify-between flex flex-col"
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
          </div>
        </Container>
      </div>
    </div>
  );
}
