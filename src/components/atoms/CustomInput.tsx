import React from "react";
import { FieldError } from "react-hook-form";
import InputErrorMessage from "./InputErrorMessage";

interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, error, ...rest }, ref) => {
    return (
      <>
        <input
          ref={ref}
          className={`mt-1 block w-full rounded-md ${
            error
              ? "border-red-500 focus:ring-red-400 focus:border-red-500"
              : "border-gray-300 focus:border-carbonx-green  focus:ring-carbonx-khaki"
          } shadow-sm  focus:ring focus:ring-opacity-20 ${className || ""}`}
          {...rest}
        />
        {error && <InputErrorMessage message={error.message} />}
      </>
    );
  }
);

CustomInput.displayName = "CustomInput"; // Setting displayName is recommended when using forwardRef

export default CustomInput;
