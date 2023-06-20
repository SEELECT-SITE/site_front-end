"use client";
import useGlobalState from "@/store/menuStore";
import Link from "next/link";
import Button from "../Button";
import MenuButton from "../MenuButton";

export default function MainMenu() {
  const { menuIsOpen, setMenuIsOpen } = useGlobalState();

  return (
    <div className="flex items-center">
      {/* <div className="flex items-center text-base duration-200 text-gray-200  active:bg- hover:bg- hover:text-blue-gray-300 border- cursor-pointer">
        {session ? (
          <Link href="/userboard">
            <div className="rounded-full overflow-hidden border-2">
              <Image
                alt="teste"
                src={session?.user?.image as string}
                width={36}
                height={36}
              />
            </div>
          </Link>
        ) : (
          <Link href="/login">
            <HiUserCircle size={36} />
          </Link>
        )}
      </div> */}

      <div
        className={`duration-500 ${
          menuIsOpen ? "left-0" : "left-full"
        } min-h-screen absolute w-full top-0 bg-m-dark flex flex-col items-center justify-center`}
      >
        <ul className="font-bold text-l-cian text-4xl flex flex-col gap-y-12 h-full items-center">
          <li className="">SOBRE</li>
          <li className="">WORKSHOPS</li>
          <li className="">PALESTRAS</li>
          <li className="">VISITAS TECNICAS</li>
          <li>
            <button onClick={(e) => setMenuIsOpen(!menuIsOpen)}>
              <Link href="./pacotes">PACOTES</Link>
            </button>
          </li>

          <li className="">
            <Link href={"/login"}>
              <Button className="btn-outline hover:border-p-cian px-8 py-4 border-2 rounded-lg active:scale-95 duration-150">
                INSCREVA-SE
              </Button>
            </Link>
          </li>
        </ul>
      </div>

      <button
        id="animate_menu_btn"
        className="active:bg- w-10 h-full hover:bg- hover:opacity-80 active:scale-95 duration-150 border- cursor-pointer"
        onClick={(e) => setMenuIsOpen(!menuIsOpen)}
      >
        <MenuButton size={40} open={!menuIsOpen} />
      </button>
    </div>
  );
}
