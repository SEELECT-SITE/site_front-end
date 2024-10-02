"use client";
import { User } from "next-auth";
import EventCard from "@/components/SECTIONS/Cronograma/EventsCard";
import { SvgCardLine } from "@/components/PriceCard";
import Title from "@/components/Title";
import FloatButton from "@/components/FloatButton";
import useSelectEventsState from "../SelectEventsModal/selectEventsStore";
import axios from "axios";
import { useState } from "react";
import DefaultModal from "@/components/DefaultModal";
import EventDelete from "@/components/SECTIONS/Cronograma/EventsCard/EventDelete";
import Text from "@/components/Text";
import SmallText from "@/components/SmallText";
import removeElem from "@/utils/removeElem";
import { axiosClient } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import momento from "@/utils/formatDate";

const showEventsDate = process.env.NEXT_PUBLIC_OPEN_INSCRIPTIONS_DATE;

export default function UserEvents({
  user,
  sessionUpdate,
}: {
  user: User;
  sessionUpdate: any;
}) {
  const { setIsSelectEventOpen, setSelectedKit } = useSelectEventsState();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRemoveButtonDisable, setIsRemoveButtonDisable] =
    useState<boolean>(false);
  const [removeEvent, setRemoveEvent] = useState<any>();
  const { toast } = useToast();
  const userEvents = user.kit?.events.map((elem: any) => elem.id);
  const userEventsDetails =
    user.kit?.events.filter((elem) => {
      //@ts-ignore
      if (momento(showEventsDate).isBefore(elem.date["0"].start)) return elem;
    }) || [];

  async function removeEventAction() {
    setIsRemoveButtonDisable(true);
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Token: user.token,
    };
    const formData = new URLSearchParams();
    const newUserEvents = removeElem(userEvents!, removeEvent.id);
    newUserEvents?.forEach((elem) => {
      formData.append("events", elem.toString());
    });
    try {
      await axiosClient.put(`api/kits/${user.kit?.id}/`, formData.toString(), {
        headers,
      });
    } catch (e) {
      toast({
        title: "Algo deu errado",
        description: "Aguarde alguns instantes e tente novamente.",
      });
    } finally {
      setIsRemoveButtonDisable(false);
      setIsModalOpen(false);
      await sessionUpdate();
    }
  }
  return (
    <div className="mt-16">
      <DefaultModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
        {removeEvent && (
          <div className="flex flex-col justify-between relative overflow-hidden bg-white rounded-md max-w-md z-10 p-4">
            <Text className="text-dark">
              Dejesa deletar o evento {removeEvent.title.split("$")[0]}?
            </Text>
            <div className=" my-4">
              <SmallText>Clique duas vezes pra remover</SmallText>
              <EventDelete
                disabled={isRemoveButtonDisable}
                className="text-md right- relative disabled:grayscale disabled:pointer-events-none"
                title="Clique duas vezes para remover"
                onDoubleClick={(e) => removeEventAction()}
              />
            </div>
            <EventDelete
              className="text-md w-full right- relative bg-red-500 text-white hover:opacity-90"
              title="Clique duas vezes para deletar"
              message="CANCELAR"
              onClick={(e) => {
                setIsModalOpen(false);
              }}
            />
          </div>
        )}
      </DefaultModal>
      <Title className="border-l-2 border-cian-400 pl-2 mb-4">
        {userEventsDetails.length! > 0
          ? "Seus eventos selecionados"
          : "Sem eventos selecionados"}
      </Title>

      <FloatButton
        className="p-1"
        onClick={(e) => {
          setIsSelectEventOpen(true);
          setSelectedKit(user.kit?.model!);
        }}
      >
        {userEventsDetails.length! > 0
          ? "Trocar de eventos"
          : "Selecione seus eventos"}
      </FloatButton>

      <div className="flex w-full gap-4 lg:px-0 py-12 lg:gap-8 flex-wrap items-strecth m-auto justify-around">
        {userEventsDetails
          .sort(
            (a: any, b: any) =>
              //@ts-ignore
              new Date(a.date["0"].start) - new Date(b.date["0"].start)
          )
          .map((event) => {
            return (
              <EventCard.Body
                key={event.title}
                className="lg:py-12 relative justify-between flex flex-col"
              >
                <EventCard.Delete
                  message="Remover"
                  className="top-4"
                  onClick={(e) => {
                    setIsModalOpen(true);
                    setRemoveEvent(event);
                  }}
                />

                <div>
                  <EventCard.Title title={event.title.split("$")[0]} />
                  <EventCard.Hoster hoster={event.host} />

                  <EventCard.Location
                    location={event.place[0].location}
                    url_location={event.place[0].url_location}
                  />
                  <div className="animate-pulse bg-dark">
                    <SvgCardLine color="#ffffff" opacity="1" />
                  </div>

                  <EventCard.Description description={event.description} />
                </div>
                <EventCard.Capacity
                  capacity={
                    event.max_number_of_inscriptions -
                    event.number_of_inscriptions
                  }
                />
                <div className="flex flex-wrap justify-between mb-2 items-start gap-2">
                  <EventCard.Category category={event.category} />
                  <div>
                    {Object.values(event.date).map((date) => {
                      return (
                        <EventCard.Date
                          //@ts-ignore
                          key={date?.start + date?.end}
                          //@ts-ignore

                          dateStart={date?.start}
                          //@ts-ignore

                          dateEnd={date?.end}
                        />
                      );
                    })}
                  </div>
                </div>
              </EventCard.Body>
            );
          })}
      </div>
    </div>
  );
}
