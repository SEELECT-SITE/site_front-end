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
import Badge from "../Badge";

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
            <li className="border-b-2 border-dark-cian w-full hover:border-cian-700 hover:text-cian-700">
              <Link href={"/"}>
                <button
                  onClick={(e) => setMenuIsOpen(!menuIsOpen)}
                  className="flex gap-2 items-center hover:opacity-80 active:opacity-30 w-full pb-4"
                >
                  <AiFillHome />
                  Pagina Inicial
                </button>
              </Link>
            </li>
            <li className="border-b-2 border-dark-cian w-full hover:border-cian-700 hover:text-cian-700">
              <Link href={"/sobre"}>
                <button
                  onClick={(e) => setMenuIsOpen(!menuIsOpen)}
                  className="flex gap-2 items-center hover:opacity-80 active:opacity-30 w-full pb-4"
                >
                  <AiOutlineInfoCircle />
                  Sobre
                </button>
              </Link>
            </li>
            {/* <Link href={"/pacotes"}>
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
            </Link> */}
            <li className="border-b-2 border-dark-cian w-full hover:border-cian-700 hover:text-cian-700">
              <Link href={"/contato"}>
                <button
                  onClick={(e) => setMenuIsOpen(!menuIsOpen)}
                  className="flex gap-2 items-center hover:opacity-80 w-full pb-4"
                >
                  <IoIosPeople />
                  Contato
                </button>
              </Link>
            </li>

            <li className="relative">
              <Badge
                value={"EM BREVE"}
                className="-top-3 left-4 text-sm p-2 rounded-lg bg-cian-700 text-white"
              >
                <Button
                  disabled
                  className="opacity-40 btn-outline border-dark-cian hover:border-p-cian px-8 py-4 border-2 rounded-lg active:opacity-30 duration-150 w-full"
                >
                  INSCREVA-SE
                </Button>
              </Badge>
            </li>
          </ul>
        </div>

        <button
          id="animate_menu_btn"
          className="active:bg- w-10 h-full mr-2 hover:bg- hover:opacity-80 active:opacity-30 duration-150 border- cursor-pointer"
          onClick={(e) => setMenuIsOpen(!menuIsOpen)}
        >
          <MenuButton size={42} open={!menuIsOpen} />
        </button>
      </div>

      <div className="hidden lg:inline">
        <ul className="flex gap-5 text-lg text-dark font-bold ">
          <Link href="/">
            {" "}
            <li className="p-5 hover:opacity-60 hover:scale-105 active:opacity-30">
              Home
            </li>
          </Link>
          <Link href="/sobre">
            <li className="p-5 hover:opacity-60 hover:scale-105 active:opacity-30">
              Sobre
            </li>
          </Link>
          {/* <Link href="/pacotes">
            <li className="p-5 hover:opacity-60 hover:scale-105 active:opacity-30">
              Pacotes
            </li>
          </Link> */}
          <li className="p-5 hover:opacity-60 hover:scale-105 active:opacity-30">
            <Link href="/contato">Contato</Link>
          </li>
          <li className="p-2">
            <Badge
              value={"EM BREVE"}
              className="-top-3 left-4 text-sm p-2 rounded-lg bg-cian-700 text-white"
            >
              <Button
                disabled
                className="p-3 flex gap-1 items-center px-8 rounded-full m-0 bg-dark text-white"
              >
                Inscreva-se <IoMdArrowForward />
              </Button>
            </Badge>
          </li>
        </ul>
      </div>
    </>
  );
}
