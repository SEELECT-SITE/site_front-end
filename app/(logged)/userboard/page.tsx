"use client";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EventCardUser from "./EventCardUser";

export default function UserboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      <Container>
        <Title>pagina do usuario</Title>
        {session && (
          <>
            <div>{session.user?.name}</div>
            <div>{session.user?.email}</div>
          </>
        )}
        {!session && <div>carregando...</div>}

        <button
          className="border border-red-400 px-4 py-2 rounded-md"
          onClick={() => {
            signOut({ redirect: false });
            router.replace("/");
          }}
        >
          sair
        </button>
        <div className=" flex gap-3">
          <EventCardUser />
          <EventCardUser />
          <EventCardUser />
          <EventCardUser />
        </div>
      </Container>
    </div>
  );
}
