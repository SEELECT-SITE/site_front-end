"use client";
import Image from "next/image";
import Link from "next/link";
import Seelect_icon from "@/public/icone_seelect-light-cian.webp";
import MainMenu from "../MainMenu";

const HeaderHome = () => {
  return (
    <header className={`w-full max-w-xl fixed z-50 -translate-y-1`}>
      <div className="w-full absolute bg-white z-50 m-auto flex justify-between p-4 items-center top-0 left-0 shadow-md shadow-black/30">
        <Link href="/">
          <Image
            src={Seelect_icon}
            alt="icone seelect"
            width={52}
            className="hover:drop-shadow-icon-sm hover:-translate-x-0.5 hover:-translate-y-0.5 duration-150"
          />
        </Link>
        <MainMenu />
      </div>
    </header>
  );
};

export default HeaderHome;
