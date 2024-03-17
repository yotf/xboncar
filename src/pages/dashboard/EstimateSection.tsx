import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ProjectType, ProjectTypeShorthand } from "../../types";
import CalculationCard from "./CalculationCard";
import SectionCard from "./SectionCard";

export type Calculation = {
  title: string;
  calculation: number;
};

type EstimateSectionProps = {
  calculations: Calculation[];
  title: "Baseline Estimation" | "Project Estimation";
  projectType: ProjectType;
  onCardSelect?: (calculation: number) => void;
};

const EstimateSection: React.FC<EstimateSectionProps> = ({
  calculations,
  title,
  onCardSelect,
  projectType,
}) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const navigate = useNavigate();
  const linkMapping = {
    "Baseline Estimation": "baseline-estimate",
    "Project Estimation": "project-estimate",
  };
  const handleClick = (title: string) => {
    setSelectedCard(title);
    if (onCardSelect) {
      onCardSelect(
        calculations.find((calc) => calc.title === title)!.calculation
      );
    }
  };

  useEffect(() => {
    if (calculations.length > 0) {
      setSelectedCard(calculations[0].title);
      if (onCardSelect) {
        onCardSelect(calculations[0].calculation);
      }
    }
  }, [calculations]);

  return (
    <SectionCard title={title} className="w-[452px]  ">
      <div className="flex justify-center items-center space-x-4 p-4  ">
        <div className="flex  items-start w-full  overflow-x-auto">
          {calculations.map((calculation) => (
            <CalculationCard
              title={calculation.title}
              calculation={calculation.calculation}
              isSelected={selectedCard === calculation.title}
              onClick={() => handleClick(calculation.title)}
              key={calculation.title}
              onDelete={() => {
                Swal.fire({
                  title: `Delete ${calculation.title}?`,
                  text: "Deletion is permanent",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#C1F48F",
                  cancelButtonColor: "#3d4451",
                  confirmButtonText: "Yes, delete it!",
                  customClass: { confirmButton: "sweet-confirm-button" },
                }).then((result) => {
                  if (result.isConfirmed) {
                    toast.success("Estimation deleted", {
                      icon: <TrashIcon className="w-6 h-6" />,
                    });
                  }
                });
              }}
            />
          ))}

          <div
            onClick={() =>
              navigate(
                `./${linkMapping[title]}/${ProjectTypeShorthand[projectType]}`
              )
            }
            className="flex  transition-all min-w-[112px] items-center hover:bg-carbonx-light-green  justify-center w-28 h-24 p-4 m-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
          >
            <div className=" transition-all">
              <PlusIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default EstimateSection;
