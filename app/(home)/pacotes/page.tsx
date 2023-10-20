"use client";
import KitsAvaliable from "@/app/(logged)/userboard/components/KitsAvaliabe";
import Container from "@/components/Container";
import PriceCard from "@/components/PriceCard";
import Paragraph from "@/components/Text";
import Title from "@/components/Title";
import { queryClient } from "@/utils/queryClient";
import { useRouter } from "next/navigation";
import { QueryClientProvider } from "react-query";

function Pacotes() {
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

        <KitsAvaliable onClick={() => router.push("./login")} />
      </Container>
    </>
  );
}

export default function PacotesPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Pacotes />
    </QueryClientProvider>
  );
}
