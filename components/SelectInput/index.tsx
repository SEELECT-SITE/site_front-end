// src/components/SelectInput.tsx
import axios from "axios";
import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { cafeFont } from "../../app/fonts";

export interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  valid?: boolean | undefined;
  errorMsg?: string | undefined;
  register?: UseFormRegisterReturn<string>;
  icon?: Element;
  type?: string;
  setCapacity?: Function;
  options: any[];
  label: string;
  firstOption?: string;
}

const SelectInput: React.FC<InputProps> = ({
  register,
  setCapacity,
  options,
  type,
  label,
  firstOption,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | string>("");

  return (
    <div className="w-full flex flex-col my-2 ">
      <label className="ml-2 bold">{label}</label>
      <select
        className={`text-dark p-4 cursor-pointer rounded-lg border border-black shadow-sm border-b-2 bg-white min-w-[250px] capitalize ${
          selectedOption !== "" ? "border-2 border-cian-500" : ""
        }`}
        value={selectedOption}
        {...register}
        onChange={(e) => {
          if (setCapacity) {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const capacity = selectedOption.getAttribute("data-capacity");
            setCapacity(capacity);
          }
          setSelectedOption(e.target.value);
        }}
      >
        <option value="" disabled>
          {firstOption}
        </option>
        {type == "places" ? (
          <>
            {options?.map((option) => (
              <option
                className={`${cafeFont.className} `}
                key={option.id}
                value={option.id}
                data-capacity={option.capacity}
              >
                {`${option.location} - ${option.capacity} lugares`}
              </option>
            ))}
          </>
        ) : (
          <>
            {options?.map((option, index) => (
              <option
                className={`${cafeFont.className} capitalize`}
                key={option + index}
                value={option}
              >
                {option}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

export default SelectInput;
