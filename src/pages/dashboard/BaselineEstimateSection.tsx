import { ProjectType } from "../types";
import EstimateSection from "./EstimateSection";

type BaselineEstimateSectionProps = {
  projectType: ProjectType;
  onCardSelect?: (calculation: number) => void;
};
const BaselineEstimateSection: React.FC<BaselineEstimateSectionProps> = ({
  projectType,
  onCardSelect,
}) => {
  const baseLineCalculations = [
    {
      title: "Baseline 1",
      calculation: 700,
    },
    {
      title: "Baseline 2",
      calculation: 800,
    },
  ];

  

  return (
    <EstimateSection
      calculations={baseLineCalculations}
      title="Baseline Estimation"
      projectType={projectType}
      onCardSelect={onCardSelect}
    />
  );
};

export default BaselineEstimateSection;
