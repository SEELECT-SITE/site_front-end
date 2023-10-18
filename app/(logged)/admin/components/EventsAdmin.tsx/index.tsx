"use client";
import { ReactNode, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { User } from "next-auth";
import axios from "axios";
import EventCard from "@/components/SECTIONS/Cronograma/EventsCard";
import removeElem from "@/utils/removeElem";
import Title from "@/components/Title";
import Container from "@/components/Container";
import { SvgCardLine } from "@/components/PriceCard";
import { DJANGO_URL } from "@/utils/consts";
import useDeleteModalState from "./DeleteModal/deleteModalStore";
import DeleteModal from "./DeleteModal";
import FloatButton from "@/components/FloatButton";
import { MdClose } from "react-icons/md";
import { HiPencilAlt } from "react-icons/hi";

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
  const [isEventsOpen, setIsEventsOpen] = useState<boolean>(false);

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

  return (
    <>
      <Container className="flex gap-4 items-center">
        <Title>Eventos</Title>
        <FloatButton
          className="flex duration-100 p-1"
          shadowClassname="my-0"
          onClick={(e) => {
            setIsEventsOpen(!isEventsOpen);
          }}
        >
          {isEventsOpen ? (
            <>
              Fechar <MdClose />
            </>
          ) : (
            <>
              Ver eventos <HiPencilAlt size={18} />
            </>
          )}
        </FloatButton>
      </Container>

      {isDeleteModalOpen && (
        <DeleteModal triggerFn={refetch} token={user.token} />
      )}
      {isEventsOpen && (
        <div className="w-full relative pb-20 ">
          <Container className="flex flex-wrap gap-4 lg:gap-6">
            {events?.map((event: any, index: number) => {
              return (
                <EventCard.Body
                  key={event.title + index}
                  id={event.title + index}
                  className="lg:py-12 relative justify-between flex flex-col text-white border gap-2"
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
                            dateStart={date?.start}
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
                </EventCard.Body>
              );
            })}
          </Container>
        </div>
      )}
    </>
  );
}
