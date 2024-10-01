"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FloatButton from "@/components/FloatButton";
import Input from "@/components/Input";
import Text from "@/components/Text";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { scrollToElement } from "@/utils/scrollToElement";
import { axiosClient } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    { message: "As senhas estão diferentes", path: ["confirmPassword"] }
  );

type CreateLoginData = z.infer<typeof changePasswordSchema>;

export default function FormsLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLoginData>({
    resolver: zodResolver(changePasswordSchema),
  });
  const { data: session } = useSession();
  if (!session) {
    return null;
  }
  const { toast } = useToast();
  const [errorReq, setErrorReq] = useState<any>("");
  const errorsDiv = useRef<HTMLDivElement | null>(null);
  const [isSending, setIsSeding] = useState<boolean>(false);

  async function createContact(data: CreateLoginData) {
    const { password } = data;
    setErrorReq("");
    const formData = new URLSearchParams();
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "ngrok-skip-browser-warning": "true",
      Token: session?.user?.token,
    };

    formData.append("new_password", password as string);
    setIsSeding(true);
    try {
      await axiosClient.post(`api/auth/change_password/`, formData.toString(), {
        headers,
      });
      toast({
        title: "Senha alterada",
        description: "Sua senha foi alterada com sucesso",
      });
    } catch (err: any) {
      const errorKeys = Object.keys(err.response.data);

      scrollToElement(errorsDiv);
    } finally {
      /* router.push("./login"); */
      setIsSeding(false);
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(createContact)}
        className="w-full max-w-sm m-auto relative overflow-hidden p-6 bg-slate-800 rounded-md border border-slate-400 my-4"
      >
        <div className="mb-8 border-l-2 border-slate-400 pl-2">
          <h2
            className={`text-1xl lg:mb-1 font-bold tracking-wide lg:text-2xl xl:text-3xl`}
          >
            Mudar senha
          </h2>
          <Text>Digite sua nova senha</Text>
        </div>
        <div className="flex flex-col gap-2 lg:gap-4 my-6 lg:my-8">
          <Input
            placeholder="Senha"
            errorMsg={errors.password?.message as string}
            type="password"
            register={register("password")}
          />
          <Input
            placeholder="Confirmar senha"
            errorMsg={errors.confirmPassword?.message as string}
            type="password"
            register={register("confirmPassword")}
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
