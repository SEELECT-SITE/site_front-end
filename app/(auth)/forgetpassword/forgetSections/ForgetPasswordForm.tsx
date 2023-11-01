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
import axios from "axios";
import { DJANGO_URL } from "@/utils/consts";

const createLoginSchema = z.object({
  email: z
    .string()
    .email("Formato de e-mail invalido")
    .nonempty("Insira um email"),
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
  const [isSending, setIsSeding] = useState<boolean>(false);

  async function createContact(data: CreateLoginData) {
    const { email } = data;
    setErrorReq("");
    const formData = new URLSearchParams();
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    formData.append("email", email as string);
    setIsSeding(true);
    try {
      await axios.post(
        `${DJANGO_URL}api/auth/forget_password/`,
        formData.toString(),
        {
          headers,
        }
      );
    } catch (err: any) {
      const errorKeys = Object.keys(err.response.data);

      scrollToElement(errorsDiv);
    } finally {
      router.push("./login");
      setIsSeding(false);
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
            Mudar senha
          </h1>
          <Text>Digite seu e-mail</Text>
        </div>
        <div className="flex flex-col gap-2 lg:gap-4 my-6 lg:my-8">
          <Input
            placeholder="E-mail"
            errorMsg={errors.email?.message as string}
            type="text"
            register={register("email")}
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
          disabled={isSending}
          type="submit"
          className="bg-cian-700 lg:text-lg text-white"
          shadowClassname="w-full bg-black/80"
        >
          Enviar e-mail
        </FloatButton>
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
      </form>
    </>
  );
}
