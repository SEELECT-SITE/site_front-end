"use client";
import useGlobalState from "@/stores/menuStore";
import Link from "next/link";
import Button from "../Button";
import MenuButton from "../MenuButton";
import {
  AiFillHome,
  AiOutlineInfoCircle,
  AiOutlineLogin,
} from "react-icons/ai";
import { IoIosPeople, IoMdArrowForward } from "react-icons/io";
import { MdAddShoppingCart, MdShoppingCartCheckout } from "react-icons/md";

export default function MainMenu() {
  const { menuIsOpen, setMenuIsOpen } = useGlobalState();

  return (
    <>
      <div className="flex items-center lg:hidden">
        <div
          className={`duration-500 ${
            menuIsOpen ? "left-0" : "left-full "
          } min-h-screen absolute w-full top-0 bg-white flex border-l-2 border-m-dark flex-col px-4 justify-center `}
        >
          <ul className="font-bold text-dark-cian text-2xl flex flex-col  gap-y-12 h-full">
            <Link href={"/"}>
              <li className="pb-4 border-b-2 border-dark-cian w-full hover:border-cian-700 hover:text-cian-700">
                <button
                  onClick={(e) => setMenuIsOpen(!menuIsOpen)}
                  className="flex gap-2 items-center hover:opacity-80 active:scale-95 w-full"
                >
                  <AiFillHome />
                  Pagina Inicial
                </button>
              </li>
            </Link>
            <Link href={"/sobre"}>
              {" "}
              <li className="pb-4 border-b-2 border-dark-cian w-full hover:border-cian-700 hover:text-cian-700">
                <button
                  onClick={(e) => setMenuIsOpen(!menuIsOpen)}
                  className="flex gap-2 items-center hover:opacity-80 active:scale-95 w-full"
                >
                  <AiOutlineInfoCircle />
                  Sobre
                </button>
              </li>
            </Link>
            <Link href={"/pacotes"}>
              {" "}
              <li className="pb-4 border-b-2 border-dark-cian w-full hover:border-cian-700 hover:text-cian-700">
                <button
                  onClick={(e) => setMenuIsOpen(!menuIsOpen)}
                  className="flex gap-2 items-center w-full"
                >
                  <MdAddShoppingCart />
                  Pacotes
                </button>
              </li>
            </Link>
            <Link href={"/contato"}>
              <li className="pb-4 border-b-2 border-dark-cian w-full hover:border-cian-700 hover:text-cian-700">
                <button
                  onClick={(e) => setMenuIsOpen(!menuIsOpen)}
                  className="flex gap-2 items-center hover:opacity-80 active:scale-95 w-full"
                >
                  <IoIosPeople />
                  Contato
                </button>
              </li>
            </Link>

            <Link href={"/pacotes"}>
              <li>
                <Button
                  className="btn-outline border-dark-cian hover:border-p-cian px-8 py-4 border-2 rounded-lg active:scale-95 duration-150 w-full"
                  onClick={(e) => setMenuIsOpen(!menuIsOpen)}
                >
                  INSCREVA-SE
                </Button>
              </li>
            </Link>
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

      <div className="hidden lg:inline">
        <ul className="flex gap-5 text-lg text-dark font-bold ">
          <Link href="/">
            {" "}
            <li className="p-5 hover:opacity-60 hover:scale-105 active:scale-95">
              Home
            </li>
          </Link>
          <Link href="/sobre">
            <li className="p-5 hover:opacity-60 hover:scale-105 active:scale-95">
              Sobre
            </li>
          </Link>
          <Link href="/pacotes">
            <li className="p-5 hover:opacity-60 hover:scale-105 active:scale-95">
              Pacotes
            </li>
          </Link>
          <li className="p-5 hover:opacity-60 hover:scale-105 active:scale-95">
            <Link href="/contato">Contato</Link>
          </li>
          <li className="p-2">
            <Button className="p-0 rounded-full m-0 bg-dark text-white">
              <Link href="/" className="flex p-3 px-8 gap-1 items-center">
                Inscreva-se <IoMdArrowForward />
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
}
