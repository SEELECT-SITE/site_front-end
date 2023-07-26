import React from "react";
import Image from "next/image";
import Title from "@/components/Title";
import TestimonyCard from "./TestimonyCard";
import elipse from "@/public/SVG/elipse-deco.svg";
import square_balls from "@/public/SVG/square-balls.svg";

function Testimony() {
  return (
    <section className="relative z-10">
      <Title className="text-cian-700 text-xl mb-12">DEPOIMENTOS</Title>
      <figure className="m-auto w-2/3 -z-10 absolute top-1/2 right-0 -translate-y-1/2 translate-x-2/3 lg:max-w-md">
        <Image src={elipse} priority={true} alt="decoration" />
      </figure>
      <figure className="m-auto w-1/2 -z-10 absolute bottom-8 -translate-x-1/3 translate-y-1/2 lg:max-w-xs">
        <Image src={square_balls} priority={true} alt="decoration" />
      </figure>
      <div className="w-full flex  justify-center gap-2">
        <TestimonyCard />
      </div>
    </section>
  );
}

export default Testimony;
