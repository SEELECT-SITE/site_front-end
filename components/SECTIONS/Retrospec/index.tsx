import React from "react";
import RetrospecSlider from "@/components/SECTIONS/Retrospec/RetrospecSlider";
import Title from "@/components/Title";
import Container from "@/components/Container";

function Retrospec() {
  return (
    <section className="bg-[#000f22] z-10 pt-4 sm:pt-10">
      <Container className="bg-[#000f22]">
        <Title className="text-[#5b86b6] mb-10">RETROSPECTIVA SEELECT</Title>
      </Container>

      <RetrospecSlider />
    </section>
  );
}

export default Retrospec;
