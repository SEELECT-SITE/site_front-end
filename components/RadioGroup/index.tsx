import { FunctionComponent, InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface RadioGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  options: any;
  groupName: string;
  label: string;
  register?: UseFormRegisterReturn<string>;
}

const RadioGroup: FunctionComponent<RadioGroupProps> = ({
  className,
  groupName,
  options,
  register,
  label,
  ...props
}) => {
  return (
    <fieldset className="flex flex-wrap gap-1 items-center justify-center">
      <legend className="sr-only">{label}</legend>
      {options.map((elem: any, index: number) => {
        return (
          <div key={elem.value + index}>
            <input
              type="radio"
              {...register}
              name={groupName}
              value={elem.value}
              id={elem.value + index}
              className="peer hidden"
              {...props}
            />

            <label
              htmlFor={elem.value + index}
              className={twMerge(
                "flex cursor-pointer items-center justify-center rounded-md border border-slate-800    bg-white px-3 py-2 text-gray-900 hover:border-slate-800 peer-checked:shadow-md peer-checked:border-slate-200  peer-checked:bg-cian-700 peer-checked:text-white",
                className
              )}
            >
              <p className="text-sm font-medium">{elem.title}</p>
            </label>
          </div>
        );
      })}
    </fieldset>
  );
};

export default RadioGroup;
