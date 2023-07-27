"use client";
import { FunctionComponent } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useSwiper } from "swiper/react";

type SwiperNavButtonsPropsType = {
  isEnd?: boolean;
  isBegin?: boolean;
};

const SwiperButtonsTestemony: FunctionComponent<SwiperNavButtonsPropsType> = ({
  isBegin,
  isEnd,
}) => {
  const swiper = useSwiper();

  return (
    <>
      <button
        disabled={isBegin}
        onClick={() => swiper.slidePrev()}
        className=" -ml-2 absolute bottom-6 lg:bottom-8 duration-150 z-20 left-1/2 -translate-x-full disabled:ml-2 disabled:z-10 disabled:-translate-x-0 hover:opacity-80 active:scale-95"
      >
        <div className="bg-white duration-150 rounded-md text-cian-400">
          <MdArrowBack size={40} />
        </div>
      </button>

      <button
        disabled={isEnd}
        onClick={() => swiper.slideNext()}
        className="absolute ml-2 bottom-6 lg:bottom-8 duration-150 z-20 left-1/2 disabled:z-10 disabled:-translate-x-full disabled:-ml-2 hover:opacity-80 active:scale-95"
      >
        <div className="bg-white duration-150 rounded-md text-cian-400">
          <MdArrowForward size={40} />
        </div>
      </button>
    </>
  );
};
export default SwiperButtonsTestemony;
