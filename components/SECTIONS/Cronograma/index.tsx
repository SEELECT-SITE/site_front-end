"use client";
import React from "react";
import CronoSlider from "@/components/SECTIONS/Cronograma/CronoSlider";
import Title from "@/components/Title";
import FloatButton from "@/components/FloatButton";
import Decoration from "./DecorationStripes/decoration";
import { useQuery } from "react-query";
import axios from "axios";
import EventCard from "./EventsCard";

function Cronograma() {
  const { data: events, isLoading } = useQuery<any | undefined>(
    "Places",
    async () => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Token: "c517c544d6bdbedadfe1cca48221eb2a",
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

  return (
    <section className="w-full pt-12 lg:pt-24 bg-white">
      <Title className={`font-bold text-center text-dark-cian mb-10`}>
        CRONOGRAMA GERAL
      </Title>

      <CronoSlider />
      <div className="m-auto max-w-6xl">
        <div className="flex w-full gap-4 lg:px-0 py-12 lg:gap-8 flex-wrap items-strecht justify-center m-auto">
          {events?.map((event: any) => {
            return (
              <EventCard.Body>
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

        <div className="flex gap-2 py-0 rounded-lg">
          <Decoration />
          <FloatButton
            className="bg-cian-700 text-xl text-dark lg:py-6 whitespace-nowrap"
            shadowClassname="bg-black w-2/3 lg:w-1/3"
          >
            INSCREVA-SE
          </FloatButton>
        </div>
      </div>
    </section>
  );
}

export default Cronograma;
