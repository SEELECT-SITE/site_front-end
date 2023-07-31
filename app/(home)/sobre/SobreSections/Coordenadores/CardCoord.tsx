import Title from "@/components/Title";
import Text from "@/components/Text";
import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface CardCoordProps {
  nome: string;
  cargo: string;
  src: string | StaticImport;
  linkedin?: string;
}

export default function CardCoord({
  nome,
  cargo,
  src,
  linkedin,
}: CardCoordProps) {
  return (
    <>
      <div
        className={`rounded-3xl p-4 lg:px-8 w-full relative shadow-lg flex items-center justify-between group gap-3 bg-gradient-to-t from-dark via-dark via-50% to-[#2E3047] hover:drop-shadow-icon hover:-translate-x-2 hover:-translate-y-2 duration-300 max-w-sm lg:max-w-none lg:w-auto`}
      >
        <div className="delay-100 duration-200 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:drop-shadow-icon relative rounded-full aspect-square h-20 xs:h-24 lg:w-32 lg:h-32">
          <Image
            src={src}
            alt={`${nome} ${cargo}`}
            width={120}
            className="rounded-full aspect-square object-cover border-2 border-cian-700"
          />
          {linkedin && (
            <Link href={linkedin} target="_blank">
              <div className="hover:brightness-110 hover:scale-105 w-1/4 p-1 -bottom-3 left-1/2 -translate-x-1/2 aspect-square bg-cian-700 rounded-md absolute">
                <FaLinkedinIn fill="#101120" size={"100%"} />
              </div>
            </Link>
          )}
        </div>
        <div className="shrink grow">
          <Title className="text-base xs:text-lg lg:text-2xl tracking-wide font-bold text-cian-400">
            {nome}
          </Title>
          <Text className="text-xs xs:text-sm lg:text-base text-gray-300 font-thin">
            {cargo}
          </Text>
        </div>
      </div>
    </>
  );
}
