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
import SmallText from "@/components/SmallText";
import MultipleInputs from "@/components/SECTIONS/DatePicker";
import DatePicker from "@/components/SECTIONS/DatePicker";
import momento from "@/utils/formatDate";

interface OptionPlace {
  location: string;
  id: number | string;
  capacity: number;
}

const createAddEventsSchema = z.object({
  title: z.string().nonempty("Preencha o campo"),
  category: z.string().nonempty("Preencha o campo"),
  place: z.string().nonempty("Preencha o campo"),
  host: z.string().nonempty("Preencha o campo"),
  description: z.string().nonempty("Preencha o campo"),
});

type CreateAddEvents = z.infer<typeof createAddEventsSchema>;

export default function AddEventsForms({ Token }: { Token: string }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateAddEvents>({
    resolver: zodResolver(createAddEventsSchema),
  });
  const [errorReq, setErrorReq] = useState<any>("");
  const errorsDiv = useRef<HTMLDivElement | null>(null);
  const [eventCapacity, setEventCapacity] = useState<number>(0);
  const [dates, setDates] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");

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
    const { category, title, place, host, description } = data;
    setErrorReq("");

    if (dates.length % 2 != 0 || dates.length == 0) {
      setErrorReq("Coloque um par de datas");
      return;
    }

    var eventDates = "{";
    for (var i = 0; i < dates.length; i += 2) {
      var wrongDate = momento(dates[i]).isAfter(dates[i + 1]);

      if (wrongDate) {
        setErrorReq("Horarios invertidos");
        return;
      }
      eventDates += `"${i / 2}": {"start": "${dates[i]}", "end": "${
        dates[i + 1]
      }"}${i + 2 >= dates.length ? "}" : ","} `;
    }

    const formData = new URLSearchParams();
    formData.append("category", category);
    formData.append("title", title);
    formData.append("place", place);
    formData.append("host", host);
    formData.append("max_number_of_inscriptions", [eventCapacity].toString());
    formData.append("description", description);
    formData.append("date", eventDates);

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
    } finally {
      setDates([]);
      reset();
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(addEvent)}
        onKeyDown={(e) => {}}
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
          <Input
            placeholder="Falicitadores (Ex:Manuel, Chico e Whindersson)"
            errorMsg={errors.host?.message as string}
            type="text"
            register={register("host")}
          />
          <Input
            placeholder="Descrição"
            errorMsg={errors.description?.message as string}
            type="text"
            register={register("description")}
          />
          <DatePicker
            buttonType="button"
            min="2023-11-06T07:00"
            max="2023-11-11T20:00"
            value="2023-11-06T07:00"
            placeholder="Datas"
            type="datetime-local"
            setCurrentValue={setDate}
            setValues={setDates}
            currentValue={date}
            values={dates}
          />

          <SelectInput
            label="Tipo de Evento"
            errorMsg={errors.category?.message as string}
            firstOption="Selecione um evento"
            options={[
              "palestra",
              "workshop",
              "minicurso",
              "mesa redonda",
              "visita técnica",
            ]}
            register={register("category")}
          />
          <SelectInput
            label="Lugar"
            errorMsg={errors.place?.message as string}
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
