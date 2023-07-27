"use client";
import Image from "next/image";
import Text from "@/components/Text";
import FloatButton from "@/components/FloatButton";
import Container from "@/components/Container";

import seelect_logo from "@/public/icone_seelect.webp";
import squares_deco from "@/public/SVG/squares-deco.svg";
import elipse from "@/public/SVG/elipse-deco.svg";
import Link from "next/link";

export default function PresentationSection() {
  return (
    <section>
      <Container className="flex relative z-10 flex-col-reverse lg:flex-row lg:items-center">
        <div className="">
          <div className="backdrop-blur-md p-2 rounded-md">
            <h1
              className={`text-2xl mb-3 lg:mb-6 font-bold tracking-wide lg:text-4xl xl:text-5xl`}
            >
              TERCEIRA SEMANA DAS ENGENHARIAS DE COMPUTAÇÃO, ELÉTRICA E
              TELECOMUNICAÇÕES.
            </h1>
          </div>

          <Text className="opacity-80 font-thin max-w-4xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus
            dicta veritatis debitis, illo provident voluptate, placeat soluta
            assumenda accusantium id quo sit voluptas fugit distinctio. Debitis
            quis rem earum vitae?
          </Text>
          <div className="w-full py-4 lg:max-w-lg lg:mt-8">
            <Link href="/sobre">
              <FloatButton
                className="lg:text-2xl px-0"
                shadowClassname="w-full"
              >
                SAIBA MAIS
              </FloatButton>
            </Link>
          </div>
        </div>

        <figure className="m-auto w-2/3 mb-6 max-w-md">
          <Image
            src={seelect_logo}
            priority={true}
            alt="logo da seelect"
            className="lg:min-w-[360px]"
          />
        </figure>

        <div className="m-auto w-1/2 absolute -z-10 top-0 left-0 -translate-y-2/3 -translate-x-1/2 mb-6 max-w-md">
          <Image src={elipse} priority={true} alt="decoration" />
        </div>

        <figure className="m-auto w-1/2  absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 mb-6 max-w-xs">
          <Image
            src={squares_deco}
            priority={true}
            alt="decoration"
            className="lg:min-w-[360px]"
          />
        </figure>
      </Container>
    </section>
  );
}
