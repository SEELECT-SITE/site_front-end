"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Seelect_icon from "@/public/icone_seelect-light-cian.webp";
import { MdLogout } from "react-icons/md";

export default function UserboardHeader() {
  const router = useRouter();

  return (
    <header className="w-full bg-white flex justify-between p-4 lg:px-12 xl:px-16 2xl:px-24 items-center  shadow-md shadow-black/30 text-dark">
      <Link href="/userboard" className="" title="Voltar ao userboard">
        <div className="w-12 lg:w-16">
          <Image
            width={64}
            src={Seelect_icon}
            alt="icone seelect"
            className="hover:drop-shadow-icon-sm hover:-translate-x-0.5 hover:-translate-y-0.5 duration-150"
          />
        </div>
      </Link>
      <ul className="font-bold text-dark-cian flex ">
        <li>
          <button
            className="border font-bold border-red-400 px-2.5 py-1.5 rounded-full hover:bg-red-400 hover:text-white duration-100 hover:shadow-lg flex items-center gap-1"
            onClick={() => {
              signOut({ callbackUrl: "/login" });
            }}
          >
            Sair <MdLogout />
          </button>
        </li>{" "}
      </ul>
    </header>
  );
}
