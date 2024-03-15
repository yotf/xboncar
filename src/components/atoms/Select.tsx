import React from "react";
import { FieldError } from "react-hook-form";
import InputErrorMessage from "./InputErrorMessage";

type OptionType = {
  value: string;
  label: string;
};

type CustomSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: OptionType[];
  error?: FieldError;
  selectClassName?: string;
};

const CustomSelect = React.forwardRef<HTMLSelectElement, CustomSelectProps>(
  (
    { className, error, selectClassName, options, id, ...rest },
    ref
  ) => {
    return (
      <div className={`${className || ""}`}>
        <select
          ref={ref}
          id={id}
          className={`mt-1 block w-full rounded-md ${selectClassName || ""}  ${
            error
              ? "border-red-500 focus:ring-red-400 focus:border-red-500"
              : "border-gray-300 focus:border-carbonx-green focus:ring-carbonx-khaki"
          } shadow-sm focus:ring focus:ring-opacity-20`}
          {...rest}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <InputErrorMessage message={error.message} />}
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect"; // Setting displayName is recommended when using forwardRef

export default CustomSelect;
