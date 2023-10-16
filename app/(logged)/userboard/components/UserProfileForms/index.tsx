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
import { MdClose, MdErrorOutline } from "react-icons/md";
import { scrollToElement } from "@/utils/scrollToElement";
import axios from "axios";
import useUserForms from "./userForms";
import Title from "@/components/Title";
import { User } from "next-auth";
import { DJANGO_URL } from "@/utils/consts";
import SelectInput from "@/components/SelectInput";

const createUserProfileFormsSchema = z.object({
  first_name: z.string().nonempty("Preencha o campo"),
  last_name: z.string().nonempty("Preencha o campo"),
  age: z.string().pipe(z.coerce.date()),
  ies: z.string().nonempty("Preencha o campo"),
  course: z.string().nonempty("Preencha o campo"),
  semester: z.number().min(2, "Coloque o seu semestre"),
});

type CreateUserProfileData = z.infer<typeof createUserProfileFormsSchema>;

export default function UserProfileForms({
  user,
  sessionUpdate,
}: {
  user: User;
  sessionUpdate: Function;
}) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateUserProfileData>({
    resolver: zodResolver(createUserProfileFormsSchema),
  });

  const { isUserFormsOpen, setIsUserFormsOpen } = useUserForms();

  async function updateProfile(data: CreateUserProfileData) {
    const { last_name, first_name, ies, course, semester, age } = data;
    const formData = new URLSearchParams();
    formData.append("last_name", last_name);
    formData.append("first_name", first_name);
    formData.append("ies", ies);
    formData.append("course", course);
    formData.append("semester", semester.toString());
    formData.append("age", age.toString());

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Token: user.token,
    };

    try {
      await axios.put(
        `${DJANGO_URL}api/users/user/${user.id}/profile/`,
        formData.toString(),
        { headers }
      );
      sessionUpdate();
      setIsUserFormsOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(updateProfile)}
        className={`w-full m-auto relative max-w-md duration-300`}
      >
        <Text
          className={` lg:mb-1 font-bold tracking-wide lg:text-xl xl:text-2xl`}
        >
          Atualize suas credenciais
        </Text>

        <div className="flex-col flex gap-2 lg:gap-4 my-6 lg:my-8 max-w-md">
          <Input
            defaultValue={user.name?.split(" ")[0] || ""}
            placeholder="Nome"
            errorMsg={errors.first_name?.message as string}
            type="text"
            register={register("first_name")}
          />
          <Input
            defaultValue={user.name?.split(" ")[1] || ""}
            placeholder="Sobrenome"
            errorMsg={errors.last_name?.message as string}
            type="text"
            register={register("last_name")}
          />

          <SelectInput
            register={register("ies")}
            errorMsg={errors.ies?.message as string}
            label=""
            firstOption="Selecione uma instituição de ensino"
            options={["UFC - Universidade Federal do Ceará", "Outra"]}
          />
          <Input
            defaultValue={user.ies}
            placeholder="Intituição de Ensino"
            type="text"
            register={register("ies")}
            errorMsg={errors.ies?.message as string}
          />
          <Input
            defaultValue={user.semestre || "2"}
            placeholder="Semestre"
            errorMsg={errors.semester?.message as string}
            type="number"
            register={register("semester", { valueAsNumber: true })}
          />
          <Input
            defaultValue={user.course}
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
