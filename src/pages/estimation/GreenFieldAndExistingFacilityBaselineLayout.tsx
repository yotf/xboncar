import { useState } from "react";
import Accordion from "../../components/atoms/Accordion";
import AddButton from "../../components/atoms/AddButton";
import BackButton from "../../components/atoms/BackButton";
import FuelForm from "./FuelForm";

type BaselineProps = { title: string };

const BaselineCommon: React.FC<BaselineProps> = ({ title }) => {
  const [emissionFactorItems, setEmissionFactorItems] = useState<any[]>([
    {
      title: "Fuel 1",
      content: <FuelForm />,
    },
    {
      title: "Fuel 2",
      content: <FuelForm />,
    },
  ]);

  const addEmissionFactorItem = () => {
    setEmissionFactorItems((prev) => [
      ...prev,
      {
        title: `Fuel ${prev.length + 1}`,
        content: <FuelForm />,
      },
    ]);
  };

  const accordionItems = [
    {
      title: title,
      content: (
        <div className="flex flex-col items-center">
          <Accordion items={emissionFactorItems} id="fuel" name="fuel" />{" "}
          <AddButton onClick={addEmissionFactorItem} />
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto ">
      <BackButton label="Return to Dashboard" />
      <div className="flex  flex-col ">
        <Accordion
          className="mx-8"
          items={accordionItems}
          id="existing-facility"
          name="existing-facility"
        />
      </div>
    </div>
  );
};

export default BaselineCommon;
