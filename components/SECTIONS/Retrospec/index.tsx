import React from "react";
import Slider from "@/components/SECTIONS/Retrospec/Slider";
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

      <Slider />
    </section>
  );
}

export default Retrospec;
