import { useState } from "react";
import FuelForm from "../components/FuelForm";
import Accordion from "../components/atoms/Accordion";
import BackButton from "../components/atoms/BackButton";
import InputWithLabel from "../components/atoms/InputWithLabel";
import PrimaryButton from "../components/atoms/PrimaryButton";
import Select from "../components/atoms/Select";
import TimeLine from "../components/atoms/TimeLine";

const BaseLineEstimatePage = () => {
  const [currentStep, setCurrentStep] = useState<number>(3);
  const emissionFactorItems = [
    {
      title: "Fuel 1",
      content: <FuelForm />,
    },
    {
      title: "Fuel 2",
      content: <FuelForm />,
    },
  ];

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
        <div className="m-10">
          <Accordion
            items={emissionFactorItems}
            className="flex-1"
            id="emission-sub"
            name="emission-sub"
          />
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

export default BaseLineEstimatePage;
