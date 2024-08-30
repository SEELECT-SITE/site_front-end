"use client";
import useGlobalState from "@/stores/menuStore";
import Link from "next/link";
import Button from "../Button";
import MenuButton from "../MenuButton";
import { AiFillHome, AiOutlineInfoCircle } from "react-icons/ai";
import { IoIosPeople, IoMdArrowForward } from "react-icons/io";
import { MdAddShoppingCart } from "react-icons/md";
import momento from "@/utils/formatDate";
import { useRouter } from "next/navigation";

export default function MainMenu() {
  const { menuIsOpen, setMenuIsOpen } = useGlobalState();
  const router = useRouter();

  return (
    <>
      {/* Mobile Menu */}
      <div className="flex items-center lg:hidden">
        <div
          className={`duration-500 ${
            menuIsOpen ? "left-0" : "left-full "
          } min-h-screen absolute w-full top-0 bg-white flex border-l-2 border-m-dark flex-col px-4 justify-center `}
        >
          <ul className="font-bold text-dark-cian text-2xl flex flex-col  gap-y-12 h-full">
            <li className="">
              <button
                onClick={(e) => setMenuIsOpen(!menuIsOpen)}
                className="w-full"
              >
                <Link
                  href={"/"}
                  className="active:opacity-30 flex gap-2 items-center w-full pb-4 hover:opacity-80 border-b-2 border-dark-cian hover:border-cian-700 hover:text-cian-700"
                >
                  <AiFillHome />
                  Home
                </Link>
              </button>
            </li>

            <li className="">
              <button
                onClick={(e) => setMenuIsOpen(!menuIsOpen)}
                className="w-full"
              >
                <Link
                  href={"/sobre"}
                  className="active:opacity-30 flex gap-2 items-center w-full pb-4 hover:opacity-80 border-b-2 border-dark-cian hover:border-cian-700 hover:text-cian-700"
                >
                  <AiOutlineInfoCircle />
                  Sobre
                </Link>
              </button>
            </li>

            {momento().isBefore("2023-11-06") && (
              <li className="">
                <button
                  onClick={(e) => setMenuIsOpen(!menuIsOpen)}
                  className="w-full"
                >
                  <Link
                    href={"/pacotes"}
                    className="active:opacity-30 flex gap-2 items-center w-full pb-4 hover:opacity-80 border-b-2 border-dark-cian hover:border-cian-700 hover:text-cian-700"
                  >
                    <MdAddShoppingCart />
                    Pacotes
                  </Link>
                </button>
              </li>
            )}
            <li className="">
              <button
                onClick={(e) => setMenuIsOpen(!menuIsOpen)}
                className="w-full"
              >
                <Link
                  href={"/contato"}
                  className="active:opacity-30 flex gap-2 items-center w-full pb-4 hover:opacity-80 border-b-2 border-dark-cian hover:border-cian-700 hover:text-cian-700"
                >
                  <IoIosPeople />
                  Contato
                </Link>
              </button>
            </li>

            <li>
              <Button
                className="btn-outline border-dark-cian hover:border-p-cian px-8 py-4 border-2 rounded-lg active:opacity-30 duration-150 w-full"
                onClick={(e) => {
                  setMenuIsOpen(!menuIsOpen);
                  router.push("/login");
                }}
              >
                LOGIN
              </Button>
            </li>
          </ul>
        </div>

        <button
          id="animate_menu_btn"
          className="active:bg- w-10 h-full mr-2 hover:bg- hover:opacity-80 active:opacity-30 duration-150 cursor-pointer"
          onClick={(e) => setMenuIsOpen(!menuIsOpen)}
        >
          <MenuButton size={42} open={!menuIsOpen} />
        </button>
      </div>
      {/* Desktop Menu */}
      <div className="hidden lg:inline">
        <ul className="flex gap-5 text-lg text-dark font-bold ">
          {" "}
          <li className="flex">
            <Link
              href="/"
              className="p-5 hover:opacity-60 hover:scale-105 active:scale-95"
            >
              Home
            </Link>
          </li>
          <li className="flex">
            <Link
              href="/sobre"
              className="p-5 hover:opacity-60 hover:scale-105 active:scale-95"
            >
              Sobre
            </Link>
          </li>
          {momento().isBefore("2023-11-06") && (
            <li className="flex">
              <Link
                href="/pacotes"
                className="p-5 hover:opacity-60 hover:scale-105 active:scale-95"
              >
                Pacotes
              </Link>
            </li>
          )}
          <li className="flex">
            <Link
              href="/contato"
              className="p-5 hover:opacity-60 hover:scale-105 active:scale-95"
            >
              Contato
            </Link>
          </li>
          <li className="p-2">
            <Button
              className="rounded-full m-0 bg-dark text-white flex p-3 px-8 gap-1 items-center"
              onClick={(e) => router.push("/login")}
              disabled
            >
              Login <IoMdArrowForward />
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
}
