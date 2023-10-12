"use client";
import React from "react";
import CronoSlider from "@/components/SECTIONS/Cronograma/CronoSlider";
import Title from "@/components/Title";
import Container from "@/components/Container";
import FloatButton from "@/components/FloatButton";
import EventCards from "./EventsCard";
import Decoration from "./DecorationStripes/decoration";
import { useQuery } from "react-query";
import axios from "axios";

function Cronograma() {
  const { data: events, isLoading } = useQuery<any | undefined>(
    "Places",
    async () => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Token: "5f70ec9f8ffa4f472911535674ec333e",
      };

      try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/events/`, {
          headers,
        });
        return data.results;
      } catch (error) {
        console.log(error);
      }
    }
  );

  return (
    <section className="w-full pt-12 lg:pt-24 bg-white">
      <Title className={`font-bold text-center text-dark-cian mb-10`}>
        CRONOGRAMA GERAL
      </Title>

      <CronoSlider />
      <div className="m-auto max-w-6xl">
        <div className="flex w-full gap-4 lg:px-0 py-12 lg:gap-8 flex-wrap items-center m-auto">
          {events?.map((event) => {
            return (
              <EventCards
                key={event.id}
                title={event.title}
                category={event.category}
                number_of_inscriptions={event.number_of_inscriptions}
                max_number_of_inscriptions={event.max_number_of_inscriptions}
                location={event.place[0].location || ""}
                url_location={event.place[0].url_location || ""}
              />
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
