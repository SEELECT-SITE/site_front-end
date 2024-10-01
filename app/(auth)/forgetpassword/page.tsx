import Container from "@/components/Container";

import FormsLogin from "./forgetSections/ForgetPasswordForm";
import { LuAlertCircle } from "react-icons/lu";
import Text from "@/components/Text";
import MarqueeLogin from "../login/LoginSections/MarqueeSign";
import BannerLogin from "../login/LoginSections/BannerSign";

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
              <Text className="inline-flex w-full my-1 rounded-lg items-center gap-1 text-slate-700">
                <span>
                  <LuAlertCircle size={18} />
                </span>
                Após enviar verifique seu e-mail
              </Text>
            </div>
          </Container>
          <MarqueeLogin />
        </div>
      </div>
    </>
  );
}
