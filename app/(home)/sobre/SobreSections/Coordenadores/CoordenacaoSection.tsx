import Container from "@/components/Container";
import CardCoord from "./CardCoord";
import Title from "@/components/Title";
import Image from "next/image";
import square_balls from "@/public/SVG/square-balls.svg";
import cg_comp from "@/public/avatar/cg_comp.jpeg";
import cg_telecom from "@/public/avatar/cg_telecom.jpeg";
import cg_eletri from "@/public/avatar/cg_eletri.jpeg";
import coor_log from "@/public/avatar/coor_log.jpeg";
import coor_mark from "@/public/avatar/coor_mark.jpeg";
import coor_eventos from "@/public/avatar/coor_eventos.jpeg";
import coor_finan from "@/public/avatar/coor_finan.jpeg";

const coordenadores = [
  <CardCoord
    linkedin="https://www.linkedin.com/in/daniel-chaves-a81844257/"
    nome={"Daniel Chaves"}
    src={coor_log}
    cargo={"Coordenador de Logística"}
  />,
  <CardCoord
    linkedin="https://www.linkedin.com/in/davi-pontes-luciano-a236a61a9/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    nome={"Davi Pontes"}
    src={coor_eventos}
    cargo={"Coordenador de Eventos"}
  />,
  <CardCoord
    linkedin="https://www.linkedin.com/in/ana-cecília-costa-martins-5bb570296/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    nome={"Ana Cecília Costa"}
    src={cg_telecom}
    cargo={"Coordenadora Geral"}
  />,
  <CardCoord
    linkedin="https://www.linkedin.com/in/orlando-moreira-de-melo-neto-212877249/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    nome={"Orlando Moreira"}
    src={coor_mark}
    cargo={"Coordenador de Marketing"}
  />,
  <CardCoord
    linkedin="https://www.linkedin.com/in/vitória-reis-lima-301347309/"
    nome={"Vitória Reis"}
    src={cg_eletri}
    cargo={"Coordenadora Geral"}
  />,
  <CardCoord
    linkedin="https://www.linkedin.com/in/ana-letícia-alves-486277234/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    nome={"Ana Letícia Alves"}
    src={coor_finan}
    cargo={"Coordenadora Financeira"}
  />,
  <CardCoord
    linkedin="https://www.linkedin.com/in/hubert-miranda-151535298/"
    nome={"Hubert Miranda"}
    src={cg_comp}
    cargo={"Coordenador Geral"}
  />,
];

export default function CoordenacaoSection() {
  return (
    <section className="my-12 lg:my-16">
      <Container className="w-full relative z-10 flex flex-col">
        <Title className={`text-2xl mb-11 text-cian-700 `}>
          NOSSA COORDENAÇÃO
        </Title>
        <div className="flex flex-wrap justify-center gap-8 m-auto">
          <figure className="m-auto lg:w-1/2 lg:rotate-90 -z-10 left-0 absolute lg:top-1/2 top-1/3 lg:max-w-md">
            <Image src={square_balls} priority={true} alt="decoration" />
          </figure>
          {coordenadores
            .sort(() => Math.random() - 0.5)
            .map((Card, index) => {
              return Card;
            })}
        </div>
      </Container>
    </section>
  );
}
