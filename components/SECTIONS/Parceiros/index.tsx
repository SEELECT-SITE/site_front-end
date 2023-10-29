import React from "react";
import Image from "next/image";
import gaudium_logo from "@/public/parceiros/gaudium_logo.png";
import tecnovetti_logo from "@/public/parceiros/LOGO_TECNOVETTI.png";
import Title from "@/components/Title";
import Link from "next/link";

function Parceiros() {
  return (
    <section className="w-full">
      <div className="relative">
        <div className="flex items-center gap-2 mb-11">
          <div className="bg-white/20 backdrop-blur-sm shadow-sm shadow-slate-800 border border-white/20 px-2 rounded-md">
            <Title className={`text-3xl text-white drop-shadow-icon-sm `}>
              Patrocinadores
            </Title>
          </div>

          <div className="grow bg-white h-2 rounded-sm"></div>
        </div>

        <div className="flex items-center justify-evenly flex-wrap gap-8">
          <Link
            className="text-dark-cian hover:text-dark"
            target="_blank"
            href={"https://www.linkedin.com/company/gaudiumglobal/"}
            title="Ir para linkedIn"
          >
            <div className="group rounded-full p-6 border-2 border-slate-700 bg-white hover:-translate-x-2 hover:-translate-y-2 hover:drop-shadow-icon duration-100 relative">
              <Image
                src={gaudium_logo}
                alt="icone seelect"
                width={300}
                className="m-auto drop-shadow-icon-sm scale-90 lg:grayscale-1 -translate-y-4 aspect-square"
              />
            </div>
          </Link>
          <Link
            className="text-dark-cian hover:text-dark"
            target="_blank"
            href={"https://www.linkedin.com/company/tecnovettifortaleza/"}
            title="Ir para linkedIn"
          >
            <div className="group rounded-full p-6 border-2 aspect-square flex items-center border-slate-700 bg-white hover:-translate-x-2 hover:-translate-y-2 hover:drop-shadow-icon duration-100 relative">
              <Image
                src={tecnovetti_logo}
                alt="logo tecnovetti"
                width={300}
                className="m-auto drop-shadow-icon-sm scale-110 p-4"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Parceiros;
