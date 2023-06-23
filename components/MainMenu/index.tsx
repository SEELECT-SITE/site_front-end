"use client";
import useGlobalState from "@/store/menuStore";
import Link from "next/link";
import Button from "../Button";
import MenuButton from "../MenuButton";
import {
  AiFillHome,
  AiOutlineInfoCircle,
  AiOutlineLogin,
} from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";

export default function MainMenu() {
  const { menuIsOpen, setMenuIsOpen } = useGlobalState();

  return (
    <div className="flex items-center">
      <div
        className={`duration-500 ${
          menuIsOpen ? "left-0" : "left-full "
        } min-h-screen absolute w-full top-0 bg-white flex border-l-2 border-m-dark flex-col px-4 justify-center `}
      >
        <ul className="font-bold text-dark-cian text-2xl flex flex-col  gap-y-12 h-full">
          <li className="pb-4 border-b-2 border-dark-cian w-full">
            <Link href={"/"}>
              <button
                onClick={(e) => setMenuIsOpen(!menuIsOpen)}
                className="flex gap-2 items-center hover:opacity-80 active:scale-95"
              >
                <AiFillHome />
                Pagina Inicial
              </button>
            </Link>
          </li>
          <li className="pb-4 border-b-2 border-dark-cian w-full">
            <Link href={"/sobre"}>
              <button
                onClick={(e) => setMenuIsOpen(!menuIsOpen)}
                className="flex gap-2 items-center hover:opacity-80 active:scale-95"
              >
                <AiOutlineInfoCircle />
                Sobre
              </button>
            </Link>
          </li>
          <li className="pb-4 border-b-2 border-dark-cian w-full">
            <Link href={"/contato"}>
              <button
                onClick={(e) => setMenuIsOpen(!menuIsOpen)}
                className="flex gap-2 items-center hover:opacity-80 active:scale-95"
              >
                <IoIosPeople />
                Contato
              </button>
            </Link>
          </li>
          <li className="pb-4 border-b-2 border-dark-cian w-full">
            <Link href={"/login"}>
              <button
                onClick={(e) => setMenuIsOpen(!menuIsOpen)}
                className="flex gap-2 items-center hover:opacity-80 active:scale-95"
              >
                <AiOutlineLogin />
                Login
              </button>
            </Link>
          </li>

          <li>
            <Link href={"/pacotes"}>
              <Button
                className="btn-outline border-dark-cian hover:border-p-cian px-8 py-4 border-2 rounded-lg active:scale-95 duration-150 w-full"
                onClick={(e) => setMenuIsOpen(!menuIsOpen)}
              >
                INSCREVA-SE
              </Button>
            </Link>
          </li>
        </ul>
      </div>

      <button
        id="animate_menu_btn"
        className="active:bg- w-10 h-full mr-2 hover:bg- hover:opacity-80 active:scale-95 duration-150 border- cursor-pointer"
        onClick={(e) => setMenuIsOpen(!menuIsOpen)}
      >
        <MenuButton size={42} open={!menuIsOpen} />
      </button>
    </div>
  );
}
