import React from "react";
import Image from "next/image";
import colaboradores from "@/public/coloboradores.webp";
import Container from "@/components/Container";
import Title from "@/components/Title";
import FloatButton from "@/components/FloatButton";
import { MdModeComment } from "react-icons/md";
import Text from "@/components/Text";
import Decoration from "../Cronograma/DecorationStripes/decoration";
import Link from "next/link";

function Contact() {
  return (
    <section className="flex rounded-t-xl items-strecht flex-col-reverse lg:flex-row-reverse  relative backdrop-blur-sm shadow-md shadow-slate-900 bg-white/10 border border-white/20 h-full">
      <div className="w-full flex items-center overflow-hidden aspect-video relative max-w-5xl ">
        <Image
          src={colaboradores}
          priority
          alt="Imagem dos organizadores"
          height={800}
          className="w-full"
        />
      </div>

      <Container className="w-full flex flex-col items-start ">
        <div>
          <Title className="font-bold mb-6">Fale com os organizadores</Title>

          <Text>
            Tem alguma dúvida sobre o evento SEELECT? Estamos aqui para ajudar!
            Preencha o formulário abaixo e entraremos em contato o mais rápido
            possível. Aguardamos sua mensagem!
          </Text>
        </div>
        <Link href="https://www.instagram.com/seelectufc/">
          <FloatButton className=" flex p-4 text-xl" shadowClassname="mt-12">
            <MdModeComment size={21} /> Entre em contato
          </FloatButton>
        </Link>
      </Container>
    </section>
  );
}

export default Contact;
