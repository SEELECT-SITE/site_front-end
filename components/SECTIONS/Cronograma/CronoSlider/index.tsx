"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/pagination";

import "./styles.css";
import Conteudo from "@/components/SECTIONS/Cronograma/CronoSlider/Conteudo";
import Container from "@/components/Container";

// import required modules

export default function CronoSlider() {
  return (
    <>
      <Swiper
        slidesPerView={1.1}
        spaceBetween={15}
        initialSlide={1}
        breakpoints={{
          1024: {
            slidesPerView: 3,
            centeredSlides: true,
            centerInsufficientSlides: true,
          },
        }}
        modules={[]}
        className="mySwiper px-64"
      >
        <SwiperSlide>
          <Conteudo />
        </SwiperSlide>
        <SwiperSlide>
          <Conteudo />
        </SwiperSlide>
        <SwiperSlide>
          <Conteudo />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
