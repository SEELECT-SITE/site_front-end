import Container from "@/components/Container";
import CardCoord from "./CardCoord";
import Title from "@/components/Title";
import Image from "next/image";
import square_balls from "@/public/SVG/square-balls.svg";
import cg_comp from "@/public/avatar/cg_comp.jpg";
import cg_telecom from "@/public/avatar/cg_telecom.jpg";
import cg_eletri from "@/public/avatar/cg_eletri.jpg";
import coor_log from "@/public/avatar/coor_log.jpg";
import coor_mark from "@/public/avatar/coor_mark.jpg";
import coor_eventos from "@/public/avatar/coor_eventos.jpg";
import coor_finan from "@/public/avatar/coor_finan.jpg";

const coordenadores = [
  <CardCoord
    linkedin="https://www.linkedin.com/in/daniel-chaves-a81844257/"
    nome={"Isabela Aveino Freire"}
    src={coor_log}
    cargo={"Coordenador de Logística"}
  />,
  <CardCoord
    linkedin="https://www.linkedin.com/in/vin%C3%ADcius-l%C3%B4bo-8bbb16289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    nome={"Vinicius Alcantara"}
    src={coor_eventos}
    cargo={"Coordenador de Eventos"}
  />,
  <CardCoord
    linkedin="https://www.linkedin.com/in/davi-sampaio-timb%C3%B3-94408330b/"
    nome={"Davi Sampaio Timbó"}
    src={cg_telecom}
    cargo={"Coordenadora Geral"}
  />,
  <CardCoord
    linkedin="http://www.linkedin.com/in/lucas-araújo-moura-37103a31b"
    nome={"Lucas Araújo Moura"}
    src={coor_mark}
    cargo={"Coordenador de Marketing"}
  />,
  <CardCoord
    // linkedin="https://www.linkedin.com/in/vitória-reis-lima-301347309/"
    nome={"Alan da Rocha Mota"}
    src={cg_eletri}
    cargo={"Coordenador Geral"}
  />,
  <CardCoord
    // linkedin="https://www.linkedin.com/in/ana-letícia-alves-486277234/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    nome={"Maria Augusta Costa "}
    src={coor_finan}
    cargo={"Coordenadora Financeira"}
  />,
  <CardCoord
    // linkedin="https://www.linkedin.com/in/hubert-miranda-151535298/"
    nome={"Thaís Sousa Barros"}
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
          {coordenadores.sort(() => Math.random() - 0.5)}
        </div>
      </Container>
    </section>
  );
}
