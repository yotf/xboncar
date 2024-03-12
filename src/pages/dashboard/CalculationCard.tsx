type CalculationCardProps = {
  title: string;
  calculation: number;
  isSelected?: boolean;
  onClick?: () => void;
};

const CalculationCard: React.FC<CalculationCardProps> = ({
  title,
  calculation,
  onClick,
  isSelected,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-between cursor-pointer p-4 m-2 ${
        isSelected ? "bg-carbonx-green" : "hover:bg-carbonx-light-green"
      } border  rounded-lg shadow w-28 h-24`}
    >
      <span className="text-sm ">{title}</span>
      <span className="text-sm font-semibold">{calculation} tCO2e</span>
    </div>
  );
};

export default CalculationCard;
