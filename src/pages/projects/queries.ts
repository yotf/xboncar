import { useQuery } from "@tanstack/react-query";
import { ProjectBase } from "../types";

const projectsTableMockData: ProjectBase[] = [
  {
    id: 0,
    project: "Switching Fossil Fuels",
    projectType: "Existing Facility Generating Energy for Captive Users",
    stage: "Estimation/Conception",
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
    estimatedCCFinancing: "$120,000",
    estimatedER: 5000,
    projectName: "Project Name 4",
    creationDate: "15/02/2024",
  },
];

const fetchProjectsTableData = async (): Promise<ProjectBase[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(projectsTableMockData);
    }, 0); // 2000 milliseconds = 2 seconds
  });
  // const response = await ApiService.get("/projects");
  //return response.data;
};

export const useProjectsTableData = () => {
  return useQuery({
    queryKey: ["projectsTableData"],
    queryFn: fetchProjectsTableData,
  });
};
