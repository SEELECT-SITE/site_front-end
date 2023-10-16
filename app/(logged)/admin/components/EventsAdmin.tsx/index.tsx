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
import Title from "@/components/Title";
import Container from "@/components/Container";
import { SvgCardLine } from "@/components/PriceCard";
import { MdClose } from "react-icons/md";
import { DJANGO_URL } from "@/utils/consts";
import { IUser } from "@/pages/api/auth/nextauth";

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
  const [selectEvents, setSelectEvents] = useState<number[]>([]);
  const { data: events, isLoading } = useQuery<any | undefined>(
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
    } catch (e) {
    } finally {
    }
  }

  return (
    <div className="w-full relative pb-20 ">
      <Title>Eventos</Title>
      <Container className="flex flex-wrap gap-4 lg:gap-6">
        {" "}
        {events?.map((event: any, index: number) => {
          return (
            <EventCard.Body
              key={event.title + index}
              id={event.title + index}
              className="lg:py-12 relative justify-between flex flex-col text-white border gap-2"
            >
              <div>
                <EventCard.Title title={event.title} />
                <EventCard.Hoster hoster={"João Paulo II"} />

                <EventCard.Location
                  location={event.place[0].location}
                  url_location={event.place[0].url_location}
                />
                <div className="animate-pulse bg-dark">
                  <SvgCardLine color="#ffffff" opacity="1" />
                </div>
              </div>

              <div>
                <div className="flex flex-wrap justify-between mb-2 items-start">
                  <EventCard.Category category={event.category} />
                  <EventCard.Date date={Date.now()} />
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
      </Container>
    </div>
  );
}
