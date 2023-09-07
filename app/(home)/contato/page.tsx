import Container from "@/components/Container";
import Text from "@/components/Text";
import Title from "@/components/Title";
import Image from "next/image";
import ContactForms from "./ContatoSections/ContactForms";
import contatoDeco from "@/public/SVG/contato-deco.svg";
import elipse from "@/public/SVG/squares-deco.svg";

export const metadata = {
  title: "Contato",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

export default function ContactPage() {
  return (
    <main>
      <Container className="pt-32 bg-gradient-to-b relative z-10 from-dark to-dark/90 rounded-br-5xl overflow-hidden">
        <Title className="text-4xl text-cian-700 text-justify">CONTATO</Title>
        <Text className="text-white text-sm text-justify">
          Se preferir, deixe seu contato para 
        </Text>
        <div className="absolute w-1/2 lg:w-2/3 min-w-[160px] translate-x-1/3 top-0 right-0 lg:translate-x-2/3 -z-10">
          <Image src={elipse} alt="teste" />
        </div>
      </Container>
      <Container className="flex justify-center w-full relative z-10">
        <ContactForms />
      </Container>
    </main>
  );
}
