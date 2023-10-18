"use client";
import Input from "@/components/Input";
import SmallText from "@/components/SmallText";
import Text from "@/components/Text";
import momento from "@/utils/formatDate";
import removeElem from "@/utils/removeElem";
import { userAgent } from "next/server";
import { InputHTMLAttributes, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  currentValue: string;
  setCurrentValue: (value: string) => void;
  values: string[];
  setValues: (value: string[]) => void;
  errorMsg?: string;
  type?: string;
  defaultValue?: string;
  buttonType?: "button" | "submit" | "reset" | undefined;
}

export default function DatePicker({
  placeholder,
  currentValue,
  setCurrentValue,
  setValues,
  values,
  errorMsg,
  type,
  buttonType,
  value,
  ...props
}: DatePickerProps) {
  return (
    <div>
      <div className="relative flex rounded-lg mt-4 border-2 bg-black ">
        <Input
          placeholder={placeholder}
          errorMsg={errorMsg}
          onChange={(e) => setCurrentValue(e.target.value)}
          type={"datetime-local"}
          value={currentValue != "" ? currentValue : value}
          className="my-0 w-full rounded-r-none focus:rounded-r-none"
          {...props}
        />
        <button
          disabled={currentValue <= props.min! || currentValue >= props.max!}
          title={
            currentValue <= props.min! || currentValue >= props.max!
              ? "Coloque um valor valido"
              : "Enviar"
          }
          type={buttonType}
          className=" bg-white p-2 flex items-center justify-center rounded-tr-lg rounded-br-lg text-dark border border-black disabled:text-slate-400"
          onClick={(e) => {
            if (currentValue) {
              var aux = values;
              aux.push(currentValue);
              setValues(aux);
              setCurrentValue("");
            } else {
              setCurrentValue("");
            }
          }}
        >
          <IoAddOutline size={24} />
        </button>
      </div>

      <ul className="flex flex-wrap items-center gap-2 my-1">
        {values.map((elem, index) => {
          return (
            <li className="flex gap-1 items-center">
              <div
                key={elem + index}
                className="bg-slate-500 text-white gap-1 p-2 rounded-md items-center flex justify-between"
              >
                {momento(elem).format("DD/MM/YYYY, kk:mm ")}

                <button
                  type="button"
                  className="p-1 rounded-3xl text-red-500 bg-slate-700 hover:bg-black"
                  onClick={(e) => {
                    setValues(removeElem(values, elem));
                  }}
                >
                  <MdClose className="pointer-events-none" size={16} />
                </button>
              </div>{" "}
              {index % 2 == 0 ? <Text> até</Text> : <></>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
