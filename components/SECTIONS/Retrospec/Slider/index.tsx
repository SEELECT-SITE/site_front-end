"use client"
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import fundo from "@/public/Rectangle 24.png"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';

const imagens = [
    {
      imagem: fundo,
      alt: "Imagem retrospectiva SEELECT"
    },
    {
        imagem: fundo,
        alt: "Imagem retrospectiva SEELECT"
    },
    {
        imagem: fundo,
        alt: "Imagem retrospectiva SEELECT"
    },
  ]


export default function App() {
  return (
    <>
    
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      {imagens.map((elem,index) => {
          return(
            <SwiperSlide key={index + 1}>
              <Image src={elem.imagem} alt={elem.alt}/>
            </SwiperSlide>     
          )
        })}
      </Swiper>
    </>
  );
}
