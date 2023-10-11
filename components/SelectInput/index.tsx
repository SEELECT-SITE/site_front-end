// src/components/SelectInput.tsx
import axios from "axios";
import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { UseFormRegisterReturn } from "react-hook-form";

interface OptionPlace {
  location: string;
  id: number | string;
  capacity: number;
}
export interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  valid?: boolean | undefined;
  errorMsg?: string | undefined;
  register?: UseFormRegisterReturn<string>;
  icon?: Element;
  type?: string;
  setCapacity: any;
}

const SelectInput: React.FC<InputProps> = ({ register, setCapacity }) => {
  const [selectedOption, setSelectedOption] = useState<number | string>("");

  const { data: options, isLoading } = useQuery<OptionPlace[] | undefined>(
    "Places",
    async () => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Token: "5f70ec9f8ffa4f472911535674ec333e",
      };

      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/events/places/`,
          { headers }
        );
        return data.results;
      } catch (error) {
        console.log(error);
      }
    }
  );

  return (
    <select
      className="text-dark p-4 rounded-lg"
      value={selectedOption}
      {...register}
      onChange={(e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const capacity = selectedOption.getAttribute("data-capacity");
        setCapacity(capacity);
        setSelectedOption(e.target.value);
      }}
    >
      <option value="" disabled>
        Selecione um Lugar
      </option>
      {options?.map((option) => (
        <option
          key={option.id}
          value={option.id}
          data-capacity={option.capacity}
        >
          {`${option.location} - ${option.capacity} lugares`}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
