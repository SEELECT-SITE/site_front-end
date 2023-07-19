import React from "react";
import Image from "next/image";
import Seelect_icon from "@/public/icone-seelect-white.webp";
import Title from "@/components/Title";

function Parceiros() {
  return (
    <section className="w-full my-11">
      <div>
        <Title className={`text-3xl mb-11 text-black`}>Parceiros</Title>

        <div className="flex items-center justify-between">
          <Image
            src={Seelect_icon}
            alt="icone seelect"
            width={52}
            className="invert hover:drop-shadow-icon-sm hover:-translate-x-1 hover:-translate-y-1 duration-150"
          />
          <Image
            src={Seelect_icon}
            alt="icone seelect"
            width={52}
            className="invert hover:drop-shadow-icon-sm hover:-translate-x-1 hover:-translate-y-1 duration-150"
          />
          <Image
            src={Seelect_icon}
            alt="icone seelect"
            width={52}
            className="invert hover:drop-shadow-icon-sm hover:-translate-x-1 hover:-translate-y-1 duration-150"
          />
          <Image
            src={Seelect_icon}
            alt="icone seelect"
            width={52}
            className="invert hover:drop-shadow-icon-sm hover:-translate-x-1 hover:-translate-y-1 duration-150"
          />
        </div>
      </div>
    </section>
  );
}

export default Parceiros;
