import { XMarkIcon } from "@heroicons/react/24/outline"; // Import the delete icon

type CalculationCardProps = {
  title: string;
  calculation: number;
  isSelected?: boolean;
  onClick?: () => void;
  onDelete?: () => void; // Add a prop for the delete action
};

const CalculationCard: React.FC<CalculationCardProps> = ({
  title,
  calculation,
  onClick,
  isSelected,
  onDelete, // Accept the onDelete function as a prop
}) => {
  // Stop propagation to prevent the onClick event when the delete icon is clicked
  const handleDeleteClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center cursor-pointer min-w-[112px] p-4 m-2 ${
        isSelected
          ? "bg-carbonx-green"
          : "hover:bg-carbonx-light-green transition-all"
      } border rounded-lg shadow w-28 h-24 group`}
    >
      <span className="text-sm">{title}</span>
      <span className="text-sm font-semibold">{calculation} tCO2e</span>
      <div
        className="absolute top-1 right-1 hidden group-hover:block"
        onClick={handleDeleteClick}
      >
        <XMarkIcon className="h-4 w-4 text-gray-500 hover:text-red-500 hover:scale-110 transition-all" />{" "}
        {/* Delete icon */}
      </div>
    </div>
  );
};

export default CalculationCard;
