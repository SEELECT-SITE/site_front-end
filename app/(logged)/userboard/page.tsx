"use client";
import Container from "@/components/Container";
import { useSession } from "next-auth/react";
import Text from "@/components/Text";
import Decoration from "@/components/SECTIONS/Cronograma/DecorationStripes/decoration";

import UserProfileForms from "./components/UserProfileForms";
import axios from "axios";
import { QueryClientProvider, useQuery } from "react-query";
import { queryClient } from "@/utils/queryClient";
import EventCard from "@/components/SECTIONS/Cronograma/EventsCard";
import { Session } from "next-auth";
import FloatButton from "@/components/FloatButton";
import { useState } from "react";
import { LuAlertCircle } from "react-icons/lu";
import SelectEventsModal from "./components/SelectEventsModal";
import useSelectEventsState from "./components/SelectEventsModal/selectEventsStore";
import Title from "@/components/Title";
import PriceCard from "@/components/PriceCard";
import PayKitModal from "./components/PayKitModal";
import usePayKitState from "./components/PayKitModal/PayKitModalStore";
import SmallText from "@/components/SmallText";

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
  const { isPayKitModalOpen, setIsPayKitModalOpen } = usePayKitState();

  return (
    <>
      <div className="bg-dark-cian relative">
        <Container className="">
          <Text>Bem-vindo {user?.name} </Text>
          <UserProfileForms
            token={user?.token}
            id={user?.id}
            sessionUpdate={sessionUpdate}
          />
        </Container>

        <Decoration
          type="light"
          shadowClassname="h-6 my-2 rounded-none"
          className="rounded-none"
          notAnimated={true}
        />
      </div>
      <Container className="bg-gradient-to-b from-dark to-dark-cian pb-20 overflow-hidden">
        <div>
          {user?.kit ? (
            <>
              <Text>{user?.kit.model}</Text>
              <div className="my-4">
                <FloatButton onClick={(e) => setIsPayKitModalOpen(true)}>
                  Efetuar pagamento
                </FloatButton>
                <SmallText className="flex  items-center gap-1 text-yellow-300">
                  <LuAlertCircle />
                  Se o pagamento já foi efetuado, ignore essa mensagem. O
                  pagamento será confirmado em até dois dias uteis.
                </SmallText>
              </div>

              {user?.kit?.is_payded ? (
                <></>
              ) : (
                <>
                  <FloatButton onClick={(e) => setIsSelectEventOpen(true)}>
                    {user?.kit?.events.length > 0
                      ? "Trocar de eventos"
                      : "Selecione seus eventos"}
                  </FloatButton>{" "}
                  {isPayKitModalOpen && <PayKitModal user={user} />}
                </>
              )}
              <div>
                <Text>Seus Eventos selecionados</Text>
                <div className="flex w-full gap-4 lg:px-0 py-12 lg:gap-8 flex-wrap items-strecth m-auto">
                  {user?.kit?.events.map((event, index) => {
                    return (
                      <EventCard.Body
                        key={event.title + index}
                        className="pt- pb-12"
                      >
                        <div className="pb-2 text-right">
                          <EventCard.Category
                            category={event.category}
                            className="mb-40"
                          />
                        </div>
                        <EventCard.Title title={event.title} />
                        <div
                          className="flex justify-between
                        "
                        >
                          <EventCard.Date date={Date.now()} />
                          <EventCard.Location
                            location={event.place[0].location}
                            url_location={event.place[0].url_location}
                          />
                        </div>
                        <EventCard.Capacity
                          capacity={
                            event.max_number_of_inscriptions -
                            event.number_of_inscriptions -
                            21
                          }
                        />
                      </EventCard.Body>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              <Title>Não tem kit ainda? </Title>
              <Text>Selecione um dos kit abaixo</Text>
              <div className="flex gap-4 wrap items-stretch">
                <PriceCard
                  advantage={[
                    "Todas as palestras",
                    "1 workshop",
                    "Caneca Bucks",
                  ]}
                  id={"KitGratuito"}
                  title="Kit Gratuito"
                  price={10}
                  onClick={() => {
                    setSelectedKit("basico");
                    setIsSelectEventOpen(true);
                  }}
                />
                <PriceCard
                  advantage={[
                    "Todas as palestras",
                    "1 workshop",
                    "Caneca Bucks",
                  ]}
                  id={"KitMedio"}
                  title="Kit Medio"
                  price={10}
                  onClick={() => {
                    setSelectedKit("basico");
                    setIsSelectEventOpen(true);
                  }}
                />
                <PriceCard
                  advantage={[
                    "Todas as palestras",
                    "1 workshop",
                    "Caneca Bucks",
                  ]}
                  id={"Avançado"}
                  title="Kit Avançado"
                  price={10}
                  destack={true}
                  destackText="+ Custo-beneficio"
                  onClick={() => {
                    setSelectedKit("basico");
                    setIsSelectEventOpen(true);
                  }}
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
