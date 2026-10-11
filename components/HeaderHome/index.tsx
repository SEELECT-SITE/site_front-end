"use client";
import Image from "next/image";
import Link from "next/link";
import Seelect_icon from "@/public/icone_seelect-light-cian.webp";
import MainMenu from "../MainMenu";
import useHeaderOpen from "@/hooks/useHeaderOpen";

const HeaderHome = () => {
  const isHeaderOpen = useHeaderOpen();
  return (
    <header
      className={`w-full fixed z-50 duration-300 ${
        isHeaderOpen ? "-translate-y-0" : "-translate-y-48"
      }`}
    >
      <div className="w-full absolute bg-white z-50 m-auto flex justify-between px-4 py-1 lg:px-12 lg:py-0 xl:px-16 2xl:px-24 items-center top-0 left-0 shadow-md shadow-black/30">
        <Link href="/" className="">
          <div className="w-14 lg:w-24">
            <Image
              width={160}
              src={Seelect_icon}
              alt="icone seelect"
              className="w-full h-auto hover:drop-shadow-icon-sm hover:-translate-x-0.5 hover:-translate-y-0.5 duration-150"
            />
          </div>
        </Link>
        <MainMenu />
      </div>
    </header>
  );
};

export default HeaderHome;
