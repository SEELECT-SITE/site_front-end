"use client";
import React, { useState } from "react";
import Image from "next/image";
import visitas from "@/public/retrospectiva/visitas.webp";
import visitas2 from "@/public/retrospectiva/visitas2.webp";
import visitas3 from "@/public/retrospectiva/visitas3.webp";
import visitas4 from "@/public/retrospectiva/visitas4.webp";
import visitas5 from "@/public/retrospectiva/visitas5.webp";
import visitas6 from "@/public/retrospectiva/visitas6.webp";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";
import SwiperButton from "./SwiperButtons";

const imagens = [
  {
    imagem: visitas,
    alt: "Imagem retrospectiva SEELECT",
  },
  {
    imagem: visitas2,
    alt: "Imagem retrospectiva SEELECT",
  },
  {
    imagem: visitas3,
    alt: "Imagem retrospectiva SEELECT",
  },
  {
    imagem: visitas4,
    alt: "Imagem retrospectiva SEELECT",
  },
  {
    imagem: visitas5,
    alt: "Imagem retrospectiva SEELECT",
  },
  {
    imagem: visitas6,
    alt: "Imagem retrospectiva SEELECT",
  },
];

export default function RetrospecSlider() {
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isBegin, setIsBegin] = useState<boolean>(true);
  return (
    <>
      <div className="w-full">
        <Swiper
          onActiveIndexChange={(e) => {
            if (e.activeIndex == e.slides.length - 1) {
              setIsEnd(true);
              setIsBegin(false);
            } else if (e.activeIndex == 0) {
              setIsBegin(true);
              setIsEnd(false);
            } else {
              setIsBegin(false);
              setIsEnd(false);
            }
          }}
          navigation={true}
          breakpoints={{
            1024: {
              slidesPerView: 2.5,
            },
          }}
          className="mySwiper max-h-[600px] relative"
        >
          <div className="w-110% h-24 lg:h-32 rounded-100%  absolute bg-dark top-0 z-10 -left-5% -translate-y-1/2"></div>
          {imagens.map((elem, index) => {
            return (
              <SwiperSlide key={index + 1} className="border-x aspect-square">
                <div className="h-full flex items-center">
                  <Image
                    src={elem.imagem}
                    alt={elem.alt}
                    priority={true}
                    className="w-full object-cover"
                  />
                </div>
              </SwiperSlide>
            );
          })}
          <div className="w-110% h-16 lg:h-32 rounded-100% absolute bg-white bottom-0 z-10 -left-5% translate-y-1/2"></div>
          <SwiperButton isEnd={isEnd} isBegin={isBegin} />
        </Swiper>
      </div>
    </>
  );
}
