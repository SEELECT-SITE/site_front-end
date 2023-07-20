"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import fundo from "@/public/Rectangle 24.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Navigation } from "swiper/modules";
import Container from "@/components/Container";

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
