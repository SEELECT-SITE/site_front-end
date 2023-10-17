"use client";
import PresentationSection from "@/components/SECTIONS/PresentationSection";
import Image from "next/image";
import techno_wave from "@/public/SVG/techno-wave.svg";
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
        <div className="relative z-10 bg-gradient-to-b from-dark-cian via-dark/90 via-60% to-dark overflow-hidden">
          <Container>
            <Cronograma />
          </Container>

          <div className="absolute top-3/5 lg:top-2/3 left-0 w-2-full rotate-45 -z-10">
            <Image
              src={techno_wave}
              alt={"svg de decoração"}
              className="w-full object-cover min-h-[1300px] -translate-x-1/2 lg:-translate-x-1/3"
            />
          </div>
          <Container className="w-full lg:py-32">
            <Parceiros />
          </Container>
          <Contact />
        </div>
      </QueryClientProvider>
    </>
  );
};
export default Home;
