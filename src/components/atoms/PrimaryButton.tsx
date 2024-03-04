interface PrimaryButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
}

interface PrimaryButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  disabled,
  type,
  className,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full flex justify-center btn btn-primary ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
