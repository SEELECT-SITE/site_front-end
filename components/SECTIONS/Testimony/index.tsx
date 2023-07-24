import React from "react";
import Title from "@/components/Title";
import TestimonyCard from "./TestimonyCard";

function Testimony() {
  return (
    <section className="relative">
      <Title className="text-cian-700 text-xl mb-12">DEPOIMENTOS</Title>

      <div className="w-full flex  justify-center gap-2">
        <TestimonyCard />
      </div>
    </section>
  );
}

export default Testimony;
