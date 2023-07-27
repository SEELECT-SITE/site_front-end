"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperButtonsTestemony from "./SwiperButtonsTestemony";
import TestimonyCard from "../TestimonyCard";

export default function TestemonySlider() {
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isBegin, setIsBegin] = useState<boolean>(true);
  return (
    <>
      <div className="w-full">
        <Swiper
          onActiveIndexChange={(e) => {
            console.log(e.activeIndex);
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
          className="mySwiper max-h-[600px] relative -translate-x-4 -translate-y-12"
        >
          <SwiperSlide className="pl-8 py-12">
            <TestimonyCard />
          </SwiperSlide>
          <SwiperSlide className="pl-8 py-12">
            <TestimonyCard />
          </SwiperSlide>
          <SwiperSlide className="pl-8 py-12">
            <TestimonyCard />
          </SwiperSlide>
          <SwiperSlide className="pl-8 py-12">
            <TestimonyCard />
          </SwiperSlide>
          <SwiperButtonsTestemony isEnd={isEnd} isBegin={isBegin} />
        </Swiper>
      </div>
    </>
  );
}
