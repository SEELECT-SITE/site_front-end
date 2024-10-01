import Container from "@/components/Container";
import FormsCadastro from "./CadastroSections/FormsCadastro";
import MarqueeSign from "../login/LoginSections/MarqueeSign";
import BannerSign from "../login/LoginSections/BannerSign";
import Text from "@/components/Text";
import Decoration from "@/components/SECTIONS/Cronograma/DecorationStripes/decoration";

export const metadata = {
  title: "Cadastro",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

export default function CadastroPage() {
  return (
    <>
      <div className="w-auto lg:h-screen lg:flex lg:flex-row-reverse ">
        <BannerSign />
        <div className="mt-6 min-h-full  lg:h-full lg:mt-0 bg-white pb-12 lg:w-1/2  lg:border-r-4 border-black overflow-x-hidden m-auto flex flex-col justify-start">
          <Container className="w-full max-w-md m-auto 2xl:p-8">
            <div className="mb-10 w-auto">
              <h1
                className={`text-3xl lg:mb-1 font-bold tracking-wide lg:text-4xl xl:text-5xl`}
              >
                Cadastre-se
              </h1>
              <Text className="pl-0.5 text-gray-500">
                Preencha os dados abaixo
              </Text>
            </div>

            <Decoration className="h-4 my-4" />
            <FormsCadastro />
          </Container>

          <MarqueeSign />
        </div>
      </div>
    </>
  );
}
