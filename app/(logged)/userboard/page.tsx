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
import BannerLogin from "@/app/(auth)/login/LoginSections/BannerSign";
import KitsAvaliable from "./components/KitsAvaliabe";

function Userboard({
  session,
  sessionUpdate,
}: {
  session: Session;
  sessionUpdate: any;
}) {
  const { user } = session;
  const { isSelectEventOpen } = useSelectEventsState();
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
        {hasUserName && (
          <Container className="w-full flex flex-wrap justify-between gap-2">
            <Text className="capitalize">Bem-vindo, {user?.name} </Text>
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
          </Container>
        )}
        {isUserFormsOpen && (
          <div className="w-auto lg:flex lg:flex-row-reverse ">
            <BannerLogin />
            <Container className="max-w-lg 2xl:px-12 w-full">
              {!hasUserName && (
                <Title className="mb-2 border-l-2 border-cian-700 pl-2">
                  Continue o seu cadastro{" "}
                </Title>
              )}

              <UserProfileForms user={user!} sessionUpdate={sessionUpdate} />
            </Container>
          </div>
        )}

        <Decoration
          type="light"
          shadowClassname="h-6 my-2 rounded-none"
          className="rounded-none"
          notAnimated={true}
        />
      </div>
      {hasUserName && (
        <>
          <Container className="bg-gradient-to-b from-dark to-dark-cian pb-20 overflow-hidden">
            <div>
              {user?.kit ? (
                <>
                  <UserKitArea user={user} />
                  <UserEvents user={user} />
                </>
              ) : (
                <KitsAvaliable title={true} />
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
