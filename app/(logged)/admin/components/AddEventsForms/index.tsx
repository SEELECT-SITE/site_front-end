"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FloatButton from "@/components/FloatButton";
import Input from "@/components/Input";
import { useRef, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import axios from "axios";
import SelectInput from "@/components/SelectInput";
import { useQuery } from "react-query";
import { DJANGO_URL } from "@/utils/consts";

interface OptionPlace {
  location: string;
  id: number | string;
  capacity: number;
}

const createAddEventsSchema = z.object({
  title: z.string().nonempty("Coloque um titulo"),
  category: z.string(),
  place: z.string(),
});

type CreateAddEvents = z.infer<typeof createAddEventsSchema>;

export default function AddEventsForms({ Token }: { Token: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAddEvents>({
    resolver: zodResolver(createAddEventsSchema),
  });
  const [errorReq, setErrorReq] = useState<any>("");
  const errorsDiv = useRef<HTMLDivElement | null>(null);
  const [eventCapacity, setEventCapacity] = useState<number>(0);

  const { data: places, isLoading } = useQuery<OptionPlace[] | undefined>(
    "Places",
    async () => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "ngrok-skip-browser-warning": "true",
        Token: Token,
      };

      try {
        const { data } = await axios.get(`${DJANGO_URL}api/events/places/`, {
          headers,
        });
        return data.results;
      } catch (error) {
        console.log(error);
      }
    },
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  async function addEvent(data: CreateAddEvents) {
    const { category, title, place } = data;
    setErrorReq("");
    const formData = new URLSearchParams();
    formData.append("category", category);
    formData.append("title", title);
    formData.append("places", place);
    formData.append("max_number_of_inscriptions", [eventCapacity].toString());

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Token: Token,
    };

    try {
      await axios.post(`${DJANGO_URL}/api/events/`, formData.toString(), {
        headers,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(addEvent)}
        className="w-full m-auto relative overflow-hidden p-3 border border-slate-100 max-w-md bg-white text-dark"
      >
        <h1
          className={`text-2xl lg:mb-1 font-bold tracking-wide lg:text-3xl xl:text-4xl`}
        >
          Crie um evento
        </h1>
        <div className="flex flex-col gap-2 lg:gap-4 my-6 lg:my-8">
          <Input
            placeholder="Titulo do Evento"
            errorMsg={errors.title?.message as string}
            type="text"
            register={register("title")}
          />
          <SelectInput
            label="Tipo de Evento"
            firstOption="Selecione um evento"
            options={["palestra", "workshop", "minicurso"]}
            register={register("category")}
          />
          <SelectInput
            label="Lugar"
            firstOption="Selecione um lugar"
            type="places"
            options={places!}
            register={register("place")}
            setCapacity={setEventCapacity}
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
          disabled={false}
        >
          Entrar
        </FloatButton>
      </form>
    </>
  );
}
