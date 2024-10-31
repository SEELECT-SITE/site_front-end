"use client";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FloatButton from "@/components/FloatButton";
import Input from "@/components/Input";
import { useRef, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import SelectInput from "@/components/SelectInput";
import { useQuery } from "react-query";
import DatePicker from "@/components/SECTIONS/DatePicker";
import momento from "@/utils/formatDate";
import {
  axiosClient,
  eventDatesFromDBToApp,
  eventDatesToDB,
} from "@/lib/utils";
import { EventProps } from "@/pages/api/auth/nextauth";

interface OptionPlace {
  location: string;
  id: number | string;
  capacity: number;
}

const createAddEventsSchema = z.object({
  title: z.string().min(1, "Preencha o campo"),
  category: z.string().min(1, "Preencha o campo"),
  place: z.string().min(1, "Preencha o campo"),
  host: z.string().min(1, "Preencha o campo"),
  description: z.string().min(1, "Preencha o campo"),
});

type CreateAddEvents = z.infer<typeof createAddEventsSchema>;

const startDate = process.env.NEXT_PUBLIC_START_DATE;
const endDate = process.env.NEXT_PUBLIC_END_DATE;

export default function AddEventsForms({
  Token,
  eventToEdit,
  setEditEventModalOpen,
}: {
  Token: string;
  eventToEdit?: EventProps;
  setEditEventModalOpen?: (state: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAddEvents>({
    resolver: zodResolver(createAddEventsSchema),
    defaultValues: {
      title: eventToEdit?.title ?? "",
      description: eventToEdit?.description ?? "",
      host: eventToEdit?.host ?? "",
      category: eventToEdit?.category ?? "",
      place: eventToEdit?.place.id ?? "",
    },
  });
  const [errorReq, setErrorReq] = useState<any>("");
  const errorsDiv = useRef<HTMLDivElement | null>(null);
  const [eventCapacity, setEventCapacity] = useState<number>(
    eventToEdit?.max_number_of_inscriptions ?? 0
  );
  const [dates, setDates] = useState<string[]>(
    eventDatesFromDBToApp(eventToEdit?.date) ?? []
  );
  const [date, setDate] = useState<string>("");

  const { data: places, isLoading } = useQuery<OptionPlace[] | undefined>(
    "Places",
    async () => {
      const headers = {
        Token: Token,
      };

      try {
        const { data } = await axiosClient.get(`api/events/places/`, {
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
    for (var i = 0; i < dates.length; i += 2) {
      if (momento(dates[i]).isAfter(dates[i + 1])) {
        setErrorReq("Existem datas invertidas");
        return;
      }
    }

    const eventDates = eventDatesToDB(dates, setErrorReq);

    const formData = new URLSearchParams();
    formData.append("category", category);
    formData.append("title", title);
    formData.append("place", place);
    formData.append("host", host);
    formData.append("max_number_of_inscriptions", [eventCapacity].toString());
    formData.append("description", description);
    formData.append("date", eventDates);

    const headers = {
      Token: Token,
    };
    try {
      if (eventToEdit) {
        await axiosClient.put(
          `/api/events/${eventToEdit.id}/`,
          formData.toString(),
          {
            headers,
          }
        );
        setEditEventModalOpen && setEditEventModalOpen(false);
      } else {
        await axiosClient.post(`/api/events/`, formData.toString(), {
          headers,
        });
      }
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
        className="w-full overflow-hidden p-3 border border-slate-600 max-w-md bg-slate-800 text-slate-100 rounded-md"
      >
        <h3
          className={`text-xl lg:mb-1 font-bold tracking-wide lg:text-2xl xl:text-3xl`}
        >
          {eventToEdit ? "Edite o evento" : "Crie um evento"}
        </h3>
        <div className="flex flex-col gap-2 lg:gap-4 my-6 lg:my-8">
          <Input
            placeholder="Titulo do Evento"
            errorMsg={errors.title?.message as string}
            type="text"
            register={register("title")}
          />
          <Input
            placeholder="Falicitadores (Ex:Leticia, Felipe e Tonho)"
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
            min={startDate}
            max={endDate}
            defaultValue={startDate}
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
          Enviar
        </FloatButton>
      </form>
    </>
  );
}
