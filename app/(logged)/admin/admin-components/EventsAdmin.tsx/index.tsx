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

interface EventsAdminProps {
  className?: string;
  children?: ReactNode;
  user: User;
}

export default function EventsAdmin({
  className,
  children,
  user,
}: EventsAdminProps) {
  const [categoryEvent, setCategoryEvent] = useState<string>("todos");
  const {
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    setEventDeleteID,
    setEventTitle,
  } = useDeleteModalState();
  const {
    data: events,
    isLoading,
    refetch,
  } = useQuery<any | undefined>(
    "userEvents",
    async () => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "ngrok-skip-browser-warning": "true",
        Token: user?.token,
      };
      try {
        const { data } = await axiosClient.get(`api/events/`, {
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
            { title: "Todos", value: "todos" },
          ]}
          groupName={"categoryEvents"}
        />
      </div>
      <div className="flex flex-wrap justify-around py-12 gap-8">
        {events?.map((event: any, index: number) => {
          return (
            <EventCard.Body
              key={event.title + index}
              id={event.title + index}
              className={`lg:py-12 relative justify-between flex-col text-white border gap-2 ${
                event.category == categoryEvent
                  ? "flex"
                  : categoryEvent == "todos"
                    ? "flex"
                    : "hidden"
              }`}
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
    </Container>
  );
}
