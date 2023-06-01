"use client";
import UseAnimations from "react-useanimations";
import menu4 from "react-useanimations/lib/menu4";
import { Button, IconButton } from "@material-tailwind/react";
import { HiUserCircle } from "react-icons/hi";
import useGlobalState from "@/store/menuStore";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function MainMenu() {
  const { menuIsOpen, setMenuIsOpen } = useGlobalState();
  const { data: session } = useSession();

  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center text-base duration-200 text-gray-200 active:bg- hover:bg- hover:text-blue-gray-300 border- cursor-pointer">
        {session ? (
          <Link href="/userboard">
            <div className="overflow-hidden rounded-full">
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
            <div className="text-lg flex gap-2 items-center">
              Login
              <HiUserCircle size={36} />
            </div>
          </Link>
        )}
      </div>

      <div
        className={`duration-500 ${
          menuIsOpen ? "left-0" : "left-full"
        } min-h-screen absolute w-full top-0 bg-blue-gray-800 flex flex-col items-center justify-center`}
      >
        <ul className="font-bold text-4xl flex flex-col gap-y-12 h-full items-center">
          <li className="text-gray-100">SOBRE</li>
          <li className="text-gray-100">WORKSHOPS</li>
          <li className="text-gray-100">PALESTRAS</li>
          <li className="text-gray-100">VISITAS TECNICAS</li>
          <li className="text-gray-100">
            <Button className="text-4xl" variant="outlined">
              INSCREVA-SE
            </Button>{" "}
          </li>
        </ul>
      </div>
      <div className="cursor-pointer">
        <IconButton
          variant="text"
          className="duration-200 text-blue-gray-300 active:bg- hover:bg- hover:opacity-80 border-"
        >
          <UseAnimations
            strokeColor="rgb(233, 232, 232)"
            fillColor="#fff"
            onClick={(e) => setMenuIsOpen(!menuIsOpen)}
            speed={1}
            animation={menu4}
            size={54}
            className={`duration-200 ${menuIsOpen && "bg"}`}
          />
        </IconButton>
      </div>
    </div>
  );
}
