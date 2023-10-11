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

const createUserProfileFormsSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  age: z.string(),
  ies: z.string(),
  course: z.string(),
  semester: z.string(),
});

type CreateUserProfileData = z.infer<typeof createUserProfileFormsSchema>;

export default function UserProfileForms({
  id,
  role,
}: {
  id: string | undefined;
  role: string | undefined;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserProfileData>({
    resolver: zodResolver(createUserProfileFormsSchema),
  });
  const router = useRouter();
  const [errorReq, setErrorReq] = useState<any>("");
  const errorsDiv = useRef<HTMLDivElement | null>(null);

  async function updateProfile(data: CreateUserProfileData) {
    const { last_name, first_name, ies, course, semester } = data;
    setErrorReq("");
    const formData = new URLSearchParams();
    formData.append("last_name", last_name);
    formData.append("first_name", first_name);
    formData.append("ies", ies);
    formData.append("course", course);
    formData.append("semester", semester);

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Token: "4bf1b87a83fa5f6fafee1e11078b7a2f",
    };

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/users/user/2/profile/`,
        formData.toString(),
        { headers }
      );
      console.log("updated");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(updateProfile)}
        className="w-full m-auto relative overflow-hidden p-1"
      >
        <div className="mb-8 border-l-2 border-dark pl-2">
          <h1
            className={`text-2xl lg:mb-1 font-bold tracking-wide lg:text-3xl xl:text-4xl`}
          >
            Atualize suas credenciais
          </h1>
        </div>
        <div className="flex gap-2 lg:gap-4 my-6 lg:my-8">
          <Input
            placeholder="Nome"
            errorMsg={errors.first_name?.message as string}
            type="text"
            register={register("first_name")}
          />
          <Input
            placeholder="Sobrenome"
            errorMsg={errors.last_name?.message as string}
            type="text"
            register={register("last_name")}
          />
          <Input
            placeholder="Intituição de Ensino"
            errorMsg={errors.ies?.message as string}
            type="text"
            register={register("ies")}
          />
          <Input
            placeholder="Data de nascimento"
            errorMsg={errors.age?.message as string}
            type="text"
            register={register("age")}
          />
          <Input
            placeholder="Semestre"
            errorMsg={errors.semester?.message as string}
            type="text"
            register={register("semester")}
          />
          <Input
            placeholder="Curso"
            errorMsg={errors.course?.message as string}
            type="text"
            register={register("course")}
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
