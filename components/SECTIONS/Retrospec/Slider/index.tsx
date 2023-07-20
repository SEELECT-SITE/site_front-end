"use client";
import React from "react";
import Image from "next/image";
import fundo from "@/public/palestra.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";
import { Navigation } from "swiper/modules";

const imagens = [
  {
    imagem: fundo,
    alt: "Imagem retrospectiva SEELECT",
  },
  {
    imagem: fundo,
    alt: "Imagem retrospectiva SEELECT",
  },
  {
    imagem: fundo,
    alt: "Imagem retrospectiva SEELECT",
  },
];

export default function RetrospecSlider() {
  return (
    <>
      <div className="w-full relative bg-dark">
        <div className="w-110% h-16 rounded-100% absolute bg-dark top-0 z-10 -left-5% -translate-y-1/2"></div>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          <div className="w-full h-24 bg-white absolute top-0"></div>
          {imagens.map((elem, index) => {
            return (
              <SwiperSlide key={index + 1}>
                <Image src={elem.imagem} alt={elem.alt} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="w-110% h-16 rounded-100% absolute bg-white bottom-0 z-10 -left-5% translate-y-1/2"></div>
      </div>
    </>
  );
}
