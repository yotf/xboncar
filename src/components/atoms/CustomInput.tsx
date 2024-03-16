import React from "react";
import { FieldError } from "react-hook-form";
import InputErrorMessage from "./InputErrorMessage";

export type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: FieldError;
  inputClassName?: string;
  endPlaceholder?: string;
};

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, error, inputClassName, id, endPlaceholder, ...rest }, ref) => {
    return (
      <div className={`relative ${className || ""}`}>
        <input
          ref={ref}
          id={id}
          type={rest.type || "text"}
          className={`mt-1 block w-full rounded-md ${inputClassName || ""}  ${
            error
              ? "border-red-500 focus:ring-red-400 focus:border-red-500"
              : "border-gray-300 focus:border-carbonx-green  focus:ring-carbonx-khaki"
          } shadow-sm  focus:ring focus:ring-opacity-20 `}
          {...rest}
        />
        {endPlaceholder && (
          <span className="absolute right-2 top-0 h-full flex items-center pointer-events-none text-gray-300">
            {endPlaceholder}
          </span>
        )}
        {error && <InputErrorMessage message={error.message} />}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput"; // Setting displayName is recommended when using forwardRef

export default CustomInput;
