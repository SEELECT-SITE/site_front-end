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
    <>
      <html lang="en" className={`${menuIsOpen && "overflow-y-hidden"}`}>
        <body className={`bg-white relative min-w-screen overflow-x-hidden `}>
          <header className="w-full h-36 bg-teal-900 shadow-lg shadow-black/80">
            <div className="w-full absolute z-50 m-auto flex justify-between p-6 items-center top-0 left-0">
              <div>
                <Link href="./">
                  <Image
                    src={Seelect_icon}
                    alt="icone seelect"
                    width={64}
                    height={64}
                  />
                </Link>
              </div>
              <MainMenu />
            </div>
          </header>
          {children}
        </body>
      </html>
    </>
  );
}
