import Badge from "@/components/Badge";
import Container from "@/components/Container";
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
      <Container className="w-full pt-32 lg:py-32 2xl:py-38 bg-white">
        <Title className="text-2xl text-black text-center">
          ESCOLHA UM PACOTE
        </Title>
        <Paragraph className="text-black/40 text-sm text-center">
          Veja a melhor dentre as 3 opções abaixo:
        </Paragraph>

        <div className="flex flex-col items-center lg:flex-row lg:gap-8 2xl:gap-24 lg:justify-center lg:items-stretch ">
          <PriceCard
            advantage={["Todas as palestras", "1 workshop", "Caneca Bucks"]}
            id={"Kit Basico"}
            title="Kit Basico"
            price={10}
          />
          <PriceCard
            advantage={["Todas as palestras", "1 workshop", "Caneca Bucks"]}
            id={"Kit Basico"}
            title="Kit Basico"
            price={10}
          />
          <PriceCard
            advantage={["Todas as palestras", "1 workshop", "Caneca Bucks"]}
            id={"Kit Basico"}
            title="Kit Basico"
            price={10}
          />
        </div>
      </Container>
    </>
  );
}
