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
        {user?.kit?.events.map((event, index) => {
          return (
            <EventCard.Body
              key={event.title + index}
              id={event.title + index}
              className="lg:py-12 relative justify-between flex flex-col"
            >
              <div>
                <EventCard.Title title={event.title} />
                <EventCard.Hoster hoster={"João Paulo II"} />

                <EventCard.Location
                  location={event.place[0].location}
                  url_location={event.place[0].url_location}
                />
                <div className="animate-pulse bg-dark">
                  <SvgCardLine color="#ffffff" opacity="1" />
                </div>

                <EventCard.Description
                  description={
                    "Lorem ipsum dolor sit amet. Ut vero quidem et unde corrupti aut quaerat voluptatem? 33 numquam provident ab aperiam fuga ea dolores sunt rem blanditiis libero est alias architecto ex consequatur sunt"
                  }
                />
              </div>
              <EventCard.Capacity
                capacity={
                  event.max_number_of_inscriptions -
                  event.number_of_inscriptions
                }
              />
              <div className="flex flex-wrap justify-between mb-2 items-start gap-2">
                <EventCard.Category category={event.category} />
                <EventCard.Date
                  dateStart={event.date_start}
                  dateEnd={event.date_end}
                />
              </div>
            </EventCard.Body>
          );
        })}
      </div>
    </div>
  );
}
