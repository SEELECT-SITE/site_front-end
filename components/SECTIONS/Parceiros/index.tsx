import React from "react";
import Image from "next/image";
import Seelect_icon from "@/public/icone-seelect-white.webp";

function Parceiros() {
  return (
    <section className="w-full my-11">
      <div>
        <h2 className={`text-3xl mb-11 `}>Parceiros</h2>

        <div className="flex items-center justify-between">
          <Image
            src={Seelect_icon}
            alt="icone seelect"
            width={52}
            className="hover:drop-shadow-icon-sm hover:-translate-x-1 hover:-translate-y-1 duration-150"
          />
          <Image
            src={Seelect_icon}
            alt="icone seelect"
            width={52}
            className="hover:drop-shadow-icon-sm hover:-translate-x-1 hover:-translate-y-1 duration-150"
          />
          <Image
            src={Seelect_icon}
            alt="icone seelect"
            width={52}
            className="hover:drop-shadow-icon-sm hover:-translate-x-1 hover:-translate-y-1 duration-150"
          />
          <Image
            src={Seelect_icon}
            alt="icone seelect"
            width={52}
            className="hover:drop-shadow-icon-sm hover:-translate-x-1 hover:-translate-y-1 duration-150"
          />
        </div>
      </div>
    </section>
  );
}

export default Parceiros;
