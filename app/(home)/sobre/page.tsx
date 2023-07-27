import Container from "@/components/Container";
import Text from "@/components/Text";
import Title from "@/components/Title";
import Image from "next/image";
import Seelect_icon from "@/public/icone-seelect-white.webp";
import Coordenadores from "@/app/(home)/sobre/SobreSections/Coordenadores";

export const metadata = {
  title: "Sobre",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

export default function SobrePage() {
  return (
    <>
      
    <Container className={`pt-32 rounded-br-3xl bg-white/20`}>
        <Title className="text-4xl text-cian-400 text-justify">
          SOBRE A SEELECT
        </Title>
        <Text className="text-cian-400 text-sm text-justify">
          Conheça um pouco mais da SEELECT
        </Text>
    </Container>
        

    <Container className="bg-white w-full pt-32">
      <Title className="text-2xl text-cian-400 text-justify">
          O QUE É A SEELECT?
      </Title>
      <Text className="text-black/90 text-sm text-left">
      Rem vitae nobis ut eligendi laboriosam a eius sunt qui perspiciatis debitis. 
      Sit minus necessitatibus aut doloribus voluptate aut molestias repudiandae et 
      sunt amet ut rerum quia cum facilis esse ex adipisci voluptates.

      </Text>
    </Container>

    <Container className="bg-white w-full pt-32">
    <div>
      <Title className={`text-2xl mb-11 text-cian-400`}>NOSSOS ORGANIZADORES</Title>
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
      </div>
      </Container>

      <Container className="bg-white w-full pt-32">
      <Title className={`text-2xl mb-11 text-cian-400`}>NOSSA COORDENAÇÃO</Title>
      <div className="flex flex-col items-center">
          <Coordenadores></Coordenadores>
        </div>
      </Container>
    </>
  );
}
