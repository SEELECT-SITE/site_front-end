import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface TextAreaInputProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label?: string;
  register?: UseFormRegisterReturn<string>;
}

export default function TextAreaInput({
  register,
  label,
  ...props
}: TextAreaInputProps) {
  return (
    <div className="-mt-4">
      <label
        htmlFor="OrderNotes"
        className="block text-base text-gray-300 pl-2"
      >
        {label}
      </label>

      <textarea
        {...register}
        {...props}
        className={twMerge(
          "mt-2 p-2 w-full outline-none border border-black border-b-2 focus:ring-2 rounded-lg bg-white text-dark align-top shadow-sm ",
          props.className
        )}
      ></textarea>
    </div>
  );
}
