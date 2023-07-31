import React from "react";
import RetrospecSlider from "@/components/SECTIONS/Retrospec/RetrospecSlider";
import Title from "@/components/Title";
import Container from "@/components/Container";

function Retrospec() {
  return (
    <section className="bg-dark">
      <Container className="bg-dark">
        <Title className="text-cian-700 text-xl mb-12">
          RETROSPECTIVA SEELECT 2022
        </Title>
      </Container>

      <RetrospecSlider />
    </section>
  );
}

export default Retrospec;
