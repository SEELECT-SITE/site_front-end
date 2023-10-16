import React from "react";
import Image from "next/image";
import gaudium_logo from "@/public/parceiros/gaudium_logo.png";
import Title from "@/components/Title";
import balls_deco from "@/public/SVG/square-balls.svg";
import Link from "next/link";

function Parceiros() {
  return (
    <section className="w-full">
      <div className="relative">
        <div className="flex items-center gap-2  mb-11">
          <Title className={`text-3xl text-black`}>Patrocinadores</Title>
          <div className="grow bg-cian-400 h-2 rounded-sm"></div>
        </div>
        <div className="absolute bottom-0 right-0 translate-x-1/3">
          <Image src={balls_deco} alt="decoration" className="" />
        </div>

        <div className="flex items-center justify-center">
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
                className="m-auto drop-shadow-icon-sm object-fill lg:grayscale-1 -translate-y-4"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Parceiros;
