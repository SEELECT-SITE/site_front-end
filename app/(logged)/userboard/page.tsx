"use client";
import Container from "@/components/Container";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EventCardUser from "./components/EventCardUser";
import Text from "@/components/Text";
import Decoration from "@/components/SECTIONS/Cronograma/DecorationStripes/decoration";
import Title from "@/components/Title";
import Link from "next/link";
import Image from "next/image";
import Seelect_icon from "@/public/icone_seelect-light-cian.webp";
import squares_deco from "@/public/SVG/squares-deco.svg";
import wave from "@/public/SVG/wave-home.svg";
import { IoAlertCircleOutline } from "react-icons/io5";
import SmallText from "@/components/SmallText";
import { MdLogout } from "react-icons/md";

export default function UserboardPage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    const { user } = session;

    return (
      <>
        <div className="bg-dark-cian">
          <Container className="">
            <Text>Bem-vindo {user?.name} </Text>
            {user?.kit ? (
              <div className="bg-slate-600 p-2 rounded-md inline-flex flex-col space-y-4">
                <Text>
                  Seu kit é o{" "}
                  <b className="border border-slate-400 rounded px-1 inline capitalize mb-2">
                    {user.kit.name}
                  </b>{" "}
                </Text>
                {user.kit.name != "avançado" && (
                  <Link href={"#"}>
                    <SmallText className="lg:font-normal text-yellow-400 hover:text-yellow-300 hover:underline gap-1 flex items-start">
                      <IoAlertCircleOutline size={24} />
                      Temos kits que abrangem mais eventos e brindes. Deseja
                      fazer um upgrade?
                    </SmallText>
                  </Link>
                )}
              </div>
            ) : (
              <div>Sem kit ainda compre agora</div>
            )}
          </Container>

          <Decoration
            type="light"
            shadowClassname="h-6 my-2 rounded-none"
            className="rounded-none"
            notAnimated={true}
          />
        </div>
        <Container className="bg-gradient-to-b from-dark to-dark-cian pb-20 overflow-hidden">
          {user?.events ? (
            <div className="relative z-10">
              <Title className="text-cian-700 my-4">
                Seus eventos selecionados
              </Title>
              <div> palestras {user.kit?.n_palestras}</div>
              <div> workshop {user.kit?.n_workshop}</div>
              <div className="flex gap-4 flex-wrap justify-center items-stretch lg:justify-between  ">
                {user.events.map((elem, index) => {
                  return (
                    <>
                      <EventCardUser key={elem.title + index} {...elem} />
                      <EventCardUser key={elem.title + index} {...elem} />
                    </>
                  );
                })}
              </div>
              <div className="absolute -right-1/3 top-32 lg:translate-x-1/4 lg:right-0 lg:top-1/2 -translate-y-1/2 -z-10 w-3/4 max-w-md">
                <Image src={squares_deco} alt="decoration" />
              </div>
              <div className="w-[120%] lg:bottom- -left-[10%] absolute -z-10 min-w-[800px] -translate-y-3/4 lg:-translate-y-1/2">
                <Image src={wave} alt={"svg de decoração"} className="w-full" />
              </div>
            </div>
          ) : (
            <div>Sem eventos.</div>
          )}
        </Container>
      </>
    );
  }

  return <div>Carregando..</div>;
}
