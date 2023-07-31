"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FloatButton from "@/components/FloatButton";
import Input from "@/components/Input";

const createCadastroSchema = z
  .object({
    nome: z.string().nonempty("Digite seu nome"),
    email: z
      .string()
      .nonempty("Email invalido")
      .email("Formato de e-mail invalido"),
    senha: z
      .string()
      .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
    confirmSenha: z.string(),
  })
  .refine(
    (data) => {
      data.senha == data.confirmSenha;
    },
    { message: "As senhas estão diferentes", path: ["confirmSenha"] }
  );

type CreateCadastroData = z.infer<typeof createCadastroSchema>;

export default function FormsCadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCadastroData>({
    resolver: zodResolver(createCadastroSchema),
  });

  function createContact(data: any) {
    console.log(data);
  }
  return (
    <form
      onSubmit={handleSubmit(createContact)}
      className="w-full max-w-md m-auto"
    >
      <div className="flex flex-col gap-6 my-8">
        <Input
          placeholder="Nome"
          errorMsg={errors.nome?.message as string}
          type="text"
          register={register("nome")}
        />
        <Input
          placeholder="E-mail"
          errorMsg={errors.email?.message as string}
          type="email"
          register={register("email")}
        />
        <Input
          placeholder="Senha"
          errorMsg={errors.senha?.message as string}
          type="password"
          register={register("senha")}
        />
        <Input
          placeholder="Confirme sua senha"
          errorMsg={errors.confirmSenha?.message as string}
          type="password"
          register={register("confirmSenha")}
        />
      </div>

      <FloatButton
        type="submit"
        className="bg-cian-700 lg:text-lg text-white"
        shadowClassname="w-full bg-black/80 mt-4"
      >
        Registrar
      </FloatButton>
    </form>
  );
}
