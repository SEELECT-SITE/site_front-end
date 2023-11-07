"use client";
import { FunctionComponent, useMemo } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { HTMLAttributes, RefObject, useEffect, useState } from "react";

import { Swiper } from "swiper/types";
import { useSwiper } from "swiper/react";
import { AiOutlineConsoleSql } from "react-icons/ai";

type SwiperNavButtonsPropsType = {
  isEnd?: boolean;
  isBegin?: boolean;
};

const SwiperButtons: FunctionComponent<SwiperNavButtonsPropsType> = ({
  isBegin,
  isEnd,
}) => {
  const swiper = useSwiper();

  return (
    <>
      <button
        disabled={isBegin}
        onClick={() => swiper.slidePrev()}
        className="absolute z-20 top-1/2 -translate-y-1/2 disabled:opacity-25 p-2 lg:p-4 rounded-md border-slate-500 text-white"
      >
        <MdArrowBackIosNew size={48} className="drop-shadow-xlc" />
      </button>
      <button
        disabled={isEnd}
        onClick={() => swiper.slideNext()}
        className="absolute z-20 top-1/2 -translate-y-1/2 right-0 disabled:opacity-25 p-2 lg:p-4 rounded-md border-slate-500 text-white"
      >
        <MdArrowForwardIos size={48} className="drop-shadow-xlc" />
      </button>
    </>
  );
};
export default SwiperButtons;
