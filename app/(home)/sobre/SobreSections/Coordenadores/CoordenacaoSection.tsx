import Container from "@/components/Container";
import CardCoord from "./CardCoord";
import square_balls from "@/public/SVG/square-balls.svg";
import CoordImage1 from "@/public/avatar/avatar_coord.png";
import CoordImage2 from "@/public/avatar/avatar1.jpg";
import Title from "@/components/Title";
import Image from "next/image";
import Decoration from "@/components/SECTIONS/Cronograma/DecorationStripes/decoration";

const coordenadores = [
  <CardCoord
    linkedin="https://www.linkedin.com/in/abrxao"
    nome={"Coordinator Linhares"}
    src={CoordImage1}
    cargo={"Coordenador de seila"}
  />,
  <CardCoord
    linkedin="https://www.linkedin.com/in/abrxao"
    nome={"Aline Coordinator"}
    src={CoordImage2}
    cargo={"Coordenador de algo"}
  />,
  <CardCoord
    linkedin="https://www.linkedin.com/in/abrxao"
    nome={"Coordinator Linhares"}
    src={CoordImage1}
    cargo={"Coordenador de seila"}
  />,
  <CardCoord
    linkedin="https://www.linkedin.com/in/abrxao"
    nome={"Aline Coordinator"}
    src={CoordImage2}
    cargo={"Coordenador de algo"}
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
