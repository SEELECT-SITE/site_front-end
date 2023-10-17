// src/components/SelectInput.tsx
import axios from "axios";
import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { cafeFont } from "../../app/fonts";
import { MdErrorOutline } from "react-icons/md";
import { PiAsteriskSimpleDuotone } from "react-icons/pi";

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
  errorMsg,
  required,
  firstOption,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | string>("");

  return (
    <div className="w-full flex flex-col my-2 relative">
      <label className="ml-2 bold">{label}</label>
      {required && (
        <span className="absolute right-1 top-2 -translate-y-9 text-white">
          <PiAsteriskSimpleDuotone size={24} />
        </span>
      )}
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
      {errorMsg && (
        <span className="pointer-events-none  absolute end-4 -bottom-7 text-sm text-red-500 flex gap-1 items-start line-clamp-1 whitespace-nowrap right-0 errorReqAnimated">
          {errorMsg}
          <MdErrorOutline size={16} className="mt-0.5" />
        </span>
      )}
    </div>
  );
};

export default SelectInput;
