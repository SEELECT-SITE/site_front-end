"use client";
import React, { useState } from "react";
import Title from "@/components/Title";
import FloatButton from "@/components/FloatButton";
import Decoration from "./DecorationStripes/decoration";
import { useQuery } from "react-query";
import axios from "axios";
import EventCard from "./EventsCard";
import { SvgCardLine } from "@/components/PriceCard";
import { useRouter } from "next/navigation";
import SkeletonCreator from "@/components/SkeletonCreator";
import momento from "@/utils/formatDate";
import RadioGroup from "@/components/RadioGroup";
import { axiosClient } from "@/lib/utils";
import { EventProps } from "@/pages/api/auth/nextauth";

const showEventsDate = process.env.NEXT_PUBLIC_OPEN_INSCRIPTIONS_DATE;

function Cronograma() {
  if (!showEventsDate) return <></>;

  const { data: events, isLoading } = useQuery<any | undefined>(
    "Places",
    async () => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "ngrok-skip-browser-warning": "true",
      };

      try {
        const { data } = await axiosClient.get<{ results: EventProps[] }>(
          `api/events/`,
          {
            headers,
          }
        );
        var events = data.results;
        events = events.filter((elem) => {
          //@ts-ignore
          if (momento(showEventsDate).isBefore(elem.date["0"].start))
            return elem;
        });
        events.sort(
          (a: any, b: any) =>
            //@ts-ignore
            new Date(a.date["0"].start) - new Date(b.date["0"].start)
        );
        return events;
      } catch (error) {
        console.log(error);
      }
    },
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );
  const router = useRouter();
  const [dayOfWeek, setDayOfWeek] = useState<string>("segunda-feira");

  return (
    <section className="w-full py-12 lg:py-24 rounded-md backdrop-blur-sm shadow-md shadow-slate-900 bg-white/10 border border-white/20 ">
      <Title className={`font-bold text-center mb-6`}>CRONOGRAMA GERAL</Title>

      <div className="m-auto max-w-6xl px-2">
        <div className="flex w-full justify-center">
          <RadioGroup
            className=" m-auto"
            onChange={(e) => setDayOfWeek(e.target.value)}
            label="Dias"
            options={[
              {
                title: "Segunda",
                value: "segunda-feira",
                defaultChecked: true,
              },
              { title: "Terça", value: "terça-feira" },
              { title: "Quarta", value: "quarta-feira" },
              { title: "Quinta", value: "quinta-feira" },
              { title: "Sexta", value: "sexta-feira" },
              { title: "Todos os dias", value: "complet" },
            ]}
            groupName={"dias da semana"}
          />
        </div>

        <div className="flex w-full gap-4 lg:px-0 py-12 lg:gap-8 flex-wrap items-strecht justify-center m-auto">
          {events?.map((event: any, index: number) => {
            const eventDates = Object.values(event.date).map((date) => {
              //@ts-ignore
              return [date?.start, date?.end];
            });

            const daysOfWeekEvent = eventDates.map((elem) => {
              return momento(elem[0]).format("dddd");
            });
            return (
              <EventCard.Body
                key={event.title + index}
                id={event.title + index}
                className={`lg:py-12 duration-200 relative justify-between flex flex-col ${
                  daysOfWeekEvent.includes(dayOfWeek)
                    ? ""
                    : dayOfWeek == "complet"
                      ? "flex"
                      : "hidden"
                }
                  } `}
              >
                <div>
                  <EventCard.Title title={event.title.split("$")[0]} />
                  <EventCard.Hoster hoster={event.host} />

                  <EventCard.Location
                    location={event.place[0].location}
                    url_location={event.place[0].url_location}
                  />
                  <div className="animate-pulse">
                    <SvgCardLine color="#ffffff" opacity="1" />
                  </div>
                  <EventCard.Description description={event.description} />

                  <EventCard.Capacity
                    capacity={
                      event.max_number_of_inscriptions -
                      event.number_of_inscriptions
                    }
                  />
                </div>

                <div className="flex flex-wrap justify-between mb-2 items-start">
                  <EventCard.Category category={event.category} />
                  <div>
                    {Object.values(event.date).map((date) => {
                      return (
                        <EventCard.Date
                          //@ts-ignore
                          key={date?.start + date?.end}
                          //@ts-ignore
                          dateStart={date?.start}
                          //@ts-ignore
                          dateEnd={date?.end}
                        />
                      );
                    })}
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

        <div className="flex gap-2 rounded-lg">
          <Decoration notAnimated />
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
