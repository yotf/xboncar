import React from "react";

interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, ...rest }, ref) => (
    <input
      ref={ref}
      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-carbonx-green focus:ring focus:ring-carbonx-khaki focus:ring-opacity-20 ${
        className || ""
      }`}
      {...rest}
    />
  )
);

CustomInput.displayName = "CustomInput"; // Setting displayName is recommended when using forwardRef

export default CustomInput;
