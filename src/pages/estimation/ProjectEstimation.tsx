import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Accordion, { AccordionItem } from "../../components/atoms/Accordion";
import AddButton from "../../components/atoms/AddButton";
import BackButton from "../../components/atoms/BackButton";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import ProjectFuelForm, { ProjectFuelFormFields } from "./ProjectFuelForm";

type ProjectEstimationFormFields = {
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
        onSubmit={formMethods.handleSubmit((data) => {
          console.log(formMethods.formState.errors);
          console.log(data);
        })}
      >
        <div className="flex w-1/6 flex-col gap-20 ">
          <div className="-ml-4">
            <BackButton label="Return to Dashboard" />
          </div>

          <PrimaryButton
            className={` 
               w-40 mt-auto ml-8`}
            type="submit"
          >
            {" "}
            Validate
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
