"use client";
import { twMerge } from "tailwind-merge";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Session, User } from "next-auth";
import axios from "axios";
import EventCard from "@/components/SECTIONS/Cronograma/EventsCard";
import removeElem from "@/utils/removeElem";
import FloatButton from "@/components/FloatButton";
import Text from "@/components/Text";
import useSelectEventsState from "./PayKitModalStore";
import QRCode from "qrcode.react";
import usePayKitState from "./PayKitModalStore";
import generatePix from "@/utils/generatePix";
import Input from "@/components/Input";
import formatCurrency from "@/utils/formatCurrency";
import { MdClose } from "react-icons/md";
import { LuAlertCircle } from "react-icons/lu";

interface PayKitModalProps {
  className?: string;
  children?: ReactNode;
  user: User;
  sessionUpdate?: Function;
}

export default function PayKitModal({
  className,
  children,
  user,
  sessionUpdate,
}: PayKitModalProps) {
  const divPayKit = useRef<HTMLDivElement | null>(null);
  const { isPayKitModalOpen, setIsPayKitModalOpen } = usePayKitState();
  const value = user?.kit?.model == "basico" ? "23" : "10";
  const pixCode = generatePix(
    "seelect@ufc.br",
    "Maria Augusta Simonetti",
    "Fortaleza",
    value,
    user?.id!
  );
  const descont = user.descont ?? 0.22;
  return (
    <div
      onClick={(e) => {
        if (divPayKit.current == e.target) {
          setIsPayKitModalOpen(false);
        }
      }}
      ref={divPayKit}
      className="fixed w-full h-full flex top-0 left-0 p-4 bg-dark/20 text-dark z-10 items-start justify-center"
    >
      <div className="flex flex-col justify-between max-w-md bg-white rounded-md p-3 ">
        <div className="flex justify-between w-full py-4 items-start">
          <div className="">
            <Text className="font-bold">O Valor do Kit é</Text>
            <div className="bg-dark-cian text-center text-2xl p-2 font-bold text-white mt-1 w-full rounded-md">
              {formatCurrency(parseFloat(value) / (1 + descont))}
            </div>
          </div>
          <button
            onClick={(e) => setIsPayKitModalOpen(false)}
            className="rounded-full border border-slate-900 p-1 text-red-600 hover:bg-slate-900 hover:text-red-400 shadow-md"
          >
            <MdClose size={20} />
          </button>
        </div>
        {user.descont != 0 && (
          <div className="inline-flex bg-slate-900 rounded-md text-yellow-200 items-center gap-1 p-1 my-2">
            <span>
              <LuAlertCircle size={18} />
            </span>{" "}
            Desconto de {descont * 100}% já aplicado
          </div>
        )}
        <div className="p-2 border-cian-400 border-2 shadow-md shadow-black/50">
          <QRCode size={280} value={pixCode} />
        </div>
        <div className="mt-3 mb-0">
          <div className="h-1 w-full bg-slate-900 translate-y-3 "></div>
          <div className="-translate-y-2 flex w-full justify-center">
            <Text className="p-1 bg-white  text-center z-10 center">
              ou copie o código
            </Text>
          </div>
        </div>
        <Input value={pixCode} />
      </div>
    </div>
  );
}
