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
import EventsAdmin from "./components/EventsAdmin.tsx";
import Alert from "@/components/Alert";
import useAlertAdminState from "./components/alertAdminStore";
import UserPaymentConfirm from "./components/UserPaymentConfirm";
function Admin({
  session,
  sessionUpdate,
}: {
  session: Session;
  sessionUpdate: any;
}) {
  const { user } = session;
  console.log(user?.token);
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
      <UserPaymentConfirm user={user!} />
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
