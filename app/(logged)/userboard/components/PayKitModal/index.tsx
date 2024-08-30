"use client";
import { ReactNode, useRef, useState } from "react";
import { User } from "next-auth";
import Text from "@/components/Text";
import QRCode from "qrcode.react";
import usePayKitState from "./PayKitModalStore";
import generatePix from "@/utils/generatePix";
import Input from "@/components/Input";
import formatCurrency from "@/utils/formatCurrency";
import { MdClose, MdContentCopy } from "react-icons/md";
import { LuAlertCircle } from "react-icons/lu";
import Image from "next/image";
import squares_deco from "@/public/SVG/squares-deco.svg";
import copyClipboard from "@/utils/copyClipboard";
import useAlertAdminState from "@/app/(logged)/admin/components/alertAdminStore";

interface PayKitModalProps {
  user: User;
}

export default function PayKitModal({ user }: PayKitModalProps) {
  const divPayKit = useRef<HTMLDivElement | null>(null);
  const [isPixCopied, setIsPixCopied] = useState<boolean>(false);
  const { setIsPayKitModalOpen } = usePayKitState();
  //@ts-ignore
  const discount = user.kit?.discount ?? 0.0;
  const value = formatCurrency(
    user.kit?.model_detail.price! * (1 - discount / 100)
  )
    .replace(",", ".")
    .slice(3);
  const pixCode = generatePix(
    "seelect@ufc.br",
    "Maria Augusta Simonetti",
    "Fortaleza",
    value ?? "25.00",
    `ID${user.id}Kit${user?.kit!.model}`
  );

  return (
    <div
      onClick={(e) => {
        if (divPayKit.current == e.target) {
          setIsPayKitModalOpen(false);
        }
      }}
      ref={divPayKit}
      className="fixed left-0 top-0 z-10 flex h-full w-full items-start justify-center bg-dark/20 p-4 text-dark backdrop-blur-sm"
    >
      <div className="relative z-10 flex max-w-md flex-col justify-between overflow-hidden rounded-md bg-white">
        <div className="absolute right-0 top-0 -z-10 -translate-y-1/2 translate-x-1/2">
          <Image src={squares_deco} alt="decoration" />
        </div>
        <div
          className={`absolute left-0 top-0 z-10 w-full rounded-b-lg border-2 border-slate-300 bg-slate-800 py-3 text-center text-2xl text-white duration-200 ${
            isPixCopied ? "-translate-y-1" : "-translate-y-full"
          }`}
        >
          Código PIX Copiado
        </div>

        <div className="bg-white/20 p-3 backdrop-blur-[2px]">
          <div className="flex w-full items-start justify-between py-4">
            <div className="">
              <Text className="font-bold">O Valor do Kit é</Text>
              <div className="mt-1 w-full rounded-md bg-dark-cian p-2 text-center text-2xl font-bold text-white">
                {formatCurrency(parseFloat(value))}
              </div>
            </div>

            <button
              onClick={(e) => setIsPayKitModalOpen(false)}
              className="rounded-full border border-slate-900 p-1 text-red-600 shadow-md hover:bg-slate-900 hover:text-red-400"
            >
              <MdClose size={20} />
            </button>
          </div>
          {user.kit?.discount != 0 && (
            <div className="my-2 inline-flex items-center gap-1 rounded-md bg-slate-900 p-1 text-yellow-200">
              <span>
                <LuAlertCircle size={18} />
              </span>{" "}
              Desconto de {discount}% já aplicado
            </div>
          )}
          <div className="aspect-square border-2 border-cian-400 bg-white p-2 shadow-md shadow-black/50">
            <QRCode size={300} value={pixCode} />
          </div>
          <div className="mb-0 mt-3">
            <div className="h-1 w-full translate-y-3 bg-slate-900"></div>
            <div className="flex w-full -translate-y-2 justify-center">
              <Text className="center z-10 bg-white p-1 text-center">
                ou copie o código
              </Text>
            </div>
          </div>
          <div className="relative rounded-lg border-2 border-black bg-black">
            <button
              className="absolute right-0 top-1/2 z-10 flex h-full w-1/6 -translate-y-1/2 items-center justify-center rounded-br-lg rounded-tr-lg border-l bg-white hover:opacity-90"
              onClick={(e) => {
                copyClipboard(pixCode);
                setIsPixCopied(true);
                setTimeout(() => {
                  setIsPixCopied(false);
                }, 2000);
              }}
            >
              <MdContentCopy size={20} />
            </button>
            <Input
              id={"qrCodeInput"}
              value={pixCode}
              className="my-0 border-none"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}
