import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { AddOutline } from "react-ionicons";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import "./projectsTableStyles.css";

interface Project {
  stage: string;
  projectName: string;
  typeOfProject: string;
  estimatedER: number;
  estimatedCCFinancing: string;
  creationDate: string;
}

const columnDefs: ColDef[] = [
  {
    field: "stage",
    sortable: true,
    filter: true,
    //cellClass: "ag-cell-content",
  },
  {
    field: "projectName",
    sortable: true,
    filter: true,
  },
  {
    field: "typeOfProject",
    sortable: true,
    filter: true,
    //headerClass: "ag-header-cell-label",
  },
  { field: "estimatedER", sortable: true, filter: "agNumberColumnFilter" },
  { field: "estimatedCCFinancing", sortable: true, filter: true },
  {
    field: "creationDate",
    sortable: true,
    filter: "agDateColumnFilter",
  },
];

const ProjectsPage: React.FC = () => {
  const [rowData] = useState<Project[]>([
    {
      stage: "Estimation",
      projectName: "Project Name 1",
      typeOfProject: "Providing Electricity to the Grid",
      estimatedER: 3000,
      estimatedCCFinancing: "$60,000",
      creationDate: "12/01/2024",
    },
    {
      stage: "Implementation",
      projectName: "Project Name 2",
      typeOfProject: "Solar Power Development",
      estimatedER: 5000,
      estimatedCCFinancing: "$120,000",
      creationDate: "15/02/2024",
    },
    {
      stage: "Completed",
      projectName: "Project Name 3",
      typeOfProject: "Wind Farm Installation",
      estimatedER: 7500,
      estimatedCCFinancing: "$200,000",
      creationDate: "20/03/2024",
    },
    // ... more data ...
  ]);

  return (
    <div className="rounded-xl border w-[90%] max-w-[1333px]  m-auto">
      <div className="flex justify-between items-center p-8">
        <h1 className="text-2xl font-bold">Current Projects</h1>
        <PrimaryButton className=" w-44">
          <AddOutline /> New Project
        </PrimaryButton>
        {/* <button className="bg-carbonx-green text-white px-4 py-2 rounded-md">
        Add Project
      </button> */}
      </div>
      <div className="w-full m-auto  p-6 pt-0 ">
        <div className="ag-theme-quartz h-[400px] ">
          <AgGridReact<Project>
            columnDefs={columnDefs}
            rowData={rowData}
            animateRows={true}
            className=""
            suppressHorizontalScroll={true}
            onGridReady={(params) => {
              params.api.sizeColumnsToFit();
            }}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
