"use client";
import { User } from "next-auth";
import EventCard from "@/components/SECTIONS/Cronograma/EventsCard";
import { SvgCardLine } from "@/components/PriceCard";
import Title from "@/components/Title";
import FloatButton from "@/components/FloatButton";
import useSelectEventsState from "../SelectEventsModal/selectEventsStore";

export default function UserEvents({ user }: { user: User }) {
  const { setIsSelectEventOpen, setSelectedKit } = useSelectEventsState();
  return (
    <div>
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
