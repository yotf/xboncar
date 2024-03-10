import { useState } from "react";
import Accordion, { AccordionItem } from "../../../components/atoms/Accordion";
import AddButton from "../../../components/atoms/AddButton";
import BackButton from "../../../components/atoms/BackButton";
import ProjectFuelForm from "../ProjectFuelForm";

const ProvidingElectricityProjectEstimation = () => {
  const [fuelItems, setFuelItems] = useState<AccordionItem[]>([
    {
      title: "Fuel 1",
      content: <ProjectFuelForm />,
    },
    {
      title: "Fuel 2",
      content: <ProjectFuelForm />,
    },
  ]);

  const addFuelItem = () => {
    setFuelItems((prev) => [
      ...prev,
      {
        title: `Fuel ${prev.length + 1}`,
        content: <ProjectFuelForm />,
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
    <div className="container mx-auto ">
      <div className="flex  flex-col ">
        <BackButton label="Return to Dashboard" />

        <Accordion
          className="mx-8"
          items={accordionItems}
          name="project-estimation"
          id="project-estimation"
        />
      </div>
    </div>
  );
};

export default ProvidingElectricityProjectEstimation;
