import { useQuery } from "@tanstack/react-query";
import { ProjectData } from "./types";

const projectMockData: ProjectData[] = [
  {
    id: 0,
    project: "Switching Fossil Fuels",
    projectType: "Existing Facility Generating Energy for Captive Users",
    stage: "Estimation/Conception",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, distinctio a. Itaque alias excepturi aperiam deleniti inventore?",
    estimatedCCFinancing: "$60,000",
    estimatedER: 3000,
    projectName: "Project Name 1",
    creationDate: "12/01/2024",
  },
  {
    id: 1,
    project: "Treatment of Wastewater",
    projectType: "Providing Electricity to the Grid",
    stage: "Certification",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, distinctio a. Itaque alias excepturi aperiam deleniti inventore?",
    estimatedCCFinancing: "$120,000",
    estimatedER: 5000,
    projectName: "Project Name 2",
    creationDate: "15/02/2024",
  },
  {
    id: 2,
    project:
      "EnergyEfficiency for Thermal Applications of Non-Renewable Biomass",
    projectType: "Greenfield/Capacity Expansion",
    stage: "Monitoring",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, distinctio a. Itaque alias excepturi aperiam deleniti inventore?",
    estimatedCCFinancing: "$120,000",
    estimatedER: 5000,
    projectName: "Project Name 3",
    creationDate: "15/02/2024",
  },
  {
    id: 3,
    project: "Increasing the Blend in Cement Production",
    projectType: "Greenfield/Capacity Expansion",
    stage: "Issuance",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, distinctio a. Itaque alias excepturi aperiam deleniti inventore?",
    estimatedCCFinancing: "$120,000",
    estimatedER: 5000,
    projectName: "Project Name 4",
    creationDate: "15/02/2024",
  },
];

const fetchProjectData = async (projectId: number) => {
  return Promise.resolve(
    projectMockData.find((project) => project.id === projectId)
  );
  // const response = await axios.get(
  //   `${CHEMICAL_STOCK_AUTO_API}?${queryString}`
  // );
  // return response.data;
};

export const useProjectData = (projectId: number) => {
  debugger;
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchProjectData(projectId),
    enabled: projectId !== undefined,
  });
};
