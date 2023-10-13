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
    "Places",
    async () => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Token: user?.token,
      };

      try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/events/`, {
          headers,
        });
        return data.results;
      } catch (error) {
        console.log(error);
      }
    },
    { refetchOnMount: false, refetchOnWindowFocus: false }
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
          `http://127.0.0.1:8000/api/kits/${user.kit.id}/`,
          formData.toString(),
          { headers }
        );
      } else {
        formData.append("user", user.id as string);
        formData.append("model", selectedKit as string);
        await axios.post(
          `http://127.0.0.1:8000/api/kits/`,
          formData.toString(),
          { headers }
        );
      }

      sessionUpdate();
    } catch (e) {
    } finally {
      setIsSelectEventOpen(false);
    }
  }

  return (
    <div className="fixed w-full h-full top-0 left-0 p-4 bg-white text-dark z-10">
      <div className="flex justify-between w-full">
        <Text>Eventos disponiveis</Text>
        <FloatButton onClick={updateEvents}>Atualizar</FloatButton>
      </div>

      <div className=" flex-wrap gap-2 flex text-white relative">
        {events?.map((event: any, index: number) => {
          return (
            <EventCard.Body
              key={event.title + index}
              id={event.title + index}
              onClick={() => {
                toogleElements(event.id);
              }}
            >
              <EventCard.Title title={event.title} />
              <div className="flex">
                <EventCard.Location
                  location={event.place[0].location}
                  url_location={event.place[0].url_location}
                />
                <EventCard.Date date={Date()} />
              </div>
            </EventCard.Body>
          );
        })}
      </div>
    </div>
  );
}
