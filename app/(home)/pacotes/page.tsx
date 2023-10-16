"use client";
import Container from "@/components/Container";
import PriceCard from "@/components/PriceCard";
import Paragraph from "@/components/Text";
import Title from "@/components/Title";
import { useRouter } from "next/navigation";

export default function PacotesPage() {
  const router = useRouter();
  return (
    <>
      <Container className="w-full pt-32 lg:py-32 2xl:py-38 bg-white">
        <Title className="text-2xl text-black text-center">
          ESCOLHA UM PACOTE
        </Title>
        <Paragraph className="text-black/40 text-sm text-center">
          Veja a melhor dentre as 3 opções abaixo:
        </Paragraph>

        <div className="mt-8 flex gap-3 items-stretch lg:flex lg:gap-4 2xl:gap-8 justify-center flex-wrap lg:items-stretch ">
          <PriceCard
            onClick={() => router.push("/login")}
            stars={3}
            price={20.0}
            destack={true}
            destackText="+ Custo benefício"
            title={"Kit Avançado"}
            id={"kitavançado1"}
            advantage={[
              "Todas as Palestras",
              "4 Minicursos/Workshop",
              "Um copo Buck's Exclusivo",
            ]}
          />
          <PriceCard
            onClick={() => router.push("/login")}
            stars={2}
            price={15.0}
            title={"Kit Médio"}
            id={"kitmedio1"}
            advantage={[
              "Todas as Palestras",
              "3 Minicursos/Workshop",
              "Um copo Buck's Exclusivo",
            ]}
          />
          <PriceCard
            onClick={() => router.push("/login")}
            stars={1}
            price={10.0}
            title={"Kit Básico"}
            id={"kitbasico1"}
            advantage={["Todas as Palestras", "Um Minicurso ou um Workshop"]}
          />

          <PriceCard
            onClick={() => router.push("/login")}
            price={0.0}
            title={"Kit Gratuito"}
            id={"kitgratuito1"}
            advantage={["Palestra dos patrocinadores + 1 palestra"]}
          />
        </div>
      </Container>
    </>
  );
}
