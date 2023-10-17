"use client";
import { twMerge } from "tailwind-merge";
import { ReactNode, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Session, User } from "next-auth";
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

interface SelectEventsModalProps {
  className?: string;
  children?: ReactNode;
  user: User;
  sessionUpdate: Function;
}

export default function SelectEventsModal({
  className,
  children,
  user,
  sessionUpdate,
}: SelectEventsModalProps) {
  const { setIsSelectEventOpen, selectedKit } = useSelectEventsState();
  const [selectEvents, setSelectEvents] = useState<number[]>([]);
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
        return data.results;
      } catch (error) {
        console.log(error);
      }
    },
    { refetchOnWindowFocus: false }
  );

  function toogleElements(id: number) {
    if (selectEvents.includes(id)) {
      setSelectEvents(removeElem(selectEvents, id));
    } else {
      selectEvents.push(id);
      setSelectEvents(selectEvents);
    }
  }

  async function updateEvents() {
    const model = user.kit?.model;
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Token: user?.token,
    };
    const formData = new URLSearchParams();
    selectEvents?.forEach((elem) => {
      formData.append("events", elem.toString());
    });
    try {
      if (user.kit?.id) {
        formData.append("model", model as string);
        await axios.put(
          `${DJANGO_URL}api/kits/${user.kit.id}/`,
          formData.toString(),
          { headers }
        );
      } else {
        formData.append("user", user.id as string);
        formData.append("model", selectedKit as string);
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
    <div className="fixed w-full min-h-full overflow-y-scroll top-0 left-0 p-4 bg-white text-dark z-10">
      <div className="w-full relative pb-20">
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
          <div>{selectedKit} está selecionado</div>
          <div>10 palestras</div>
          <div>10 workshops</div>
          <div>10 mini-cursos</div>
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
            {events?.map((event: any, index: number) => {
              return (
                <EventCard.Body
                  key={event.title + index}
                  id={event.title + index}
                  onClick={() => {
                    toogleElements(event.id);
                  }}
                  className="lg:py-12 relative justify-between flex flex-col"
                >
                  <div>
                    <EventCard.Title title={event.title} />
                    <EventCard.Hoster hoster={event.hoster || "putz"} />

                    <EventCard.Location
                      location={event.place[0].location}
                      url_location={event.place[0].url_location}
                    />
                    <div className="animate-pulse bg-dark">
                      <SvgCardLine color="#ffffff" opacity="1" />
                    </div>

                    <EventCard.Description
                      description={
                        "Lorem ipsum dolor sit amet. Ut vero quidem et unde corrupti aut quaerat voluptatem? 33 numquam provident ab aperiam fuga ea dolores sunt rem blanditiis libero est alias architecto ex consequatur sunt"
                      }
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap justify-between mb-2 items-start gap-2">
                      <EventCard.Category category={event.category} />
                      <EventCard.Date
                        dateStart={event.date_start}
                        dateEnd={event.date_end}
                      />
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
