"use client";
import Image from "next/image";
import Seelect_icon from "/public/icone_seelect.webp";
import useGlobalState from "@/store/menuStore";
import MainMenu from "@/components/MainMenu";
import Link from "next/link";
import { bebasFont } from "../fonts";

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
          <header className="w-full h-40 ">
            <div className="w-full absolute bg-teal-900 z-50 m-auto flex justify-between py-6 px-3 items-center top-0 left-0 shadow-lg  shadow-black/80">
              <Link href="./">
                <div className="text-center tracking-wide">
                  {" "}
                  <Image
                    src={Seelect_icon}
                    alt="icone seelect"
                    width={48}
                    height={48}
                  />
                  <h1
                    className={`${bebasFont.className} text-sm text-gray-100`}
                  >
                    SEELECT
                  </h1>
                </div>
              </Link>

              <MainMenu />
            </div>
          </header>
          {children}
        </body>
      </html>
    </>
  );
}
