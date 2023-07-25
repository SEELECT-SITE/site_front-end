import React from "react";
import Image from "next/image";
import Seelect_icon from "@/public/icone-seelect-white.webp";
import Title from "@/components/Title";

function Parceiros() {
  return (
    <section className="w-full">
      <div>
        <Title className={`text-3xl mb-11 text-black`}>PARCEIROS</Title>

        <div className="flex items-center justify-between">
          <div className="grow shrink">
            <Image
              src={Seelect_icon}
              alt="icone seelect"
              width={52}
              className="invert m-auto"
            />
          </div>

          <div className="grow shrink">
            {" "}
            <Image
              src={Seelect_icon}
              alt="icone seelect"
              width={52}
              className="invert m-auto"
            />
          </div>

          <div className="grow shrink">
            {" "}
            <Image
              src={Seelect_icon}
              alt="icone seelect"
              width={52}
              className="invert m-auto"
            />
          </div>

          <div className="grow shrink">
            <Image
              src={Seelect_icon}
              alt="icone seelect"
              width={52}
              className="invert m-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Parceiros;
