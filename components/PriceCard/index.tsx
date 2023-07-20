import { FunctionComponent, ReactNode } from "react";
import Title from "../Title";
import Text from "../Text";
import formatCurrency from "@/utils/formatCurrency";
import ThunderIcons from "../ThunderIcons";

interface PriceCardProps {
  price: number;
  title: string;
  children?: ReactNode;
  destack?: boolean;
  stars?: number;
}

function SvgCardLine({ color, opacity }: { color?: string; opacity?: string }) {
  return (
    <svg viewBox="0 0 313 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M312.774 6L307 0.226497L301.226 6L307 11.7735L312.774 6ZM-87.5 7H307V5H-87.5V7Z"
        fill={color || "black"}
        fill-opacity={opacity || "0.1"}
      />
    </svg>
  );
}

const PriceCard: FunctionComponent<PriceCardProps> = ({
  price,
  title,
  children,
  stars,
  destack,
}) => {
  return (
    <div
      className={`mx-auto max-w-md py-8 ${
        destack ? "text-white" : "text-black"
      }`}
    >
      <div
        className={`rounded-3xl border-2 relative border-black/10 p-6 shadow-lg  sm:order-last sm:px-8 lg:p-12 ${
          destack ? "bg-dark shadow-black/40" : "bg-white shadow-black/20"
        }`}
      >
        <div className="text-left flex justify-between">
          <Title className="text-xl xs:text-2xl  tracking-wide font-bold">
            {title}
          </Title>
          <ThunderIcons quantity={stars || 0} />
        </div>

        <div className="mt-8">
          <Text className="xs:text-lg font-bold">Benefícios</Text>
        </div>

        {children}

        <div className="w-full">
          <SvgCardLine
            color={destack ? "#84d1cf" : ""}
            opacity={destack ? "1" : ""}
          />
        </div>

        <Text
          className={`mt-2 sm:mt-4 text-xl font-bold sm:text-2xl ${
            !destack && "opacity-70"
          }`}
        >
          {formatCurrency(price)}
        </Text>

        <a
          href="#"
          className={`mt-2 block duration-200 rounded-lg w-full py-2 text-center text-xl font-bold focus:outline-none ${
            destack
              ? "bg-cian-400 text-dark"
              : "bg-black text-white hover:bg-white border hover:text-black hover:ring hover:ring-inset hover:ring-black "
          }`}
        >
          Quero esse
        </a>
      </div>
    </div>
  );
};
export default PriceCard;
