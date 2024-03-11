import { ProjectType } from "../../types";
import EstimateSection from "./EstimateSection";

type ProjectEstimateSectionProps = {
  projectType: ProjectType;
  onCardSelect?: (calculation: number) => void;
};

const ProjectEstimateSection: React.FC<ProjectEstimateSectionProps> = ({
  projectType,
  onCardSelect,
}) => {
  const projectCalculations = [
    {
      title: "Project 1",
      calculation: 200,
    },
    {
      title: "Project 2",
      calculation: 300,
    },
  ];
  return (
    <div>
      <EstimateSection
        calculations={projectCalculations}
        title="Project Estimation"
        projectType={projectType}
        onCardSelect={onCardSelect}
      />
    </div>
  );
};

export default ProjectEstimateSection;
