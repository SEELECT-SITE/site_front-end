"use client";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import Title from "@/components/Title";
import AddPlaceForms from "./components/AddPlacesForms";
import AddEventsForms from "./components/AddEventsForms";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/utils/queryClient";

export default function AdminPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Container>
          <Title>pagina do admin</Title>

          <AddEventsForms />
          <AddPlaceForms />
        </Container>
      </main>{" "}
    </QueryClientProvider>
  );
}
