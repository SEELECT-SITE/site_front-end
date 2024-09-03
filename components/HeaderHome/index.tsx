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
      <div className="w-full absolute bg-white z-50 m-auto flex justify-between p-4 lg:px-12 xl:px-16 2xl:px-24 items-center top-0 left-0 shadow-md shadow-black/30">
        <Link href="/" className="">
          <div className="w-12 lg:w-16">
            <Image
              width={64}
              src={Seelect_icon}
              alt="icone seelect"
              className="hover:drop-shadow-icon-sm hover:-translate-x-0.5 hover:-translate-y-0.5 duration-150"
            />
          </div>
        </Link>
        <MainMenu />
      </div>
    </header>
  );
};

export default HeaderHome;
