"use client";
import { FunctionComponent, ReactNode } from "react";
import Title from "../Title";
import Text from "../Text";
import formatCurrency from "@/utils/formatCurrency";
import ThunderIcons from "../ThunderIcons";
import { MdCheck, MdClose, MdDone, MdQuestionMark } from "react-icons/md";

interface PriceCardProps {
  price: number;
  title: string;
  children?: ReactNode;
  destack?: boolean;
  destackText?: string;
  stars?: number;
  id: string;
  advantage: string[];
  onClick?: Function;
}

export function SvgCardLine({
  color,
  opacity,
}: {
  color?: string;
  opacity?: string;
}) {
  return (
    <svg viewBox="0 0 313 12" fill="none">
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
  destackText,
  destack,
  id,
  advantage,
  onClick,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-sm z-10 w-full max-w-sm ${
        destack
          ? "text-white bg-dark shadow-black/40 "
          : "text-black bg-white shadow-black/20"
      }`}
      title="Selecionar"
    >
      <input
        type="radio"
        name={"kitPriceOptions"}
        value={id}
        id={id}
        className="peer hidden [&:checked_+_label_svg]:block"
        readOnly={true}
      />

      <label
        htmlFor={id}
        className={`rounded-2xl w-full h-full grow shrink block cursor-pointer text-sm font-medium  peer-checked:ring-2 ring-inset peer-checked:ring-cian-700 `}
      >
        {destackText && (
          <div
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            className="py-2 h-full tracking-tighter top-1/2 -translate-y-1/2 text-sm text-slate-900 border font-bold bg-white border-cian-700 absolute"
          >
            {destackText}
          </div>
        )}
        <div
          className={` h-full flex flex-col justify-between border-2 border-black/10 p-6 shadow-lg sm:px-8 lg:p-12`}
        >
          <div className="text-left flex justify-between">
            <Title className="text-lg xs:text-xl lg:text-2xl tracking-wide font-bold">
              {title}
            </Title>
            <ThunderIcons quantity={stars || 0} />
          </div>
          <div>
            <div className="mt-6">
              <Text className="xs:text-lg font-bold">Benefícios</Text>
            </div>
            <ul className="my-2">
              {advantage.map((elem) => {
                return (
                  <li className="flex gap-1 mt-2 text-sm">
                    <MdDone size={18} fill={"green"} />
                    {elem}
                  </li>
                );
              })}
            </ul>

            {children}
          </div>

          <div>
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

            <button
              onClick={(e) => {
                if (onClick) onClick();
              }}
              className={`mt-2 block duration-200 rounded-lg w-full py-2 text-center text-xl font-bold focus:outline-none px-4 ${
                destack
                  ? "bg-cian-400 text-dark hover:ring hover:text-cian-400 hover:ring-inset hover:ring-cian-400 hover:bg-dark"
                  : "bg-black text-white hover:bg-white border hover:text-black hover:ring hover:ring-inset hover:ring-black "
              }`}
            >
              Quero esse
            </button>
          </div>
        </div>
      </label>
      <span className="peer-checked:w-full  w-[0%]  aspect-square bg-gradient-to-bl from-slate-700/50 to-transparent rounded-full absolute top-2 right-2 -translate-y-1/3 translate-x-1/3 pointer-events-none duration-200 invert"></span>

      <span className="peer-checked:flex hidden text-sm absolute top-2 right-2 p-1 text-green-500 rounded-md border bg-slate-500 z-10 items-center gap-2">
        Selecionado <MdCheck size={16} />
      </span>
    </div>
  );
};
export default PriceCard;
