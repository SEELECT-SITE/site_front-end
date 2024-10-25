"use client";
import { ReactNode, useState } from "react";
import { useQuery } from "react-query";
import { User } from "next-auth";
import EventCard from "@/components/SECTIONS/Cronograma/EventsCard";
import Title from "@/components/Title";
import Container from "@/components/Container";
import { SvgCardLine } from "@/components/PriceCard";
import useDeleteModalState from "./DeleteEventsModal/deleteEventsModalStore";
import DeleteModal from "./DeleteEventsModal";
import RadioGroup from "@/components/RadioGroup";
import { axiosClient } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { EventProps } from "@/pages/api/auth/nextauth";
import momento from "@/utils/formatDate";

interface EventsAdminProps {
  className?: string;
  children?: ReactNode;
  user: User;
}

const showEventsDate = process.env.NEXT_PUBLIC_OPEN_INSCRIPTIONS_DATE;

export default function EventsAdmin({ user }: EventsAdminProps) {
  if (!showEventsDate) return <></>;

  const [categoryEvent, setCategoryEvent] = useState<string>("todos");
  const {
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    setEventDeleteID,
    setEventTitle,
  } = useDeleteModalState();
  const { data: events, refetch } = useQuery<any | undefined>(
    "adminEvents",
    async () => {
      try {
        const { data } = await axiosClient.get<{ results: EventProps[] }>(
          `api/events/`
        );
        var events = data.results;
        events = events.filter((elem) => {
          //@ts-ignore
          if (momento(showEventsDate).isBefore(elem.date["0"].start))
            return elem;
        });
        return events;
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar eventos",
          description: "Tente novamente mais tarde",
        });
      }
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <Container>
      <Title>Eventos</Title>

      {isDeleteModalOpen && (
        <DeleteModal triggerFn={refetch} token={user.token} />
      )}

      <div className="flex w-full justify-center">
        <RadioGroup
          className=" m-auto"
          onChange={(e) => {
            setCategoryEvent(e.target.value);
          }}
          label="Dias"
          options={[
            { title: "Workshop", value: "workshop" },
            { title: "Mini-curso", value: "minicurso" },
            { title: "Palestra", value: "palestra" },
            { title: "Todos", value: "todos", defaultChecked: true },
          ]}
          groupName={"categoryEvents"}
        />
      </div>
      <div className="flex flex-wrap justify-around py-12 gap-8">
        {events?.map((event: any, index: number) => {
          if (event.category !== categoryEvent && categoryEvent !== "todos") {
            return null;
          }
          return (
            <EventCard.Body
              key={event.title}
              id={event.title}
              className={`lg:py-12 relative justify-between flex-col text-white border gap-2`}
            >
              <EventCard.Delete
                onClick={(e) => {
                  setIsDeleteModalOpen(true);
                  setEventDeleteID(event.id);
                  setEventTitle(event.title);
                }}
              />
              <div>
                <EventCard.Title title={event.title} />
                <EventCard.Hoster hoster={event.host} />

                <EventCard.Location
                  location={event.place[0].location}
                  url_location={event.place[0].url_location}
                />
                <div className="animate-pulse bg-dark">
                  <SvgCardLine color="#ffffff" opacity="1" />
                </div>
              </div>

              <div className="flex flex-wrap justify-between mb-2 items-start">
                <EventCard.Category category={event.category} />
                <div>
                  {Object.values(event.date).map((date) => {
                    return (
                      <EventCard.Date
                        //@ts-ignore
                        key={date + Math.random()}
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
                admin={true}
                limit={event.max_number_of_inscriptions}
                capacity={event.number_of_inscriptions}
              />
            </EventCard.Body>
          );
        })}
      </div>
      <Toaster />
    </Container>
  );
}
