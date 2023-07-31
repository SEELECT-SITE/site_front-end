import Container from "@/components/Container";
import CardCoord from "./CardCoord";
import square_balls from "@/public/SVG/square-balls.svg";
import cg_comp from "@/public/avatar/coord_geral_comp.webp";
import cg_telecom from "@/public/avatar/coord_geral_telecom.webp";
import cg_eletri from "@/public/avatar/coord_geral_eletrica-square.png";
import coor_log from "@/public/avatar/coord_log.webp";
import Title from "@/components/Title";
import Image from "next/image";

const coordenadores = [
  <CardCoord
    linkedin=""
    nome={"Laura Campêlo"}
    src={cg_comp}
    cargo={"Coordenadora Geral"}
  />,
  <CardCoord
    linkedin=""
    nome={"João Vitor de Oliveira"}
    src={cg_telecom}
    cargo={"Coordenador Geral"}
  />,
  <CardCoord
    linkedin=""
    nome={"Juliana Barreira"}
    src={cg_eletri}
    cargo={"Coordenadora Geral"}
  />,
  <CardCoord
    linkedin="https://www.linkedin.com/in/abrxao"
    nome={"Abraão Albuquerque"}
    src={coor_log}
    cargo={"Coordenador de Logistica"}
  />,
];

export default function CoordenacaoSection() {
  return (
    <section>
      <Container className="w-full mt-4 relative z-10 flex flex-col">
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
