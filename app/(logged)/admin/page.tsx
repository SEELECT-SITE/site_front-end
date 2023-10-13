"use client";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import Title from "@/components/Title";
import AddPlaceForms from "./components/AddPlacesForms";
import AddEventsForms from "./components/AddEventsForms";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/utils/queryClient";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
function Admin({
  session,
  sessionUpdate,
}: {
  session: Session;
  sessionUpdate: any;
}) {
  const { user } = session;
  return (
    <main>
      <Container>
        <Title>pagina do admin</Title>
      </Container>
      <Container className="flex flex-wrap items-stretch">
        {user?.token && (
          <>
            <AddEventsForms Token={user.token} />
            <AddPlaceForms Token={user.token} />
          </>
        )}
      </Container>
    </main>
  );
}

export default function AdminPage() {
  const { data: session, update: sessionUpdate } = useSession();
  if (session) {
    return (
      <QueryClientProvider client={queryClient}>
        <Admin session={session} sessionUpdate={sessionUpdate} />
      </QueryClientProvider>
    );
  }
  return <div>Carregando..</div>;
}
