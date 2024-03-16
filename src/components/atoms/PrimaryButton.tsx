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
  onClick?: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  disabled,
  type,
  className,
  onClick,
}) => {
  return (
    <button
      type={type ?? "button"}
      disabled={disabled}
      className={`flex justify-center btn btn-primary ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
