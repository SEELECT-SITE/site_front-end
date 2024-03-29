import Image from "next/image";
import seelect_logo from "@/public/icone_seelect.webp";
import Container from "../Container";
import Text from "../Text";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="w-full bg-dark lg:flex lg:items-stretch"
      id="footer_home"
    >
      <div className="py-12 flex items-center">
        <Image
          src={seelect_logo}
          alt="logo da seelect"
          className="object-contain w-1/3 max-w-md m-auto"
        />
      </div>
      <div className="lg:py-12">
        <Container className="border-b lg:border-none border-white/20 py-0">
          <Text className="text-cian-700 text-center text-lg lg:text-xl font-bold">
            INFORMAÇÕES
          </Text>
        </Container>
        <Container>
          <Text className="text-cian-700 text-lg font-bold mb-0">Endereço</Text>
          <Text className="text-white font-thin">
            Av. Mister Hull, s/n - Pici - CEP 60455-760 Fortaleza - CE
          </Text>
          <Text className="text-cian-700 text-lg font-bold mb-0">Email</Text>
          <Text className="text-white font-thin">seelect@ufc.br</Text>
        </Container>
      </div>
      <div className="lg:py-12">
        <Container className="border-b lg:border-none border-white/20 py-0">
          <Text className="text-cian-700 text-center text-lg lg:text-xl font-bold">
            REDES SOCIAIS
          </Text>
        </Container>

        <Container className="py-2">
          <Text className="text-white text-center font-thin">
            Siga-nos em nossas redes sociais para ficar por dentro de tudo!
          </Text>
          <div className="flex gap-4 px-2 pt-6 pb-12 justify-evenly">
            <div className="w-full max-w-[4rem] p-2 aspect-square bg-cian-700 rounded-lg">
              <FaFacebookF fill="#101120" size={"100%"} />
            </div>

            <div className="w-full max-w-[4rem] p-2 aspect-square bg-cian-700 rounded-lg">
              <FaInstagram fill="#101120" size={"100%"} />
            </div>

            <div className="w-full max-w-[4rem] p-2 aspect-square bg-cian-700 rounded-lg">
              <FaLinkedinIn fill="#101120" size={"100%"} />
            </div>

            <div className="w-full max-w-[4rem] p-2 aspect-square bg-cian-700 rounded-lg">
              <FaYoutube fill="#101120" size={"100%"} />
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
