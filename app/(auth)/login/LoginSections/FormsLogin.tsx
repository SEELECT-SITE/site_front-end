"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FloatButton from "@/components/FloatButton";
import Input from "@/components/Input";
import Text from "@/components/Text";

const createLoginSchema = z.object({
  email: z
    .string()
    .nonempty("Email invalido")
    .email("Formato de e-mail invalido"),
  senha: z.string().min(8, "Senha invalida").nonempty("O nome é obrigatorio"),
});

type CreateLoginData = z.infer<typeof createLoginSchema>;

export default function FormsLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLoginData>({
    resolver: zodResolver(createLoginSchema),
  });

  function createContact(data: any) {
    console.log(data);
  }
  return (
    <form
      onSubmit={handleSubmit(createContact)}
      className="w-full max-w-sm m-auto"
    >
      <div className="mb-10">
        <h1
          className={`text-3xl lg:mb-1 font-bold tracking-wide lg:text-4xl xl:text-5xl`}
        >
          Login
        </h1>
        <Text>Digite suas credenciais</Text>
      </div>

      <div className="flex flex-col gap-6 my-8">
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
      </div>

      <FloatButton
        type="submit"
        className="bg-cian-700 lg:text-lg text-white"
        shadowClassname="w-full bg-black/80 mt-4"
      >
        Entrar
      </FloatButton>
    </form>
  );
}
