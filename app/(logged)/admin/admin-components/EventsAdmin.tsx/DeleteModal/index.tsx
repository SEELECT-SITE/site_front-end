"use client";
import { useRef } from "react";
import Text from "@/components/Text";
import useDeleteModalState from "./deleteModalStore";
import EventDelete from "@/components/SECTIONS/Cronograma/EventsCard/EventDelete";
import axios from "axios";
import useAlertAdminState from "../../alertAdminStore";
import SmallText from "@/components/SmallText";
import { axiosClient } from "@/lib/utils";

export default function DeleteModal({
  token,
  triggerFn,
}: {
  token?: string;
  triggerFn: Function;
}) {
  const divDeleteEvent = useRef<HTMLDivElement | null>(null);
  const { setIsDeleteModalOpen, eventTitle, eventDeleteID } =
    useDeleteModalState();
  const { setIsAlertAdminOpen, setAlertMsg } = useAlertAdminState();

  async function deleteEvent() {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Token: token,
    };
    try {
      await axiosClient.delete(`api/events/${eventDeleteID}/`, {
        headers,
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div
        onClick={(e) => {
          if (divDeleteEvent.current == e.target) {
            setIsDeleteModalOpen(false);
          }
        }}
        ref={divDeleteEvent}
        className="fixed w-full h-full flex top-0 left-0 p-4 backdrop-blur-sm bg-dark/20 text-dark z-10 items-start justify-center"
      >
        <div className="flex flex-col justify-between relative overflow-hidden bg-white rounded-md max-w-md z-10 p-4">
          <Text className="text-dark">
            Dejesa deletar o evento{eventTitle}?
          </Text>
          <div className=" my-4">
            <SmallText>Clique duas vezes pra deletar</SmallText>
            <EventDelete
              className="text-md right- relative"
              title="Clique duas vezes para deletar"
              onDoubleClick={async (e) => {
                try {
                  await deleteEvent();
                  setIsAlertAdminOpen(true);
                  triggerFn();
                  setAlertMsg("Evento deletado");
                  setIsDeleteModalOpen(false);
                } catch (e) {
                  setAlertMsg("Erro Inesperado");
                  setIsAlertAdminOpen(true);
                  setIsDeleteModalOpen(false);
                } finally {
                  setTimeout(() => {
                    setAlertMsg("");
                    setIsAlertAdminOpen(false);
                  }, 4000);
                }
              }}
            />
          </div>
          <EventDelete
            className="text-md w-full right- relative bg-red-500 text-white hover:opacity-90"
            title="Clique duas vezes para deletar"
            message="CANCELAR"
            onClick={(e) => {
              setIsDeleteModalOpen(false);
            }}
          />
        </div>
      </div>
    </>
  );
}