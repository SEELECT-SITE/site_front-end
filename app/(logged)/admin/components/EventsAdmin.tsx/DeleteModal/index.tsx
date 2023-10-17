"use client";
import { ReactNode, useRef, useState } from "react";
import { User } from "next-auth";
import Text from "@/components/Text";
import QRCode from "qrcode.react";
import generatePix from "@/utils/generatePix";
import Input from "@/components/Input";
import formatCurrency from "@/utils/formatCurrency";
import { MdClose, MdContentCopy } from "react-icons/md";
import { LuAlertCircle } from "react-icons/lu";
import Image from "next/image";
import squares_deco from "@/public/SVG/squares-deco.svg";
import copyClipboard from "@/utils/copyClipboard";
import useDeleteModalState from "./deleteModalStore";
import EventDelete from "@/components/SECTIONS/Cronograma/EventsCard/EventDelete";
import axios from "axios";
import { DJANGO_URL } from "@/utils/consts";
import Alert from "@/components/Alert";
import useAlertAdminState from "../../alertAdminStore";
import SmallText from "@/components/SmallText";

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
      await axios.delete(`${DJANGO_URL}api/events/${eventDeleteID}`, {
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
                  triggerFn();
                  setAlertMsg("Evento deletado");
                  setIsAlertAdminOpen(true);

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
