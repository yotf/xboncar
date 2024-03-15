import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { BaselineCommonFormFields } from "./GreenFieldAndExistingFacilityBaselineLogic";
import { ProjectEstimationFormFields } from "./ProjectEstimation";
import { ProvidingElectricityFormFields } from "./ProvidingElectricityBaseline";

export const updateProjectEstimationData = async (
  data: ProjectEstimationFormFields,
  projectId: string
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: "success" });
    }, 1000); // 2000 milliseconds = 2 seconds
  });
  //const response = await ApiService.post("/project/${projectId}/dashboard/project-estimate", data);
  // return response.data;
};

export const updateBaselineEstimationData = async (
  data: ProvidingElectricityFormFields | BaselineCommonFormFields,
  projectId: string
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: "success" });
    }, 1000); // 2000 milliseconds = 2 seconds
  });
  //const response = await ApiService.post("/project/${projectId}/dashboard/baseline-estimate", data);
  // return response.data;
};

// const queryClient = useQueryClient();
// const { projectId } = useParams();

// export const updateBelineEstimationMutation = useMutation({
// mutationFn: (data: ProvidingElectricityFormFields) =>
// updateBaselineEstimationData(data, projectId!),
// onSuccess: (data) => {
// toast.success("Baseline estimation data updated successfully");
// queryClient.invalidateQueries({ queryKey: ["projectData", projectId] });
// },
// onError: (error) => {
// toast.error("Failed to update baseline estimation data");
// },
// });

export const useUpdateBaselineEstimationMutation = () => {
  const queryClient = useQueryClient();
  const { projectId } = useParams(); // Use useParams within the component or custom hook

  const mutation = useMutation({
    mutationFn: (
      data: ProvidingElectricityFormFields | BaselineCommonFormFields
    ) => updateBaselineEstimationData(data, projectId!),
    onSuccess: (data) => {
      toast.success("Baseline estimation data updated successfully");
      queryClient.invalidateQueries({ queryKey: ["projectData", projectId] });
    },
    onError: () => {
      toast.error("Failed to update baseline estimation data");
      // Handle error
    },
  });

  return mutation;
};
