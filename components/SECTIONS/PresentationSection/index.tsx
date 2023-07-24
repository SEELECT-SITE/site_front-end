"use client";
import Image from "next/image";
import seelect_logo from "@/public/icone_seelect.webp";
import Text from "@/components/Text";
import FloatButton from "@/components/FloatButton";
import Container from "@/components/Container";

export default function PresentationSection() {
  return (
    <section>
      <Container className="flex flex-col-reverse lg:flex-row lg:items-center">
        <div>
          <h1
            className={`text-2xl mb-3 lg:mb-6 font-bold tracking-wide lg:text-4xl xl:text-5xl`}
          >
            TERCEIRA SEMANA DAS ENGENHARIAS DE COMPUTAÇÃO, ELÉTRICA E
            TELECOMUNICAÇÕES.
          </h1>
          <Text className="opacity-80 font-thin max-w-4xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus
            dicta veritatis debitis, illo provident voluptate, placeat soluta
            assumenda accusantium id quo sit voluptas fugit distinctio. Debitis
            quis rem earum vitae?
          </Text>
          <div className="w-full py-4 lg:max-w-lg lg:mt-8">
            <FloatButton className="lg:text-2xl">SAIBA MAIS</FloatButton>
          </div>
        </div>

        <figure className="m-auto w-2/3 mb-6 max-w-md">
          <Image src={seelect_logo} alt="logo da seelect" className="lg:min-w-[360px]" />
        </figure>
      </Container>
    </section>
  );
}
