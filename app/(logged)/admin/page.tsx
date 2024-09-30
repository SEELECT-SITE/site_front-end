"use client";
import Container from "@/components/Container";
import Title from "@/components/Title";
import AddPlaceForms from "./admin-components/AddPlacesForms";
import AddEventsForms from "./admin-components/AddEventsForms";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/utils/queryClient";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import EventsAdmin from "./admin-components/EventsAdmin.tsx";
import Alert from "@/components/Alert";
import useAlertAdminState from "./admin-components/alertAdminStore";
function Admin({ session }: { session: Session }) {
  const { user } = session;
  const { isAlertAdminOpen, alertMsg } = useAlertAdminState();
  return (
    <main>
      {isAlertAdminOpen && (
        <Alert timeout={4000} className="border-green-400">
          {alertMsg}
        </Alert>
      )}

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

      <EventsAdmin user={user!} />
    </main>
  );
}

export default function AdminPage() {
  const { data: session } = useSession();
  if (session) {
    return (
      <QueryClientProvider client={queryClient}>
        <Admin session={session} />
      </QueryClientProvider>
    );
  }
  return <div>Carregando..</div>;
}
