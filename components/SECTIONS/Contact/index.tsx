import React from "react";
import Image from "next/image";
import foto from "@/public/team_seelect.png";
import Container from "@/components/Container";
import Title from "@/components/Title";

function Contact() {
  return (
    <>
      <div className="w-full">
        <Image
          src={foto}
          alt="Imagem dos organizadores"
          height={280}
          className="w-full"
        />
      </div>

      <Container className="bg-white w-full">
        <Title className="text-dark font-bold mb-6">
          Fale com os organizadores
        </Title>

        <span className="text-dark font-normal">
          Tem alguma dúvida sobre o evento SEELECT? Estamos aqui para ajudar!
          Preencha o formulário abaixo e entraremos em contato o mais rápido
          possível. Aguardamos sua mensagem!
        </span>
      </Container>
    </>
  );
}

export default Contact;
