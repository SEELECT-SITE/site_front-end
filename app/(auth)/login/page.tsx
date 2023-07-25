import Image from "next/image";
import logoSeelect from "@/public/icone-seelect-white.webp";
import Link from "next/link";
import Container from "@/components/Container";
import Text from "@/components/Text";
import { FcGoogle } from "react-icons/fc";
import Input from "@/components/Input";
import FloatButton from "@/components/FloatButton";

import loginBg from "@/public/login_bg.png";

export const metadata = {
  title: "Login",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

export default function Login() {
  return (
    <>
      <div className="w-full h-screen lg:flex lg:flex-row-reverse">
        <aside className="relative w-full h-20 overflow-hidden flex justify-end lg:justify-center lg:items-center lg:h-full lg:px-0">
          <Link
            href="/"
            className="group lg:rounded-full bg-cian-400 flex items-center aspect-square lg:bg-cian-700/20 backdrop-blur-sm max-w-xs p-3 lg:p-8 lg:absolute lg:z-10"
            title="home"
          >
            <Image
              src={logoSeelect}
              alt="logo"
              className="duration-200 min-w-12 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:drop-shadow-icon-sm"
            />
          </Link>
          <div className="flex items-center h-full">
            <Image
              src={loginBg}
              alt="login background"
              className="min-h-full object-cover"
            />
          </div>

          {/* <Decoration
            shadowClassname="rounded-none lg:absolute right-0 lg:w-full lg:h-full"
            className="rounded-none"
          /> */}
        </aside>

        <div className="w-full mt-6 h-full lg:mt-0 bg-white lg:w-1/2  lg:border-r-4 border-black overflow-hidden m-auto">
          <Container className="w-full m-auto max-w-lg 2xl:p-8">
            <form action="" className="w-full max-w-sm m-auto">
              <div>
                <h1
                  className={`text-3xl lg:mb-1 font-bold tracking-wide lg:text-4xl xl:text-5xl`}
                >
                  Login
                </h1>
                <Text>Digite suas credenciais</Text>
              </div>

              <fieldset className="py-4">
                <Input />
              </fieldset>
              <fieldset className="py-4">
                <Input />
              </fieldset>
              <FloatButton
                className="bg-cian-700 lg:text-lg text-white"
                shadowClassname="w-full bg-black/80 mt-4"
              >
                Entrar
              </FloatButton>
            </form>
            <div className="flex flex-wrap w-full max-w-sm m-auto justify-between mt-2 ">
              <Link
                href="#"
                className="hover:underline text-black/70 text-sm pr-4 hover:text-black"
              >
                <b>Esquece sua senha?</b>
              </Link>
              <Link
                href="#"
                className="hover:underline text-black/70 text-sm hover:text-black"
              >
                Não tem conta? <b>Cadastre-se</b>
              </Link>
            </div>
            <div className="w-full max-w-sm m-auto border-t-2 border-black mt-8 relative">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-4">
                ou
              </span>
              <FloatButton
                className="bg-white border lg:text-lg items-center border-black flex text-dark"
                shadowClassname="w-full bg-black/80 mt-4"
              >
                Entrar com Google <FcGoogle size={20} />
              </FloatButton>
            </div>
          </Container>

          <div className="mt-12">
            <div className="w-2-full lg:animate-login-deco overflow-hidden text-2xl whitespace-nowrap">
              - SEELECT <b> - SEELECT </b>- SEELECT <b> - SEELECT </b>- SEELECT{" "}
              <b> - SEELECT </b>- SEELECT <b> - SEELECT </b>- SEELECT - SEELECT{" "}
              <b> - SEELECT </b>- SEELECT <b> - SEELECT </b>- SEELECT{" "}
            </div>
            <div
              style={{ animationDelay: "-1000ms" }}
              className="w-2-full lg:animate-login-deco overflow-hidden text-2xl whitespace-nowrap opacity-80"
            >
              - SEELECT <b> - SEELECT </b>- SEELECT <b> - SEELECT </b>- SEELECT{" "}
              <b> - SEELECT </b>- SEELECT <b> - SEELECT </b>- SEELECT - SEELECT{" "}
              <b> - SEELECT </b>- SEELECT <b> - SEELECT </b>- SEELECT{" "}
            </div>
            <div
              style={{ animationDelay: "-2000ms" }}
              className="w-2-full lg:animate-login-deco overflow-hidden text-2xl whitespace-nowrap opacity-60"
            >
              - SEELECT <b> - SEELECT </b>- SEELECT <b> - SEELECT </b>- SEELECT{" "}
              <b> - SEELECT </b>- SEELECT <b> - SEELECT </b>- SEELECT - SEELECT{" "}
              <b> - SEELECT </b>- SEELECT <b> - SEELECT </b>- SEELECT{" "}
            </div>
            <div
              style={{ animationDelay: "-3000ms" }}
              className="w-2-full lg:animate-login-deco overflow-hidden text-2xl whitespace-nowrap opacity-40"
            >
              - SEELECT <b> - SEELECT </b>- SEELECT <b> - SEELECT </b>- SEELECT{" "}
              <b> - SEELECT </b>- SEELECT <b> - SEELECT </b>- SEELECT - SEELECT{" "}
              <b> - SEELECT </b>- SEELECT <b> - SEELECT </b>- SEELECT{" "}
            </div>
            <div
              style={{ animationDelay: "-4000ms" }}
              className="w-2-full lg:animate-login-deco overflow-hidden text-2xl whitespace-nowrap opacity-20"
            >
              - SEELECT <b> - SEELECT </b>- SEELECT <b> - SEELECT </b>- SEELECT{" "}
              <b> - SEELECT </b>- SEELECT <b> - SEELECT </b>- SEELECT - SEELECT{" "}
              <b> - SEELECT </b>- SEELECT <b> - SEELECT </b>- SEELECT{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
