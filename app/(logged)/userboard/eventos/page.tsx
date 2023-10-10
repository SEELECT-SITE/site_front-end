"use client";
import Container from "@/components/Container";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Title from "@/components/Title";

export default function EventosPage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    const { user } = session;

    return (
      <>
        <Container>
          <Title>Trocar eventos</Title>
        </Container>
      </>
    );
  }

  return <div>Carregando..</div>;
}
