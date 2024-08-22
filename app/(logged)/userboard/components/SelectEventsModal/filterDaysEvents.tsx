import React, { useState } from "react";
import RadioGroup from "@/components/RadioGroup";
import useSelectEventsState from "./selectEventsStore";

const FilterDaysEvents = () => {
  const { setDayOfWeek } = useSelectEventsState();

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDayOfWeek(e.target.value);
  };

  return (
    <RadioGroup
      className="my-2"
      onChange={handleDayChange}
      label="Dias"
      options={[
        { title: "Segunda", value: "segunda-feira" },
        { title: "Terça", value: "terça-feira" },
        { title: "Quarta", value: "quarta-feira" },
        { title: "Quinta", value: "quinta-feira" },
        { title: "Sexta", value: "sexta-feira" },
        { title: "Todos os dias", value: "allDays" },
      ]}
      groupName={"dias da semana"}
    />
  );
};

export default FilterDaysEvents;
