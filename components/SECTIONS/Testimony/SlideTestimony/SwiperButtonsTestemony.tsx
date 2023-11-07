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
        className=" -ml-2 absolute bottom-0 duration-150 z-20 left-1/2 lg:left-2 -translate-x-full lg:translate-x-0 disabled:ml-2 disabled:z-10 disabled:-translate-x-0 hover:opacity-95  active:scale-95 lg:h-full"
      >
        <div className="bg-white duration-150 rounded-md text-cian-400 flex items-center lg:h-full">
          <MdArrowBack size={40} />
        </div>
      </button>

      <button
        disabled={isEnd}
        onClick={() => swiper.slideNext()}
        className="absolute ml-2 bottom-0 duration-150 z-20 left-1/2 disabled:z-10 lg:right-0 lg:left-auto disabled:-translate-x-full disabled:-ml-2 hover:opacity-95 active:scale-95 lg:h-full"
      >
        <div className="bg-white duration-150 rounded-md text-cian-400 flex items-center lg:h-full">
          <MdArrowForward size={40} />
        </div>
      </button>
    </>
  );
};
export default SwiperButtonsTestemony;
