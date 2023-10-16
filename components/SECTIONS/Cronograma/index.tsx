"use client";
import React from "react";
import CronoSlider from "@/components/SECTIONS/Cronograma/CronoSlider";
import Title from "@/components/Title";
import FloatButton from "@/components/FloatButton";
import Decoration from "./DecorationStripes/decoration";
import { useQuery } from "react-query";
import axios from "axios";
import EventCard from "./EventsCard";
import { SvgCardLine } from "@/components/PriceCard";
import { useRouter } from "next/navigation";
import { DJANGO_URL } from "@/utils/consts";
import SkeletonCreator from "@/components/SkeletonCreator";

function Cronograma() {
  const { data: events, isLoading } = useQuery<any | undefined>(
    "Places",
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
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );
  const router = useRouter();

  return (
    <section className="w-full pt-12 lg:pt-24 bg-white">
      <Title className={`font-bold text-center text-dark-cian mb-10`}>
        CRONOGRAMA GERAL
      </Title>

      <CronoSlider />
      <div className="m-auto max-w-6xl">
        <div className="flex w-full gap-4 lg:px-0 py-12 lg:gap-8 flex-wrap items-strecht justify-center m-auto">
          {events?.map((event: any, index: number) => {
            return (
              <EventCard.Body
                key={event.title + index}
                id={event.title + index}
                className="lg:py-12 relative justify-between flex flex-col"
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

                  <EventCard.Description
                    description={
                      "Lorem ipsum dolor sit amet. Ut vero quidem et unde corrupti aut quaerat voluptatem? 33 numquam provident ab aperiam fuga ea dolores sunt rem blanditiis libero est alias architecto ex consequatur sunt"
                    }
                  />
                </div>

                <div>
                  <div className="flex flex-wrap justify-between mb-2 items-start">
                    <EventCard.Category category={event.category} />
                    <EventCard.Date date={Date.now()} />
                  </div>
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

        <div className="flex gap-2 py-0 rounded-lg">
          <Decoration />
          <FloatButton
            className="bg-cian-700 text-xl text-dark lg:py-6 whitespace-nowrap"
            shadowClassname="bg-black w-2/3 lg:w-1/3"
            onClick={(e) => {
              router.push("/cadastro");
            }}
          >
            INSCREVA-SE
          </FloatButton>
        </div>
      </div>
    </section>
  );
}

export default Cronograma;
