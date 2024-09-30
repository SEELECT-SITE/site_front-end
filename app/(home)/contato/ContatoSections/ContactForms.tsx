"use client";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import wave_contato from "@/public/SVG/wave-contato.svg";
import FloatButton from "@/components/FloatButton";
import Input from "@/components/Input";
import TextAreaInput from "@/components/TextAreaInput";
import Decoration from "@/components/SECTIONS/Cronograma/DecorationStripes/decoration";
import Image from "next/image";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const createContactSchema = z.object({
  email: z
    .string()
    .nonempty("O email é obrigatorio")
    .email("Formato de e-mail invalido"),
  name: z
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
  phone: z.coerce
    .number({ invalid_type_error: "Digite um numero valido" })
    .gte(10000000, "Digite um numero valido")
    .lte(9999999999999, "Digite um numero valido"),
  message: z.string(),
});

type CreateContactData = z.infer<typeof createContactSchema>;

export default function ContactForms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateContactData>({
    resolver: zodResolver(createContactSchema),
  });
  const { toast } = useToast();
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  async function createContact(data: any) {
    setIsSendingEmail(true);
    const response = await axios.post("/api/contactEmail", data);
    if (response.status === 200) {
      toast({
        title: "Mensagem enviada",
        description: "Em breve entraremos em contato",
      });
      setIsSendingEmail(false);
    }
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
        errorMsg={errors.name?.message as string}
        register={register("name")}
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
        errorMsg={errors.phone?.message as string}
        type="text"
        register={register("phone")}
        className=" border-cian-400"
      />
      <TextAreaInput
        register={register("message")}
        label="Mensagem"
        rows={4}
        className=" border-cian-400"
      />
      <FloatButton
        disabled={isSendingEmail}
        type="submit"
        className=" text-xl"
        shadowClassname="w-full"
      >
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
