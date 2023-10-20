"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FloatButton from "@/components/FloatButton";
import Input from "@/components/Input";
import Text from "@/components/Text";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { scrollToElement } from "@/utils/scrollToElement";

const createLoginSchema = z.object({
  email: z
    .string()
    .email("Formato de e-mail invalido")
    .nonempty("Insira um email"),
  password: z
    .string()
    .min(6, "Senha invalida")
    .nonempty("O nome é obrigatorio"),
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
  const router = useRouter();
  const [errorReq, setErrorReq] = useState<any>("");
  const errorsDiv = useRef<HTMLDivElement | null>(null);

  async function createContact(data: CreateLoginData) {
    const { email, password } = data;
    setErrorReq("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.status !== 200) {
      setErrorReq("E-mail ou senha incorretos ou usuario não cadastrados.");
      scrollToElement(errorsDiv);
    } else {
      router.replace("./userboard");
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(createContact)}
        className="w-full max-w-sm m-auto relative overflow-hidden p-1"
      >
        <div className="mb-8 border-l-2 border-dark pl-2">
          <h1
            className={`text-3xl lg:mb-1 font-bold tracking-wide lg:text-4xl xl:text-5xl`}
          >
            Login
          </h1>
          <Text>Digite suas credenciais</Text>
        </div>
        <div className="flex flex-col gap-2 lg:gap-4 my-6 lg:my-8">
          <Input
            placeholder="E-mail"
            errorMsg={errors.email?.message as string}
            type="text"
            register={register("email")}
          />
          <Input
            placeholder="Senha"
            errorMsg={errors.password?.message as string}
            type="password"
            register={register("password")}
          />
          {errorReq !== "" && (
            <div
              id="errorLogin"
              ref={errorsDiv}
              className="text-red-500 text-sm flex items-center gap-1 errorReqAnimated"
            >
              <MdErrorOutline size={16} />
              {errorReq}
            </div>
          )}
        </div>

        <FloatButton
          type="submit"
          className="bg-cian-700 lg:text-lg text-white"
          shadowClassname="w-full bg-black/80"
        >
          Entrar
        </FloatButton>
      </form>
    </>
  );
}
