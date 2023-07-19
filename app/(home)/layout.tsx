"use client";
import Image from "next/image";
import Seelect_icon from "@/public/icone_seelect-light-cian.webp";
import MainMenu from "@/components/MainMenu";
import Link from "next/link";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <body className={`bg-dark relative min-w-screen overflow-x-hidden `}>
        <header className="w-full fixed z-50">
          <div className="w-full absolute bg-white z-50 m-auto flex justify-between p-4 items-center top-0 left-0 shadow-lg  shadow-black/80">
            <Link href="#">
              <Image
                src={Seelect_icon}
                alt="icone seelect"
                width={52}
                className="hover:drop-shadow-icon-sm hover:-translate-x-1 hover:-translate-y-1 duration-150"
              />
            </Link>
            <MainMenu />
          </div>
        </header>
        <main className="flex flex-col items-center justify-between text-white pt-36">
          {children}
        </main>
      </body>
    </>
  );
}
