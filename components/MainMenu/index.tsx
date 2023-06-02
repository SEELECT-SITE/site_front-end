"use client";
import UseAnimations from "react-useanimations";
import menu4 from "react-useanimations/lib/menu4";
import { HiUserCircle } from "react-icons/hi";
import useGlobalState from "@/store/menuStore";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function MainMenu() {
  const { menuIsOpen, setMenuIsOpen } = useGlobalState();
  const { data: session } = useSession();

  return (
    <div className="flex items-center">
      <div className="flex items-center text-base duration-200 text-gray-200 active:bg- hover:bg- hover:text-blue-gray-300 border- cursor-pointer">
        {session ? (
          <Link href="/userboard">
            <div className="rounded-full">
              <Image
                alt="teste"
                src={session?.user?.image as string}
                width={44}
                height={44}
              />
            </div>
          </Link>
        ) : (
          <Link href="/login">
            <HiUserCircle size={36} />
          </Link>
        )}
      </div>

      <div
        className={`duration-500 ${
          menuIsOpen ? "left-0" : "left-full"
        } min-h-screen absolute w-full top-0 bg-gray-950 flex flex-col items-center justify-center`}
      >
        <ul className="font-bold text-4xl flex flex-col gap-y-12 h-full items-center">
          <li className="text-gray-100">SOBRE</li>
          <li className="text-gray-100">WORKSHOPS</li>
          <li className="text-gray-100">PALESTRAS</li>
          <li className="text-gray-100">VISITAS TECNICAS</li>
          <li className="text-gray-100">
            <button className="btn-outline px-8 py-4 border-2 rounded-lg active:scale-95 duration-150">
              INSCREVA-SE
            </button>
          </li>
        </ul>
      </div>

      <button className="text-blue-gray-300 active:bg- hover:bg- hover:opacity-80 active:scale-95 duration-150 border- cursor-pointer">
        <UseAnimations
          strokeColor="rgb(233, 232, 232)"
          fillColor="#fff"
          onClick={(e) => setMenuIsOpen(!menuIsOpen)}
          speed={1.5}
          animation={menu4}
          size={54}
          className={`duration-200 ${menuIsOpen && "bg"}`}
        />
      </button>
    </div>
  );
}
