"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FloatButton from "@/components/FloatButton";
import Input from "@/components/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Alert from "@/components/Alert";
import { MdErrorOutline } from "react-icons/md";
import {
  CreateCadastroData,
  createCadastroSchema,
} from "./FormsCadastroSchemas";
import { scrollToElement } from "@/utils/scrollToElement";
import { DJANGO_URL } from "@/utils/consts";

interface erroReqType {
  status: boolean;
  errors: [string] | null;
}

export default function FormsCadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCadastroData>({
    resolver: zodResolver(createCadastroSchema),
  });
  const router = useRouter();
  const [erroReq, setErroReq] = useState<erroReqType>({
    status: false,
    errors: null,
  });
  const errorsDiv = useRef<HTMLDivElement | null>(null);
  const [registerSuccessMsg, setRegisterSuccessMsg] = useState<string>("");
  const [sendb, setSendb] = useState<boolean>(false);
  async function createContact(data: any) {
    setErroReq({ ...erroReq, status: false });
    const formData = new URLSearchParams();
    formData.append("password", data.password as string);
    formData.append("email", data.email as string);

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    try {
      setSendb(true);
      setRegisterSuccessMsg("CONFIRA SEU EMAIL PARA CONFIRMAR O CADASTRO");

      await axios.post(`${DJANGO_URL}api/auth/register/`, formData.toString(), {
        headers,
      });
    } catch (err: any) {
      const errorKeys = Object.keys(err.response.data);
      const errosList = errorKeys.map((key) => err.response.data[key][0]) as [
        string
      ];
      setErroReq({ status: true, errors: errosList });
      scrollToElement(errorsDiv);
    } finally {
      setSendb(false);
      router.push("./login");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(createContact)}
      className="w-full max-w-md m-auto relative"
    >
      {registerSuccessMsg !== "" && (
        <Alert timeout={4000} className="border-green-400">
          {registerSuccessMsg}
        </Alert>
      )}
      <div className="flex flex-col gap-3 lg:gap-5 my-8">
        <Input
          placeholder="E-mail"
          errorMsg={errors.email?.message}
          type="email"
          register={register("email")}
        />
        <Input
          placeholder="Senha"
          errorMsg={errors.password?.message as string}
          type="password"
          register={register("password")}
        />
        <Input
          placeholder="Confirme sua senha"
          errorMsg={errors.confirmPassword?.message as string}
          type="password"
          register={register("confirmPassword")}
        />
        <div id="errors_api" ref={errorsDiv}>
          {erroReq.status && (
            <ul className="text-dark flex flex-col gap-1 errorReqAnimated">
              {erroReq.errors?.map((elem, index) => {
                return (
                  <li
                    key={index + elem}
                    className="underline flex items-start gap-1 text-red-500"
                  >
                    <MdErrorOutline size={16} className="mt-1.5" />
                    {elem}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <FloatButton
        disabled={sendb}
        type="submit"
        className="bg-cian-700 lg:text-lg text-white"
        shadowClassname="w-full bg-black/80 mt-4"
      >
        Registrar
      </FloatButton>
    </form>
  );
}
