"use client";
import Image from "next/image";
import Seelect_icon from "@/public/icone-seelect-white.webp";
import MainMenu from "@/components/MainMenu";
import Link from "next/link";

export const metadata = {
  title: "Pacotes",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

export default function PacotesPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        pacotes
      </div>
    </>
  );
}