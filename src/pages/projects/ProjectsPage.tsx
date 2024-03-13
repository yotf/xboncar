import { PlusIcon } from "@heroicons/react/24/outline";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { ProjectBase } from "../types";
import "./projectsTableStyles.css";
import { useProjectsTableData } from "./queries";

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
    field: "projectType",
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
  //const [rowData] = useState<ProjectBase[]>();

  const { data: rowData, isLoading, error } = useProjectsTableData();
  const navigate = useNavigate();

  const onNewProjectClick = () => {
    navigate("/");
  };

  return (
    <div className="rounded-xl border w-[90%] max-w-[1333px]  m-auto">
      <div className="flex justify-between items-center p-8">
        <h1 className="text-2xl font-bold">Current Projects</h1>
        <PrimaryButton className=" w-40" onClick={onNewProjectClick}>
          <PlusIcon className="w-5 h-5" /> New Project
        </PrimaryButton>
        {/* <button className="bg-carbonx-green text-white px-4 py-2 rounded-md">
        Add Project
      </button> */}
      </div>
      <div className="w-full m-auto  p-6 pt-0 ">
        <div className="ag-theme-quartz h-[400px] ">
          <AgGridReact<ProjectBase>
            columnDefs={columnDefs}
            rowData={rowData ?? []}
            animateRows={true}
            className=""
            onRowDoubleClicked={(params) => {
              navigate(`/projects/${params?.data?.id}/dashboard`);
            }}
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
