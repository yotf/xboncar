import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeLine from "../../components/atoms/TimeLine";
import { useProjectData } from "../queries";
import { stages } from "../types";
import BaselineEstimateSection from "./BaselineEstimateSection";
import CarbonPriceSection from "./CarbonPriceSection";
import ProjectEstimateSection from "./ProjectEstimateSection";
import SectionCard from "./SectionCard";

// Reusable card component

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const { projectId } = useParams();
  const { data: projectData, isLoading } = useProjectData(Number(projectId));

  const [baseLineEstimate, setBaseLineEstimate] = React.useState<number>();
  const [projectEstimate, setProjectEstimate] = React.useState<number>();
  const [price, setPrice] = React.useState<number>();

  const estimate =
    baseLineEstimate && projectEstimate
      ? baseLineEstimate - projectEstimate
      : undefined;

  const timelineCurrentStep = stages.findIndex(
    (stage) => stage === projectData?.stage
  );

  return (
    <div className="container mx-auto px-4 mt-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        {projectData?.projectName}
        <br /> Dashboard
      </h2>
      <div className="flex gap-6 justify-center ">
        <div className="flex flex-col gap-6 ">
          <SectionCard title="Summary" className="grow max-w-[304px]">
            <div className="flex flex-col gap-2 h-[214px] ">
              <p className="">{projectData?.projectType}</p>
              <p className="border-bottom">{projectData?.stage} </p>
              <p className="block w-60 border-t-2 pt-2 mt-auto text-[14px] ">
                {projectData?.description}
              </p>
            </div>
          </SectionCard>

          <SectionCard
            className="hover:shadow-lg  hover:bg-carbonx-light-green hover:bg-opacity-30 cursor-pointer"
            title="Timeline"
            onClick={() => navigate("./timeline")}
          >
            <TimeLine items={stages} currentStep={timelineCurrentStep} />
          </SectionCard>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex gap-6 grow ">
            <SectionCard title="Estimate" className="grow">
              <div className="flex flex-col items-center justify-evenly gap-6 text-carbonx-text-green  ">
                <p className="text-6xl font-bold text-center ">
                  {estimate ? estimate : "-"} t CO
                  <span className="text-4xl">2e</span>
                </p>
                <p className="text-6xl font-bold text-center">
                  $ {price && estimate ? price * estimate : "-"}
                </p>
              </div>
            </SectionCard>
            <CarbonPriceSection onPriceSelected={(price) => setPrice(price)} />
          </div>
          <div className="flex gap-6 ">
            <BaselineEstimateSection
              projectType={projectData?.projectType!}
              onCardSelect={(calc) => setBaseLineEstimate(calc)}
            />
            <ProjectEstimateSection
              projectType={projectData?.projectType!}
              onCardSelect={(calc) => setProjectEstimate(calc)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
