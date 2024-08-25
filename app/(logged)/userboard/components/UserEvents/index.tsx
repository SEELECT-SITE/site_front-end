"use client";
import { User } from "next-auth";
import EventCard from "@/components/SECTIONS/Cronograma/EventsCard";
import { SvgCardLine } from "@/components/PriceCard";
import Title from "@/components/Title";
import FloatButton from "@/components/FloatButton";
import useSelectEventsState from "../SelectEventsModal/selectEventsStore";
import { useQuery } from "react-query";
import axios from "axios";
import { DJANGO_URL } from "@/utils/consts";
import { useState } from "react";
import DeleteModal from "@/app/(logged)/admin/components/EventsAdmin.tsx/DeleteModal";
import DefaultModal from "@/components/DefaultModal";
import EventDelete from "@/components/SECTIONS/Cronograma/EventsCard/EventDelete";
import Text from "@/components/Text";
import SmallText from "@/components/SmallText";
import removeElem from "@/utils/removeElem";
import momento from "@/utils/formatDate";

export default function UserEvents({
  user,
  sessionUpdate,
}: {
  user: User;
  sessionUpdate: any;
}) {
  const { setIsSelectEventOpen, setSelectedKit } = useSelectEventsState();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [isRemoveButtonDisable, setIsRemoveButtonDisable] =
    useState<boolean>(false);
  const [removeEvent, setRemoveEvent] = useState<any>();
  const userEvents = user.kit?.events.map((elem: any) => elem.id);

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
      await axios.put(
        `${DJANGO_URL}api/kits/${user.kit?.id}/`,
        formData.toString(),
        { headers }
      );
    } catch (e) {
      console.log(e);
    } finally {
      setIsRemoveButtonDisable(false);
      setModalIsOpen(false);
      await sessionUpdate();
    }
  }
  return (
    <div>
      <DefaultModal setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen}>
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
                setModalIsOpen(false);
              }}
            />
          </div>
        )}
      </DefaultModal>
      <Title className="border-l-2 border-cian-400 pl-2 mb-4">
        Seus Eventos selecionados
      </Title>

      <FloatButton
        className="p-1"
        onClick={(e) => {
          setIsSelectEventOpen(true);
          setSelectedKit(user.kit?.model!);
        }}
      >
        {user?.kit?.events.length! > 0
          ? "Trocar de eventos"
          : "Selecione seus eventos"}
      </FloatButton>

      <div className="flex w-full gap-4 lg:px-0 py-12 lg:gap-8 flex-wrap items-strecth m-auto justify-around">
        {user?.kit?.events
          .sort(
            (a: any, b: any) =>
              //@ts-ignore

              new Date(a.date["0"].start) - new Date(b.date["0"].start)
          )
          .map((event, index) => {
            return (
              <EventCard.Body
                key={event.title + index}
                id={event.title + index}
                className="lg:py-12 relative justify-between flex flex-col"
              >
                <EventCard.Delete
                  message="Remover"
                  className="top-4"
                  onClick={(e) => {
                    setModalIsOpen(true);
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
                          key={(date?.start + date?.end, event.title)}
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
