"use client";
import Image from "next/image";
import seelect_logo from "@/public/icone_seelect.webp";
import Button from "../../Button";
import Text from "@/components/Text";
import FloatButton from "@/components/FloatButton";

export default function PresentationSection() {
  return (
    <section>
      <figure className="m-auto w-2/3  mb-6 max-w-md">
        <Image
          src={seelect_logo}
          alt="logo da seelect"
          className="drop-shadow-icon duration-150"
        />
      </figure>
      <div>
        <h1 className={`text-xl mb-3 font-bold tracking-wide`}>
          TERCEIRA SEMANA DAS ENGENHARIAS DE COMPUTAÇÃO, ELÉTRICA E
          TELECOMUNICAÇÕES.
        </h1>
        <Text className="opacity-80 font-thin">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus
          dicta veritatis debitis, illo provident voluptate, placeat soluta
          assumenda accusantium id quo sit voluptas fugit distinctio. Debitis
          quis rem earum vitae?
        </Text>
      </div>
      <div className="w-full py-4">
        <FloatButton>SAIBA MAIS</FloatButton>
      </div>
    </section>
  );
}
