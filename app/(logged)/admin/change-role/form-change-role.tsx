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
import { toast } from "@/hooks/use-toast";
import SelectInput from "@/components/SelectInput";

const createLoginSchema = z.object({
  email: z
    .string()
    .email("Formato de e-mail invalido")
    .min(1, "Insira um email"),
  new_role: z.string().min(1, "Insira um role"),
});

type ChangeRoleData = z.infer<typeof createLoginSchema>;

export default function FormChangeLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeRoleData>({
    resolver: zodResolver(createLoginSchema),
  });
  const router = useRouter();
  const [errorReq, setErrorReq] = useState<any>("");
  const errorsDiv = useRef<HTMLDivElement | null>(null);
  const [isSending, setIsSeding] = useState<boolean>(false);

  async function changeRole(data: ChangeRoleData) {
    const { email, new_role } = data;
    setErrorReq("");
    const formData = new URLSearchParams();

    formData.append("email", email as string);
    formData.append("new_role", new_role);
    setIsSeding(true);
    try {
      await axiosClient.post(`api/auth/change_role/`, formData.toString());
      toast({ title: "Função de usuário atualizada com sucesso" });
    } catch (err: any) {
      toast({ title: "Erro em atualizar função" });
    } finally {
      /* router.push("./login"); */
      setIsSeding(false);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(changeRole)}
      className="w-full max-w-sm m-auto relative overflow-hidden p-1"
    >
      <div className="mb-8 border-l-2 border-dark pl-2 my-6">
        <h3
          className={`text-xl lg:mb-1 font-bold tracking-wide lg:text-4xl xl:text-5xl`}
        >
          Mudar função do usuario
        </h3>
      </div>
      <div className="flex flex-col gap-2 lg:gap-4 my-6 lg:my-8">
        <Input
          placeholder="E-mail"
          errorMsg={errors.email?.message as string}
          type="text"
          register={register("email")}
        />
        <SelectInput
          required
          register={register("new_role")}
          errorMsg={errors.new_role?.message as string}
          label=""
          firstOption="Selecione uma função"
          options={["admin", "user"]}
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
  );
}
