import CustomInput, { CustomInputProps } from "./CustomInput";

type InputWithLabelProps = CustomInputProps & {
  label: React.ReactNode;
};

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  id,
  ...rest
}) => {
  return (
    <div className="flex gap-2 items-center justify-between">
      <label htmlFor={id} className="text-xl font-semibold">
        {label}
      </label>
      <CustomInput id={id} {...rest} />
    </div>
  );
};

export default InputWithLabel;
