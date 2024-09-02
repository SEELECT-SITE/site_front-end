"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FloatButton from "@/components/FloatButton";
import { HiPencilAlt } from "react-icons/hi";
import Input from "@/components/Input";
import Text from "@/components/Text";
import axios from "axios";
import useUserForms from "./userForms";
import { User } from "next-auth";
import { IES_CEARA, UFC_COURSES } from "@/utils/consts";
import SelectInput from "@/components/SelectInput";
import validateCPF from "@/utils/validateCPF";
import momento from "@/utils/formatDate";
import { axiosClient } from "@/lib/utils";

const createUserProfileFormsSchema = z.object({
  first_name: z.string().nonempty("Preencha o campo"),
  last_name: z.string().nonempty("Preencha o campo"),
  birthday: z.string().nonempty("Preencha o campo"),
  ies: z.string().nonempty("Preencha o campo"),
  course: z.string().nonempty("Preencha o campo"),
  semester: z
    .number()
    .min(1, "Coloque um valor válido")
    .max(20)
    .nonnegative({ message: "Coloque um valor válido" }),
  cpf: z
    .string()
    .nonempty("Preencha o campo")
    .refine(
      (data) => {
        return validateCPF(data);
      },
      { message: "Coloque um CPF válido" }
    ),
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
    formState: { errors },
  } = useForm<CreateUserProfileData>({
    resolver: zodResolver(createUserProfileFormsSchema),
  });

  const { setIsUserFormsOpen } = useUserForms();

  async function updateProfile(data: CreateUserProfileData) {
    const { last_name, first_name, ies, course, semester, birthday, cpf } =
      data;
    console.log(momento(birthday));
    const formData = new URLSearchParams();
    formData.append("last_name", last_name);
    formData.append("first_name", first_name);
    formData.append("ies", ies);
    formData.append("course", course);
    formData.append("semester", semester.toString());
    formData.append("birthday", birthday.toString());
    formData.append("cpf", cpf);

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Token: user.token,
    };

    try {
      await axiosClient.put(
        `users/user/${user.id}/profile/`,
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
            required
            register={register("first_name")}
          />
          <Input
            defaultValue={user.name?.split(" ")[1] || ""}
            placeholder="Sobrenome"
            errorMsg={errors.last_name?.message as string}
            type="text"
            required
            register={register("last_name")}
          />
          <Input
            defaultValue={user.name?.split(" ")[1] || ""}
            placeholder="Data de nascimento"
            errorMsg={errors.birthday?.message as string}
            type="date"
            required
            register={register("birthday")}
          />

          <SelectInput
            required
            register={register("ies")}
            errorMsg={errors.ies?.message as string}
            label=""
            firstOption="Selecione uma instituição de ensino"
            options={IES_CEARA}
          />
          <SelectInput
            required
            register={register("course")}
            errorMsg={errors.course?.message as string}
            label=""
            firstOption="Selecione um curso"
            options={UFC_COURSES}
          />
          <Input
            max={20}
            min={1}
            defaultValue={user.semestre}
            placeholder="Semestre"
            errorMsg={errors.semester?.message as string}
            type="number"
            required
            register={register("semester", { valueAsNumber: true })}
          />
          <Input
            placeholder="CPF - Apenas os numeros."
            maxLength={11}
            minLength={11}
            errorMsg={errors.cpf?.message as string}
            required
            register={register("cpf")}
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
