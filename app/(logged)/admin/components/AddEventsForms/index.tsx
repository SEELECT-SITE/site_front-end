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
import SelectInput from "@/components/SelectInput";

const createAddEventsSchema = z.object({
  title: z.string(),
  category: z.string(),
  place: z.string(),
});

type CreateAddEvents = z.infer<typeof createAddEventsSchema>;

export default function AddEventsForms() {
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
      Token: "d433e1980a3506f1512f0c9bc9a72abc",
    };

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/events/`,
        formData.toString(),
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(addEvent)}
        className="w-full m-auto relative overflow-hidden p-1"
      >
        <h1
          className={`text-2xl lg:mb-1 font-bold tracking-wide lg:text-3xl xl:text-4xl`}
        >
          Crie um evento
        </h1>
        <div className="flex gap-2 lg:gap-4 my-6 lg:my-8">
          <Input
            placeholder="Titulo da Palestra"
            errorMsg={errors.title?.message as string}
            type="text"
            register={register("title")}
          />
          <Input
            placeholder="Categoria"
            errorMsg={errors.category?.message as string}
            type="text"
            register={register("category")}
          />
          {/* <Input
            placeholder="Lugar"
            errorMsg={errors.place?.message as string}
            type="text"
            register={register("capacity")}
          /> */}
          <SelectInput
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
