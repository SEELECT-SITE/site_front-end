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

  async function createContact(data: any) {
    setErroReq({ ...erroReq, status: false });
    const formData = new URLSearchParams();
    formData.append("first_name", data.first_name as string);
    formData.append("last_name", data.last_name as string);
    formData.append("password", data.password as string);
    formData.append("email", data.email as string);

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    console.log(formData.toString());
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/register/",
        formData.toString(),
        { headers }
      );
      if (response.status === 201) {
        setRegisterSuccessMsg(
          "Cadastro confirmado, você será redirecionado para o Login"
        );
        setTimeout(() => {
          router.replace("/login");
        }, 1500);
      }
    } catch (err: any) {
      const errorKeys = Object.keys(err.response.data);
      const errosList = errorKeys.map((key) => err.response.data[key][0]) as [
        string
      ];
      setErroReq({ status: true, errors: errosList });
      scrollToElement(errorsDiv);
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
          placeholder="Nome"
          errorMsg={errors.first_name?.message}
          type="text"
          register={register("first_name")}
        />
        <Input
          placeholder="Sobrenome"
          errorMsg={errors.last_name?.message}
          type="text"
          register={register("last_name")}
        />
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
        type="submit"
        className="bg-cian-700 lg:text-lg text-white"
        shadowClassname="w-full bg-black/80 mt-4"
      >
        Registrar
      </FloatButton>
    </form>
  );
}
