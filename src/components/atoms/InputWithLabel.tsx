import React from "react";
import CustomInput, { CustomInputProps } from "./CustomInput";

type InputWithLabelProps = CustomInputProps & {
  label: React.ReactNode;
};

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, id, ...rest }, ref) => {
    return (
      <div className="flex gap-2 items-center justify-between">
        <label htmlFor={id} className="text-xl font-semibold">
          {label}
        </label>
        <CustomInput id={id} {...rest} className="w-48" ref={ref} />
      </div>
    );
  }
);

export default InputWithLabel;
