import React from "react";
import Image from "next/image";
import foto from "@/public/team_seelect.png";
import Container from "@/components/Container";
import Title from "@/components/Title";
import FloatButton from "@/components/FloatButton";
import { MdModeComment } from "react-icons/md";
import Text from "@/components/Text";

function Contact() {
  return (
    <section className="flex flex-col lg:flex-row-reverse">
      <div className="w-full overflow-hidden aspect-square lg:aspect-video relative max-w-5xl">
        <Image
          src={foto}
          alt="Imagem dos organizadores"
          height={280}
          className="w-full absolute bottom-0"
        />
      </div>

      <Container className="bg-white w-full flex flex-col items-start">
        <div>
          <Title className="text-dark font-bold mb-6">
            Fale com os organizadores
          </Title>

          <Text className="text-dark">
            Tem alguma dúvida sobre o evento SEELECT? Estamos aqui para ajudar!
            Preencha o formulário abaixo e entraremos em contato o mais rápido
            possível. Aguardamos sua mensagem!
          </Text>
        </div>

        <FloatButton
          className="bg-dark text-white flex p-4 text-xl"
          shadowClassname="bg-dark/80 mt-12"
        >
          <MdModeComment size={21} /> Entre em contato
        </FloatButton>
      </Container>
    </section>
  );
}

export default Contact;
