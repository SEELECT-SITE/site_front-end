"use client";
import Container from "@/components/Container";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EventCardUser from "./EventCardUser";
import Text from "@/components/Text";
import Decoration from "@/components/SECTIONS/Cronograma/DecorationStripes/decoration";
import Title from "@/components/Title";
import Link from "next/link";
import Image from "next/image";
import Seelect_icon from "@/public/icone_seelect-light-cian.webp";

export default function UserboardPage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    const { user } = session;
    return (
      <>
        <header className="w-full  bg-white flex justify-between p-4 lg:px-12 xl:px-16 2xl:px-24 items-center  shadow-md shadow-black/90 text-dark">
          <Link href="/" className="">
            <div className="w-12 lg:w-16">
              <Image
                width={64}
                src={Seelect_icon}
                alt="icone seelect"
                className="hover:drop-shadow-icon-sm hover:-translate-x-0.5 hover:-translate-y-0.5 duration-150"
              />
            </div>
          </Link>
          <Text> </Text>
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
        <Decoration
          type="light"
          shadowClassname="h-6 my-2 rounded-none"
          className="rounded-none"
          notAnimated={true}
        />

        <Container>
          <div className="flex flex-col gap-2">
            <Text>Bem-vindo {user?.name} </Text>
            <Title className="text-cian-700 text-xl">
              Seus eventos selecionados
            </Title>
            {user?.eventos ? (
              <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
                {user?.eventos.map((elem, index) => {
                  return <EventCardUser key={elem.title + index} {...elem} />;
                })}
              </div>
            ) : (
              <div>Sem eventos.</div>
            )}
          </div>
          <div></div>
        </Container>
      </>
    );
  }

  return <div>Carregando..</div>;
}
