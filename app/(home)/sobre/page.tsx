import PriceCard from "@/components/PriceCard";
import Paragraph from "@/components/Text";
import Title from "@/components/Title";

export const metadata = {
  title: "Pacotes",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

export default function PacotesPage() {
  return (
    <>
      <Title>
        PACOTES DE PARTICIPAÇÃO
      </Title>
      <Paragraph>
        Descubra os diferentes níveis de participação oferecidos no evento SEELECT e escolha 
        o que melhor se adequa às suas necessidades e orçamento. Explore os pacotes Básico, 
        Premium e VIP, cada um com benefícios exclusivos para uma experiência personalizada 
        e enriquecedora. Escolha o seu nível de participação e aproveite ao máximo o SEELECT!
      </Paragraph>

      <PriceCard price={30} title="Pacote Básico" description="teste"/>
      <PriceCard price={60} title="Pacote Premium" description="teste"/>
      <PriceCard price={120} title="Pacote VIP" description="teste"/>
    </>
  );
}
