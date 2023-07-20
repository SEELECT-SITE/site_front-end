"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/pagination";

import "./styles.css";
import Conteudo from "@/components/SECTIONS/Cronograma/Slider/Conteudo";
import Container from "@/components/Container";

// import required modules

export default function CronoSlider() {
  return (
    <>
      <Container>
        <Swiper
          slidesPerView={1.1}
          spaceBetween={15}
          modules={[]}
          className="mySwiper"
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
      </Container>
    </>
  );
}
