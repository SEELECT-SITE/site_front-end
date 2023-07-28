import Container from "@/components/Container";
import Text from "@/components/Text";
import Title from "@/components/Title";
import Image from "next/image";
import Seelect_icon from "@/public/icone-seelect-white.webp";
import elipse_deco from "@/public/SVG/elipse-deco.svg";
import squareDeco from "@/public/SVG/squares-deco.svg";
import CoordenacaoSection from "./SobreSections/Coordenadores/CoordenacaoSection";
import Decoration from "@/components/SECTIONS/Cronograma/DecorationStripes/decoration";

export const metadata = {
  title: "Sobre",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

export default function SobrePage() {
  return (
    <>
      <Container
        className={`pt-32 relative bg-gradient-to-b z-10 from-dark via-dark via-30% pb-16 to-dark/90 rounded-br-5xl overflow-hidden`}
      >
        <div className="absolute w-1/2 lg:w-2/3 min-w-[160px] translate-x-1/3 top-0 right-0 lg:translate-x-2/3 -z-10">
          <Image src={squareDeco} alt="teste" />
        </div>
        <Title className="text-4xl text-cian-700 text-justify">SOBRE</Title>
        <Text className="text-white text-sm text-justify">
          Conheça um pouco mais da SEELECT
        </Text>
      </Container>

      <Container className="bg-white w-full pt-16 relative  overflow-x-hidden flex flex-col items-start">
        <Image
          src={elipse_deco}
          alt="decoration"
          className="absolute hidden w-3/4 lg:inline max-w-md right-0 -translate-y-1/2 translate-x-1/2 "
        />
        <div className="backdrop-blur-sm  max-w-4xl">
          <Title className="text-2xl text-cian-700">O QUE É A SEELECT?</Title>
        </div>
        <div className=" backdrop-blur-sm max-w-4xl">
          <Text className="text-dark text-sm text-justify">
            Rem vitae nobis ut eligendi laboriosam a eius sunt qui perspiciatis
            debitis. Sit minus necessitatibus aut doloribus voluptate aut
            molestias repudiandae et sunt amet ut rerum quia cum facilis esse ex
            adipisci voluptates. Rem vitae nobis ut eligendi laboriosam a eius
            sunt qui perspiciatis debitis. Sit minus necessitatibus aut
            doloribus voluptate aut molestias repudiandae et sunt amet ut rerum
            quia cum facilis esse ex adipisci voluptates.Rem vitae nobis ut
            eligendi laboriosam a eius sunt qui perspiciatis debitis. Sit minus
            necessitatibus aut doloribus voluptate aut molestias repudiandae et
            sunt amet ut rerum quia cum facilis esse ex adipisci voluptates. Rem
            vitae nobis ut eligendi laboriosam a eius sunt qui perspiciatis
            debitis. Sit minus necessitatibus aut doloribus voluptate aut
            molestias repudiandae et sunt amet ut rerum quia cum facilis esse ex
            adipisci voluptates.
          </Text>
        </div>
      </Container>
      {/* <Decoration shadowClassname="w-full h-6 mt-12" />
      <Container className="bg-white w-full ">
        <Title className={`text-2xl mb-11 text-cian-700`}>
          NOSSOS ORGANIZADORES
        </Title>
        <div className="flex items-center justify-between">
          <Image
            src={Seelect_icon}
            alt="icone seelect"
            width={52}
            className="invert hover:drop-shadow-icon-sm hover:-translate-x-1 hover:-translate-y-1 duration-150"
          />
          <Image
            src={Seelect_icon}
            alt="icone seelect"
            width={52}
            className="invert hover:drop-shadow-icon-sm hover:-translate-x-1 hover:-translate-y-1 duration-150"
          />
          <Image
            src={Seelect_icon}
            alt="icone seelect"
            width={52}
            className="invert hover:drop-shadow-icon-sm hover:-translate-x-1 hover:-translate-y-1 duration-150"
          />
          <Image
            src={Seelect_icon}
            alt="icone seelect"
            width={52}
            className="invert hover:drop-shadow-icon-sm hover:-translate-x-1 hover:-translate-y-1 duration-150"
          />
        </div>
      </Container> */}
      <Decoration shadowClassname="w-full h-6 mt-12 horizontal" />

      <CoordenacaoSection />
    </>
  );
}
