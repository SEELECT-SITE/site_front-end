"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import wave_contato from "@/public/SVG/wave-contato.svg";

const createContactSchema = z.object({
  email: z
    .string()
    .nonempty("O email é obrigatorio")
    .email("Formato de e-mail invalido"),
  nome: z
    .string()
    .nonempty("O nome é obrigatorio")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  telefone: z.coerce
    .number({ invalid_type_error: "Digite um numero valido" })
    .gte(10000000, "Digite um numero valido")
    .lte(9999999999999, "Digite um numero valido"),
});

type CreateContactData = z.infer<typeof createContactSchema>;

import FloatButton from "@/components/FloatButton";
import Input from "@/components/Input";
import TextAreaInput from "@/components/TextAreaInput";
import Decoration from "@/components/SECTIONS/Cronograma/DecorationStripes/decoration";
import Image from "next/image";

export default function ContactForms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateContactData>({
    resolver: zodResolver(createContactSchema),
  });

  function createContact(data: any) {
    console.log(data);
  }
  return (
    <form
      onSubmit={handleSubmit(createContact)}
      className="w-full flex flex-col gap-8 border-slate-500 bg-gradient-to-b from-dark to-[#2E3047] border py-8 px-4 lg:py-12 shadow-md shadow-white/40 lg:px-8 rounded-2xl max-w-md relative z-10 overflow-hidden"
    >
      <Decoration
        shadowClassname="h-4 absolute top-0 w-110% left-0 rounded-none"
        className="rounded-none"
        type="light"
      />
      <Input
        placeholder="Nome"
        type="text"
        errorMsg={errors.nome?.message as string}
        register={register("nome")}
        className=" border-cian-400"
      />
      <Input
        placeholder="E-mail"
        errorMsg={errors.email?.message as string}
        type="email"
        register={register("email")}
        className=" border-cian-400"
      />
      <Input
        placeholder="Telefone"
        errorMsg={errors.telefone?.message as string}
        type="text"
        register={register("telefone")}
        className=" border-cian-400"
      />
      <TextAreaInput label="Mensagem" rows={4} className=" border-cian-400" />
      <FloatButton type="submit" className=" text-xl" shadowClassname="w-full">
        Enviar
      </FloatButton>
      <Image
        src={wave_contato}
        alt="decoration"
        className="absolute left-0 w-110% bottom-0 -z-10"
      />
    </form>
  );
}
