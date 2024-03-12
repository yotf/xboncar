import { useEffect, useState } from "react";
import { AddOutline } from "react-ionicons";
import { useNavigate } from "react-router-dom";
import { ProjectType, ProjectTypeShorthand } from "../types";
import CalculationCard from "./CalculationCard";
import SectionCard from "./SectionCard";

type EstimateSectionProps = {
  calculations: { title: string; calculation: number }[];
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
  }, []);

  return (
    <SectionCard title={title}>
      <div className="flex justify-center items-center space-x-4 p-4 ">
        <div className="flex flex-wrap justify-around items-start w-full">
          {calculations.map((calculation) => (
            <CalculationCard
              title={calculation.title}
              calculation={calculation.calculation}
              isSelected={selectedCard === calculation.title}
              onClick={() => handleClick(calculation.title)}
            />
          ))}

          <div
            onClick={() =>
              navigate(
                `./${linkMapping[title]}/${ProjectTypeShorthand[projectType]}`
              )
            }
            className="flex  transition-all items-center hover:bg-carbonx-light-green justify-center w-28 h-24 p-4 m-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
          >
            <div className=" transition-all">
              <AddOutline />
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default EstimateSection;
