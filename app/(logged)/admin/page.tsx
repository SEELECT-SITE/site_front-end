"use client";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import Title from "@/components/Title";
import AddPlaceForms from "./components/AddPlacesForms";
import AddEventsForms from "./components/AddEventsForms";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/utils/queryClient";
import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session } = useSession();
  return (
    <main>
      <Container>
        <Title>pagina do admin</Title>
      </Container>
      <Container className="flex flex-wrap items-stretch">
        {session?.user?.token && <AddEventsForms Token={session.user.token} />}
        <AddPlaceForms />
      </Container>
    </main>
  );
}
