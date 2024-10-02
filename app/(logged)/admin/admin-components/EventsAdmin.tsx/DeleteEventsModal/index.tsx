"use client";
import { useRef } from "react";
import Text from "@/components/Text";
import useDeleteModalState from "./deleteEventsModalStore";
import useAlertAdminState from "../../alertAdminStore";
import SmallText from "@/components/SmallText";
import { axiosClient } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
    <div
      onClick={(e) => {
        if (divDeleteEvent.current == e.target) {
          setIsDeleteModalOpen(false);
        }
      }}
      ref={divDeleteEvent}
      className="fixed w-full h-full flex top-0 left-0 p-4 lg:py-20 backdrop-blur-sm bg-dark/20 text-dark z-10 items-start justify-center"
    >
      <div className="flex flex-col justify-between relative overflow-hidden bg-zinc-800 text-zinc-50 rounded-md max-w-md z-10 p-4">
        <Text>Dejesa deletar o evento "{eventTitle}"?</Text>
        <div className="flex flex-col space-y-4">
          <SmallText className="text-right">
            Clique duas vezes pra deletar
          </SmallText>
          <div className="flex justify-end gap-6">
            <Button
              variant={"destructive"}
              size={"sm"}
              className="bg-red"
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
            >
              Deletar Evento
            </Button>
            <Button
              size={"sm"}
              onClick={(e) => {
                setIsDeleteModalOpen(false);
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
