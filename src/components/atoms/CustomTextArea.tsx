import React from "react";
import { FieldError } from "react-hook-form";
import InputErrorMessage from "./InputErrorMessage";

type CustomTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: FieldError;
  textareaClassName?: string;
};

const CustomTextarea = React.forwardRef<
  HTMLTextAreaElement,
  CustomTextareaProps
>(({ className, error, id, textareaClassName, ...rest }, ref) => {
  return (
    <div className={`${className || ""}`}>
      <textarea
        ref={ref}
        id={id}
        className={`mt-1 block w-full rounded-md ${
          error
            ? "border-red-500 focus:ring-red-400 focus:border-red-500"
            : "border-gray-300 focus:border-carbonx-green focus:ring-carbonx-khaki"
        } shadow-sm focus:ring focus:ring-opacity-20 resize-none ${
          textareaClassName || ""
        }`} // Added resize-none to disable resizing
        {...rest}
      />
      {error && <InputErrorMessage message={error.message} />}
    </div>
  );
});

CustomTextarea.displayName = "CustomTextarea"; // Setting displayName is recommended when using forwardRef

export default CustomTextarea;
