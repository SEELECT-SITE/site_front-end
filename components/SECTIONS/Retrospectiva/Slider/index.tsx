'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.css';
import fundo from "@/public/Rectangle 24.png"

// import required modules
import { Navigation } from 'swiper/modules';

const imagens = [
    {
        imagem: fundo,
        alt: "Texto de retrospectiva"
    },
    {
        imagem: fundo,
        alt: "Texto de retrospectiva"
    }
  ]

export default function App() {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        
        {imagens.map((elem,index) => {
          return(
            <SwiperSlide key={index + 1} className="bg-transparent">
              <Image src={elem.imagem} alt={elem.alt}/>
            </SwiperSlide>     
          )
        })}

      </Swiper>
    </>
  );
}