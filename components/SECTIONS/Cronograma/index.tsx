import React from "react";
import CronoSlider from "@/components/SECTIONS/Cronograma/CronoSlider";
import Title from "@/components/Title";
import Container from "@/components/Container";
import FloatButton from "@/components/FloatButton";
import EventCards from "./EventsCard";

function Cronograma() {
  return (
    <section className="w-full pt-12 lg:pt-24 bg-white">
      <Title className={`text-xl font-bold text-center text-dark mb-10`}>
        CRONOGRAMA GERAL
      </Title>
      <CronoSlider />
      <Container>
        <div className="m-auto max-w-5xl">
          <div className="xs:px-4 flex w-full lg:px-0 py-12 justify-between lg:gap-4 flex-wrap  items-center m-auto">
            <EventCards />
            <EventCards />
            <EventCards />
            <EventCards />
          </div>
          <div className="w-full  float-right">
            <FloatButton
              className="bg-cian-700 text-xl text-dark lg:py-6"
              shadowClassname="bg-black"
            >
              INSCREVA-SE
            </FloatButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Cronograma;
