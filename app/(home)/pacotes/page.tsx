import Badge from "@/components/Badge";
import Container from "@/components/Container";
import PriceCard from "@/components/PriceCard";
import Paragraph from "@/components/Text";
import Title from "@/components/Title";
import { MdDone } from "react-icons/md";

export const metadata = {
  title: "Pacotes",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

export default function PacotesPage() {
  return (
    <>
      <Container className="w-full pt-32 bg-white">
        <Title className="text-2xl text-black text-center">
          ESCOLHA UM PACOTE
        </Title>
        <Paragraph className="text-black/40 text-sm text-center">
          Veja a melhor dentre as 3 opções abaixo:
        </Paragraph>

        <div>
          <PriceCard price={30} title="Pacote Básico" stars={1}>
            <ul className="text-black font-thin italic mt-4 mb-8">
              <li className="flex gap-1 mt-2 text-sm">
                <MdDone size={18} fill={"green"} />
                Lorem ipsum dolor sit amet .
              </li>
              <li className="flex gap-1 mt-2 text-sm">
                <MdDone size={18} fill={"green"} />
                Lorem ipsum dolor sit amet.
              </li>
              <li className="flex gap-1 mt-2 text-sm">
                <MdDone size={18} fill={"green"} />
                Lorem ipsum dolor sit amet.
              </li>
              <li className="flex gap-1 mt-2 text-sm">
                <MdDone size={18} fill={"green"} />
                Lorem ipsum dolor sit amet.
              </li>
            </ul>
          </PriceCard>

          <Badge
            value="POPULAR"
            className="py-2 text-sm top-0 translate-y-2/3 -translate-x-1/2 text-cian-700 border border-cian-700"
          >
            <PriceCard
              price={60}
              destack={true}
              title="Pacote Premium"
              stars={2}
            >
              <ul className="font-thin italic mt-4 mb-8">
                <li className="flex gap-1 mt-2 text-sm">
                  <MdDone size={18} fill={"#84d1cf"} className="min-w-[20px]" />
                  Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                  consectetur adipisicing elit.
                </li>
                <li className="flex gap-1 mt-2 text-sm">
                  <MdDone size={18} fill={"#84d1cf"} className="min-w-[20px]" />
                  Lorem ipsum dolor sit amet.
                </li>
                <li className="flex gap-1 mt-2 text-sm">
                  <MdDone size={18} fill={"#84d1cf"} className="min-w-[20px]" />
                  Lorem ipsum dolor sit amet.
                </li>
                <li className="flex gap-1 mt-2 text-sm">
                  <MdDone size={18} fill={"#84d1cf"} className="min-w-[20px]" />
                  Lorem ipsum dolor sit amet.
                </li>
              </ul>
            </PriceCard>
          </Badge>

          <PriceCard price={120} title="Pacote VIP" stars={3}>
            <ul className="text-black font-thin italic mt-4 mb-8">
              <li className="flex gap-1 mt-2 text-sm">
                <MdDone size={18} fill={"green"} />
                Lorem ipsum dolor sit amet .
              </li>
              <li className="flex gap-1 mt-2 text-sm">
                <MdDone size={18} fill={"green"} />
                Lorem ipsum dolor sit amet.
              </li>
              <li className="flex gap-1 mt-2 text-sm">
                <MdDone size={18} fill={"green"} />
                Lorem ipsum dolor sit amet.
              </li>
              <li className="flex gap-1 mt-2 text-sm">
                <MdDone size={18} fill={"green"} />
                Lorem ipsum dolor sit amet.
              </li>
            </ul>
          </PriceCard>
        </div>
      </Container>
    </>
  );
}
