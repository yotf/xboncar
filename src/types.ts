import { Calculation } from "./pages/dashboard/EstimateSection";

export interface DropZoneDocument {
  path: string;
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export type Stages =
  | "Estimation/Conception"
  | "Certification"
  | "Monitoring"
  | "Issuance";

export type DocumentGroup = {
  id: number;
  name: string;
  documents: DropZoneDocument[];
};

export type TimelineItem = {
  id: number;
  name: Stages;
  documentGroups: DocumentGroup[];
  completed: boolean;
};

export type ProjectType =
  | "Existing Facility Generating Energy for Captive Users"
  | "Providing Electricity to the Grid"
  | "Greenfield/Capacity Expansion";

export interface ProjectBase {
  id: number;
  projectName: string;
  estimatedER: number;
  estimatedCCFinancing: string;
  creationDate: string;
  project:
    | "Switching Fossil Fuels"
    | "Treatment of Wastewater"
    | "EnergyEfficiency for Thermal Applications of Non-Renewable Biomass"
    | "Increasing the Blend in Cement Production";
  projectType: ProjectType;
  stage: Stages;
}

export interface ProjectData extends ProjectBase {
  description: string;
  baseEstimates: Calculation[];
  projectEstimates: Calculation[];
}

export const ProjectTypeShorthand: { [key in ProjectType]: string } = {
  "Existing Facility Generating Energy for Captive Users": "captive-energy",
  "Providing Electricity to the Grid": "electricity-grid",
  "Greenfield/Capacity Expansion": "greenfield-expansion",
};

export const stagesEnum: Stages[] = [
  "Estimation/Conception",
  "Certification",
  "Monitoring",
  "Issuance",
];
