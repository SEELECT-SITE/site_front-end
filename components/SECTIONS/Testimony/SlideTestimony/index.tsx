"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SwiperButtonsTestemony from "./SwiperButtonsTestemony";
import TestimonyCard from "../TestimonyCard";

const feedbacks = [
  {
    feedback:
      "Excelente forma de mostrar como funciona a gestão de projetos no mercado de trabalho.",
    stars: 5,
    tipo: "Palestras",
  },
  {
    feedback:
      "Gostei bastante de terem chamado alguém com um currículo vasto e bem qualificado, suas dicas sobre por onde devemos seguir, o que devemos estudar, abriu mais minha cabeça nesse quesito, além do palestrante ser muito gente boa.",
    tipo: "Palestras",
    stars: 5,
  },
  {
    feedback:
      "O ambiente foi bem escolhido e proporcionou um bom andamento das atividades.",
    stars: 4,
    tipo: "Workshops",
  },
  {
    feedback:
      "Acadêmico extremamente habilitado para discorrer sobre o tema, que inclusive apresentou seu histórico acadêmico durante o evento, o que demonstrou confiança.",
    stars: 5,
    tipo: "Workshops",
  },
  {
    feedback:
      "Considero o tem excelente pois é um conhecimento que não obtemos no dia a dia da universidade mas que é muito interessante para o mercado e para conseguir uma oportunidade de estágio.",
    stars: 5,
    tipo: "Minicursos",
  },
  {
    feedback:
      "Já havia procurado sobre o tema, mas é um pouco difícil saber por onde começar e como encontrar algo bem didático e o minicurso ajudou bastante nesses quesitos. Área em crescimento e muito relevante.",
    stars: 5,
    tipo: "Minicursos",
  },
  {
    feedback:
      "Facilitador se mostrou bem comunicativo além de domínio sobre o tema da palestra.",
    stars: 5,
    tipo: "Mesas Redondas",
  },
  {
    feedback:
      "A visita foi excelente, foi super produtivo a quantidade de conhecimento adquirido. As pessoas que nos explicaram foram super solícitas para responder nossas dúvidas e explicaram tudo da melhor forma possível.",
    stars: 5,
    tipo: "Visitas Técnicas",
  },
  {
    feedback:
      "Oportunidade de observar de perto o que muitas vezes só vemos na teoria na sala de aula assim como uma ótima oportunidade de aprender a  identificar visualmente os componentes na vida real.",
    stars: 5,
    tipo: "Visitas Técnicas",
  },
  {
    feedback:
      "Temas sobre organização e gerenciamento são interessantes pra mim, já que essas são competências difíceis de desenvolver ao longo do curso.",
    stars: 5,
    tipo: "Mesas Redondas",
  },
];

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
