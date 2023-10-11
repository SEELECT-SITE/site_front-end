"use client";
import PresentationSection from "@/components/SECTIONS/PresentationSection";
import Image from "next/image";

import Parceiros from "@/components/SECTIONS/Parceiros";
import Container from "@/components/Container";
import Cronograma from "@/components/SECTIONS/Cronograma";
import Retrospec from "@/components/SECTIONS/Retrospec";
import Testimony from "@/components/SECTIONS/Testimony";

import wave_svg from "@/public/SVG/wave-home.svg";
import Contact from "@/components/SECTIONS/Contact";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/utils/queryClient";

const Home = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="pt-32 lg:py-44 bg-gradient-to-b from-dark via-dark via-40% to-dark/70">
          <PresentationSection />

          <Testimony />

          <div className="w-110% -left-5% absolute -z-10 min-w-[800px] -translate-y-3/4 lg:-translate-y-1/2">
            <Image src={wave_svg} alt={"svg de decoração"} className="w-full" />
          </div>
        </div>

        <Retrospec />

        <Container>
          <Cronograma />
        </Container>

        <Container className="bg-white w-full my-12 lg:my-32">
          <Parceiros />
        </Container>

        <Contact />
      </QueryClientProvider>
    </>
  );
};
export default Home;
