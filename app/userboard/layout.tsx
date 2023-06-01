"use client";
import "../globals.css";
import Image from "next/image";
import Seelect_icon from "/public/icone_seelect.webp";
import useGlobalState from "@/store/menuStore";
import MainMenu from "@/components/MainMenu";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";

export const metadata = {
  title: "SEELECT",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { menuIsOpen } = useGlobalState();
  return (
    <html lang="en" className={`${menuIsOpen && "overflow-y-hidden"}`}>
      <body className={`bg-white relative min-w-screen overflow-x-hidden `}>
        {children}
      </body>
    </html>
  );
}
