import React from "react";
import Image from "next/image";
import alura_logo from "@/public/parceiros/alura-logo.png";
import go_ener_logo from "@/public/parceiros/go_ener_logo.png";
import autocore_logo from "@/public/parceiros/autocore_logo.png";
import cardapio_web_logo from "@/public/parceiros/cardapio-web_logo.webp";
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
            className="text-dark-cian hover:text-dark lg:w-1/5"
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
            className="text-dark-cian hover:text-dark lg:w-1/5"
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
          <Link
            className="text-dark-cian hover:text-dark lg:w-1/5"
            target="_blank"
            href={"https://cardapioweb.com/"}
            title="Ir para site da Cardapio Web"
          >
            <div className="group rounded-full p-6 border-2 border-slate-700 bg-slate-800 hover:-translate-x-2 hover:-translate-y-2 hover:drop-shadow-icon duration-100 relative">
              <Image
                src={cardapio_web_logo}
                alt="icone cardapio web"
                width={300}
                className="m-auto drop-shadow-icon-sm scale-150 lg:grayscale-1 -translate-y-1 aspect-square object-contain"
              />
            </div>
          </Link>
          <Link
            className="text-dark-cian hover:text-dark lg:w-1/5"
            target="_blank"
            href={"https://goener.com.br/"}
            title="Ir para site da goener"
          >
            <div className="group rounded-full p-6 border-2 aspect-square flex items-center border-slate-700 bg-[#fff] hover:-translate-x-2 hover:-translate-y-2 hover:drop-shadow-icon duration-100 relative">
              <Image
                src={go_ener_logo}
                alt="logo go ener"
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
