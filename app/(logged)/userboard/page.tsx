"use client";
import Container from "@/components/Container";
import { useSession } from "next-auth/react";
import Text from "@/components/Text";
import Decoration from "@/components/SECTIONS/Cronograma/DecorationStripes/decoration";
import UserProfileForms from "./components/UserProfileForms";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/utils/queryClient";
import { Session } from "next-auth";
import FloatButton from "@/components/FloatButton";
import { useEffect } from "react";
import SelectEventsModal from "./components/SelectEventsModal";
import useSelectEventsState from "./components/SelectEventsModal/selectEventsStore";
import Title from "@/components/Title";
import PriceCard from "@/components/PriceCard";
import useUserForms from "./components/UserProfileForms/userForms";
import { MdClose } from "react-icons/md";
import { HiPencilAlt } from "react-icons/hi";
import UserEvents from "./components/UserEvents";
import UserKitArea from "./components/UserKitArea";

function Userboard({
  session,
  sessionUpdate,
}: {
  session: Session;
  sessionUpdate: any;
}) {
  const { user } = session;
  const { isSelectEventOpen, setIsSelectEventOpen, setSelectedKit } =
    useSelectEventsState();
  const { isUserFormsOpen, setIsUserFormsOpen } = useUserForms();
  const hasUserName = user?.name !== " ";

  useEffect(() => {
    if (!hasUserName) {
      setIsUserFormsOpen(true);
    }
  }, []);

  return (
    <>
      <div className="bg-dark-cian relative">
        <Container className="">
          {hasUserName ? (
            <div className="flex justify-between">
              <Text>Bem-vindo {user?.name} </Text>
              <FloatButton
                className="flex duration-100 p-1"
                shadowClassname="my-0"
                onClick={(e) => {
                  setIsUserFormsOpen(!isUserFormsOpen);
                }}
              >
                {isUserFormsOpen ? (
                  <>
                    Fechar <MdClose />
                  </>
                ) : (
                  <>
                    Editar perfil <HiPencilAlt size={18} />
                  </>
                )}
              </FloatButton>
            </div>
          ) : (
            <Title>Continue o seu cadastro </Title>
          )}
          {isUserFormsOpen && (
            <UserProfileForms user={user!} sessionUpdate={sessionUpdate} />
          )}
        </Container>

        <Decoration
          type="light"
          shadowClassname="h-6 my-2 rounded-none"
          className="rounded-none"
          notAnimated={true}
        />
      </div>
      {user?.name != " " && (
        <>
          <Container className="bg-gradient-to-b from-dark to-dark-cian pb-20 overflow-hidden">
            <div>
              {user?.kit ? (
                <>
                  <UserKitArea user={user} />
                  <UserEvents user={user} />
                </>
              ) : (
                <>
                  <Title className="border-l-2 pl-2 border-cian-400">
                    Não tem kit ainda?{" "}
                  </Title>
                  <Text className="text-slate-300">
                    Selecione um dos kit abaixo
                  </Text>
                  <div className="flex flex-wrap gap-4 my-6 justify-around">
                    <PriceCard
                      stars={3}
                      onClick={() => {
                        setIsSelectEventOpen(true);
                        setSelectedKit("Kit Avançado");
                      }}
                      price={20.0}
                      destack={true}
                      destackText="+ Custo benefício"
                      title={"Kit Avançado"}
                      id={"kitavançado1"}
                      advantage={[
                        "Todas as Palestras",
                        "4 Minicursos/Workshop",
                        "Um copo Buck's Exclusivo",
                      ]}
                    />
                    <PriceCard
                      stars={2}
                      onClick={() => {
                        setIsSelectEventOpen(true);
                        setSelectedKit("Kit Médio");
                      }}
                      price={15.0}
                      title={"Kit Médio"}
                      id={"kitmedio1"}
                      advantage={[
                        "Todas as Palestras",
                        "3 Minicursos/Workshop",
                        "Um copo Buck's Exclusivo",
                      ]}
                    />
                    <PriceCard
                      stars={1}
                      onClick={() => {
                        setIsSelectEventOpen(true);
                        setSelectedKit("Kit Básico");
                      }}
                      price={10.0}
                      title={"Kit Básico"}
                      id={"kitbasico1"}
                      advantage={[
                        "Todas as Palestras",
                        "Um Minicurso ou um Workshop",
                      ]}
                    />
                    <PriceCard
                      onClick={() => {
                        setIsSelectEventOpen(true);
                        setSelectedKit("Kit Gratuito");
                      }}
                      price={0.0}
                      title={"Kit Gratuito"}
                      id={"kitgratuito1"}
                      advantage={["Palestra dos patrocinadores + 1 palestra"]}
                    />
                  </div>
                </>
              )}
            </div>
          </Container>
          {isSelectEventOpen && (
            <SelectEventsModal user={user!} sessionUpdate={sessionUpdate} />
          )}
        </>
      )}
    </>
  );
}

export default function UserboardPage() {
  const { data: session, update: sessionUpdate } = useSession();
  if (session) {
    return (
      <QueryClientProvider client={queryClient}>
        <Userboard session={session} sessionUpdate={sessionUpdate} />
      </QueryClientProvider>
    );
  }
  return <div>Carregando..</div>;
}
