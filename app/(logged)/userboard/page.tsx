"use client";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EventCardUser from "./EventCardUser";
import Text from "@/components/Text";
import Decoration from "@/components/SECTIONS/Cronograma/DecorationStripes/decoration";

export default function UserboardPage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    console.log(session);
    const { user } = session;
    return (
      <>
        <header className="w-full  bg-white flex justify-between p-4 lg:px-12 xl:px-16 2xl:px-24 items-center  shadow-md shadow-black/90 text-dark">
          <Text>Bem-vindo {user?.name} </Text>
          <button
            className="border font-bold border-red-400 px-4 py-2 rounded-full hover:bg-red-400 hover:text-white duration-200 hover:shadow-md hover:border-slate-500"
            onClick={() => {
              signOut({ redirect: false });
              router.replace("/");
            }}
          >
            Sair
          </button>
        </header>

        <Container>
          {session && (
            <>
              <div>{session.user?.name}</div>
              <div>{session.user?.email}</div>
            </>
          )}

          <div className="flex flex-col gap-2">
            <Decoration type="light" shadowClassname="h-4 my-4" />
            <h2 className="text-2xl font-bold">Seus eventos selecionados.</h2>
            <EventCardUser
              title="Uma breve introdução a linguagem de dispositivos IOS, Swift."
              local="Bloco 707 - Sala 25"
              tipo="workshop"
              description="muito bom"
              data={Date.now()}
              vagas_livres={4}
            />
            <EventCardUser
              title="Uma breve introdução a linguagem de dispositivos IOS, Swift."
              local="Bloco 707 - Sala 25"
              tipo="workshop"
              description="muito bom"
              data={Date.now()}
              vagas_livres={4}
            />
          </div>
        </Container>
      </>
    );
  }

  return <div>Carregando..</div>;
}
