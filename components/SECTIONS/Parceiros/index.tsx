import React from "react";
import Image from "next/image";
import alura_logo from "@/public/parceiros/alura-logo.png";
import tecnovetti_logo from "@/public/parceiros/LOGO_TECNOVETTI.png";
import focus_logo from "@/public/parceiros/focus_logo.jpg";
import autocore_logo from "@/public/parceiros/autocore_logo.png";
import arupi_logo from "@/public/parceiros/arupi_logo.png";
import Title from "@/components/Title";
import Link from "next/link";

function Parceiros() {
  return (
    <section className="w-full lg:mb-12">
      <div className="relative">
        <div className="flex items-center gap-2 mb-11">
          <div className=" shadow-slate-800 px-2 rounded-md">
            <Title className="text-cian-700 mb-10">PATROCINADORES</Title>
          </div>
        </div>

        <div className="flex items-center justify-evenly flex-wrap gap-8">
          <Link
            className="text-dark-cian hover:text-dark lg:w-1/6"
            target="_blank"
            href={"https://www.autocorerobotica.com.br/"}
            title="Ir para site"
          >
            <div className="group bg-[#fff] rounded-full p-6 border-2 aspect-square flex items-center border-slate-700  hover:-translate-x-2 hover:-translate-y-2 hover:drop-shadow-icon duration-100 relative">
              <Image
                src={autocore_logo}
                alt="logo auto core"
                width={300}
                className="m-auto scale-110 p-4"
              />
            </div>
          </Link>
          <Link
            className="text-dark-cian hover:text-dark lg:w-1/6"
            target="_blank"
            href={"https://www.alura.com.br/"}
            title="Ir para site da Alura"
          >
            <div className="group rounded-full p-6 border-2 border-slate-700 bg-slate-800 hover:-translate-x-2 hover:-translate-y-2 hover:drop-shadow-icon duration-100 relative">
              <Image
                src={alura_logo}
                alt="icone Alura"
                width={300}
                className="m-auto drop-shadow-icon-sm scale-90 lg:grayscale-1 -translate-y-2 aspect-square object-contain"
              />
            </div>
          </Link>
          {/* <Link
            className="text-dark-cian hover:text-dark lg:w-1/6"
            target="_blank"
            href={"https://tecnovetti.com.br/"}
            title="Ir para site da Tecnovetti"
          >
            <div className="group rounded-full p-6 border-2 border-slate-700 bg-white hover:-translate-x-2 hover:-translate-y-2 hover:drop-shadow-icon duration-100 relative">
              <Image
                src={tecnovetti_logo}
                alt="icone tecnovetti"
                width={300}
                className="m-auto drop-shadow-icon-sm scale-110 lg:grayscale-1 aspect-square object-contain"
              />
            </div>
          </Link> */}
          <Link
            className="text-dark-cian hover:text-dark lg:w-1/6"
            target="_blank"
            href={"https://www.instagram.com/arupisucos?igsh=bXVidDcwYzE4cHU2"}
            title="Instagram da Arupi"
          >
            <div className="group bg-[#fff] rounded-full p-6 border-2 aspect-square flex items-center border-slate-70  hover:-translate-x-2 hover:-translate-y-2 hover:drop-shadow-icon duration-100 relative">
              <Image
                src={arupi_logo}
                alt="icone arupi"
                width={300}
                className="m-auto scale-110 p-4"
              />
            </div>
          </Link>
           <Link
            className="text-dark-cian hover:text-dark lg:w-1/6"
            target="_blank"
            href={"https://focusinformatica.com.br/"}
            title="Site da Focus"
          >
            <div className="group bg-[#fff] rounded-full p-6 border-2 aspect-square flex items-center border-slate-70  hover:-translate-x-2 hover:-translate-y-2 hover:drop-shadow-icon duration-100 relative">
              <Image
                src={focus_logo}
                alt="icone focus"
                width={300}
                className="m-auto scale-110 p-4"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Parceiros;
