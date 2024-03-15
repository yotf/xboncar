import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Accordion, { AccordionItem } from "../../components/atoms/Accordion";
import AddButton from "../../components/atoms/AddButton";
import BackButton from "../../components/atoms/BackButton";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import ProjectFuelForm, { ProjectFuelFormFields } from "./ProjectFuelForm";
import { updateProjectEstimationData } from "./queries";

export type ProjectEstimationFormFields = {
  maximumEnergySuppliedByAlternative: ProjectFuelFormFields[];
};

const ProjectEstimation = () => {
  const formMethods = useForm<ProjectEstimationFormFields>();

  const [fuelItems, setFuelItems] = useState<AccordionItem[]>([
    {
      title: "Fuel 1",
      content: (
        <ProjectFuelForm prefix={`maximumEnergySuppliedByAlternative[0]`} />
      ),
    },
    {
      title: "Fuel 2",
      content: (
        <ProjectFuelForm prefix="maximumEnergySuppliedByAlternative[1]" />
      ),
    },
  ]);

  const addFuelItem = () => {
    setFuelItems((prev) => [
      ...prev,
      {
        title: `Fuel ${prev.length + 1}`,
        content: (
          <ProjectFuelForm
            prefix={`maximumEnergySuppliedByAlternative[${prev.length}]`}
          />
        ),
      },
    ]);
  };

  const { projectId } = useParams();

  const queryClient = useQueryClient();

  const updateProjecEstimationMutation = useMutation({
    mutationFn: (data: ProjectEstimationFormFields) =>
      updateProjectEstimationData(data, projectId!),
    onSuccess: (data) => {
      toast.success("Project estimation data updated successfully");
      queryClient.invalidateQueries({ queryKey: ["projectData", projectId] });
    },
    onError: (error) => {
      toast.error("Error updating project estimation data");
    },
  });

  const onSubmit = (data: ProjectEstimationFormFields) => {
    console.log(data);
    updateProjecEstimationMutation.mutate(data);
  };

  const accordionItems: AccordionItem[] = [
    {
      title: "Maximum energy supplied by alternative",
      content: (
        <div className="flex flex-col items-center">
          <Accordion items={fuelItems} name="fuel" id="fuel" />

          <AddButton onClick={addFuelItem} />
        </div>
      ),
    },
  ];
  return (
    <FormProvider {...formMethods}>
      <form
        className="flex  mx-auto px-4 "
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <div className="flex w-1/6 flex-col gap-20 ">
          <div className="-ml-4">
            <BackButton label="Return to Dashboard" />
          </div>

          <PrimaryButton
            className={` 
               w-40 mt-auto ml-8`}
            type="submit"
            disabled={updateProjecEstimationMutation.isPending}
          >
            {updateProjecEstimationMutation.isPending
              ? "Updating..."
              : "Validate"}
          </PrimaryButton>
        </div>

        <Accordion
          className="mx-8 flex-1  mt-4"
          items={accordionItems}
          name="project-estimation"
          id="project-estimation"
        />
      </form>
    </FormProvider>
  );
};

export default ProjectEstimation;
