"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FloatButton from "@/components/FloatButton";
import { HiPencilAlt } from "react-icons/hi";
import Input from "@/components/Input";
import Text from "@/components/Text";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { scrollToElement } from "@/utils/scrollToElement";
import axios from "axios";

const createUserProfileFormsSchema = z.object({
  first_name: z.string().nonempty("Preencha o campo abaixo"),
  last_name: z.string().nonempty("Preencha o campo abaixo"),
  age: z.string().nonempty("Preencha o campo abaixo"),
  ies: z.string().nonempty("Preencha o campo abaixo"),
  course: z.string().nonempty("Preencha o campo abaixo"),
  semester: z.string().nonempty("Preencha o campo abaixo"),
});

type CreateUserProfileData = z.infer<typeof createUserProfileFormsSchema>;

export default function UserProfileForms({
  token,
  id,
}: {
  token: string | undefined;
  id: string | undefined;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserProfileData>({
    resolver: zodResolver(createUserProfileFormsSchema),
  });

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const errorsDiv = useRef<HTMLDivElement | null>(null);

  async function updateProfile(data: CreateUserProfileData) {
    const { last_name, first_name, ies, course, semester, age } = data;
    const formData = new URLSearchParams();
    formData.append("last_name", last_name);
    formData.append("first_name", first_name);
    formData.append("ies", ies);
    formData.append("course", course);
    formData.append("semester", semester);
    formData.append("age", age);

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Token: token,
    };

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/users/user/${id}/profile/`,
        formData.toString(),
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <FloatButton className="flex" onClick={(e) => setIsFormOpen(true)}>
        Editar perfil <HiPencilAlt size={18} />
      </FloatButton>
      <form
        onSubmit={handleSubmit(updateProfile)}
        className={`w-full m-auto relative overflow-hidden p-1 max-w-sm duration-300 ${
          isFormOpen ? "block" : "hidden"
        }`}
      >
        <div className="mb-8 border-l-2 border-dark pl-2">
          <h1
            className={`text-2xl lg:mb-1 font-bold tracking-wide lg:text-3xl xl:text-4xl`}
          >
            Atualize suas credenciais
          </h1>
        </div>
        <div className="flex-col flex gap-2 lg:gap-4 my-6 lg:my-8 max-w-md">
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
