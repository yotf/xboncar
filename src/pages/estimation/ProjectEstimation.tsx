import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import Accordion, { AccordionItem } from "../../components/atoms/Accordion";
import AddButton from "../../components/atoms/AddButton";
import BackButton from "../../components/atoms/BackButton";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import ProjectFuelForm, { ProjectFuelFormFields } from "./ProjectFuelForm";
import { numberRequiredSchema } from "./ProvidingElectricityBaseline";
import { updateProjectEstimationData } from "./queries";

export type ProjectEstimationFormFields = {
  maximumEnergySuppliedByAlternative: ProjectFuelFormFields[];
};

const schema = z.object({
  maximumEnergySuppliedByAlternative: z.array(
    z.object({
      name: z.string(),
      ncv_pj: numberRequiredSchema,
      fc_pj: numberRequiredSchema,
      ef_co2: numberRequiredSchema,
    })
  ),
});

const defaultValues: ProjectEstimationFormFields = {
  maximumEnergySuppliedByAlternative: [
    {
      name: "",
      ncv_pj: 0,
      fc_pj: 0,
      ef_co2: 0,
    },
    {
      name: "",
      ncv_pj: 0,
      fc_pj: 0,
      ef_co2: 0,
    },
  ],
};

const ProjectEstimation = () => {
  const formMethods = useForm<ProjectEstimationFormFields>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

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

  const navigate = useNavigate();

  const validateAndProceed = async () => {
    const isValid = await formMethods.trigger();

    if (isValid) {
      navigate(-1);
      toast.success("Data is valid");
    } else {
      toast.error(`Please fill in all the required fields`);
    }
  };
  return (
    <FormProvider {...formMethods}>
      <form
        className="flex w-full px-4 md:px-8 lg:px-16 mx-auto flex-col lg:flex-row "
        // onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <div className="flex w-1/6 flex-col gap-20 ">
          <div className="-ml-4">
            <BackButton label="Return to Dashboard" />
          </div>

          <PrimaryButton
            className={` 
               w-40 mt-auto ml-8`}
            onClick={validateAndProceed}
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
