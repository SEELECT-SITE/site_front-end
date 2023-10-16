"use client";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FloatButton from "@/components/FloatButton";
import Input from "@/components/Input";
import Text from "@/components/Text";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { EventHandler, MouseEvent, useRef, useState } from "react";
import { MdClose, MdErrorOutline } from "react-icons/md";
import { scrollToElement } from "@/utils/scrollToElement";
import axios from "axios";
import Title from "@/components/Title";
import removeElem from "@/utils/removeElem";
import { DJANGO_URL } from "@/utils/consts";
import { IoAddOutline } from "react-icons/io5";

const createAddPlaceFormsSchema = z.object({
  location: z.string().nonempty("Preencha o campo"),
  url_location: z.string().nonempty("Preencha o campo"),
  capacity: z.number().min(1),
  equipaments: z.string(),
});

type CreateAddPlaces = z.infer<typeof createAddPlaceFormsSchema>;

export default function AddPlaceForms({ Token }: { Token: string }) {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateAddPlaces>({
    resolver: zodResolver(createAddPlaceFormsSchema),
  });
  const [errorReq, setErrorReq] = useState<any>("");
  const errorsDiv = useRef<HTMLDivElement | null>(null);
  const [equipaments, setEquipaments] = useState<string[]>([]);

  function removEquipaments(id: string) {
    if (equipaments.includes(id)) {
      setEquipaments(removeElem(equipaments, id));
    } else {
      equipaments.push(id);
      setEquipaments(equipaments);
    }
  }

  async function addPlace(data: CreateAddPlaces) {
    const { url_location, location, capacity } = data;
    setErrorReq("");
    const formData = new URLSearchParams();
    formData.append("url_location", url_location);
    formData.append("location", location);
    equipaments.forEach((elem) => {
      if (elem) {
        formData.append("equipaments", elem);
      }
    });
    formData.append("capacity", capacity.toString());

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "ngrok-skip-browser-warning": "true",
      Token: Token,
    };

    try {
      await axios.post(
        `${DJANGO_URL}/api/events/places/`,
        formData.toString(),
        { headers }
      );
    } catch (error) {
      console.log(error);
    } finally {
      reset();
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
            type="number"
            register={register("capacity", { valueAsNumber: true })}
          />

          <div className="relative rounded-lg border-2 bg-black border-black ">
            <Input
              placeholder="Equipamentos (Ex:20 cadeiras)"
              errorMsg={errors.equipaments?.message as string}
              required={false}
              register={register("equipaments")}
              type="text"
              className="my-0"
            />
            <button
              type="button"
              className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white h-full p-3 flex items-center justify-center rounded-tr-lg rounded-br-lg border-l text-dark"
              onClick={(e) => {
                var currentEquipament = getValues("equipaments");
                console.log(currentEquipament);
                if (currentEquipament) {
                  var aux = equipaments;
                  aux.push(currentEquipament);
                  setEquipaments(aux);
                  setValue("equipaments", "");
                } else {
                  setError("equipaments", {
                    type: "manual",
                    message: "Não pode estar vazio",
                  });
                }
              }}
            >
              <IoAddOutline size={24} />
            </button>
          </div>
          <div>
            <ul className="flex gap-2">
              {equipaments.map((elem, index) => {
                return (
                  <li
                    key={elem + index}
                    className="bg-slate-500 gap-1 p-2 rounded-md items-center flex justify-between"
                  >
                    {elem}
                    <button
                      type="button"
                      className="p-1 rounded-3xl bg-slate-900 hover:bg-black"
                      onClick={(e) => {
                        setEquipaments(removeElem(equipaments, elem));
                      }}
                    >
                      <MdClose className="pointer-events-none" size={16} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <ul className="flex gap-2 flex-wrap">
            {equipaments.map((equipament, index) => {
              if (!equipament) {
                return null;
              }
              return (
                <li
                  className="bg-slate-500 gap-1 p-2 rounded-md items-center flex justify-between"
                  key={equipament + index}
                >
                  {equipament}
                  <button
                    type="button"
                    data-value={equipament}
                    className="p-1 rounded-3xl bg-slate-900 hover:bg-black hover:text-red-400"
                    onClick={(e) => {
                      const currentEquipament =
                        e.target.getAttribute("data-value");
                      setEquipaments(
                        removeElem(equipaments, currentEquipament)
                      );
                    }}
                  >
                    <MdClose size={16} className="pointer-events-none" />
                  </button>
                </li>
              );
            })}
          </ul>
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
