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
    key="rafael-mendes"
    linkedin="https://www.linkedin.com/in/rafael-fontenele-mendes-1563ab334/"
    nome={"Rafael Fontenele Mendes"}
    src={coor_log}
    cargo={"Coordenador de Logística"}
  />,
  <CardCoord
    key="lucas"
    linkedin="https://www.linkedin.com/in/lucas-martins-menezes-b79613338/"
    nome={"Lucas Martins Menezes"}
    src={coor_eventos}
    cargo={"Coordenador de Eventos"}
  />,
  <CardCoord
    key="diego"
    linkedin="https://www.linkedin.com/in/diego-rocha-50a02b350/"
    nome={"Diego Rocha de Almeida "}
    src={cg_telecom}
    cargo={"Coordenador Geral"}
  />,
  <CardCoord
    key="rafael-gomes"
    linkedin="https://www.linkedin.com/in/rafael-gomes-do-nascimento-b878b6268/"
    nome={"Rafael Gomes do Nascimento"}
    src={coor_mark}
    cargo={"Coordenador de Marketing"}
  />,
  <CardCoord
    key="lazaro"
    linkedin="https://www.linkedin.com/in/lazarovieira/"
    nome={"Lázaro de Sousa Vieira"}
    src={cg_eletri}
    cargo={"Coordenador Geral"}
  />,
  <CardCoord
    key="ana-luisa"
    linkedin="https://www.linkedin.com/in/ana-letícia-alves-486277234/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    nome={"Ana Luisa de Sá Fernandes"}
    src={coor_finan}
    cargo={"Coordenadora Financeira"}
  />,
  <CardCoord
    key="joao-pedro"
    linkedin="https://www.linkedin.com/in/hubert-miranda-151535298/"
    nome={"João Pedro Rolim Ximenes"}
    src={cg_comp}
    cargo={"Coordenador Geral"}
  />,
];

export default function CoordenacaoSection() {
  return (
    <section className="my-12 lg:my-16">
      <Container className="w-full relative z-10 flex flex-col">
        <Title className={`text-2xl mb-11 text-[#3f6593]`}>
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
