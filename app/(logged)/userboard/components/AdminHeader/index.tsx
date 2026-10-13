"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Seelect_icon from "@/public/icone_seelect-light-cian.webp";
import { MdLogout } from "react-icons/md";

export default function AdminHeader() {
  return (
    <header className="w-full absolute bg-white z-50 m-auto flex justify-between px-4 py-1 lg:px-12 lg:py-0 xl:px-16 2xl:px-24 items-center top-0 left-0 shadow-md shadow-black/30">
      <Link href="/admin" className="" title="Voltar ao userboard">
        <div className="w-14 lg:w-24">
          <Image
            width={160}
            src={Seelect_icon}
            alt="icone seelect"
            className="hover:drop-shadow-icon-sm hover:-translate-x-0.5 hover:-translate-y-0.5 duration-150"
          />
        </div>
      </Link>
      <ul className="font-bold text-dark-cian flex items-center">
        <li className="flex">
          <Link
            href="/admin/kits-table"
            className="p-5 hover:opacity-60 hover:scale-105 active:scale-95"
          >
            Kits
          </Link>
        </li>
        <li className="flex">
          <Link
            href="/admin/attendance"
            className="p-5 hover:opacity-60 hover:scale-105 active:scale-95"
          >
            Presenças
          </Link>
        </li>
        <li className="flex">
          <Link
            href="/admin/events"
            className="p-5 hover:opacity-60 hover:scale-105 active:scale-95"
          >
            Eventos
          </Link>
        </li>
        <li>
          <button
            className="border font-bold border-red-400 px-2.5 py-1.5 rounded-full hover:bg-red-400 hover:text-white duration-100 hover:shadow-lg flex items-center gap-1"
            onClick={() => {
              signOut({ callbackUrl: "/login" });
            }}
          >
            Sair <MdLogout />
          </button>
        </li>
      </ul>
    </header>
  );
}
