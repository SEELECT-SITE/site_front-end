import React from "react";
import CronoSlider from "@/components/SECTIONS/Cronograma/CronoSlider";
import Title from "@/components/Title";
import Container from "@/components/Container";
import FloatButton from "@/components/FloatButton";
import EventCards from "./EventsCard";
import Decoration from "./DecorationStripes/decoration";

function Cronograma() {
  return (
    <section className="w-full pt-12 lg:pt-24 bg-white">
      <Title className={`text-xl font-bold text-center text-dark-cian mb-10`}>
        CRONOGRAMA GERAL
      </Title>

      <CronoSlider />
      <div className="m-auto max-w-6xl">
        <div className="flex w-full gap-4 lg:px-0 py-12 lg:gap-8 flex-wrap items-center m-auto">
          <EventCards />
          <EventCards />
          <EventCards />
          <EventCards />
        </div>

        <div className="flex gap-2 py-0 rounded-lg">
          <Decoration />
          <FloatButton
            className="bg-cian-700 text-xl text-dark lg:py-6 "
            shadowClassname="bg-black lg:w-1/3 lg:float-right w-72"
          >
            INSCREVA-SE
          </FloatButton>
        </div>
      </div>
    </section>
  );
}

export default Cronograma;
