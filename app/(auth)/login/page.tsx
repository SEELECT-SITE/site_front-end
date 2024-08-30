import Link from "next/link";
import Container from "@/components/Container";

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
    <div className="w-full h-screen lg:flex lg:flex-row-reverse">
      <BannerLogin />
      <div className="w-full mt-6 h-full lg:mt-0 bg-white lg:w-1/2  lg:border-r-4 border-black overflow-hidden m-auto flex flex-col justify-start">
        <Container className="w-full m-auto max-w-lg 2xl:p-8">
          <FormsLogin />
          <div className="flex flex-wrap w-full max-w-sm m-auto justify-between mt-2 ">
            <Link
              href="/cadastro"
              className="hover:underline text-black p-1 text-sm hover:text-white hover:bg-black"
            >
              Não tem conta? <b>Cadastre-se</b>
            </Link>
            <Link
              href="/forgetpassword"
              className="hover:underline text-black p-1 text-sm hover:text-white hover:bg-black"
            >
              <b>Esqueci a senha</b>
            </Link>
          </div>
        </Container>
        <MarqueeLogin />
      </div>
    </div>
  );
}
