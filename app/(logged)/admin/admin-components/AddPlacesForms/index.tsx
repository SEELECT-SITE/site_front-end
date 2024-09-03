"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FloatButton from "@/components/FloatButton";
import Input from "@/components/Input";
import Text from "@/components/Text";
import { useRef, useState } from "react";
import { MdClose, MdErrorOutline } from "react-icons/md";
import axios from "axios";
import removeElem from "@/utils/removeElem";
import { IoAddOutline } from "react-icons/io5";
import { axiosClient } from "@/lib/utils";

const createAddPlaceFormsSchema = z.object({
  location: z.string().nonempty("Preencha o campo"),
  url_location: z.string().nonempty("Preencha o campo"),
  capacity: z.number().min(1),
});

type CreateAddPlaces = z.infer<typeof createAddPlaceFormsSchema>;

export default function AddPlaceForms({ Token }: { Token: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAddPlaces>({
    resolver: zodResolver(createAddPlaceFormsSchema),
  });
  const [equipaments, setEquipaments] = useState<string[]>([]);
  const [currentEquipament, setCurrentEquipament] = useState({
    value: "",
    error: "",
  });

  async function addPlace(data: CreateAddPlaces) {
    const { url_location, location, capacity } = data;
    const formData = new URLSearchParams();
    var aux_equipaments = equipaments;
    formData.append("url_location", url_location);
    formData.append("location", location);
    formData.append("capacity", capacity.toString());
    if (currentEquipament.value != "") {
      aux_equipaments.push(currentEquipament.value);
    }
    formData.append("equipament", aux_equipaments.toString());

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "ngrok-skip-browser-warning": "true",
      Token: Token,
    };

    try {
      await axiosClient.post(`/api/events/places/`, formData.toString(), {
        headers,
      });
    } catch (error) {
      console.log(error);
    } finally {
      reset();
      setEquipaments([]);
      setCurrentEquipament({
        value: "",
        error: "",
      });
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

          <div className="relative rounded-lg mt-4 border-2 bg-black border-black ">
            <Input
              placeholder="Equipamentos (Ex:20 cadeiras)"
              errorMsg={currentEquipament.error}
              onChange={(e) =>
                setCurrentEquipament({ value: e.target.value, error: "" })
              }
              type="text"
              value={currentEquipament.value}
              className="my-0"
            />
            <button
              type="button"
              className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white h-full p-3 flex items-center justify-center rounded-tr-lg rounded-br-lg border-l text-dark"
              onClick={(e) => {
                if (currentEquipament.value) {
                  var aux = equipaments;

                  aux.push(currentEquipament.value);
                  setEquipaments(aux);
                  setCurrentEquipament({
                    value: "",
                    error: "",
                  });
                } else {
                  setCurrentEquipament({
                    value: "",
                    error: "Coloque um valor valido",
                  });
                }
              }}
            >
              <IoAddOutline size={24} />
            </button>
          </div>
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

        <FloatButton
          className="bg-cian-700 lg:text-lg text-white"
          shadowClassname="w-full bg-black/80"
        >
          Enviar
        </FloatButton>
      </form>
    </>
  );
}
