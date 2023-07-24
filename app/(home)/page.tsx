import PresentationSection from "@/components/SECTIONS/PresentationSection";
import Image from "next/image";

import Parceiros from "@/components/SECTIONS/Parceiros";
import Container from "@/components/Container";
import Cronograma from "@/components/SECTIONS/Cronograma";
import Retrospec from "@/components/SECTIONS/Retrospec";
import Contact from "@/components/SECTIONS/Contact";
import Testimony from "@/components/SECTIONS/Testimony";

import wave_svg from "@/public/SVG/wave-home.svg";

export const metadata = {
  title: "SEELECT",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

const Home = () => {
  return (
    <>
      <div className="pt-32 lg:py-44 bg-gradient-to-b from-dark to-dark/90">
        <PresentationSection />

        <div className="w-110% -left-5% absolute -translate-y-1/2 -z-10">
          <Image src={wave_svg} alt={"svg de decoração"} className="w-full" />
        </div>
        <div className="absolute -translate-y-1/2 -z-10 top-24 right-0"></div>

        <Container>
          <Testimony />
        </Container>
      </div>

      <Retrospec />

      <Cronograma />

      <Container className="bg-white w-full">
        <Parceiros />
      </Container>

      <Contact />
    </>
  );
};
export default Home;
