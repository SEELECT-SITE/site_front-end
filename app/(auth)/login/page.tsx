import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { FcGoogle } from "react-icons/fc";
import FloatButton from "@/components/FloatButton";

import FormsLogin from "./LoginSections/FormsLogin";
import MarqueeLogin from "./LoginSections/MarqueeSign";
import BannerLogin from "./LoginSections/BannerSign";

export const metadata = {
  title: "Login",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

export default function Login() {
  return (
    <>
      <div className="w-full h-screen lg:flex lg:flex-row-reverse">
        <BannerLogin />
        <div className="w-full mt-6 h-full lg:mt-0 bg-white lg:w-1/2  lg:border-r-4 border-black overflow-hidden m-auto flex flex-col justify-start">
          
          <Container className="w-full m-auto max-w-lg 2xl:p-8">
            <FormsLogin />
            <div className="flex flex-wrap w-full max-w-sm m-auto justify-between mt-2 ">
              <Link
                href="#"
                className="hover:underline text-black/70 text-sm pr-4 hover:text-black"
              >
                <b>Esquece sua senha?</b>
              </Link>
              <Link
                href="/cadastro"
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
          <MarqueeLogin />
        </div>
      </div>
    </>
  );
}
