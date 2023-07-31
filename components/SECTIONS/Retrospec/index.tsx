import React from "react";
import RetrospecSlider from "@/components/SECTIONS/Retrospec/RetrospecSlider";
import Title from "@/components/Title";
import Container from "@/components/Container";

function Retrospec() {
  return (
    <section className="bg-dark z-10 pt-4 sm:pt-10">
      <Container className="bg-dark">
        <Title className="text-cian-700 text-xl mb-10">
          RETROSPECTIVA SEELECT
        </Title>
      </Container>

      <RetrospecSlider />
    </section>
  );
}

export default Retrospec;
