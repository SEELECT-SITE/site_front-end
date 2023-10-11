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
import Title from "@/components/Title";

const createAddPlaceFormsSchema = z.object({
  location: z.string(),
  url_location: z.string(),
  capacity: z.string(),
  equipaments: z.string(),
});

type CreateAddPlaces = z.infer<typeof createAddPlaceFormsSchema>;

export default function AddPlaceForms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAddPlaces>({
    resolver: zodResolver(createAddPlaceFormsSchema),
  });
  const [errorReq, setErrorReq] = useState<any>("");
  const errorsDiv = useRef<HTMLDivElement | null>(null);

  async function addPlace(data: CreateAddPlaces) {
    const { url_location, location, capacity, equipaments } = data;
    setErrorReq("");
    const formData = new URLSearchParams();
    formData.append("url_location", url_location);
    formData.append("location", location);
    formData.append("equipaments", equipaments);
    formData.append("capacity", capacity);

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Token: "36d0c4ebde1c6e5dec38d4fc54b40c77",
    };

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/events/places/`,
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
        onSubmit={handleSubmit(addPlace)}
        className="w-full m-auto relative overflow-hidden p-3 border border-slate-100 max-w-md"
      >
        <Text className="pl-2">Adicione um novo lugar para eventos.</Text>

        <div className=" gap-2 lg:gap-3 my-6 lg:my-8 flex flex-col">
          <Input
            placeholder="Nome do local"
            errorMsg={errors.location?.message as string}
            type="text"
            register={register("location")}
          />
          <Input
            placeholder="URL de localização"
            errorMsg={errors.url_location?.message as string}
            type="text"
            register={register("url_location")}
          />
          <Input
            placeholder="Capacidade do local"
            errorMsg={errors.capacity?.message as string}
            type="text"
            register={register("capacity")}
          />
          <Input
            placeholder="Equipamentos"
            errorMsg={errors.equipaments?.message as string}
            type="text"
            register={register("equipaments")}
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
