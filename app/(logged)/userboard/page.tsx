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

function Userboard({
  session,
  sessionUpdate,
}: {
  session: Session;
  sessionUpdate: any;
}) {
  const { data: events, isLoading } = useQuery<any | undefined>(
    "Places",
    async () => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Token: session.user?.token,
      };

      try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/events/`, {
          headers,
        });
        return data.results;
      } catch (error) {
        console.log(error);
      }
    }
  );

  function removeElem(v: number[] | undefined, matchId: number) {
    const array = v.filter((elem) => {
      if (elem === matchId) {
        return;
      } else {
        return elem;
      }
    });
    return array;
  }

  const { user } = session;
  const v = user?.kit?.events;
  const model = user?.kit?.model;
  var ids = v?.map((elem) => {
    return elem.id;
  });
  async function removeEvent(id: number) {
    const newids = ids ? removeElem(ids, id) : [];
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Token: user?.token,
    };
    const formData = new URLSearchParams();
    newids?.forEach((elem) => {
      formData.append("events", elem.toString());
    });
    formData.append("model", model as string);
    try {
      await axios.put(
        "http://127.0.0.1:8000/api/kits/3/",
        formData.toString(),
        { headers }
      );
      sessionUpdate();
    } catch (e) {}
  }

  return (
    <>
      <div className="bg-dark-cian">
        <Container className="">
          <Text>Bem-vindo {user?.name} </Text>
          <UserProfileForms token={user?.token} id={user?.id} />
        </Container>

        <Decoration
          type="light"
          shadowClassname="h-6 my-2 rounded-none"
          className="rounded-none"
          notAnimated={true}
        />
      </div>
      <Container className="bg-gradient-to-b from-dark to-dark-cian pb-20 overflow-hidden">
        <div className="flex w-full gap-4 lg:px-0 py-12 lg:gap-8 flex-wrap items-strecth m-auto">
          {user?.kit?.events.map((event, index) => {
            return (
              <EventCard.Body key={event.title + index}>
                <EventCard.CloseEvent
                  onClick={(e) => {
                    removeEvent(event.id);
                  }}
                />
                <EventCard.Title title={event.title} />
                <EventCard.Location
                  location={event.place[0].location}
                  url_location={event.place[0].url_location}
                />
              </EventCard.Body>
            );
          })}
        </div>
      </Container>
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
