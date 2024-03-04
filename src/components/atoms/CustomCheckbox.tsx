import React from "react";

type CustomCheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const CustomCheckbox = React.forwardRef<HTMLInputElement, CustomCheckboxProps>(
  ({ className, label, id, ...rest }, ref) => {
    return (
      <div className="flex items-start col-span-2">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          //className="checkbox checkbox-primary"
          className="rounded mt-1 border-gray-300 text-carbonx-green focus:ring focus:ring-carbonx-khaki focus:ring-opacity-20"
          {...rest}
        />
        <label htmlFor="termsAndConditions" className="ml-2  ">
          {label}
        </label>
      </div>
    );
  }
);

CustomCheckbox.displayName = "CustomCheckbox"; // Setting displayName is recommended when using forwardRef

export default CustomCheckbox;
