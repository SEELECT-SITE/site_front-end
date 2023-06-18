"use client";
import Image from "next/image";
import seelect_logo from "@/public/icone_seelect.webp";
import { bebasFont } from "@/app/fonts";
import Button from "../../Button";

export default function PresentationSection() {
  return (
    <section>
      <div>
        <figure className="m-auto w-1/2 mb-6 max-w-md">
          <Image
            src={seelect_logo}
            alt="logo da seelect"
            className="drop-shadow-icon duration-150"
          />
        </figure>
        <div>
          <h1 className={`${bebasFont.className} text-3xl mb-3`}>
            TERCEIRA SEMANA DAS ENGENHARIAS DE COMPUTAÇÃO, ELETRICA E
            TELECOMUNICAÇÕES.
          </h1>
          <h2 className="opacity-80">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus
            dicta veritatis debitis, illo provident voluptate, placeat soluta
            assumenda accusantium id quo sit voluptas fugit distinctio. Debitis
            quis rem earum vitae?
          </h2>
        </div>
        <div className="w-full py-4">
          <Button
            onClick={(e) => {
              console.log(e);
            }}
            className="bg-p-cian text-m-dark text-3xl font-bold w-full rounded-2xl"
          >
            SAIBA MAIS
          </Button>
        </div>
      </div>
    </section>
  );
}
