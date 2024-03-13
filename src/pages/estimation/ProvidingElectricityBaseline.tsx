import { useState } from "react";
import Accordion from "../../components/atoms/Accordion";
import AddButton from "../../components/atoms/AddButton";
import BackButton from "../../components/atoms/BackButton";
import InputWithLabel from "../../components/atoms/InputWithLabel";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Select from "../../components/atoms/Select";
import TimeLine from "../../components/atoms/TimeLine";
import FuelForm from "./FuelForm";

const ProvidingElectricityBaseline = () => {
  const [currentStep, setCurrentStep] = useState<number>(3);
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
      title: "Annual Energy Output of Project installation",
      content: (
        <div className="flex gap-6">
          <InputWithLabel
            label={
              <p>
                Q<span className="text-xs">KJ</span>
              </p>
            }
            id="qkj"
          />
          <InputWithLabel
            label={
              <p>
                EF<span className="text-xs">GRID</span>
              </p>
            }
            id="efgrid"
          />

          <Select
            options={[{ label: "tCO2/Mwh", value: "" }]}
            className="w-40"
          />
        </div>
      ),
    },
    {
      title: "Maximum energy supplied by alternative",
      content: (
        <div className="flex gap-6">
          <InputWithLabel
            label={
              <p>
                CAP<span className="text-xs">MAX</span>
              </p>
            }
            id="capmax"
            endPlaceholder="MW"
          />
          <InputWithLabel
            label={
              <p>
                T<span className="text-xs">MAX</span>
              </p>
            }
            id="efalt"
            endPlaceholder="hours"
          />
          <div></div>
        </div>
      ),
    },
    {
      title: "Historic energy supplied by prior plant",
      content: (
        <div className="flex gap-6">
          <InputWithLabel
            label={
              <p>
                Q<span className="text-xs">y-1</span>
              </p>
            }
            id="qy1"
            endPlaceholder="MWh"
          />
          <InputWithLabel
            label={
              <p>
                Q<span className="text-xs">y-2</span>
              </p>
            }
            id="qy2"
            endPlaceholder="MWh"
          />
          <InputWithLabel
            label={
              <p>
                Q<span className="text-xs">y-3</span>
              </p>
            }
            id="qy3"
            endPlaceholder="MWh"
          />
        </div>
      ),
    },
    {
      title: "Baseline Emission Factor",
      content: (
        <div className="flex flex-col items-center ">
          <Accordion
            items={emissionFactorItems}
            className="flex-1"
            id="emission-sub"
            name="emission-sub"
          />
          <AddButton onClick={addEmissionFactorItem} />
        </div>
      ),
    },
  ];

  return (
    <div className="flex container mx-auto overflow-hidden">
      <div className="flex w-1/4 flex-col gap-20 ">
        <div className="-ml-4">
          <BackButton label="Return to Dashboard" />
        </div>

        <TimeLine
          items={[
            "Projects output",
            "Maximum alternative supply",
            "Historic supply",
            "Baseline emission factor",
          ]}
          currentStep={currentStep}
        />
        <PrimaryButton
          className={` ${
            currentStep != 3 ? "hidden" : ""
          } w-40 mt-auto self-center`}
        >
          {" "}
          Validate
        </PrimaryButton>
      </div>
      <Accordion
        items={accordionItems}
        className="flex-1 mt-4"
        id="estimate-accordion"
        name="estimate-accordion"
      />
    </div>
  );
};

export default ProvidingElectricityBaseline;
