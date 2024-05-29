"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SwiperButtonsTestemony from "./SwiperButtonsTestemony";
import TestimonyCard from "../TestimonyCard";
import { feedbacks } from "@/utils/consts";

export default function TestemonySlider() {
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isBegin, setIsBegin] = useState<boolean>(true);
  return (
    <>
      <div className="w-full relative">
        <Swiper
          modules={[Autoplay]}
          initialSlide={4}
          loop
          autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
          slidesPerView={1.01} //valor para não desativar o botão de slides
          spaceBetween={16}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1366: {
              slidesPerView: 3,
            },
            1500: {
              slidesPerView: 4,
            },
          }}
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
          className="mySwiper max-h-[600px] "
        >
          {feedbacks.map((elem, index) => {
            return (
              <SwiperSlide
                key={elem.tipo + index}
                className="py-12 flex justify-center w-full"
              >
                <TestimonyCard
                  feedback={elem.feedback}
                  stars={elem.stars}
                  tipo={elem.tipo}
                />
              </SwiperSlide>
            );
          })}

          <SwiperButtonsTestemony isEnd={isEnd} isBegin={isBegin} />
        </Swiper>
      </div>
    </>
  );
}
