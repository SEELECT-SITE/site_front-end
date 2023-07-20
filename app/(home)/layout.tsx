"use client";
import Image from "next/image";
import Seelect_icon from "@/public/icone_seelect-light-cian.webp";
import MainMenu from "@/components/MainMenu";
import Link from "next/link";
import { cafeFont } from "../fonts";
import useScrollDirection from "@/hooks/useScrollDirection";
import HomeHeader from "@/components/HomeHeader";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <body
        className={`bg-dark relative min-w-screen overflow-x-hidden ${cafeFont.className}`}
      >
        <HomeHeader />
        <main className="flex flex-col items-center justify-between text-white pt-36">
          {children}
        </main>
      </body>
    </>
  );
}
